import { NextResponse } from "next/server"
import { fetchResultadosIndicador } from "@/lib/observasampa"
import { query } from "@/lib/db"

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { cd_indicador, nivel = "MUN" } = body as { cd_indicador: number; nivel?: "D"|"MUN"|"SUB"|"P"|"EST" }
    if (!cd_indicador) return NextResponse.json({ error: "cd_indicador required" }, { status: 400 })

    const results = await fetchResultadosIndicador(cd_indicador, nivel)

    await query("INSERT INTO indicators (indicator_id) VALUES ($1) ON CONFLICT (indicator_id) DO NOTHING", [cd_indicador])

    for (const r of results) {
      const valueNum = Number(r.vl_indicador_resultado?.toString().replace(",", "."))
      await query(
        `INSERT INTO indicator_results (indicator_id, nivel, regiao_code, regiao_name, periodo, value_num, value_raw, payload)
         VALUES ($1,$2,$3,$4,$5,$6,$7,$8)
         ON CONFLICT (indicator_id, nivel, regiao_code, periodo) DO UPDATE SET value_num = EXCLUDED.value_num, value_raw = EXCLUDED.value_raw`,
        [
          r.cd_indicador,
          nivel,
          r.cd_regiao,
          r.regiao?.nm_regiao,
          r.periodo?.vl_periodo,
          isNaN(valueNum) ? null : valueNum,
          r.vl_indicador_resultado,
          r as any,
        ]
      )
    }

    return NextResponse.json({ inserted: results.length })
  } catch (e: any) {
    console.error(e)
    return NextResponse.json({ error: "ingest_failed" }, { status: 500 })
  }
}

