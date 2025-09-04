import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { XAxis, YAxis, CartesianGrid, ResponsiveContainer, LineChart, Line, AreaChart, Area } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Car, Cloud, Sun, CloudRain, Wind, Thermometer, Eye, Droplets, AlertTriangle, Clock } from "lucide-react"
import Link from "next/link"
import { AIInsightTooltip } from "@/components/ai-insight-tooltip"

const trafficData = [
  { time: "06:00", intensity: 30, avgSpeed: 45, incidents: 2 },
  { time: "07:00", intensity: 75, avgSpeed: 25, incidents: 8 },
  { time: "08:00", intensity: 95, avgSpeed: 18, incidents: 12 },
  { time: "09:00", intensity: 85, avgSpeed: 22, incidents: 9 },
  { time: "10:00", intensity: 60, avgSpeed: 35, incidents: 5 },
  { time: "11:00", intensity: 55, avgSpeed: 38, incidents: 4 },
  { time: "12:00", intensity: 70, avgSpeed: 28, incidents: 7 },
  { time: "13:00", intensity: 65, avgSpeed: 30, incidents: 6 },
  { time: "14:00", intensity: 55, avgSpeed: 36, incidents: 4 },
  { time: "15:00", intensity: 60, avgSpeed: 33, incidents: 5 },
  { time: "16:00", intensity: 70, avgSpeed: 28, incidents: 7 },
  { time: "17:00", intensity: 85, avgSpeed: 20, incidents: 10 },
  { time: "18:00", intensity: 95, avgSpeed: 16, incidents: 14 },
  { time: "19:00", intensity: 90, avgSpeed: 19, incidents: 11 },
  { time: "20:00", intensity: 70, avgSpeed: 32, incidents: 6 },
]

const weatherForecast = [
  { day: "Hoje", temp: 25, humidity: 65, condition: "Ensolarado", icon: Sun, precipitation: 0 },
  { day: "Amanhã", temp: 23, humidity: 70, condition: "Parcialmente Nublado", icon: Cloud, precipitation: 10 },
  { day: "Quinta", temp: 21, humidity: 80, condition: "Chuva", icon: CloudRain, precipitation: 85 },
  { day: "Sexta", temp: 19, humidity: 85, condition: "Chuva Forte", icon: CloudRain, precipitation: 95 },
  { day: "Sábado", temp: 22, humidity: 75, condition: "Nublado", icon: Cloud, precipitation: 20 },
  { day: "Domingo", temp: 26, humidity: 60, condition: "Ensolarado", icon: Sun, precipitation: 0 },
]

const trafficIncidents = [
  {
    id: 1,
    type: "Acidente",
    location: "Marginal Tietê - Ponte das Bandeiras",
    severity: "Alto",
    time: "15min",
    lanes: 2,
  },
  { id: 2, type: "Obra", location: "Av. Paulista - próximo ao MASP", severity: "Médio", time: "2h", lanes: 1 },
  {
    id: 3,
    type: "Veículo Quebrado",
    location: "Marginal Pinheiros - Ponte Octavio Frias",
    severity: "Baixo",
    time: "30min",
    lanes: 1,
  },
  { id: 4, type: "Manifestação", location: "Av. Faria Lima - Largo da Batata", severity: "Alto", time: "1h", lanes: 3 },
]

const weatherAlerts = [
  {
    id: 1,
    type: "Chuva Forte",
    message: "Previsão de chuva intensa entre 14h-18h na quinta-feira",
    severity: "high",
    areas: ["Zona Norte", "Centro"],
  },
  {
    id: 2,
    type: "Vento",
    message: "Rajadas de vento até 60km/h previstas para sexta-feira",
    severity: "medium",
    areas: ["Zona Oeste", "Zona Sul"],
  },
]

const currentWeather = {
  temperature: 25,
  humidity: 65,
  windSpeed: 12,
  visibility: 10,
  pressure: 1013,
  uvIndex: 7,
  condition: "Ensolarado",
  feelsLike: 28,
}

