import { CardContent } from "@/components/ui/card"
import { CardDescription } from "@/components/ui/card"
import { CardTitle } from "@/components/ui/card"
import { CardHeader } from "@/components/ui/card"
import { Card } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { ContextualAIChat } from "@/components/contextual-ai-chat"
import { AIInsightTooltip } from "@/components/ai-insight-tooltip"
import { query } from "@/lib/db"
import { AIAnalysisReport } from "@/components/ai-analysis-report"

import {
  Calendar,
  Sun,
  AlertTriangle,
  TrendingUp,
  Users,
  MapPin,
  Activity,
  Shield,
  GraduationCap,
  Heart,
  Car,
  Leaf,
  Zap,
} from "lucide-react"

const alerts = [
  {
    id: 1,
    area: "Segurança",
    message: "Aumento de 15% nos crimes contra patrimônio na Zona Sul",
    severity: "high",
    time: "2h atrás",
  },
  {
    id: 2,
    area: "Trânsito",
    message: "Congestionamento 23% acima da média na Marginal Tietê",
    severity: "medium",
    time: "30min atrás",
  },
  {
    id: 3,
    area: "Saúde",
    message: "Ocupação de UTIs em 78% - dentro da normalidade",
    severity: "low",
    time: "1h atrás",
  },
]

