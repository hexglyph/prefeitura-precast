import { NextResponse } from "next/server"
import { query } from "@/lib/db"
import { fetchResultadosIndicador } from "@/lib/observasampa"

export async function POST(req: Request) {
  try {
    const { searchParams } = new URL(req.url)
    const nivel = (searchParams.get("nivel") as any) || "MUN"
    const max = Number(searchParams.get("max") || 50)
    const { rows } = await query<{ indicator_id: number }>(
      `SELECT indicator_id FROM indicators ORDER BY indicator_id LIMIT $1`,
      [Math.max(1, Math.min(500, max))]
    )
    let ingested = 0
    for (const r of rows) {
      try {
        const results = await fetchResultadosIndicador(r.indicator_id, nivel)
        for (const it of results) {
          const valueNum = Number(it.vl_indicador_resultado?.toString().replace(",", "."))
          await query(
            `INSERT INTO indicator_results (indicator_id, nivel, regiao_code, regiao_name, periodo, value_num, value_raw, payload)
             VALUES ($1,$2,$3,$4,$5,$6,$7,$8)
             ON CONFLICT (indicator_id, nivel, regiao_code, periodo)
             DO UPDATE SET value_num = EXCLUDED.value_num, value_raw = EXCLUDED.value_raw`,
            [
              it.cd_indicador,
              nivel,
              it.cd_regiao,
              it.regiao?.nm_regiao,
              it.periodo?.vl_periodo,
              isNaN(valueNum) ? null : valueNum,
              it.vl_indicador_resultado,
              it as any,
            ]
          )
        }
        ingested += results.length
      } catch (e) {
        // continue next id
      }
    }
    return NextResponse.json({ ingested, nivel, scanned: rows.length })
  } catch (e: any) {
    console.error(e)
    return NextResponse.json({ error: "ingest_all_failed" }, { status: 500 })
  }
}

