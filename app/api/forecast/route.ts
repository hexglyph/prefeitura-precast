import { NextResponse } from "next/server"
import { query } from "@/lib/db"

function simpleExponentialSmoothing(series: number[], alpha = 0.3, horizon = 6) {
  if (series.length === 0) return { fitted: [], forecast: [] }
  let s = series[0]
  const fitted: number[] = [s]
  for (let t = 1; t < series.length; t++) {
    s = alpha * series[t] + (1 - alpha) * s
    fitted.push(s)
  }
  const last = fitted[fitted.length - 1]
  return { fitted, forecast: Array(horizon).fill(last) }
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const indicator = Number(searchParams.get("cd_indicador"))
  const nivel = searchParams.get("nivel") || "MUN"
  const regiao = searchParams.get("regiao") || "São Paulo"
  if (!indicator) return NextResponse.json({ error: "cd_indicador required" }, { status: 400 })

  const { rows } = await query<{ periodo: string; value_num: string }>(
    `SELECT periodo, value_num::text FROM indicator_results
     WHERE indicator_id = $1 AND nivel = $2 AND (regiao_name = $3 OR $3 IS NULL)
     ORDER BY periodo`,
    [indicator, nivel, regiao]
  )
  const points = rows.map((r) => Number(r.value_num)).filter((n) => !isNaN(n))
  const { fitted, forecast } = simpleExponentialSmoothing(points)
  return NextResponse.json({ count: points.length, fitted, forecast })
}
