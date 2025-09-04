import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Calendar,
  MapPin,
  Users,
  Plus,
  Filter,
  Search,
  Music,
  Trophy,
  Megaphone,
  Construction,
  Heart,
} from "lucide-react"
import Link from "next/link"

const events = [
  {
    id: 1,
    name: "Rock in Rio",
    type: "Musical",
    date: "15-17 Set 2024",
    startDate: "2024-09-15",
    endDate: "2024-09-17",
    location: "Cidade do Rock - Zona Oeste",
    expectedAttendance: 700000,
    status: "Confirmado",
    impact: "Alto",
    icon: Music,
    color: "purple",
    description: "Festival de música internacional com múltiplos palcos",
    impacts: {
      transito: "Alto - Congestionamento severo esperado",
      seguranca: "Alto - Reforço policial necessário",
      saude: "Médio - Postos médicos adicionais",
      limpeza: "Alto - Equipes extras de limpeza",
    },
    preparations: [
      "Bloqueio de vias no entorno",
      "Reforço do transporte público",
      "500 policiais extras",
      "20 ambulâncias de plantão",
    ],
  },
  {
    id: 2,
    name: "Maratona Internacional de São Paulo",
    type: "Esportivo",
    date: "22 Set 2024",
    startDate: "2024-09-22",
    endDate: "2024-09-22",
    location: "Centro - Ibirapuera",
    expectedAttendance: 35000,
    status: "Confirmado",
    impact: "Médio",
    icon: Trophy,
    color: "green",
    description: "Corrida internacional com percurso pelo centro da cidade",
    impacts: {
      transito: "Alto - Fechamento de vias principais",
      seguranca: "Médio - Policiamento da rota",
      saude: "Alto - Suporte médico especializado",
      limpeza: "Baixo - Limpeza pós-evento",
    },
    preparations: [
      "Fechamento da Av. Paulista das 6h às 14h",
      "Desvio de 15 linhas de ônibus",
      "Postos médicos a cada 5km",
      "Hidratação em 12 pontos",
    ],
  },
  {
    id: 3,
    name: "Manifestação Sindical",
    type: "Político",
    date: "28 Set 2024",
    startDate: "2024-09-28",
    endDate: "2024-09-28",
    location: "Centro - Praça da Sé",
    expectedAttendance: 15000,
    status: "Pendente",
    impact: "Médio",
    icon: Megaphone,
    color: "orange",
    description: "Manifestação pacífica de trabalhadores",
    impacts: {
      transito: "Médio - Bloqueios pontuais",
      seguranca: "Alto - Monitoramento intensivo",
      saude: "Baixo - Suporte básico",
      limpeza: "Médio - Limpeza pós-manifestação",
    },
    preparations: [
      "Negociação com organizadores",
      "Definição de rota autorizada",
      "Policiamento preventivo",
      "Monitoramento por câmeras",
    ],
  },
  {
    id: 4,
    name: "Obras na Marginal Tietê",
    type: "Infraestrutura",
    date: "01-30 Out 2024",
    startDate: "2024-10-01",
    endDate: "2024-10-30",
    location: "Marginal Tietê - Ponte das Bandeiras",
    expectedAttendance: 0,
    status: "Planejado",
    impact: "Alto",
    icon: Construction,
    color: "yellow",
    description: "Reforma estrutural da ponte com interdição parcial",
    impacts: {
      transito: "Crítico - Redução de 50% da capacidade",
      seguranca: "Médio - Sinalização de obras",
      saude: "Baixo - Sem impacto direto",
      limpeza: "Baixo - Limpeza de detritos",
    },
    preparations: [
      "Sinalização avançada por 2km",
      "Rotas alternativas divulgadas",
      "Horário noturno preferencial",
      "Monitoramento 24h",
    ],
  },
  {
    id: 5,
    name: "Campanha de Vacinação",
    type: "Saúde",
    date: "05-15 Out 2024",
    startDate: "2024-10-05",
    endDate: "2024-10-15",
    location: "Múltiplos locais",
    expectedAttendance: 500000,
    status: "Confirmado",
    impact: "Médio",
    icon: Heart,
    color: "red",
    description: "Campanha municipal de vacinação contra gripe",
    impacts: {
      transito: "Baixo - Fluxo adicional pontual",
      seguranca: "Baixo - Segurança nos postos",
      saude: "Alto - Mobilização total da rede",
      limpeza: "Médio - Descarte de materiais",
    },
    preparations: [
      "200 postos de vacinação",
      "1000 profissionais mobilizados",
      "Estoque de 600mil doses",
      "Campanha de divulgação",
    ],
  },
]