const trafficMetrics = [
  { label: "Velocidade Média", value: "18.5 km/h", change: "-12%", trend: "down" },
  { label: "Incidentes Ativos", value: "47", change: "+8%", trend: "up" },
  { label: "Fluxo de Veículos", value: "2.1M", change: "+3%", trend: "up" },
  { label: "Tempo Médio", value: "52 min", change: "+15%", trend: "up" },
]

export default function TrafficWeatherPage() {
  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-card">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2">
                <Car className="h-8 w-8 text-blue-500" />
                <Cloud className="h-8 w-8 text-gray-500" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-foreground">Trânsito & Clima</h1>
                <p className="text-muted-foreground">Monitoramento em tempo real - CET e INMET</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 text-sm">
                <Sun className="h-4 w-4 text-yellow-500" />
                <span>{currentWeather.temperature}°C</span>
                <span className="text-muted-foreground">{currentWeather.condition}</span>
              </div>
              <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                Dados Atualizados
              </Badge>
              <Link href="/">
                <Button variant="outline">Dashboard Principal</Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-6">
        {/* Weather Alerts */}
        {weatherAlerts.length > 0 && (
          <div className="mb-6">
            <h2 className="text-lg font-semibold mb-3 flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-orange-500" />
              Alertas Meteorológicos
              <AIInsightTooltip
                title="Alertas Meteorológicos"
                insight="Os alertas meteorológicos são baseados em dados do INMET e modelos preditivos. Chuvas fortes podem aumentar acidentes em 35% e reduzir velocidade média em 40%."
                recommendation="Ativar planos de contingência preventivamente e comunicar amplamente à população sobre condições adversas."
              />
            </h2>
            <div className="grid gap-3">
              {weatherAlerts.map((alert) => (
                <Alert
                  key={alert.id}
                  className={`${
                    alert.severity === "high"
                      ? "border-red-500 bg-red-50 dark:bg-red-950"
                      : "border-yellow-500 bg-yellow-50 dark:bg-yellow-950"
                  } relative`}
                >
                  <AlertDescription>
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="font-medium">{alert.type}:</span> {alert.message}
                        <div className="text-xs mt-1">Áreas afetadas: {alert.areas.join(", ")}</div>
                      </div>
                      <AIInsightTooltip
                        title={`Alerta: ${alert.type}`}
                        insight={
                          alert.type === "Chuva Forte"
                            ? "Chuvas intensas podem causar alagamentos em pontos críticos, aumentar acidentes e sobrecarregar o sistema de drenagem."
                            : "Ventos fortes podem derrubar árvores, afetar estruturas temporárias e causar interrupções no fornecimento de energia."
                        }
                        recommendation={
                          alert.type === "Chuva Forte"
                            ? "Monitorar pontos de alagamento, reforçar equipes de emergência e orientar população sobre rotas seguras."
                            : "Verificar estruturas expostas, alertar sobre objetos soltos e preparar equipes de poda preventiva."
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
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Visão Geral</TabsTrigger>
            <TabsTrigger value="traffic">Trânsito</TabsTrigger>
            <TabsTrigger value="weather">Clima</TabsTrigger>
            <TabsTrigger value="impact">Impactos</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Current Conditions */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Car className="h-5 w-5 text-blue-500" />
                    Situação do Trânsito
                    <AIInsightTooltip
                      title="Situação do Trânsito"
                      insight="Velocidade média de 18.5 km/h indica congestionamento severo. O aumento de 8% nos incidentes e 15% no tempo médio sugere deterioração das condições."
                      recommendation="Implementar medidas de fluidez como semáforos inteligentes e orientação de rotas alternativas via aplicativos."
                    />
                  </CardTitle>
                  <CardDescription>Condições atuais na cidade</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4">
                    {trafficMetrics.map((metric, index) => (
                      <div key={index} className="text-center">
                        <div className="text-2xl font-bold">{metric.value}</div>
                        <div className="text-sm text-muted-foreground">{metric.label}</div>
                        <div className={`text-xs ${metric.trend === "up" ? "text-red-600" : "text-green-600"}`}>
                          {metric.change}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Sun className="h-5 w-5 text-yellow-500" />
                    Condições Climáticas
                    <AIInsightTooltip
                      title="Condições Climáticas"
                      insight="Temperatura de 25°C com 65% de umidade e UV 7 indica condições favoráveis. Visibilidade de 10km é excelente para o trânsito."
                      recommendation="Condições ideais para atividades ao ar livre. Manter atenção ao índice UV alto e orientar uso de proteção solar."
                    />
                  </CardTitle>
                  <CardDescription>Tempo atual em São Paulo</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center">
                      <div className="text-3xl font-bold">{currentWeather.temperature}°C</div>
                      <div className="text-sm text-muted-foreground">Temperatura</div>
                      <div className="text-xs">Sensação: {currentWeather.feelsLike}°C</div>
                    </div>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Umidade:</span>
                        <span>{currentWeather.humidity}%</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Vento:</span>
                        <span>{currentWeather.windSpeed} km/h</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Visibilidade:</span>
                        <span>{currentWeather.visibility} km</span>
                      </div>
                      <div className="flex justify-between">
                        <span>UV:</span>
                        <span>{currentWeather.uvIndex}</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    Intensidade do Trânsito - Hoje
                    <AIInsightTooltip
                      title="Intensidade do Trânsito"
                      insight="Picos de congestionamento às 8h (95%) e 18h (95%) são típicos dos horários de rush. Velocidade mínima de 16 km/h às 18h indica gargalos críticos."
                      recommendation="Implementar horário flexível em órgãos públicos e incentivar uso de transporte público nos horários de pico."
                    />
                  </CardTitle>
                  <CardDescription>Fluxo de veículos por horário</CardDescription>
                </CardHeader>
                <CardContent>
                  <ChartContainer
                    config={{
                      intensity: { label: "Intensidade", color: "hsl(var(--chart-1))" },
                      avgSpeed: { label: "Velocidade Média", color: "hsl(var(--chart-2))" },
                    }}
                    className="h-[300px]"
                  >
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={trafficData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="time" />
                        <YAxis />
                        <ChartTooltip content={<ChartTooltipContent />} />
                        <Line type="monotone" dataKey="intensity" stroke="var(--color-chart-1)" strokeWidth={2} />
                        <Line type="monotone" dataKey="avgSpeed" stroke="var(--color-chart-2)" strokeWidth={2} />
                      </LineChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    Previsão do Tempo - 6 Dias
                    <AIInsightTooltip
                      title="Previsão do Tempo"
                      insight="Chuva forte prevista para quinta e sexta-feira (85-95% precipitação) pode impactar significativamente o trânsito e serviços urbanos."
                      recommendation="Preparar planos de contingência para quinta e sexta-feira, incluindo reforço no transporte público e equipes de emergência."
                    />
                  </CardTitle>
                  <CardDescription>Condições meteorológicas previstas</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {weatherForecast.map((forecast, index) => {
                      const Icon = forecast.icon
                      return (
                        <div key={index} className="flex items-center justify-between p-3 border rounded-lg relative">
                          <div className="flex items-center gap-3">
                            <Icon className="h-6 w-6 text-blue-500" />
                            <div>
                              <div className="font-medium">{forecast.day}</div>
                              <div className="text-sm text-muted-foreground">{forecast.condition}</div>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-lg font-bold">{forecast.temp}°C</div>
                            <div className="text-sm text-muted-foreground">{forecast.precipitation}%</div>
                          </div>
                          <div className="absolute top-2 right-2">
                            <AIInsightTooltip
                              title={`${forecast.day}: ${forecast.condition}`}
                              insight={
                                forecast.precipitation > 80
                                  ? "Chuva intensa pode causar alagamentos, aumentar acidentes e reduzir velocidade do trânsito em até 40%."
                                  : forecast.precipitation > 50
                                    ? "Chuva moderada pode afetar visibilidade e aumentar tempo de deslocamento em 15-20%."
                                    : forecast.condition === "Ensolarado"
                                      ? "Condições ideais para trânsito e atividades urbanas. Atenção ao índice UV."
                                      : "Condições estáveis com impacto mínimo no trânsito e serviços urbanos."
                              }
                              recommendation={
                                forecast.precipitation > 80
                                  ? "Ativar plano de emergência, reforçar drenagem e alertar população sobre rotas alternativas."
                                  : forecast.precipitation > 50
                                    ? "Monitorar pontos críticos e orientar motoristas sobre condições adversas."
                                    : "Aproveitar condições favoráveis para manutenções preventivas e eventos ao ar livre."
                              }
                            />
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="traffic" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
              {trafficMetrics.map((metric, index) => (
                <Card key={index}>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium flex items-center gap-2">
                      {metric.label}
                      <AIInsightTooltip
                        title={metric.label}
                        insight={
                          metric.label === "Velocidade Média"
                            ? "18.5 km/h está abaixo do ideal (25-30 km/h). Redução de 12% indica piora nas condições de fluidez."
                            : metric.label === "Incidentes Ativos"
                              ? "47 incidentes ativos com aumento de 8% requer atenção. Cada incidente pode reduzir capacidade viária em 15-25%."
                              : metric.label === "Fluxo de Veículos"
                                ? "2.1M veículos circulando com crescimento de 3% indica aumento da demanda por mobilidade urbana."
                                : "52 minutos de tempo médio com aumento de 15% impacta qualidade de vida e produtividade urbana."
                        }
                        recommendation={
                          metric.label === "Velocidade Média"
                            ? "Implementar semáforos inteligentes e corredores de ônibus para melhorar fluidez."
                            : metric.label === "Incidentes Ativos"
                              ? "Reforçar equipes de atendimento e implementar sistema de detecção automática de incidentes."
                              : metric.label === "Fluxo de Veículos"
                                ? "Expandir transporte público e incentivar mobilidade ativa para reduzir dependência do carro."
                                : "Otimizar semáforos e criar rotas alternativas para reduzir tempo de deslocamento."
                        }
                      />
                    </CardTitle>
                    <Car className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{metric.value}</div>
                    <p className={`text-xs ${metric.trend === "up" ? "text-red-600" : "text-green-600"}`}>
                      {metric.change} vs ontem
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    Incidentes Ativos
                    <AIInsightTooltip
                      title="Incidentes Ativos"
                      insight="Incidentes em vias principais como Marginais e Av. Paulista têm impacto multiplicado. Acidentes em pontes são especialmente críticos."
                      recommendation="Priorizar atendimento em vias estruturais e manter equipes de plantão em pontos estratégicos."
                    />
                  </CardTitle>
                  <CardDescription>Ocorrências que afetam o trânsito</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {trafficIncidents.map((incident) => (
                      <div key={incident.id} className="flex items-start gap-3 p-3 border rounded-lg relative">
                        <AlertTriangle
                          className={`h-5 w-5 mt-1 ${
                            incident.severity === "Alto"
                              ? "text-red-500"
                              : incident.severity === "Médio"
                                ? "text-yellow-500"
                                : "text-green-500"
                          }`}
                        />
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-medium">{incident.type}</span>
                            <Badge
                              variant={
                                incident.severity === "Alto"
                                  ? "destructive"
                                  : incident.severity === "Médio"
                                    ? "default"
                                    : "secondary"
                              }
                            >
                              {incident.severity}
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground mb-2">{incident.location}</p>
                          <div className="flex items-center gap-4 text-xs">
                            <span className="flex items-center gap-1">
                              <Clock className="h-3 w-3" />
                              {incident.time}
                            </span>
                            <span>{incident.lanes} faixa(s) afetada(s)</span>
                          </div>
                        </div>
                        <div className="absolute top-2 right-2">
                          <AIInsightTooltip
                            title={`${incident.type}: ${incident.location}`}
                            insight={
                              incident.type === "Acidente"
                                ? "Acidentes em pontes e marginais causam impacto severo no trânsito, podendo afetar múltiplas rotas alternativas."
                                : incident.type === "Obra"
                                  ? "Obras em vias principais requerem sinalização adequada e rotas alternativas bem definidas."
                                  : incident.type === "Manifestação"
                                    ? "Manifestações podem bloquear vias importantes e requerem coordenação com segurança pública."
                                    : "Veículos quebrados em vias rápidas criam gargalos e riscos de acidentes secundários."
                            }
                            recommendation={
                              incident.severity === "Alto"
                                ? "Mobilizar equipes de emergência imediatamente e ativar rotas de desvio."
                                : incident.severity === "Médio"
                                  ? "Monitorar evolução e preparar ações de contingência se necessário."
                                  : "Resolver rapidamente para evitar agravamento das condições de trânsito."
                            }
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    Velocidade por Horário
                    <AIInsightTooltip
                      title="Velocidade por Horário"
                      insight="Velocidades abaixo de 20 km/h nos horários de pico indicam congestionamento severo. Recuperação gradual após 19h mostra padrão típico urbano."
                      recommendation="Escalonar horários de funcionamento de órgãos públicos e implementar trabalho remoto para reduzir picos."
                    />
                  </CardTitle>
                  <CardDescription>Velocidade média nas principais vias</CardDescription>
                </CardHeader>
                <CardContent>
                  <ChartContainer
                    config={{
                      avgSpeed: { label: "Velocidade (km/h)", color: "hsl(var(--chart-3))" },
                    }}
                    className="h-[300px]"
                  >
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={trafficData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="time" />
                        <YAxis />
                        <ChartTooltip content={<ChartTooltipContent />} />
                        <Area
                          type="monotone"
                          dataKey="avgSpeed"
                          stroke="var(--color-chart-3)"
                          fill="var(--color-chart-3)"
                          fillOpacity={0.3}
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="weather" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium flex items-center gap-2">
                    Temperatura
                    <AIInsightTooltip
                      title="Temperatura"
                      insight="25°C é temperatura ideal para atividades urbanas. Sensação térmica de 28°C indica necessidade de hidratação adequada."
                      recommendation="Manter pontos de hidratação em espaços públicos e orientar população sobre cuidados com o calor."
                    />
                  </CardTitle>
                  <Thermometer className="h-4 w-4 text-red-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{currentWeather.temperature}°C</div>
                  <p className="text-xs text-muted-foreground">Sensação: {currentWeather.feelsLike}°C</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium flex items-center gap-2">
                    Umidade
                    <AIInsightTooltip
                      title="Umidade"
                      insight="65% de umidade está na faixa confortável (40-70%). Níveis adequados para saúde respiratória e conforto térmico."
                      recommendation="Condições ideais mantidas. Monitorar variações bruscas que podem afetar qualidade do ar."
                    />
                  </CardTitle>
                  <Droplets className="h-4 w-4 text-blue-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{currentWeather.humidity}%</div>
                  <p className="text-xs text-muted-foreground">Relativa</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium flex items-center gap-2">
                    Vento
                    <AIInsightTooltip
                      title="Vento"
                      insight="12 km/h é velocidade moderada que ajuda na dispersão de poluentes e proporciona sensação de frescor."
                      recommendation="Condições favoráveis para atividades ao ar livre e qualidade do ar urbano."
                    />
                  </CardTitle>
                  <Wind className="h-4 w-4 text-green-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{currentWeather.windSpeed}</div>
                  <p className="text-xs text-muted-foreground">km/h</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium flex items-center gap-2">
                    Visibilidade
                    <AIInsightTooltip
                      title="Visibilidade"
                      insight="10 km de visibilidade é excelente para segurança no trânsito e operações aéreas. Indica baixa poluição atmosférica."
                      recommendation="Condições ótimas para transporte e atividades urbanas. Manter monitoramento da qualidade do ar."
                    />
                  </CardTitle>
                  <Eye className="h-4 w-4 text-purple-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{currentWeather.visibility}</div>
                  <p className="text-xs text-muted-foreground">km</p>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Previsão Detalhada</CardTitle>
                  <CardDescription>Próximos 6 dias</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {weatherForecast.map((forecast, index) => {
                      const Icon = forecast.icon
                      return (
                        <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                          <div className="flex items-center gap-4">
                            <Icon className="h-8 w-8 text-blue-500" />
                            <div>
                              <div className="font-medium">{forecast.day}</div>
                              <div className="text-sm text-muted-foreground">{forecast.condition}</div>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-xl font-bold">{forecast.temp}°C</div>
                            <div className="text-sm text-muted-foreground">
                              <Droplets className="h-3 w-3 inline mr-1" />
                              {forecast.precipitation}%
                            </div>
                            <div className="text-sm text-muted-foreground">Umidade: {forecast.humidity}%</div>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Índices Climáticos</CardTitle>
                  <CardDescription>Condições atmosféricas atuais</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div>
                      <div className="flex justify-between mb-2">
                        <span className="text-sm font-medium">Índice UV</span>
                        <span className="text-sm">{currentWeather.uvIndex}/10</span>
                      </div>
                      <Progress value={currentWeather.uvIndex * 10} className="h-2" />
                      <p className="text-xs text-muted-foreground mt-1">
                        {currentWeather.uvIndex >= 8
                          ? "Muito Alto"
                          : currentWeather.uvIndex >= 6
                            ? "Alto"
                            : currentWeather.uvIndex >= 3
                              ? "Moderado"
                              : "Baixo"}
                      </p>
                    </div>

                    <div>
                      <div className="flex justify-between mb-2">
                        <span className="text-sm font-medium">Pressão Atmosférica</span>
                        <span className="text-sm">{currentWeather.pressure} hPa</span>
                      </div>
                      <Progress value={((currentWeather.pressure - 980) / 60) * 100} className="h-2" />
                      <p className="text-xs text-muted-foreground mt-1">
                        {currentWeather.pressure > 1020 ? "Alta" : currentWeather.pressure > 1000 ? "Normal" : "Baixa"}
                      </p>
                    </div>

                    <div>
                      <div className="flex justify-between mb-2">
                        <span className="text-sm font-medium">Qualidade do Ar</span>
                        <span className="text-sm">Moderada</span>
                      </div>
                      <Progress value={65} className="h-2" />
                      <p className="text-xs text-muted-foreground mt-1">
                        IQA: 65 - Aceitável para a maioria das pessoas
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="impact" className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold mb-2">Análise de Impactos</h2>
              <p className="text-muted-foreground">Como clima e trânsito afetam a cidade</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    Impacto do Clima no Trânsito
                    <AIInsightTooltip
                      title="Impacto do Clima no Trânsito"
                      insight="Análise histórica mostra que chuvas fortes aumentam tempo de deslocamento em 40% e acidentes em 35%. Correlação direta entre precipitação e congestionamento."
                      recommendation="Implementar sistema de alerta precoce e planos de contingência automáticos baseados em previsões meteorológicas."
                    />
                  </CardTitle>
                  <CardDescription>Correlação entre condições meteorológicas e fluxo</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="p-4 bg-yellow-50 dark:bg-yellow-950 rounded-lg">
                      <h4 className="font-medium text-yellow-900 dark:text-yellow-100 mb-2">
                        Previsão para Quinta-feira
                      </h4>
                      <p className="text-sm text-yellow-700 dark:text-yellow-300">
                        Chuva forte prevista pode aumentar tempo de deslocamento em até 40% nos horários de pico
                      </p>
                    </div>

                    <div className="p-4 bg-blue-50 dark:bg-blue-950 rounded-lg">
                      <h4 className="font-medium text-blue-900 dark:text-blue-100 mb-2">Recomendação IA</h4>
                      <p className="text-sm text-blue-700 dark:text-blue-300">
                        Ativar plano de contingência para transporte público e alertar população sobre condições
                        adversas
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    Serviços Afetados
                    <AIInsightTooltip
                      title="Serviços Afetados"
                      insight="Impactos cascata: trânsito lento afeta transporte público, emergências médicas e coleta de lixo. Planejamento integrado é essencial."
                      recommendation="Coordenar ações entre secretarias e manter comunicação constante sobre status dos serviços."
                    />
                  </CardTitle>
                  <CardDescription>Áreas que podem ser impactadas</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      {
                        service: "Transporte Público",
                        impact: "Alto",
                        description: "Atrasos e superlotação esperados",
                      },
                      { service: "Coleta de Lixo", impact: "Médio", description: "Possíveis atrasos nas rotas" },
                      { service: "Emergências Médicas", impact: "Alto", description: "Tempo de resposta aumentado" },
                      { service: "Energia Elétrica", impact: "Baixo", description: "Risco mínimo de interrupções" },
                    ].map((item, index) => (
                      <div key={index} className="flex items-center justify-between p-3 border rounded-lg relative">
                        <div>
                          <h4 className="font-medium">{item.service}</h4>
                          <p className="text-sm text-muted-foreground">{item.description}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge
                            variant={
                              item.impact === "Alto" ? "destructive" : item.impact === "Médio" ? "default" : "secondary"
                            }
                          >
                            {item.impact}
                          </Badge>
                          <AIInsightTooltip
                            title={`Impacto: ${item.service}`}
                            insight={
                              item.service === "Transporte Público"
                                ? "Sistema mais vulnerável a condições climáticas. Atrasos podem gerar efeito dominó na mobilidade urbana."
                                : item.service === "Emergências Médicas"
                                  ? "Tempo de resposta crítico para salvar vidas. Trânsito lento pode ser fatal em emergências."
                                  : item.service === "Coleta de Lixo"
                                    ? "Atrasos podem causar acúmulo de resíduos e problemas sanitários."
                                    : "Sistema elétrico geralmente resiliente, mas tempestades podem causar interrupções pontuais."
                            }
                            recommendation={
                              item.impact === "Alto"
                                ? "Ativar protocolos de emergência e rotas alternativas prioritárias."
                                : item.impact === "Médio"
                                  ? "Monitorar situação e ajustar cronogramas conforme necessário."
                                  : "Manter vigilância preventiva e equipes de plantão."
                            }
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Planos de Contingência</CardTitle>
                <CardDescription>Ações preparadas para condições adversas</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    {
                      title: "Chuva Forte",
                      actions: [
                        "Ativar equipes de drenagem",
                        "Reforçar transporte público",
                        "Alertar sobre alagamentos",
                      ],
                    },
                    {
                      title: "Congestionamento Extremo",
                      actions: [
                        "Liberar faixa de ônibus",
                        "Ativar semáforos inteligentes",
                        "Orientar rotas alternativas",
                      ],
                    },
                    {
                      title: "Vento Forte",
                      actions: ["Monitorar árvores", "Alertar sobre objetos soltos", "Reforçar equipes de poda"],
                    },
                    {
                      title: "Calor Extremo",
                      actions: ["Abrir centros de hidratação", "Alertar grupos de risco", "Monitorar energia elétrica"],
                    },
                  ].map((plan, index) => (
                    <div key={index} className="p-4 border rounded-lg">
                      <h4 className="font-medium mb-3">{plan.title}</h4>
                      <ul className="space-y-1">
                        {plan.actions.map((action, actionIndex) => (
                          <li key={actionIndex} className="text-sm flex items-center gap-2">
                            <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
                            {action}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
