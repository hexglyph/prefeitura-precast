import { databaseAvailable, query } from "@/lib/db"

type Trend = "up" | "down" | "stable"

type BaseSubprefeituraRow = {
  id: string
  name: string
  region: string | null
  description: string | null
  population: number | null
  area_km2: number | null
  density_per_km2: number | null
  performance: number | null
  alerts: number | null
  trend: string | null
  latitude: number | null
  longitude: number | null
}

type MetricRow = {
  subprefeitura_id: string
  category: string
  value: number | null
  target: number | null
  extra: any
}

type DistrictRow = {
  subprefeitura_id: string
  name: string
}

type HighlightRow = {
  subprefeitura_id: string
  highlight: string
}

type MonthlyIndicatorRow = {
  subprefeitura_id: string
  period: string
  populacao: number | null
  economia: number | null
  seguranca: number | null
}

type AlertRow = {
  subprefeitura_id: string
  message: string
  severity: string | null
  area: string | null
  timeframe: string | null
  metadata: any
}

type ServiceRow = {
  subprefeitura_id: string
  name: string
  service_type: string | null
  address: string | null
  status: string | null
  metadata: any
}

type DemographicRow = {
  subprefeitura_id: string
  category: string
  percentage: number | null
  population: number | null
}

export type SubprefeituraSummary = {
  id: string
  name: string
  description: string
  population: number
  areaDisplay: string
  areaKm2: number | null
  densityDisplay: string
  densityPerKm2: number | null
  performance: number
  trend: Trend
  alerts: number
  coordinates?: { lat: number; lng: number }
  districts: string[]
  metrics: Record<string, number>
  highlights: string[]
}

export type AreaMetric = {
  area: string
  value: number
  target: number | null
  [key: string]: any
}

export type SubprefeituraDetail = SubprefeituraSummary & {
  region: string | null
  monthlyData: { month: string; populacao: number; economia: number; seguranca: number }[]
  alertsDetail: { message: string; severity: string | null; area: string | null; time: string | null; metadata: any }[]
  services: { name: string; type: string | null; address: string | null; status: string | null; metadata: any }[]
  demographics: { category: string; value: number; population: number | null }[]
  areaMetrics: AreaMetric[]
  metadata: Record<string, any>
}

const NUMBER_FORMAT = new Intl.NumberFormat("pt-BR")
const AREA_FORMAT = new Intl.NumberFormat("pt-BR", { minimumFractionDigits: 1, maximumFractionDigits: 1 })

const METRIC_KEY_MAP: Record<string, string> = {
  Segurança: "seguranca",
  "Seguranca": "seguranca",
  Educação: "educacao",
  Educacao: "educacao",
  Saúde: "saude",
  Saude: "saude",
  Transporte: "transporte",
  Limpeza: "limpeza",
  Economia: "economia",
}

const DEFAULT_TREND: Trend = "stable"

function coerceTrend(value: string | null): Trend {
  if (!value) return DEFAULT_TREND
  const normalized = value.toLowerCase() as Trend
  return normalized === "up" || normalized === "down" || normalized === "stable" ? normalized : DEFAULT_TREND
}

function formatArea(areaKm2: number | null): string {
  if (areaKm2 === null || areaKm2 === undefined || Number.isNaN(areaKm2)) return "N/D"
  return `${AREA_FORMAT.format(areaKm2)} km²`
}

function formatDensity(density: number | null, population?: number | null, areaKm2?: number | null): { display: string; value: number | null } {
  let value = density
  if ((value === null || value === undefined) && population && areaKm2) {
    const computed = population / areaKm2
    value = Number.isFinite(computed) ? computed : null
  }
  if (!value && value !== 0) {
    return { display: "N/D", value: null }
  }
  return { display: `${NUMBER_FORMAT.format(Math.round(value))} hab/km²`, value }
}

function mapMetrics(rows: MetricRow[]): Map<string, AreaMetric[]> {
  const grouped = new Map<string, AreaMetric[]>()
  for (const row of rows) {
    const existing = grouped.get(row.subprefeitura_id) ?? []
    const value = row.value ?? 0
    const target = row.target ?? null
    const extra = typeof row.extra === "object" && row.extra !== null ? row.extra : {}
    existing.push({ area: row.category, value: Number(value), target, ...extra })
    grouped.set(row.subprefeitura_id, existing)
  }
  return grouped
}

