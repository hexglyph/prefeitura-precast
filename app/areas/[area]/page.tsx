import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, LineChart, Line } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Shield, ArrowLeft, TrendingUp, TrendingDown, AlertTriangle, MapPin, Target } from "lucide-react"
import { ForecastChart } from "@/components/forecast-chart"
import Link from "next/link"
import { getIndicatorStats } from "@/lib/stats"
import { ContextualAIChat } from "@/components/contextual-ai-chat"
import { AIInsightTooltip } from "@/components/ai-insight-tooltip"
import { AIAnalysisReport } from "@/components/ai-analysis-report"

// Mock data - in real app this would come from API based on area param
const areaData = {
  seguranca: {
    name: "Segurança Pública",
    icon: Shield,
    color: "#ef4444",
    performance: 85,
    monthlyData: [
      { month: "Jan", ocorrencias: 2650, crimes: 1200, acidentes: 450 },
      { month: "Fev", ocorrencias: 2580, crimes: 1150, acidentes: 430 },
      { month: "Mar", ocorrencias: 2720, crimes: 1280, acidentes: 440 },
      { month: "Abr", ocorrencias: 2650, crimes: 1220, acidentes: 430 },
      { month: "Mai", ocorrencias: 2847, crimes: 1350, acidentes: 497 },
    ],
    kpis: [
      { label: "Ocorrências/mês", value: "2.847", change: "+7.4%", trend: "up" },
      { label: "Tempo Resposta", value: "8.2 min", change: "-12%", trend: "down" },
      { label: "Satisfação", value: "78%", change: "+3%", trend: "up" },
      { label: "Efetivos", value: "45.2K", change: "+2.1%", trend: "up" },
    ],
    alerts: [
      { message: "Aumento de 15% em furtos na Zona Leste", severity: "high", time: "2h" },
      { message: "Redução no tempo de resposta em 12%", severity: "low", time: "1d" },
    ],
    regions: [
      { name: "Centro", value: 15, incidents: 425 },
      { name: "Zona Norte", value: 25, incidents: 712 },
      { name: "Zona Sul", value: 20, incidents: 569 },
      { name: "Zona Leste", value: 30, incidents: 854 },
      { name: "Zona Oeste", value: 10, incidents: 287 },
    ],
  },
}

