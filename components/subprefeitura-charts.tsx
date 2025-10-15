"use client"

import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { AIInsightTooltip } from "@/components/ai-insight-tooltip"
import { LineChart, Line, CartesianGrid, XAxis, YAxis, PieChart, Pie, Cell } from "recharts"

type MonthlyDataPoint = {
  month: string
  economia: number
  seguranca: number
}

type DemographicSlice = {
  category: string
  value: number
}

const DEMOGRAPHIC_COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884D8"]

interface SubprefeituraChartsProps {
  monthlyData: MonthlyDataPoint[]
  demographics: DemographicSlice[]
}

export function SubprefeituraCharts({ monthlyData, demographics }: SubprefeituraChartsProps) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            Evolução dos Indicadores
            <AIInsightTooltip
              title="Evolução dos Indicadores"
              insight="A economia mantém-se estável em torno de 95-97%, enquanto a segurança oscila entre 90-92%. Ambos mostram tendência de estabilidade com leve melhoria."
              recommendation="Manter investimentos em segurança para alcançar patamar similar ao da economia."
            />
          </CardTitle>
          <CardDescription>Principais métricas nos últimos 5 meses</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer
            config={{
              economia: { label: "Economia", color: "hsl(var(--chart-1))" },
              seguranca: { label: "Segurança", color: "hsl(var(--chart-2))" },
            }}
            className="h-[300px]"
          >
            <LineChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Line type="monotone" dataKey="economia" stroke="var(--color-economia)" strokeWidth={2} />
              <Line type="monotone" dataKey="seguranca" stroke="var(--color-seguranca)" strokeWidth={2} />
            </LineChart>
          </ChartContainer>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            Distribuição Demográfica
            <AIInsightTooltip
              title="Distribuição Demográfica"
              insight="A população é predominantemente adulta (35-54 anos: 32%) e jovem adulta (18-34 anos: 28%), típico de centros urbanos com alta atividade econômica."
              recommendation="Focar em serviços para população economicamente ativa e programas para idosos (25% da população)."
            />
          </CardTitle>
          <CardDescription>População por faixa etária</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer
            config={{
              value: { label: "Porcentagem", color: "hsl(var(--chart-3))" },
            }}
            className="h-[300px]"
          >
            <PieChart>
              <Pie
                data={demographics}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ category, value }) => `${category}: ${value}%`}
                outerRadius={80}
                dataKey="value"
              >
                {demographics.map((entry, index) => (
                  <Cell key={`cell-${entry.category}-${index}`} fill={DEMOGRAPHIC_COLORS[index % DEMOGRAPHIC_COLORS.length]} />
                ))}
              </Pie>
              <ChartTooltip content={<ChartTooltipContent />} />
            </PieChart>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  )
}
