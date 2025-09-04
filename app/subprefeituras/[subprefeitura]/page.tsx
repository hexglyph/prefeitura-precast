import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { XAxis, YAxis, CartesianGrid, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
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
import { ContextualAIChat } from "@/components/contextual-ai-chat"
import { AIInsightTooltip } from "@/components/ai-insight-tooltip"
import { AIAnalysisReport } from "@/components/ai-analysis-report"

// Mock data - in real app this would come from API based on subprefeitura param
const subprefeiturasData = {
  centro: {
    name: "Centro",
    population: 523000,
    area: "26.2 km²",
    density: "19,962 hab/km²",
    performance: 88,
    districts: ["Sé", "República", "Santa Cecília", "Consolação", "Bela Vista", "Liberdade", "Cambuci", "Bom Retiro"],
    monthlyData: [
      { month: "Jan", populacao: 520000, economia: 95, seguranca: 90 },
      { month: "Fev", populacao: 521000, economia: 94, seguranca: 91 },
      { month: "Mar", populacao: 522000, economia: 96, seguranca: 92 },
      { month: "Abr", populacao: 522500, economia: 97, seguranca: 91 },
      { month: "Mai", populacao: 523000, economia: 96, seguranca: 92 },
    ],
    areaMetrics: [
      { area: "Segurança", value: 92, incidents: 145, target: 90 },
      { area: "Educação", value: 95, schools: 89, target: 90 },
      { area: "Saúde", value: 89, units: 34, target: 85 },
      { area: "Transporte", value: 85, lines: 12, target: 80 },
      { area: "Limpeza", value: 94, coverage: 98, target: 95 },
      { area: "Economia", value: 96, businesses: 15420, target: 85 },
    ],
    alerts: [
      { message: "Aumento de fluxo turístico no centro histórico", severity: "medium", area: "Turismo", time: "3h" },
      { message: "Manutenção programada na Estação Sé", severity: "low", area: "Transporte", time: "1d" },
    ],
    services: [
      { name: "UBS Centro", type: "Saúde", address: "Rua da Consolação, 123", status: "Funcionando" },
      { name: "EMEF República", type: "Educação", address: "Praça da República, 456", status: "Funcionando" },
      { name: "Base Comunitária Sé", type: "Segurança", address: "Largo da Sé, 789", status: "Funcionando" },
      { name: "Terminal Bandeira", type: "Transporte", address: "Rua do Anhangabaú, 321", status: "Funcionando" },
    ],
    demographics: [
      { category: "0-17 anos", value: 15, population: 78450 },
      { category: "18-34 anos", value: 28, population: 146440 },
      { category: "35-54 anos", value: 32, population: 167360 },
      { category: "55+ anos", value: 25, population: 130750 },
    ],
  },
}

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884D8"]

export default function SubprefeituraDashboard({ params }: { params: { subprefeitura: string } }) {
  const sub = subprefeiturasData.centro // In real app, would select based on params.subprefeitura

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
                  <h1 className="text-3xl font-bold text-foreground">Subprefeitura {sub.name}</h1>
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
        {sub.alerts.length > 0 && (
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
              {sub.alerts.map((alert, index) => (
                <Alert
                  key={index}
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
                      <span className="font-medium">{alert.area}:</span> {alert.message}
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-muted-foreground">{alert.time}</span>
                      <AIInsightTooltip
                        title={`${alert.area}: ${alert.message}`}
                        insight={
                          alert.area === "Turismo"
                            ? "O aumento do fluxo turístico pode sobrecarregar transporte público e gerar mais demanda por serviços de limpeza e segurança."
                            : "Manutenções programadas são essenciais para manter a qualidade do serviço, mas podem causar transtornos temporários."
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
                      insight="A população de 523.000 habitantes representa alta densidade urbana, típica do centro da cidade. Isso demanda infraestrutura robusta e serviços públicos eficientes."
                      recommendation="Monitorar crescimento populacional e adequar capacidade de serviços públicos conforme demanda."
                    />
                  </CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{sub.population.toLocaleString("pt-BR")}</div>
                  <p className="text-xs text-muted-foreground">habitantes</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium flex items-center gap-2">
                    Área
                    <AIInsightTooltip
                      title="Área Territorial"
                      insight="Com 26.2 km², a região central é compacta mas estratégica, concentrando atividades comerciais, culturais e administrativas da cidade."
                      recommendation="Otimizar uso do solo urbano priorizando transporte público e espaços verdes."
                    />
                  </CardTitle>
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{sub.area}</div>
                  <p className="text-xs text-muted-foreground">território</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium flex items-center gap-2">
                    Densidade
                    <AIInsightTooltip
                      title="Densidade Demográfica"
                      insight="19.962 hab/km² é uma densidade muito alta, indicando intensa urbanização. Isso pode gerar pressão sobre infraestrutura e serviços públicos."
                      recommendation="Implementar soluções de mobilidade urbana e descentralizar alguns serviços para reduzir sobrecarga."
                    />
                  </CardTitle>
                  <Building className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{sub.density}</div>
                  <p className="text-xs text-muted-foreground">demográfica</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium flex items-center gap-2">
                    Performance
                    <AIInsightTooltip
                      title="Performance Geral"
                      insight="88% de performance indica boa gestão regional, com melhoria de 2% no último mês. Isso reflete eficiência na prestação de serviços públicos."
                      recommendation="Manter as boas práticas que levaram à melhoria e identificar áreas com potencial de crescimento."
                    />
                  </CardTitle>
                  <TrendingUp className="h-4 w-4 text-green-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{sub.performance}%</div>
                  <p className="text-xs text-green-600">+2% vs mês anterior</p>
                </CardContent>
              </Card>
            </div>

            {/* Charts */}
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
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={sub.monthlyData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis />
                        <ChartTooltip content={<ChartTooltipContent />} />
                        <Line type="monotone" dataKey="economia" stroke="var(--color-chart-1)" strokeWidth={2} />
                        <Line type="monotone" dataKey="seguranca" stroke="var(--color-chart-2)" strokeWidth={2} />
                      </LineChart>
                    </ResponsiveContainer>
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
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={sub.demographics}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          label={({ category, value }) => `${category}: ${value}%`}
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="value"
                        >
                          {sub.demographics.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <ChartTooltip content={<ChartTooltipContent />} />
                      </PieChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="areas" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {sub.areaMetrics.map((area, index) => {
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
                  <Card key={index}>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-lg flex items-center gap-2">
                        <Icon className="h-5 w-5" />
                        {area.area}
                        <AIInsightTooltip
                          title={`Área: ${area.area}`}
                          insight={
                            area.area === "Economia"
                              ? "96% de performance com 15.420 empresas ativas demonstra forte atividade econômica na região central."
                              : area.area === "Educação"
                                ? "95% de performance com 89 escolas indica boa cobertura educacional na região."
                                : area.area === "Limpeza"
                                  ? "94% de performance com 98% de cobertura mostra eficiência na limpeza urbana."
                                  : area.area === "Segurança"
                                    ? "92% de performance com 145 incidentes mensais requer atenção contínua."
                                    : area.area === "Saúde"
                                      ? "89% de performance com 34 unidades pode necessitar expansão da rede."
                                      : "85% de performance com 12 linhas de transporte atende bem a região central."
                          }
                          recommendation={
                            area.value >= area.target
                              ? "Manter as boas práticas e considerar expansão dos serviços."
                              : area.area === "Transporte"
                                ? "Avaliar necessidade de novas linhas ou aumento de frequência."
                                : "Implementar melhorias para atingir a meta estabelecida."
                          }
                        />
                      </CardTitle>
                      <Badge variant={area.value >= area.target ? "default" : "destructive"}>
                        {area.value >= area.target ? "Meta atingida" : "Abaixo da meta"}
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
                          <div className="flex justify-between text-xs text-muted-foreground mt-1">
                            <span>Meta: {area.target}%</span>
                            <span>
                              {area.value >= area.target
                                ? `+${area.value - area.target}%`
                                : `${area.value - area.target}%`}
                            </span>
                          </div>
                        </div>

                        <div className="text-sm">
                          {area.area === "Segurança" && <span>Incidentes: {area.incidents}</span>}
                          {area.area === "Educação" && <span>Escolas: {area.schools}</span>}
                          {area.area === "Saúde" && <span>Unidades: {area.units}</span>}
                          {area.area === "Transporte" && <span>Linhas: {area.lines}</span>}
                          {area.area === "Limpeza" && <span>Cobertura: {area.coverage}%</span>}
                          {area.area === "Economia" && <span>Empresas: {area.businesses}</span>}
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
                    insight="A subprefeitura Centro abrange 8 distritos históricos e estratégicos, cada um com características específicas que demandam abordagens diferenciadas de gestão."
                    recommendation="Desenvolver estratégias específicas para cada distrito considerando suas particularidades históricas e socioeconômicas."
                  />
                </CardTitle>
                <CardDescription>Divisão administrativa regional</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {sub.districts.map((district, index) => (
                    <div
                      key={index}
                      className="p-4 border rounded-lg text-center hover:bg-muted transition-colors cursor-pointer relative"
                    >
                      <h4 className="font-medium">{district}</h4>
                      <p className="text-sm text-muted-foreground mt-1">Distrito</p>
                      <div className="absolute top-2 right-2">
                        <AIInsightTooltip
                          title={`Distrito: ${district}`}
                          insight={
                            district === "Sé"
                              ? "Centro histórico e administrativo da cidade, com alta concentração de órgãos públicos e pontos turísticos."
                              : district === "República"
                                ? "Região cultural e comercial, com teatros, cinemas e comércio popular."
                                : district === "Liberdade"
                                  ? "Bairro oriental com forte identidade cultural e turismo gastronômico."
                                  : `Distrito ${district} com características específicas que contribuem para a diversidade da região central.`
                          }
                          recommendation={
                            district === "Sé"
                              ? "Manter infraestrutura para turismo e facilitar acesso aos serviços públicos."
                              : district === "República"
                                ? "Apoiar atividades culturais e revitalização do comércio local."
                                : "Preservar identidade local e promover desenvolvimento sustentável."
                          }
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
              {sub.services.map((service, index) => (
                <Card key={index}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="text-lg flex items-center gap-2">
                          {service.name}
                          <AIInsightTooltip
                            title={`Serviço: ${service.name}`}
                            insight={
                              service.type === "Saúde"
                                ? "UBS estratégica no centro, atendendo alta demanda populacional e turística da região."
                                : service.type === "Educação"
                                  ? "Escola municipal em localização privilegiada, servindo comunidade local e adjacente."
                                  : service.type === "Segurança"
                                    ? "Base comunitária essencial para segurança do centro histórico e comercial."
                                    : "Terminal de transporte crucial para mobilidade urbana na região central."
                            }
                            recommendation={
                              service.status === "Funcionando"
                                ? "Manter qualidade do serviço e monitorar capacidade de atendimento."
                                : "Implementar ações corretivas imediatas para restabelecer funcionamento."
                            }
                          />
                        </CardTitle>
                        <CardDescription>{service.address}</CardDescription>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant={service.status === "Funcionando" ? "default" : "destructive"}>
                          {service.status}
                        </Badge>
                        <Badge variant="outline">{service.type}</Badge>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        <MapPin className="h-4 w-4 mr-2" />
                        Localizar
                      </Button>
                      <Button variant="outline" size="sm">
                        <Phone className="h-4 w-4 mr-2" />
                        Contato
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="demographics" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    Distribuição por Idade
                    <AIInsightTooltip
                      title="Distribuição por Idade"
                      insight="A distribuição etária mostra população predominantemente adulta e economicamente ativa, com significativa parcela de idosos (25%)."
                      recommendation="Desenvolver programas específicos para idosos e manter serviços adequados para população economicamente ativa."
                    />
                  </CardTitle>
                  <CardDescription>População por faixa etária</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {sub.demographics.map((demo, index) => (
                      <div key={index} className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium">{demo.category}</span>
                          <span className="text-sm">
                            {demo.population.toLocaleString("pt-BR")} ({demo.value}%)
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
                      insight="IDH de 0.892 indica alto desenvolvimento humano. Renda média de R$ 4.850 e escolaridade de 12.3 anos demonstram bom nível socioeconômico da região."
                      recommendation="Manter políticas que sustentam os bons indicadores e trabalhar para reduzir desigualdades internas."
                    />
                  </CardTitle>
                  <CardDescription>Principais métricas demográficas</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">IDH:</span>
                      <span className="font-medium">0.892</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Renda Média:</span>
                      <span className="font-medium">R$ 4.850</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Escolaridade:</span>
                      <span className="font-medium">12.3 anos</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Expectativa de Vida:</span>
                      <span className="font-medium">78.2 anos</span>
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
                name: `Subprefeitura ${sub.name}`,
                data: {
                  population: sub.population,
                  area: sub.area,
                  density: sub.density,
                  performance: sub.performance,
                  districts: sub.districts,
                  areaMetrics: sub.areaMetrics,
                  alerts: sub.alerts,
                },
              }}
            />
          </TabsContent>
        </Tabs>

        {/* Contextual AI Chat */}
        <ContextualAIChat
          context={{
            type: "subprefeitura",
            name: `Subprefeitura ${sub.name}`,
            data: {
              population: sub.population,
              area: sub.area,
              density: sub.density,
              performance: sub.performance,
              districts: sub.districts,
              areaMetrics: sub.areaMetrics,
              alerts: sub.alerts,
            },
          }}
        />
      </div>
    </div>
  )
}
