"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Line, LineChart, XAxis, YAxis, CartesianGrid } from "recharts"
import { useMemo } from "react"

type Props = {
  indicatorId: number
  nivel?: string
  regiao?: string | null
  title?: string
}

export function ForecastChart({ indicatorId, nivel = "MUN", regiao = "São Paulo", title = "Previsão" }: Props) {
  const [data, setData] = useState<{ x: number; fitted?: number; forecast?: number }[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [weather, setWeather] = useState<{ day: string; temp: number; rain: number; humidity: number }[] | null>(null)

  useEffect(() => {
    let cancelled = false
    async function load() {
      try {
        setLoading(true)
        setError(null)
        const params = new URLSearchParams({ cd_indicador: String(indicatorId), nivel, regiao: regiao || "" })
        const res = await fetch(`/api/forecast?${params.toString()}`)
        const json = await res.json()
        if (cancelled) return
        const points: { x: number; fitted?: number; forecast?: number }[] = []
        const n = (json?.fitted?.length as number) || 0
        for (let i = 0; i < n; i++) points.push({ x: i + 1, fitted: json.fitted[i] })
        const h = (json?.forecast?.length as number) || 0
        for (let j = 0; j < h; j++) points.push({ x: n + j + 1, forecast: json.forecast[j] })
        setData(points)
      } catch (e: any) {
        setError("Falha ao carregar previsão")
      } finally {
        setLoading(false)
      }
    }
    load()
    return () => {
      cancelled = true
    }
  }, [indicatorId, nivel, regiao])

  const expanded = data.some((d) => d.forecast !== undefined)

  useEffect(() => {
    if (!expanded) return
    let cancelled = false
    async function loadWeather() {
      try {
        const res = await fetch(`/api/weather?city=São Paulo&days=5`)
        if (!res.ok) return
        const json = await res.json()
        if (cancelled) return
        setWeather(json?.forecast || null)
      } catch {}
    }
    loadWeather()
    return () => {
      cancelled = true
    }
  }, [expanded])

  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>
          Indicador {indicatorId} • {nivel} {regiao ? `• ${regiao}` : ""}
        </CardDescription>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="text-sm text-muted-foreground">Carregando...</div>
        ) : error ? (
          <div className="text-sm text-red-600">{error}</div>
        ) : (
          <ChartContainer config={{ fitted: { label: "Histórico", color: "hsl(210 98% 50%)" }, forecast: { label: "Previsão", color: "hsl(142 76% 36%)" } }}>
            <LineChart data={data} margin={{ left: 12, right: 12 }}>
              <CartesianGrid vertical={false} />
              <XAxis dataKey="x" tickLine={false} axisLine={false} />
              <YAxis tickLine={false} axisLine={false} />
              <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
              <Line dataKey="fitted" type="monotone" stroke="var(--color-fitted)" dot={false} strokeWidth={2} />
              <Line dataKey="forecast" type="monotone" stroke="var(--color-forecast)" dot={false} strokeDasharray="4 4" strokeWidth={2} />
            </LineChart>
          </ChartContainer>
        )}
        {weather && (
          <div className="mt-4 grid grid-cols-1 sm:grid-cols-5 gap-2 text-xs">
            {weather.map((w, i) => (
              <div key={i} className="border rounded-md p-2">
                <div className="font-medium">{w.day}</div>
                <div>Temp: {w.temp}°C</div>
                <div>Chuva: {w.rain} mm</div>
                <div>Umidade: {w.humidity}%</div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
