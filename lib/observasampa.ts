const BASE = process.env.OBSERVASAMPA_BASE_URL || "https://api.observasampa.prefeitura.sp.gov.br"

export type ResultadoIndicador = {
  cd_sequencia_indicador_resultado: number
  cd_indicador: number
  cd_regiao: number
  cd_periodo: number
  vl_indicador_resultado: string
  regiao: { nm_regiao: string; sg_regiao: string; cd_nivel_regiao: string }
  periodo: { vl_periodo: string }
}

export async function fetchIndicadores(params?: { nm_tema?: string; skip?: number; limit?: number }) {
  const url = new URL(`/v1/basic/indicadores/`, BASE)
  if (params?.nm_tema) url.searchParams.set("nm_tema", params.nm_tema)
  if (params?.skip != null) url.searchParams.set("skip", String(params.skip))
  if (params?.limit != null) url.searchParams.set("limit", String(params.limit))
  const res = await fetch(url, { next: { revalidate: 3600 } })
  if (!res.ok) throw new Error(`ObservaSampa indicadores ${res.status}`)
  return res.json()
}

export async function fetchResultadosIndicador(cd_indicador: number, nivel: "D"|"MUN"|"SUB"|"P"|"EST", opts?: { skip?: number; limit?: number }) {
  const url = new URL(`/v1/basic/indicadores/${cd_indicador}/resultados`, BASE)
  url.searchParams.set("nivel_regional", nivel)
  if (opts?.skip != null) url.searchParams.set("skip", String(opts.skip))
  if (opts?.limit != null) url.searchParams.set("limit", String(opts.limit))
  const res = await fetch(url, { next: { revalidate: 300 } })
  if (!res.ok) throw new Error(`ObservaSampa resultados ${res.status}`)
  const data = (await res.json()) as ResultadoIndicador[]
  return data
}

export async function fetchIndicadorDetail(cd_indicador: number) {
  const url = new URL(`/v1/basic/indicadores/${cd_indicador}`, BASE)
  const res = await fetch(url, { next: { revalidate: 86400 } })
  if (!res.ok) throw new Error(`ObservaSampa indicador ${res.status}`)
  return res.json()
}