export default async function AreaDashboard({ params }: { params: { area: string } }) {
  const area = areaData.seguranca // In real app, would select based on params.area
  const Icon = area.icon
  // Example stats from DB for demonstration; map to area KPIs as needed
  const alertsStats = await getIndicatorStats(1002, "MUN", "São Paulo")
  const effStats = await getIndicatorStats(1003, "MUN", "São Paulo")

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-card">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/areas">
                <Button variant="outline" size="sm">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Voltar
                </Button>
              </Link>
              <div className="flex items-center gap-3">
                <Icon className="h-8 w-8" style={{ color: area.color }} />
                <div>
                  <h1 className="text-3xl font-bold text-foreground">{area.name}</h1>
                  <p className="text-muted-foreground">Dashboard detalhado e análises</p>
                </div>
              </div>
            </div>
            <div className="flex gap-2">
              <Link href={`/areas/${params.area}/config`}>
                <Button variant="outline">Configurações</Button>
              </Link>
              <Button>Relatório</Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-6">
        {/* Alerts */}
        {area.alerts.length > 0 && (
          <div className="mb-6">
            <h2 className="text-lg font-semibold mb-3 flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-orange-500" />
              Alertas Recentes
              <AIInsightTooltip
                title="Alertas Recentes"
                insight="Os alertas mostram tendências críticas que requerem atenção imediata. O aumento de furtos na Zona Leste indica necessidade de reforço policial, enquanto a melhoria no tempo de resposta demonstra eficácia das medidas implementadas."
                recommendation="Priorize o reforço na Zona Leste e mantenha as práticas que reduziram o tempo de resposta."
              />
            </h2>
            <div className="grid gap-3">
              {area.alerts.map((alert, index) => (
                <Alert
                  key={index}
                  className={`${alert.severity === "high" ? "border-red-500 bg-red-50 dark:bg-red-950" : "border-green-500 bg-green-50 dark:bg-green-950"} relative`}
                >
                  <AlertDescription className="flex items-center justify-between">
                    <span>{alert.message}</span>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-muted-foreground">{alert.time}</span>
                      <AIInsightTooltip
                        title={`Alerta: ${alert.message}`}
                        insight={
                          alert.severity === "high"
                            ? "Este aumento pode estar relacionado a fatores sazonais, eventos locais ou mudanças socioeconômicas na região."
                            : "Esta melhoria indica que as medidas implementadas estão funcionando efetivamente."
                        }
                        recommendation={
                          alert.severity === "high"
                            ? "Implementar patrulhamento adicional e análise de hotspots criminais."
                            : "Manter e expandir as práticas que levaram a esta melhoria."
                        }
                      />
                    </div>
                  </AlertDescription>
                </Alert>
              ))}
            </div>
          </div>
        )}

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList>
            <TabsTrigger value="overview">Visão Geral</TabsTrigger>
            <TabsTrigger value="analytics">Análises</TabsTrigger>
            <TabsTrigger value="regions">Por Região</TabsTrigger>
            <TabsTrigger value="actions">Ações</TabsTrigger>
            <TabsTrigger value="analysis">Análise IA</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* KPIs */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[{ label: "Alertas Ativos", value: String(alertsStats.latest ?? area.kpis[2].value), change: alertsStats.change ? `${(alertsStats.change*100).toFixed(1)}%` : area.kpis[2].change, trend: alertsStats.change && alertsStats.change>0 ? "up" : "down" }, { label: "Eficiência", value: `${Math.round((effStats.latest ?? 0.87)*100)}%`, change: effStats.change ? `${(effStats.change*100).toFixed(1)}%` : area.kpis[3].change, trend: effStats.change && effStats.change>0 ? "up" : "down" }, ...area.kpis.filter((_,i)=> i<2)].map((kpi, index) => (
                <Card key={index} className="relative">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium flex items-center gap-2">
                      {kpi.label}
                      <AIInsightTooltip
                        title={kpi.label}
                        insight={
                          kpi.label === "Ocorrências/mês"
                            ? "O aumento nas ocorrências pode indicar maior conscientização da população para reportar crimes ou real crescimento da criminalidade."
                            : kpi.label === "Tempo Resposta"
                              ? "A redução no tempo de resposta demonstra melhoria na eficiência operacional e posicionamento estratégico das equipes."
                              : kpi.label === "Satisfação"
                                ? "O aumento na satisfação reflete melhor atendimento e resolução mais eficaz dos casos."
                                : "O crescimento do efetivo permite melhor cobertura territorial e resposta mais rápida."
                        }
                        recommendation={
                          kpi.trend === "up" && kpi.label === "Ocorrências/mês"
                            ? "Investigar causas do aumento e implementar medidas preventivas específicas."
                            : kpi.trend === "down" && kpi.label === "Tempo Resposta"
                              ? "Manter as práticas que levaram à melhoria e considerar expansão para outras regiões."
                              : "Continuar monitorando e mantendo as boas práticas implementadas."
                        }
                      />
                    </CardTitle>
                    {kpi.trend === "up" ? (
                      <TrendingUp className="h-4 w-4 text-green-500" />
                    ) : (
                      <TrendingDown className="h-4 w-4 text-red-500" />
                    )}
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{kpi.value}</div>
                    <p className={`text-xs ${kpi.trend === "up" ? "text-green-600" : "text-red-600"}`}>
                      {kpi.change} vs mês anterior
                    </p>
                  </CardContent>
                </Card>
              ))}
          </div>

          {/* Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    Evolução Mensal
                    <AIInsightTooltip
                      title="Evolução Mensal"
                      insight="O gráfico mostra tendência de crescimento nas ocorrências, especialmente em maio. Isso pode estar relacionado a fatores sazonais, eventos específicos ou mudanças no comportamento de denúncias."
                      recommendation="Analisar os fatores que contribuíram para o pico de maio e implementar medidas preventivas para os próximos meses."
                    />
                  </CardTitle>
                  <CardDescription>Principais indicadores nos últimos 5 meses</CardDescription>
                </CardHeader>
                <CardContent>
                  <ChartContainer
                    config={{
                      ocorrencias: { label: "Ocorrências", color: "hsl(var(--chart-1))" },
                      crimes: { label: "Crimes", color: "hsl(var(--chart-2))" },
                    }}
                    className="h-[300px]"
                  >
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={area.monthlyData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis />
                        <ChartTooltip content={<ChartTooltipContent />} />
                        <Line type="monotone" dataKey="ocorrencias" stroke="var(--color-chart-1)" strokeWidth={2} />
                        <Line type="monotone" dataKey="crimes" stroke="var(--color-chart-2)" strokeWidth={2} />
                      </LineChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    Distribuição por Região
                    <AIInsightTooltip
                      title="Distribuição por Região"
                      insight="A Zona Leste concentra 30% dos incidentes, seguida pela Zona Norte (25%). Esta distribuição pode refletir densidade populacional, características socioeconômicas e infraestrutura de segurança."
                      recommendation="Priorizar investimentos em segurança na Zona Leste e Norte, considerando aumento de efetivo e melhorias na infraestrutura."
                    />
                  </CardTitle>
                  <CardDescription>Incidentes por zona da cidade</CardDescription>
                </CardHeader>
                <CardContent>
                  <ChartContainer
                    config={{
                      incidents: { label: "Incidentes", color: "hsl(var(--chart-3))" },
                    }}
                    className="h-[300px]"
                  >
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={area.regions}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <ChartTooltip content={<ChartTooltipContent />} />
                        <Bar dataKey="incidents" fill="var(--color-chart-3)" />
                      </BarChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </CardContent>
              </Card>
          </div>

          {/* Forecast using real ObservaSampa indicator (ex.: 215 Taxa de desemprego) */}
          <ForecastChart indicatorId={215} nivel="MUN" regiao="São Paulo" title="Previsão de Indicador da Área" />
        </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Análises Avançadas</CardTitle>
                <CardDescription>Insights gerados pela IA</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 bg-blue-50 dark:bg-blue-950 rounded-lg">
                    <h4 className="font-medium text-blue-900 dark:text-blue-100">Padrão Identificado</h4>
                    <p className="text-sm text-blue-700 dark:text-blue-300 mt-1">
                      Aumento de 23% em furtos durante eventos esportivos nos finais de semana
                    </p>
                  </div>
                  <div className="p-4 bg-green-50 dark:bg-green-950 rounded-lg">
                    <h4 className="font-medium text-green-900 dark:text-green-100">Recomendação</h4>
                    <p className="text-sm text-green-700 dark:text-green-300 mt-1">
                      Aumentar patrulhamento em 15% nas proximidades de estádios durante jogos
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="regions" className="space-y-6">
            <div className="grid gap-4">
              {area.regions.map((region, index) => (
                <Card key={index}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="flex items-center gap-2">
                          <MapPin className="h-5 w-5" />
                          {region.name}
                          <AIInsightTooltip
                            title={`Região: ${region.name}`}
                            insight={
                              region.name === "Zona Leste"
                                ? "Região com maior concentração de incidentes devido à alta densidade populacional e características socioeconômicas específicas."
                                : region.name === "Zona Oeste"
                                  ? "Região com menor incidência, possivelmente devido à melhor infraestrutura e características socioeconômicas."
                                  : `Região com ${region.value}% dos incidentes, refletindo características específicas da área.`
                            }
                            recommendation={
                              region.value > 25
                                ? "Implementar medidas de reforço imediato com foco em prevenção e patrulhamento."
                                : region.value < 15
                                  ? "Manter as boas práticas e usar como modelo para outras regiões."
                                  : "Monitorar tendências e implementar medidas preventivas conforme necessário."
                            }
                          />
                        </CardTitle>
                        <CardDescription>{region.incidents} incidentes no mês</CardDescription>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold">{region.value}%</div>
                        <div className="text-sm text-muted-foreground">do total</div>
                      </div>
                    </div>
                  </CardHeader>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="actions" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  Ações Sugeridas pela IA
                  <AIInsightTooltip
                    title="Ações Sugeridas pela IA"
                    insight="As ações são baseadas em análise preditiva dos dados históricos e padrões identificados. Priorizam áreas críticas e medidas com maior potencial de impacto positivo."
                    recommendation="Implementar as ações em ordem de prioridade, monitorando resultados para ajustes futuros."
                  />
                </CardTitle>
                <CardDescription>Medidas recomendadas baseadas nos dados</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-start gap-4 p-4 border rounded-lg">
                    <Target className="h-5 w-5 text-orange-500 mt-1" />
                    <div className="flex-1">
                      <h4 className="font-medium">Reforço na Zona Leste</h4>
                      <p className="text-sm text-muted-foreground mt-1">
                        Implementar 3 novas bases móveis na região com maior incidência
                      </p>
                      <div className="flex gap-2 mt-3">
                        <Button size="sm">Aprovar</Button>
                        <Button variant="outline" size="sm">
                          Revisar
                        </Button>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-start gap-4 p-4 border rounded-lg">
                    <Target className="h-5 w-5 text-blue-500 mt-1" />
                    <div className="flex-1">
                      <h4 className="font-medium">Programa de Prevenção</h4>
                      <p className="text-sm text-muted-foreground mt-1">
                        Expandir programa educativo em escolas das regiões críticas
                      </p>
                      <div className="flex gap-2 mt-3">
                        <Button size="sm">Aprovar</Button>
                        <Button variant="outline" size="sm">
                          Revisar
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analysis" className="space-y-6">
            <AIAnalysisReport
              context={{
                type: "area",
                name: area.name,
                data: {
                  performance: area.performance,
                  kpis: area.kpis,
                  alerts: area.alerts,
                  regions: area.regions,
                },
              }}
            />
          </TabsContent>
        </Tabs>
      </div>

      {/* Contextual AI Chat */}
      <ContextualAIChat
        context={{
          type: "area",
          name: area.name,
          data: {
            performance: area.performance,
            kpis: area.kpis,
            alerts: area.alerts,
            regions: area.regions,
          },
        }}
      />
    </div>
  )
}