export default async function Dashboard() {
  // Example: compute KPIs from DB if available; fallback to mock
  // Read live KPIs from DB seed (fallback to defaults)
  const kpis = { population: 12_400_000, qualityIndex: 8.2, alertsActive: 12, efficiency: 0.87 }
  try {
    const latest = async (id: number) =>
      (
        await query<{ value_num: string }>(
          `SELECT value_num::text FROM indicator_results WHERE indicator_id=$1 AND nivel='MUN' AND regiao_name='São Paulo' ORDER BY periodo DESC LIMIT 1`,
          [id]
        )
      ).rows?.[0]?.value_num
    const pop = Number((await latest(1000)) || 12.4) * 1_000_000
    const idx = Number((await latest(1001)) || 8.2)
    const alr = Number((await latest(1002)) || 12)
    const eff = Number((await latest(1003)) || 0.87)
    kpis.population = isNaN(pop) ? kpis.population : pop
    kpis.qualityIndex = isNaN(idx) ? kpis.qualityIndex : idx
    kpis.alertsActive = isNaN(alr) ? kpis.alertsActive : alr
    kpis.efficiency = isNaN(eff) ? kpis.efficiency : eff
  } catch {}
  return (
    <div className="min-h-screen bg-background">
      <header className="bg-primary border-b shadow-sm">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <img
                src="/images/brasao-sp.png"
                alt="Brasão da Prefeitura de São Paulo"
                className="h-12 w-12 object-contain"
              />
              <div>
                <h1 className="text-2xl font-semibold text-primary-foreground">Prefeitura Precast</h1>
                <p className="text-sm text-primary-foreground/80">Sistema Inteligente de Gestão Municipal</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 text-sm text-primary-foreground/90 bg-primary-foreground/10 px-3 py-2 rounded-lg">
                <Sun className="h-4 w-4" />
                <span>25°C</span>
              </div>
              <Badge variant="secondary" className="bg-green-100 text-green-800">
                <Zap className="h-3 w-3 mr-1" />
                IA Ativa
              </Badge>
              <nav className="flex gap-2">
                <Link href="/ai">
                  <Button size="sm" variant="secondary">
                    IA Precast
                  </Button>
                </Link>
                <Link href="/areas">
                  <Button size="sm" variant="ghost" className="text-primary-foreground hover:bg-primary-foreground/10">
                    Áreas
                  </Button>
                </Link>
                <Link href="/subprefeituras">
                  <Button size="sm" variant="ghost" className="text-primary-foreground hover:bg-primary-foreground/10">
                    Subprefeituras
                  </Button>
                </Link>
                <Link href="/eventos">
                  <Button size="sm" variant="ghost" className="text-primary-foreground hover:bg-primary-foreground/10">
                    Eventos
                  </Button>
                </Link>
                <Link href="/alertas">
                  <Button size="sm" variant="ghost" className="text-primary-foreground hover:bg-primary-foreground/10">
                    Alertas
                  </Button>
                </Link>
              </nav>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-8 space-y-8">
        <section>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-semibold text-foreground">Alertas em Tempo Real</h2>
            <Link href="/alertas">
              <Button variant="outline">Ver Todos</Button>
            </Link>
          </div>
          <div className="space-y-3">
            {alerts.map((alert) => (
              <Alert
                key={alert.id}
                className={`border-l-4 ${
                  alert.severity === "high"
                    ? "border-l-red-500 bg-red-50"
                    : alert.severity === "medium"
                      ? "border-l-orange-500 bg-orange-50"
                      : "border-l-green-500 bg-green-50"
                }`}
              >
                <AlertDescription className="flex items-center justify-between">
                  <div>
                    <span className="font-medium">{alert.area}:</span>
                    <span className="ml-2">{alert.message}</span>
                  </div>
                  <span className="text-xs text-muted-foreground">{alert.time}</span>
                </AlertDescription>
              </Alert>
            ))}
          </div>
        </section>

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="overview">Visão Geral</TabsTrigger>
            <TabsTrigger value="areas">Áreas</TabsTrigger>
            <TabsTrigger value="subprefeituras">Subprefeituras</TabsTrigger>
            <TabsTrigger value="events">Eventos</TabsTrigger>
            <TabsTrigger value="analysis">Análise IA</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4 text-muted-foreground" />
                      População
                    </div>
                    <AIInsightTooltip title="População" value="12.4M" context="geral" type="metric" />
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{(kpis.population / 1_000_000).toFixed(1)}M</div>
                  <p className="text-xs text-muted-foreground">+0.8% vs ano anterior</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Activity className="h-4 w-4 text-muted-foreground" />
                      Índice de Qualidade
                    </div>
                    <AIInsightTooltip title="Índice de Qualidade" value="8.2" context="geral" type="metric" />
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{kpis.qualityIndex}</div>
                  <p className="text-xs text-muted-foreground">+0.3 pontos este mês</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <AlertTriangle className="h-4 w-4 text-muted-foreground" />
                      Alertas Ativos
                    </div>
                    <AIInsightTooltip title="Alertas Ativos" value="12" context="geral" type="alert" />
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{kpis.alertsActive}</div>
                  <p className="text-xs text-muted-foreground">3 críticos, 9 médios</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <TrendingUp className="h-4 w-4 text-muted-foreground" />
                      Eficiência Geral
                    </div>
                    <AIInsightTooltip title="Eficiência Geral" value="87%" context="geral" type="metric" />
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{Math.round(kpis.efficiency * 100)}%</div>
                  <p className="text-xs text-muted-foreground">+2% vs mês anterior</p>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Indicadores por Área</CardTitle>
                <CardDescription>Performance das principais secretarias municipais</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { area: "Segurança", icon: Shield, score: 7.8, trend: "+0.2" },
                    { area: "Educação", icon: GraduationCap, score: 8.5, trend: "+0.1" },
                    { area: "Saúde", icon: Heart, score: 8.1, trend: "-0.1" },
                    { area: "Trânsito", icon: Car, score: 6.9, trend: "+0.3" },
                    { area: "Meio Ambiente", icon: Leaf, score: 8.3, trend: "+0.2" },
                  ].map((item) => (
                    <div key={item.area} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <item.icon className="h-5 w-5 text-muted-foreground" />
                        <span className="font-medium">{item.area}</span>
                        <AIInsightTooltip title={item.area} value={item.score} context="area" type="performance" />
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="text-right">
                          <div className="font-semibold">{item.score}</div>
                          <div className="text-xs text-muted-foreground">{item.trend}</div>
                        </div>
                        <div className="w-20 bg-secondary rounded-full h-2">
                          <div
                            className="bg-primary h-2 rounded-full transition-all"
                            style={{ width: `${(item.score / 10) * 100}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="areas" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { name: "Segurança", icon: Shield, alerts: 3, status: "Atenção" },
                { name: "Educação", icon: GraduationCap, alerts: 1, status: "Normal" },
                { name: "Saúde", icon: Heart, alerts: 2, status: "Normal" },
                { name: "Trânsito", icon: Car, alerts: 4, status: "Crítico" },
                { name: "Meio Ambiente", icon: Leaf, alerts: 0, status: "Excelente" },
                { name: "Moradia", icon: MapPin, alerts: 2, status: "Normal" },
              ].map((area) => (
                <Card key={area.name}>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <area.icon className="h-5 w-5" />
                      {area.name}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-muted-foreground">{area.alerts} alertas ativos</p>
                        <Badge
                          variant={
                            area.status === "Crítico"
                              ? "destructive"
                              : area.status === "Atenção"
                                ? "default"
                                : area.status === "Excelente"
                                  ? "secondary"
                                  : "outline"
                          }
                        >
                          {area.status}
                        </Badge>
                      </div>
                      <Link href={`/areas/${area.name.toLowerCase()}`}>
                        <Button variant="outline" size="sm">
                          Ver Detalhes
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="subprefeituras" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                { name: "Centro", population: "431K", alerts: 5, efficiency: "85%" },
                { name: "Zona Norte", population: "2.1M", alerts: 3, efficiency: "88%" },
                { name: "Zona Sul", population: "2.8M", alerts: 2, efficiency: "91%" },
                { name: "Zona Leste", population: "4.2M", alerts: 4, efficiency: "82%" },
                { name: "Zona Oeste", population: "2.8M", alerts: 1, efficiency: "93%" },
              ].map((sub) => (
                <Card key={sub.name}>
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      <span>{sub.name}</span>
                      <Badge variant="outline">{sub.population}</Badge>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm">Alertas Ativos:</span>
                        <span className="font-medium">{sub.alerts}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">Eficiência:</span>
                        <span className="font-medium">{sub.efficiency}</span>
                      </div>
                      <Link href={`/subprefeituras/${sub.name.toLowerCase().replace(" ", "-")}`}>
                        <Button className="w-full mt-3 bg-transparent" variant="outline">
                          Ver Dashboard
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="events" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  Eventos Programados
                </CardTitle>
                <CardDescription>Eventos que podem impactar a cidade</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    {
                      name: "Rock in Rio",
                      date: "15-17 Set",
                      impact: "Alto",
                      area: "Zona Oeste",
                      public: "700K pessoas",
                      type: "Musical",
                    },
                    {
                      name: "Maratona SP",
                      date: "22 Set",
                      impact: "Médio",
                      area: "Centro",
                      public: "35K pessoas",
                      type: "Esportivo",
                    },
                    {
                      name: "Feira de Tecnologia",
                      date: "28-30 Set",
                      impact: "Baixo",
                      area: "Zona Sul",
                      public: "50K pessoas",
                      type: "Cultural",
                    },
                    {
                      name: "Obras Marginal Tietê",
                      date: "01-30 Out",
                      impact: "Alto",
                      area: "Marginal",
                      public: "N/A",
                      type: "Infraestrutura",
                    },
                  ].map((event, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                    >
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="font-medium">{event.name}</h4>
                          <Badge variant="outline" className="text-xs">
                            {event.type}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {event.date} • {event.area} • {event.public}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge
                          variant={
                            event.impact === "Alto" ? "destructive" : event.impact === "Médio" ? "default" : "secondary"
                          }
                        >
                          Impacto {event.impact}
                        </Badge>
                        <Link href="/eventos">
                          <Button variant="outline" size="sm">
                            Ver Detalhes
                          </Button>
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-4 text-center">
                  <Link href="/eventos">
                    <Button variant="outline">Ver Todos os Eventos</Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analysis" className="space-y-6">
            <AIAnalysisReport
              context={{
                type: "geral",
                name: "São Paulo",
                data: {
                  population: "12.4M",
                  areas: ["Segurança", "Educação", "Saúde", "Trânsito", "Meio Ambiente", "Moradia"],
                  subprefeituras: 32,
                  alerts: 12,
                },
              }}
            />
          </TabsContent>
        </Tabs>

        <ContextualAIChat
          context={{
            type: "geral",
            name: "São Paulo",
            data: {
              population: "12.4M",
              areas: ["Segurança", "Educação", "Saúde", "Trânsito", "Meio Ambiente", "Moradia"],
              subprefeituras: 32,
              alerts: 12,
            },
          }}
        />
      </div>
    </div>
  )
}