const eventTypes = [
  { value: "all", label: "Todos os Tipos" },
  { value: "Musical", label: "Musical" },
  { value: "Esportivo", label: "Esportivo" },
  { value: "Político", label: "Político" },
  { value: "Infraestrutura", label: "Infraestrutura" },
  { value: "Saúde", label: "Saúde" },
  { value: "Cultural", label: "Cultural" },
]

const impactLevels = [
  { value: "all", label: "Todos os Impactos" },
  { value: "Baixo", label: "Baixo" },
  { value: "Médio", label: "Médio" },
  { value: "Alto", label: "Alto" },
  { value: "Crítico", label: "Crítico" },
]

const eventMetrics = [
  { label: "Eventos Ativos", value: "12", change: "+3" },
  { label: "Público Esperado", value: "1.2M", change: "+15%" },
  { label: "Impacto Alto", value: "4", change: "+1" },
  { label: "Preparativos", value: "89%", change: "+12%" },
]

export default function EventsPage() {
  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-card">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Calendar className="h-8 w-8 text-blue-500" />
              <div>
                <h1 className="text-3xl font-bold text-foreground">Gestão de Eventos</h1>
                <p className="text-muted-foreground">Planejamento e monitoramento de eventos municipais</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                {events.length} eventos programados
              </Badge>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Novo Evento
              </Button>
              <Link href="/">
                <Button variant="outline">Dashboard Principal</Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-6">
        {/* Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {eventMetrics.map((metric, index) => (
            <Card key={index}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{metric.label}</CardTitle>
                <Calendar className="h-4 w-4 text-blue-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{metric.value}</div>
                <p className="text-xs text-green-600">{metric.change} vs mês anterior</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <Tabs defaultValue="calendar" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="calendar">Calendário</TabsTrigger>
            <TabsTrigger value="impact">Análise de Impacto</TabsTrigger>
            <TabsTrigger value="planning">Planejamento</TabsTrigger>
            <TabsTrigger value="history">Histórico</TabsTrigger>
          </TabsList>

          <TabsContent value="calendar" className="space-y-6">
            {/* Filters */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Filtros</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-4">
                  <div className="flex items-center gap-2">
                    <Search className="h-4 w-4 text-muted-foreground" />
                    <Input placeholder="Buscar eventos..." className="w-64" />
                  </div>
                  <Select defaultValue="all">
                    <SelectTrigger className="w-48">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {eventTypes.map((type) => (
                        <SelectItem key={type.value} value={type.value}>
                          {type.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Select defaultValue="all">
                    <SelectTrigger className="w-48">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {impactLevels.map((level) => (
                        <SelectItem key={level.value} value={level.value}>
                          {level.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Button variant="outline">
                    <Filter className="h-4 w-4 mr-2" />
                    Mais Filtros
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Events List */}
            <div className="grid gap-6">
              {events.map((event) => {
                const Icon = event.icon
                return (
                  <Card key={event.id} className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="flex items-start gap-4">
                          <div className={`p-3 rounded-lg bg-${event.color}-100 dark:bg-${event.color}-900`}>
                            <Icon className={`h-6 w-6 text-${event.color}-600`} />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <CardTitle className="text-xl">{event.name}</CardTitle>
                              <Badge variant="outline">{event.type}</Badge>
                              <Badge
                                variant={
                                  event.status === "Confirmado"
                                    ? "default"
                                    : event.status === "Pendente"
                                      ? "secondary"
                                      : "outline"
                                }
                              >
                                {event.status}
                              </Badge>
                            </div>
                            <CardDescription className="text-base mb-3">{event.description}</CardDescription>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                              <div className="flex items-center gap-2">
                                <Calendar className="h-4 w-4 text-muted-foreground" />
                                <span>{event.date}</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <MapPin className="h-4 w-4 text-muted-foreground" />
                                <span>{event.location}</span>
                              </div>
                              {event.expectedAttendance > 0 && (
                                <div className="flex items-center gap-2">
                                  <Users className="h-4 w-4 text-muted-foreground" />
                                  <span>{event.expectedAttendance.toLocaleString("pt-BR")} pessoas</span>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                        <div className="flex flex-col items-end gap-2">
                          <Badge
                            variant={
                              event.impact === "Crítico"
                                ? "destructive"
                                : event.impact === "Alto"
                                  ? "destructive"
                                  : event.impact === "Médio"
                                    ? "default"
                                    : "secondary"
                            }
                          >
                            Impacto {event.impact}
                          </Badge>
                          <div className="flex gap-2">
                            <Button size="sm" variant="outline">
                              Editar
                            </Button>
                            <Button size="sm">Detalhes</Button>
                          </div>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div>
                          <h4 className="font-medium mb-2">Impactos Esperados:</h4>
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                            {Object.entries(event.impacts).map(([area, impact]) => (
                              <div key={area} className="text-sm">
                                <span className="font-medium capitalize">{area}:</span>
                                <div className="text-muted-foreground">{impact}</div>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div>
                          <h4 className="font-medium mb-2">Preparativos:</h4>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                            {event.preparations.map((prep, index) => (
                              <div key={index} className="flex items-center gap-2 text-sm">
                                <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
                                {prep}
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </TabsContent>

          <TabsContent value="impact" className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold mb-2">Análise de Impacto</h2>
              <p className="text-muted-foreground">Como os eventos afetam os serviços municipais</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Impacto no Trânsito</CardTitle>
                  <CardDescription>Eventos que mais afetam a mobilidade</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {events
                      .filter((e) => e.impacts.transito.includes("Alto") || e.impacts.transito.includes("Crítico"))
                      .map((event) => (
                        <div key={event.id} className="flex items-center justify-between p-3 border rounded-lg">
                          <div>
                            <h4 className="font-medium">{event.name}</h4>
                            <p className="text-sm text-muted-foreground">{event.date}</p>
                          </div>
                          <Badge variant={event.impacts.transito.includes("Crítico") ? "destructive" : "default"}>
                            {event.impacts.transito.split(" - ")[0]}
                          </Badge>
                        </div>
                      ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Recursos Necessários</CardTitle>
                  <CardDescription>Mobilização por área municipal</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">Segurança Pública</span>
                      <span className="text-sm">750 agentes extras</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">Saúde</span>
                      <span className="text-sm">45 ambulâncias</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">Limpeza Urbana</span>
                      <span className="text-sm">200 garis extras</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">Transporte</span>
                      <span className="text-sm">50 ônibus extras</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Cronograma de Impactos</CardTitle>
                <CardDescription>Eventos por período e intensidade</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {["Setembro", "Outubro", "Novembro"].map((month) => (
                    <div key={month} className="border rounded-lg p-4">
                      <h4 className="font-medium mb-3">{month} 2024</h4>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {events
                          .filter((e) =>
                            e.startDate.includes(month === "Setembro" ? "09" : month === "Outubro" ? "10" : "11"),
                          )
                          .map((event) => (
                            <div key={event.id} className="flex items-center gap-2 text-sm">
                              <div
                                className={`w-3 h-3 rounded-full ${
                                  event.impact === "Crítico"
                                    ? "bg-red-500"
                                    : event.impact === "Alto"
                                      ? "bg-orange-500"
                                      : event.impact === "Médio"
                                        ? "bg-yellow-500"
                                        : "bg-green-500"
                                }`}
                              ></div>
                              <span>{event.name}</span>
                            </div>
                          ))}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="planning" className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold mb-2">Planejamento Operacional</h2>
              <p className="text-muted-foreground">Preparativos e coordenação entre secretarias</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Próximos Eventos Críticos</CardTitle>
                  <CardDescription>Eventos que requerem atenção especial</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {events
                      .filter((e) => e.impact === "Alto" || e.impact === "Crítico")
                      .slice(0, 3)
                      .map((event) => (
                        <div key={event.id} className="p-4 border rounded-lg">
                          <div className="flex items-center justify-between mb-2">
                            <h4 className="font-medium">{event.name}</h4>
                            <Badge variant="destructive">{event.impact}</Badge>
                          </div>
                          <p className="text-sm text-muted-foreground mb-3">
                            {event.date} • {event.location}
                          </p>
                          <div className="space-y-2">
                            <div className="text-sm">
                              <span className="font-medium">Status dos preparativos:</span>
                              <div className="flex items-center gap-2 mt-1">
                                <div className="flex-1 bg-muted rounded-full h-2">
                                  <div className="bg-blue-500 h-2 rounded-full" style={{ width: "75%" }}></div>
                                </div>
                                <span className="text-xs">75%</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Checklist Operacional</CardTitle>
                  <CardDescription>Itens essenciais para eventos de grande porte</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {[
                      { item: "Autorização de funcionamento", status: "done" },
                      { item: "Plano de segurança aprovado", status: "done" },
                      { item: "Rotas de emergência definidas", status: "done" },
                      { item: "Equipes médicas mobilizadas", status: "progress" },
                      { item: "Transporte público reforçado", status: "progress" },
                      { item: "Limpeza pós-evento agendada", status: "pending" },
                      { item: "Comunicação com população", status: "pending" },
                    ].map((check, index) => (
                      <div key={index} className="flex items-center gap-3">
                        <div
                          className={`w-4 h-4 rounded border-2 flex items-center justify-center ${
                            check.status === "done"
                              ? "bg-green-500 border-green-500"
                              : check.status === "progress"
                                ? "bg-yellow-500 border-yellow-500"
                                : "border-muted-foreground"
                          }`}
                        >
                          {check.status === "done" && <div className="w-2 h-2 bg-white rounded-full"></div>}
                          {check.status === "progress" && <div className="w-2 h-2 bg-white rounded-full"></div>}
                        </div>
                        <span className="text-sm">{check.item}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Coordenação entre Secretarias</CardTitle>
                <CardDescription>Responsabilidades e pontos de contato</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {[
                    {
                      secretaria: "Segurança",
                      responsavel: "João Silva",
                      telefone: "(11) 3333-1111",
                      status: "Pronto",
                    },
                    {
                      secretaria: "Saúde",
                      responsavel: "Maria Santos",
                      telefone: "(11) 3333-2222",
                      status: "Preparando",
                    },
                    {
                      secretaria: "Transporte",
                      responsavel: "Pedro Costa",
                      telefone: "(11) 3333-3333",
                      status: "Pronto",
                    },
                    {
                      secretaria: "Limpeza",
                      responsavel: "Ana Oliveira",
                      telefone: "(11) 3333-4444",
                      status: "Preparando",
                    },
                  ].map((contact, index) => (
                    <div key={index} className="p-3 border rounded-lg">
                      <h4 className="font-medium">{contact.secretaria}</h4>
                      <p className="text-sm text-muted-foreground">{contact.responsavel}</p>
                      <p className="text-sm text-muted-foreground">{contact.telefone}</p>
                      <Badge variant={contact.status === "Pronto" ? "default" : "secondary"} className="mt-2">
                        {contact.status}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="history" className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold mb-2">Histórico de Eventos</h2>
              <p className="text-muted-foreground">Análise de eventos passados e lições aprendidas</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Eventos Recentes</CardTitle>
                  <CardDescription>Últimos 3 meses</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { name: "Virada Cultural", date: "Mai 2024", public: "5M", rating: 4.8 },
                      { name: "Parada do Orgulho LGBT", date: "Jun 2024", public: "3M", rating: 4.9 },
                      { name: "Aniversário da Cidade", date: "Jan 2024", public: "2M", rating: 4.7 },
                      { name: "Réveillon Paulista", date: "Dez 2023", public: "2.5M", rating: 4.6 },
                    ].map((event, index) => (
                      <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                        <div>
                          <h4 className="font-medium">{event.name}</h4>
                          <p className="text-sm text-muted-foreground">
                            {event.date} • {event.public} pessoas
                          </p>
                        </div>
                        <div className="text-right">
                          <div className="text-sm font-medium">Avaliação</div>
                          <div className="text-sm text-muted-foreground">{event.rating}/5.0</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Métricas de Performance</CardTitle>
                  <CardDescription>Indicadores de sucesso dos eventos</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between mb-2">
                        <span className="text-sm font-medium">Satisfação do Público</span>
                        <span className="text-sm">4.7/5.0</span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-2">
                        <div className="bg-green-500 h-2 rounded-full" style={{ width: "94%" }}></div>
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between mb-2">
                        <span className="text-sm font-medium">Eficiência Operacional</span>
                        <span className="text-sm">87%</span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-2">
                        <div className="bg-blue-500 h-2 rounded-full" style={{ width: "87%" }}></div>
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between mb-2">
                        <span className="text-sm font-medium">Cumprimento de Prazos</span>
                        <span className="text-sm">92%</span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-2">
                        <div className="bg-purple-500 h-2 rounded-full" style={{ width: "92%" }}></div>
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between mb-2">
                        <span className="text-sm font-medium">Controle de Custos</span>
                        <span className="text-sm">78%</span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-2">
                        <div className="bg-orange-500 h-2 rounded-full" style={{ width: "78%" }}></div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Lições Aprendidas</CardTitle>
                <CardDescription>Insights para melhorar futuros eventos</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    {
                      evento: "Virada Cultural 2024",
                      licao: "Aumentar número de banheiros químicos em 30%",
                      implementado: true,
                    },
                    {
                      evento: "Parada LGBT 2024",
                      licao: "Melhorar sinalização de rotas alternativas",
                      implementado: true,
                    },
                    {
                      evento: "Réveillon 2023",
                      licao: "Ampliar cobertura de rede móvel temporária",
                      implementado: false,
                    },
                    {
                      evento: "Carnaval 2024",
                      licao: "Coordenar melhor com aplicativos de transporte",
                      implementado: false,
                    },
                  ].map((item, index) => (
                    <div key={index} className="flex items-start gap-3 p-3 border rounded-lg">
                      <div
                        className={`w-2 h-2 rounded-full mt-2 ${item.implementado ? "bg-green-500" : "bg-yellow-500"}`}
                      ></div>
                      <div className="flex-1">
                        <h4 className="font-medium">{item.evento}</h4>
                        <p className="text-sm text-muted-foreground">{item.licao}</p>
                      </div>
                      <Badge variant={item.implementado ? "default" : "secondary"}>
                        {item.implementado ? "Implementado" : "Pendente"}
                      </Badge>
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
