import { NextResponse } from "next/server"

// Real weather via Open-Meteo for São Paulo-SP
// Docs: https://open-meteo.com/en/docs
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const days = Number(searchParams.get("days") || 5)
  const latitude = Number(searchParams.get("lat") || -23.55)
  const longitude = Number(searchParams.get("lon") || -46.63)
  const url = new URL("https://api.open-meteo.com/v1/forecast")
  url.searchParams.set("latitude", String(latitude))
  url.searchParams.set("longitude", String(longitude))
  url.searchParams.set("daily", [
    "temperature_2m_max",
    "temperature_2m_min",
    "precipitation_sum",
    "relative_humidity_2m_mean",
  ].join(","))
  url.searchParams.set("timezone", "auto")
  url.searchParams.set("forecast_days", String(Math.min(7, Math.max(1, days))))

  const res = await fetch(url.toString(), { next: { revalidate: 1800 } })
  if (!res.ok) return NextResponse.json({ error: "weather_upstream" }, { status: 502 })
  const json = await res.json()
  const d = json.daily || {}
  const out = [] as Array<{ day: string; temp: number; rain: number; humidity: number }>
  const n = (d.time || []).length
  for (let i = 0; i < n; i++) {
    const date = new Date(d.time[i])
    const day = date.toLocaleDateString("pt-BR", { weekday: "short", day: "2-digit", month: "2-digit" })
    const tmax = Number(d.temperature_2m_max?.[i])
    const tmin = Number(d.temperature_2m_min?.[i])
    const temp = Math.round((tmax + tmin) / 2)
    const rain = Number(d.precipitation_sum?.[i] ?? 0)
    const humidity = Math.round(Number(d.relative_humidity_2m_mean?.[i] ?? 0))
    out.push({ day, temp, rain, humidity })
  }
  return NextResponse.json({ city: "São Paulo", forecast: out })
}