function mapSummaryMetrics(areaMetrics: AreaMetric[]): Record<string, number> {
  const metrics: Record<string, number> = {}
  for (const metric of areaMetrics) {
    const key = METRIC_KEY_MAP[metric.area] ?? metric.area?.toLowerCase()?.normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/\s+/g, "_")
    if (!key) continue
    metrics[key] = Math.round(metric.value)
  }
  return metrics
}

function monthLabel(period: string): string {
  const [year, month] = period.split("-").map((part) => Number(part))
  if (!year || !month) return period
  try {
    const date = new Date(Date.UTC(year, month - 1, 1))
    return date.toLocaleDateString("pt-BR", { month: "short" })
  } catch {
    return period
  }
}

function roundNumber(value: number | null | undefined): number {
  if (value === null || value === undefined || Number.isNaN(Number(value))) return 0
  return Number(value)
}

export async function getSubprefeituras(): Promise<SubprefeituraSummary[]> {
  if (!databaseAvailable()) {
    return []
  }

  const baseResult = await query<BaseSubprefeituraRow>(
    `SELECT id, name, region, description, population, area_km2, density_per_km2, performance, alerts, trend, latitude, longitude
     FROM subprefeituras
     ORDER BY name`
  )

  const baseRows = baseResult.rows
  if (!baseRows.length) {
    return []
  }

  const ids = baseRows.map((row) => row.id)

  const [districtsResult, highlightsResult, metricsResult] = await Promise.all([
    query<DistrictRow>(
      `SELECT subprefeitura_id, name
       FROM subprefeitura_districts
       WHERE subprefeitura_id = ANY($1::text[])
       ORDER BY name`,
      [ids]
    ),
    query<HighlightRow>(
      `SELECT subprefeitura_id, highlight
       FROM subprefeitura_highlights
       WHERE subprefeitura_id = ANY($1::text[])
       ORDER BY id`,
      [ids]
    ),
    query<MetricRow>(
      `SELECT subprefeitura_id, category, value, target, extra
       FROM subprefeitura_metrics
       WHERE subprefeitura_id = ANY($1::text[])`,
      [ids]
    ),
  ])

  const districtsMap = new Map<string, string[]>()
  for (const row of districtsResult.rows) {
    const list = districtsMap.get(row.subprefeitura_id) ?? []
    list.push(row.name)
    districtsMap.set(row.subprefeitura_id, list)
  }

  const highlightsMap = new Map<string, string[]>()
  for (const row of highlightsResult.rows) {
    const list = highlightsMap.get(row.subprefeitura_id) ?? []
    list.push(row.highlight)
    highlightsMap.set(row.subprefeitura_id, list)
  }

  const metricsMap = mapMetrics(metricsResult.rows)

  return baseRows.map((row) => {
    const areaMetrics = metricsMap.get(row.id) ?? []
    const metrics = mapSummaryMetrics(areaMetrics)
    const { display: densityDisplay, value: densityValue } = formatDensity(row.density_per_km2, row.population, row.area_km2)
    const areaDisplay = formatArea(row.area_km2)
    const performance = row.performance ?? 0
    const alerts = row.alerts ?? 0
    const coordinates =
      row.latitude !== null && row.longitude !== null ? { lat: Number(row.latitude), lng: Number(row.longitude) } : undefined

    return {
      id: row.id,
      name: row.name,
      description: row.description ?? "",
      population: row.population ?? 0,
      areaDisplay,
      areaKm2: row.area_km2,
      densityDisplay,
      densityPerKm2: densityValue,
      performance: Math.round(performance),
      trend: coerceTrend(row.trend),
      alerts: alerts,
      coordinates,
      districts: districtsMap.get(row.id) ?? [],
      metrics,
      highlights: highlightsMap.get(row.id) ?? [],
    }
  })
}

