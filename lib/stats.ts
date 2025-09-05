import { query } from "@/lib/db"

export type IndicatorStats = {
  latest?: number
  prev?: number
  change?: number
  avg6?: number
  count: number
}

export async function getIndicatorStats(indicatorId: number, nivel: string, regiaoName?: string): Promise<IndicatorStats> {
  const { rows } = await query<{ periodo: string; value_num: string }>(
    `SELECT periodo, value_num::text FROM indicator_results
     WHERE indicator_id=$1 AND nivel=$2 AND ($3::text IS NULL OR regiao_name=$3)
     ORDER BY periodo`,
    [indicatorId, nivel, regiaoName || null]
  )
  const series = rows.map((r) => Number(r.value_num)).filter((v) => !isNaN(v))
  const count = series.length
  if (!count) return { count }
  const latest = series[count - 1]
  const prev = count > 1 ? series[count - 2] : undefined
  const change = prev !== undefined ? ((latest - prev) / (prev || 1)) : undefined
  const start = Math.max(0, count - 6)
  const last6 = series.slice(start)
  const avg6 = last6.reduce((a, b) => a + b, 0) / last6.length
  return { latest, prev, change, avg6, count }
}

export async function getIndicatorSeries(indicatorId: number, nivel: string, regiaoName?: string) {
  const { rows } = await query<{ periodo: string; value_num: string }>(
    `SELECT periodo, value_num::text FROM indicator_results
     WHERE indicator_id=$1 AND nivel=$2 AND ($3::text IS NULL OR regiao_name=$3)
     ORDER BY periodo`,
    [indicatorId, nivel, regiaoName || null]
  )
  return rows.map((r) => ({ period: r.periodo, value: Number(r.value_num) }))
}

