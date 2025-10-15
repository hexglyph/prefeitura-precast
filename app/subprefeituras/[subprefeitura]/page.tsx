import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Alert, AlertDescription } from "@/components/ui/alert"
import {
  MapPin,
  ArrowLeft,
  Users,
  Building,
  Car,
  Shield,
  Heart,
  GraduationCap,
  Trash2,
  AlertTriangle,
  TrendingUp,
  Phone,
} from "lucide-react"
import Link from "next/link"
import { notFound } from "next/navigation"

import { getIndicatorStats, type IndicatorStats } from "@/lib/stats"
import { getSubprefeituraDetail } from "@/lib/subprefeituras"
import { ContextualAIChat } from "@/components/contextual-ai-chat"
import { AIInsightTooltip } from "@/components/ai-insight-tooltip"
import { AIAnalysisReport } from "@/components/ai-analysis-report"
import { ForecastChart } from "@/components/forecast-chart"
import { SubprefeituraCharts } from "@/components/subprefeitura-charts"

const NUMBER_FORMAT = new Intl.NumberFormat("pt-BR")

export default async function SubprefeituraDashboard({ params }: { params: { subprefeitura: string } }) {
  const detail = await getSubprefeituraDetail(params.subprefeitura)

  if (!detail) {
    notFound()
  }

  let effStats: IndicatorStats = { count: 0 }
  try {
    effStats = await getIndicatorStats(1003, "MUN", "São Paulo")
  } catch (error) {
    console.error("Falha ao carregar indicadores da subprefeitura", error)
  }

  const alerts = detail.alertsDetail
  const services = detail.services
  const demographics = detail.demographics
  const areaMetrics = detail.areaMetrics
  const monthlyData = detail.monthlyData
  const metadata = detail.metadata || {}

  const socioMetrics = {
    idh: metadata.idh ?? metadata.IDH ?? detail.metrics["idh"],
    rendaMedia: metadata.renda_media ?? metadata.rendaMedia ?? detail.metrics["renda_media"],
    escolaridade: metadata.escolaridade_media ?? metadata.escolaridadeMedia ?? detail.metrics["escolaridade_media"],
    expectativaVida: metadata.expectativa_vida ?? metadata.expectativaVida ?? detail.metrics["expectativa_vida"],
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-card">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/subprefeituras">
                <Button variant="outline" size="sm">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Voltar
                </Button>
              </Link>
              <div className="flex items-center gap-3">
                <MapPin className="h-8 w-8 text-blue-500" />
                <div>
                  <h1 className="text-3xl font-bold text-foreground">Subprefeitura {detail.name}</h1>
                  <p className="text-muted-foreground">Dashboard regional detalhado</p>
                </div>
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="outline">Contato</Button>
              <Button>Relatório</Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-6">
        {/* Alerts */}
        {alerts.length > 0 && (
          <div className="mb-6">
            <h2 className="text-lg font-semibold mb-3 flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-orange-500" />
              Alertas da Região
              <AIInsightTooltip
                title="Alertas da Região"
                insight="Os alertas regionais mostram eventos e situações específicas da subprefeitura que podem impactar serviços públicos e qualidade de vida dos cidadãos."
                recommendation="Monitorar impactos dos alertas e coordenar ações preventivas com as secretarias responsáveis."
              />
            </h2>
            <div className="grid gap-3">
              {alerts.map((alert, index) => (
                <Alert
                  key={`${alert.message}-${index}`}
                  className={`${
                    alert.severity === "high"
                      ? "border-red-500 bg-red-50 dark:bg-red-950"
                      : alert.severity === "medium"
                        ? "border-yellow-500 bg-yellow-50 dark:bg-yellow-950"
                        : "border-blue-500 bg-blue-50 dark:bg-blue-950"
                  } relative`}
                >
                  <AlertDescription className="flex items-center justify-between">
                    <div>
                      <span className="font-medium">{alert.area ?? "Geral"}:</span> {alert.message}
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-muted-foreground">{alert.time ?? "N/D"}</span>
                      <AIInsightTooltip
                        title={`${alert.area ?? "Alerta"}: ${alert.message}`}
                        insight={
                          alert.area === "Turismo"
                            ? "O aumento do fluxo turístico pode sobrecarregar transporte público e gerar mais demanda por serviços de limpeza e segurança."
                            : alert.area === "Transporte"
                              ? "Manutenções programadas são essenciais para manter a qualidade do serviço, mas podem causar transtornos temporários."
                              : "Monitore o impacto desse alerta e coordene ações com as equipes responsáveis."
                        }
                        recommendation={
                          alert.area === "Turismo"
                            ? "Reforçar equipes de limpeza e segurança nas áreas turísticas durante picos de visitação."
                            : "Comunicar amplamente sobre manutenções e oferecer rotas alternativas aos usuários."
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
            <TabsTrigger value="areas">Por Área</TabsTrigger>
            <TabsTrigger value="districts">Distritos</TabsTrigger>
            <TabsTrigger value="services">Serviços</TabsTrigger>
            <TabsTrigger value="demographics">Demografia</TabsTrigger>
            <TabsTrigger value="analysis">Análise IA</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* KPIs */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium flex items-center gap-2">
                    População
                    <AIInsightTooltip
                      title="População"
                      insight="A população reflete o contingente de habitantes atendidos pela subprefeitura e direciona a priorização de serviços."
                      recommendation="Monitorar crescimento populacional e adequar capacidade de serviços públicos conforme demanda."
                    />
                  </CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{NUMBER_FORMAT.format(detail.population)}</div>
                  <p className="text-xs text-muted-foreground">habitantes</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium flex items-center gap-2">
                    Área
                    <AIInsightTooltip
                      title="Área Territorial"
                      insight="A dimensão da área impacta os custos operacionais e a logística de prestação dos serviços públicos."
                      recommendation="Otimizar uso do solo urbano priorizando transporte público e espaços verdes."
                    />
                  </CardTitle>
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{detail.areaDisplay}</div>
                  <p className="text-xs text-muted-foreground">território</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium flex items-center gap-2">
                    Densidade
                    <AIInsightTooltip
                      title="Densidade Demográfica"
                      insight="A densidade indica pressão sobre infraestrutura e serviços. Valores altos demandam gestão integrada."
                      recommendation="Implementar soluções de mobilidade urbana e descentralizar serviços para reduzir sobrecarga."
                    />
                  </CardTitle>
                  <Building className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{detail.densityDisplay}</div>
                  <p className="text-xs text-muted-foreground">demográfica</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium flex items-center gap-2">
                    Performance
                    <AIInsightTooltip
                      title="Performance Geral"
                      insight="A performance consolida indicadores operacionais e satisfação do cidadão."
                      recommendation="Manter as boas práticas e identificar áreas com potencial de melhoria."
                    />
                  </CardTitle>
                  <TrendingUp className="h-4 w-4 text-green-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {effStats.latest !== undefined ? `${Math.round(effStats.latest * 100)}%` : `${detail.performance}%`}
                  </div>
                  <p className="text-xs text-green-600">
                    {effStats.change !== undefined ? `${(effStats.change * 100).toFixed(1)}% vs mês anterior` : "+2% vs mês anterior"}
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Forecast */}
            <ForecastChart indicatorId={215} nivel="MUN" regiao="São Paulo" title="Previsão Municipal" />

            {/* Charts */}
            <SubprefeituraCharts monthlyData={monthlyData} demographics={demographics} />
          </TabsContent>

          <TabsContent value="areas" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {areaMetrics.map((area, index) => {
                const icons = {
                  Segurança: Shield,
                  Educação: GraduationCap,
                  Saúde: Heart,
                  Transporte: Car,
                  Limpeza: Trash2,
                  Economia: Building,
                }
                const Icon = icons[area.area as keyof typeof icons] || Building

                return (
                  <Card key={`${area.area}-${index}`}>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-lg flex items-center gap-2">
                        <Icon className="h-5 w-5" />
                        {area.area}
                        <AIInsightTooltip
                          title={`Área: ${area.area}`}
                          insight={
                            area.area === "Economia"
                              ? "Indicadores econômicos fortes demonstram dinamismo e arrecadação tributária elevada."
                              : area.area === "Educação"
                                ? "Cobertura educacional ampla indica investimentos consistentes e boa rede escolar."
                                : area.area === "Limpeza"
                                  ? "Cobertura de limpeza adequada reflete boa gestão operacional e contratos eficientes."
                                  : area.area === "Segurança"
                                    ? "Monitorar número de ocorrências para ajustar operações integradas com a segurança pública estadual."
                                    : area.area === "Saúde"
                                      ? "Avaliar ocupação das unidades e demanda reprimida para expansão de serviços."
                                      : "Avaliar o transporte coletivo e vias para manter níveis de serviço adequados."
                          }
                          recommendation={
                            area.target !== null && area.value >= area.target
                              ? "Manter as boas práticas e considerar expansão dos serviços."
                              : "Implementar plano de ação específico para atingir as metas."
                          }
                        />
                      </CardTitle>
                      <Badge variant={area.target !== null && area.value >= area.target ? "default" : "destructive"}>
                        {area.target !== null && area.value >= area.target ? "Meta atingida" : "Abaixo da meta"}
                      </Badge>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div>
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-sm">Performance</span>
                            <span className="text-lg font-bold">{area.value}%</span>
                          </div>
                          <Progress value={area.value} className="h-2" />
                          {area.target !== null && (
                            <div className="flex justify-between text-xs text-muted-foreground mt-1">
                              <span>Meta: {area.target}%</span>
                              <span>
                                {area.target !== null && area.value >= area.target
                                  ? `+${area.value - area.target}%`
                                  : area.target !== null
                                    ? `${area.value - area.target}%`
                                    : ""}
                              </span>
                            </div>
                          )}
                        </div>

                        <div className="text-sm">
                          {"incidents" in area && area.incidents !== undefined && <span>Incidentes: {NUMBER_FORMAT.format(area.incidents)}</span>}
                          {"schools" in area && area.schools !== undefined && <span>Escolas: {NUMBER_FORMAT.format(area.schools)}</span>}
                          {"units" in area && area.units !== undefined && <span>Unidades: {NUMBER_FORMAT.format(area.units)}</span>}
                          {"lines" in area && area.lines !== undefined && <span>Linhas: {NUMBER_FORMAT.format(area.lines)}</span>}
                          {"coverage" in area && area.coverage !== undefined && <span>Cobertura: {area.coverage}%</span>}
                          {"businesses" in area && area.businesses !== undefined && (
                            <span>Empresas: {NUMBER_FORMAT.format(area.businesses)}</span>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </TabsContent>

          <TabsContent value="districts" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  Distritos da Subprefeitura
                  <AIInsightTooltip
                    title="Distritos da Subprefeitura"
                    insight="Cada distrito possui características específicas que demandam políticas públicas direcionadas."
                    recommendation="Desenvolver estratégias específicas considerando perfis socioeconômicos e necessidades locais."
                  />
                </CardTitle>
                <CardDescription>Divisão administrativa regional</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {detail.districts.map((district, index) => (
                    <div
                      key={`${district}-${index}`}
                      className="p-4 border rounded-lg text-center hover:bg-muted transition-colors cursor-pointer relative"
                    >
                      <h4 className="font-medium">{district}</h4>
                      <p className="text-sm text-muted-foreground mt-1">Distrito</p>
                      <div className="absolute top-2 right-2">
                        <AIInsightTooltip
                          title={`Distrito: ${district}`}
                          insight="Considere indicadores socioeconômicos específicos para planejar ações."
                          recommendation="Elabore planos locais integrados com as secretarias setoriais."
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="services" className="space-y-6">
            <div className="grid gap-4">
              {services.map((service, index) => (
                <Card key={`${service.name}-${index}`}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="text-lg flex items-center gap-2">
                          {service.name}
                          <AIInsightTooltip
                            title={`Serviço: ${service.name}`}
                            insight="Equipamento público essencial para atendimento da população."
                            recommendation="Monitore capacidade de atendimento e satisfação dos usuários."
                          />
                        </CardTitle>
                        <CardDescription>{service.address ?? "Endereço não informado"}</CardDescription>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant={service.status === "Funcionando" ? "default" : "destructive"}>
                          {service.status ?? "Status indefinido"}
                        </Badge>
                        <Button size="sm" variant="outline">
                          <Phone className="h-4 w-4" />
                          Contato
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-muted-foreground">
                          Tipo de serviço: <span className="font-medium">{service.type ?? "Não informado"}</span>
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">
                          Status atual: <span className="font-medium">{service.status ?? "Sem registro"}</span>
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
              {services.length === 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle>Nenhum serviço cadastrado</CardTitle>
                    <CardDescription>Cadastre equipamentos públicos para acompanhar a oferta de serviços na região.</CardDescription>
                  </CardHeader>
                </Card>
              )}
            </div>
          </TabsContent>

          <TabsContent value="demographics" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Distribuição Demográfica</CardTitle>
                  <CardDescription>População por faixa etária</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {demographics.map((demo, index) => (
                      <div key={`${demo.category}-${index}`} className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium">{demo.category}</span>
                          <span className="text-sm">
                            {demo.population !== null ? NUMBER_FORMAT.format(demo.population) : "N/D"} ({demo.value}%)
                          </span>
                        </div>
                        <Progress value={demo.value} className="h-2" />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    Indicadores Sociais
                    <AIInsightTooltip
                      title="Indicadores Sociais"
                      insight="Indicadores socioeconômicos ajudam a direcionar políticas públicas e investimentos."
                      recommendation="Monitore evolução dos indicadores e compare com médias municipais."
                    />
                  </CardTitle>
                  <CardDescription>Principais métricas demográficas</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">IDH:</span>
                      <span className="font-medium">
                        {socioMetrics.idh !== undefined && socioMetrics.idh !== null
                          ? Number(socioMetrics.idh).toFixed(3)
                          : "N/D"}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Renda Média:</span>
                      <span className="font-medium">
                        {socioMetrics.rendaMedia !== undefined && socioMetrics.rendaMedia !== null
                          ? `R$ ${NUMBER_FORMAT.format(Number(socioMetrics.rendaMedia))}`
                          : "N/D"}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Escolaridade:</span>
                      <span className="font-medium">
                        {socioMetrics.escolaridade !== undefined && socioMetrics.escolaridade !== null
                          ? `${Number(socioMetrics.escolaridade).toFixed(1)} anos`
                          : "N/D"}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Expectativa de Vida:</span>
                      <span className="font-medium">
                        {socioMetrics.expectativaVida !== undefined && socioMetrics.expectativaVida !== null
                          ? `${Number(socioMetrics.expectativaVida).toFixed(1)} anos`
                          : "N/D"}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="analysis" className="space-y-6">
            <AIAnalysisReport
              context={{
                type: "subprefeitura",
                name: `Subprefeitura ${detail.name}`,
                data: {
                  population: detail.population,
                  area: detail.areaDisplay,
                  density: detail.densityDisplay,
                  performance: detail.performance,
                  districts: detail.districts,
                  areaMetrics: areaMetrics,
                  alerts: alerts,
                },
              }}
            />
          </TabsContent>
        </Tabs>

        {/* Contextual AI Chat */}
        <ContextualAIChat
          context={{
            type: "subprefeitura",
            name: `Subprefeitura ${detail.name}`,
            data: {
              population: detail.population,
              area: detail.areaDisplay,
              density: detail.densityDisplay,
              performance: detail.performance,
              districts: detail.districts,
              areaMetrics: areaMetrics,
              alerts: alerts,
            },
          }}
        />
      </div>
    </div>
  )
}