export async function getSubprefeituraDetail(id: string): Promise<SubprefeituraDetail | null> {
  if (!databaseAvailable()) {
    return null
  }

  const baseResult = await query<BaseSubprefeituraRow & { metadata: any }>(
    `SELECT id, name, region, description, population, area_km2, density_per_km2, performance, alerts, trend, latitude, longitude, metadata
     FROM subprefeituras
     WHERE id = $1
     LIMIT 1`,
    [id]
  )

  const row = baseResult.rows[0]
  if (!row) {
    return null
  }

  const [districtsResult, highlightsResult, metricsResult, monthlyResult, alertsResult, servicesResult, demographicsResult] =
    await Promise.all([
      query<DistrictRow>(
        `SELECT subprefeitura_id, name
         FROM subprefeitura_districts
         WHERE subprefeitura_id = $1
         ORDER BY name`,
        [row.id]
      ),
      query<HighlightRow>(
        `SELECT subprefeitura_id, highlight
         FROM subprefeitura_highlights
         WHERE subprefeitura_id = $1
         ORDER BY id`,
        [row.id]
      ),
      query<MetricRow>(
        `SELECT subprefeitura_id, category, value, target, extra
         FROM subprefeitura_metrics
         WHERE subprefeitura_id = $1`,
        [row.id]
      ),
      query<MonthlyIndicatorRow>(
        `SELECT subprefeitura_id, period, populacao, economia, seguranca
         FROM subprefeitura_monthly_indicators
         WHERE subprefeitura_id = $1
         ORDER BY period`,
        [row.id]
      ),
      query<AlertRow>(
        `SELECT subprefeitura_id, message, severity, area, timeframe, metadata
         FROM subprefeitura_alerts
         WHERE subprefeitura_id = $1
         ORDER BY created_at DESC`,
        [row.id]
      ),
      query<ServiceRow>(
        `SELECT subprefeitura_id, name, service_type, address, status, metadata
         FROM subprefeitura_services
         WHERE subprefeitura_id = $1
         ORDER BY name`,
        [row.id]
      ),
      query<DemographicRow>(
        `SELECT subprefeitura_id, category, percentage, population
         FROM subprefeitura_demographics
         WHERE subprefeitura_id = $1
         ORDER BY id`,
        [row.id]
      ),
    ])

  const areaMetrics = (mapMetrics(metricsResult.rows).get(row.id) ?? []).map((metric) => ({
    ...metric,
    value: Number(metric.value),
    target: metric.target !== null && metric.target !== undefined ? Number(metric.target) : null,
  }))

  const summaryMetrics = mapSummaryMetrics(areaMetrics)

  const { display: densityDisplay, value: densityValue } = formatDensity(row.density_per_km2, row.population, row.area_km2)
  const areaDisplay = formatArea(row.area_km2)
  const performance = Math.round(row.performance ?? 0)
  const alertsCount = row.alerts ?? alertsResult.rows.length
  const coordinates =
    row.latitude !== null && row.longitude !== null ? { lat: Number(row.latitude), lng: Number(row.longitude) } : undefined
  const metadata = typeof (row as any).metadata === "object" && (row as any).metadata !== null ? (row as any).metadata : {}

  return {
    id: row.id,
    name: row.name,
    description: row.description ?? "",
    population: row.population ?? 0,
    areaDisplay,
    areaKm2: row.area_km2,
    densityDisplay,
    densityPerKm2: densityValue,
    performance,
    trend: coerceTrend(row.trend),
    alerts: alertsCount,
    coordinates,
    districts: districtsResult.rows.map((district) => district.name),
    metrics: summaryMetrics,
    highlights: highlightsResult.rows.map((highlight) => highlight.highlight),
    region: row.region,
    monthlyData: monthlyResult.rows.map((item) => ({
      month: monthLabel(item.period),
      populacao: roundNumber(item.populacao),
      economia: roundNumber(item.economia),
      seguranca: roundNumber(item.seguranca),
    })),
    alertsDetail: alertsResult.rows.map((alert) => ({
      message: alert.message,
      severity: alert.severity,
      area: alert.area,
      time: alert.timeframe,
      metadata: alert.metadata,
    })),
    services: servicesResult.rows.map((service) => ({
      name: service.name,
      type: service.service_type,
      address: service.address,
      status: service.status,
      metadata: service.metadata,
    })),
    demographics: demographicsResult.rows.map((demo) => ({
      category: demo.category,
      value: demo.percentage !== null ? Number(demo.percentage) : 0,
      population: demo.population !== null ? Number(demo.population) : null,
    })),
    areaMetrics,
    metadata,
  }
}
