"use client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  Brain,
  MessageSquare,
  TrendingUp,
  Target,
  AlertTriangle,
  Lightbulb,
  BarChart3,
  Users,
  Send,
  Mic,
  FileText,
} from "lucide-react"
import Link from "next/link"

const aiInsights = [
  {
    id: 1,
    title: "Padrão de Criminalidade Identificado",
    description: "Aumento de 23% em furtos durante eventos esportivos nos finais de semana na Zona Leste",
    confidence: 94,
    impact: "Alto",
    area: "Segurança",
    recommendation: "Aumentar patrulhamento em 15% nas proximidades de estádios durante jogos",
    timestamp: "2h atrás",
  },
  {
    id: 2,
    title: "Otimização de Transporte Público",
    description: "Análise de fluxo sugere nova linha de ônibus entre Zona Norte e Centro",
    confidence: 87,
    impact: "Médio",
    area: "Transporte",
    recommendation: "Implementar linha expressa no horário de pico (7h-9h e 17h-19h)",
    timestamp: "4h atrás",
  },
  {
    id: 3,
    title: "Eficiência na Coleta de Lixo",
    description: "Rotas otimizadas podem reduzir tempo de coleta em 18% na Zona Sul",
    confidence: 91,
    impact: "Médio",
    area: "Limpeza",
    recommendation: "Reorganizar rotas baseado em densidade populacional e geração de resíduos",
    timestamp: "6h atrás",
  },
  {
    id: 4,
    title: "Demanda por Serviços de Saúde",
    description: "Previsão de aumento de 12% na demanda por consultas pediátricas no próximo mês",
    confidence: 89,
    impact: "Alto",
    area: "Saúde",
    recommendation: "Ampliar horários de atendimento pediátrico em 3 UBS da Zona Norte",
    timestamp: "8h atrás",
  },
]

const chatHistory = [
  {
    id: 1,
    type: "user",
    message: "Qual é a situação atual da segurança na Zona Leste?",
    timestamp: "10:30",
  },
  {
    id: 2,
    type: "ai",
    message:
      "Com base nos dados mais recentes, a Zona Leste apresenta um aumento de 15% nas ocorrências policiais comparado ao mês anterior. Os principais tipos de incidentes são furtos (45%) e roubos (23%). Recomendo implementar 3 novas bases móveis na região e aumentar o patrulhamento nos horários de pico (18h-22h).",
    timestamp: "10:31",
  },
  {
    id: 3,
    type: "user",
    message: "Quais são as áreas mais críticas?",
    timestamp: "10:32",
  },
  {
    id: 4,
    type: "ai",
    message:
      "As áreas mais críticas na Zona Leste são: 1) Itaquera (proximidade ao estádio), 2) São Miguel Paulista (alta densidade populacional), 3) Cidade Tiradentes (indicadores socioeconômicos). Sugiro priorizar essas regiões para as novas bases móveis.",
    timestamp: "10:33",
  },
]

const aiMetrics = [
  { label: "Análises Realizadas", value: "2.847", change: "+12%" },
  { label: "Padrões Identificados", value: "156", change: "+8%" },
  { label: "Recomendações Ativas", value: "43", change: "+15%" },
  { label: "Precisão Média", value: "91.2%", change: "+2.1%" },
]

export default function AIPage() {
  const [generating, setGenerating] = useState(false)
  const [generated, setGenerated] = useState<string | null>(null)
  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-card">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Brain className="h-8 w-8 text-blue-500" />
              <div>
                <h1 className="text-3xl font-bold text-foreground">IA Precast</h1>
                <p className="text-muted-foreground">Inteligência Artificial para Gestão Municipal</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                Azure OpenAI Ativo
              </Badge>
              <Link href="/">
                <Button variant="outline">Dashboard Principal</Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-6">
        {/* AI Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {aiMetrics.map((metric, index) => (
            <Card key={index}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{metric.label}</CardTitle>
                <Brain className="h-4 w-4 text-blue-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{metric.value}</div>
                <p className="text-xs text-green-600">{metric.change} vs mês anterior</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <Tabs defaultValue="insights" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="insights">Insights</TabsTrigger>
            <TabsTrigger value="chat">Chat IA</TabsTrigger>
            <TabsTrigger value="analytics">Análises</TabsTrigger>
            <TabsTrigger value="config">Configurações</TabsTrigger>
          </TabsList>

          <TabsContent value="insights" className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold">Insights da IA</h2>
                <p className="text-muted-foreground">Padrões e recomendações identificados automaticamente</p>
              </div>
              <Button
                onClick={async () => {
                  try {
                    setGenerating(true)
                    setGenerated(null)
                    const res = await fetch("/api/insights", {
                      method: "POST",
                      headers: { "Content-Type": "application/json" },
                      body: JSON.stringify({ scope: "geral", input: { metrics: aiMetrics } }),
                    })
                    const data = await res.json()
                    setGenerated(data.output || "")
                  } catch (e) {
                    setGenerated("Falha ao gerar relatório.")
                  } finally {
                    setGenerating(false)
                  }
                }}
                disabled={generating}
              >
                <TrendingUp className="h-4 w-4 mr-2" />
                {generating ? "Gerando..." : "Gerar Relatório"}
              </Button>
            </div>

            <div className="grid gap-6">
              {generated && (
                <Card className="border-blue-200">
                  <CardHeader>
                    <CardTitle>Insight Gerado</CardTitle>
                    <CardDescription>Produzido pela Azure OpenAI</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <pre className="whitespace-pre-wrap text-sm">{generated}</pre>
                  </CardContent>
                </Card>
              )}
              {aiInsights.map((insight) => (
                <Card key={insight.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <Lightbulb className="h-5 w-5 text-yellow-500" />
                          <CardTitle className="text-lg">{insight.title}</CardTitle>
                          <Badge variant="outline">{insight.area}</Badge>
                        </div>
                        <CardDescription className="text-base">{insight.description}</CardDescription>
                      </div>
                      <div className="flex flex-col items-end gap-2">
                        <Badge
                          variant={
                            insight.impact === "Alto"
                              ? "destructive"
                              : insight.impact === "Médio"
                                ? "default"
                                : "secondary"
                          }
                        >
                          Impacto {insight.impact}
                        </Badge>
                        <div className="text-sm text-muted-foreground">Confiança: {insight.confidence}%</div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="p-4 bg-blue-50 dark:bg-blue-950 rounded-lg">
                        <h4 className="font-medium text-blue-900 dark:text-blue-100 mb-2 flex items-center gap-2">
                          <Target className="h-4 w-4" />
                          Recomendação
                        </h4>
                        <p className="text-sm text-blue-700 dark:text-blue-300">{insight.recommendation}</p>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">{insight.timestamp}</span>
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline">
                            Mais Detalhes
                          </Button>
                          <Button size="sm">Implementar</Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="chat" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <Card className="h-[600px] flex flex-col">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <MessageSquare className="h-5 w-5" />
                      Chat com IA Precast
                    </CardTitle>
                    <CardDescription>Converse com a IA para obter insights e análises em tempo real</CardDescription>
                  </CardHeader>
                  <CardContent className="flex-1 flex flex-col">
                    <ScrollArea className="flex-1 pr-4">
                      <div className="space-y-4">
                        {chatHistory.map((message) => (
                          <div
                            key={message.id}
                            className={`flex ${message.type === "user" ? "justify-end" : "justify-start"}`}
                          >
                            <div
                              className={`max-w-[80%] p-3 rounded-lg ${
                                message.type === "user" ? "bg-blue-500 text-white" : "bg-muted"
                              }`}
                            >
                              <p className="text-sm">{message.message}</p>
                              <span className="text-xs opacity-70 mt-1 block">{message.timestamp}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </ScrollArea>
                    <div className="flex gap-2 mt-4">
                      <Input placeholder="Digite sua pergunta sobre a cidade..." className="flex-1" />
                      <Button size="icon">
                        <Send className="h-4 w-4" />
                      </Button>
                      <Button size="icon" variant="outline">
                        <Mic className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Sugestões de Perguntas</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {[
                        "Como está a situação do trânsito hoje?",
                        "Quais áreas precisam de mais atenção?",
                        "Previsão de demanda para os próximos dias",
                        "Análise de eficiência dos serviços públicos",
                        "Recomendações para otimizar recursos",
                      ].map((suggestion, index) => (
                        <Button
                          key={index}
                          variant="ghost"
                          className="w-full text-left justify-start text-sm h-auto p-2"
                        >
                          {suggestion}
                        </Button>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Status da IA</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-sm">Modelo:</span>
                        <span className="text-sm font-medium">GPT-5 Azure</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">Última Atualização:</span>
                        <span className="text-sm font-medium">2min atrás</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">Fontes de Dados:</span>
                        <span className="text-sm font-medium">47 ativas</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">Processamento:</span>
                        <Badge variant="outline" className="text-xs">
                          Tempo Real
                        </Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold mb-2">Análises Avançadas</h2>
              <p className="text-muted-foreground">Relatórios e análises gerados pela IA</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="h-5 w-5 text-blue-500" />
                    Análise de Performance
                  </CardTitle>
                  <CardDescription>Avaliação geral das áreas municipais</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Última execução:</span>
                      <span>Hoje, 08:00</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Próxima:</span>
                      <span>Amanhã, 08:00</span>
                    </div>
                    <Button className="w-full mt-4" size="sm">
                      Ver Relatório
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="h-5 w-5 text-green-500" />
                    Análise Demográfica
                  </CardTitle>
                  <CardDescription>Padrões populacionais e migração</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Última execução:</span>
                      <span>Ontem, 20:00</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Próxima:</span>
                      <span>Hoje, 20:00</span>
                    </div>
                    <Button className="w-full mt-4" size="sm">
                      Ver Relatório
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <AlertTriangle className="h-5 w-5 text-orange-500" />
                    Detecção de Anomalias
                  </CardTitle>
                  <CardDescription>Identificação de padrões incomuns</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Última execução:</span>
                      <span>30min atrás</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Próxima:</span>
                      <span>Em 30min</span>
                    </div>
                    <Button className="w-full mt-4" size="sm">
                      Ver Relatório
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Relatórios Recentes</CardTitle>
                <CardDescription>Análises geradas automaticamente pela IA</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { title: "Relatório Semanal de Segurança", date: "15/09/2024", size: "2.3 MB", type: "PDF" },
                    { title: "Análise de Eficiência Energética", date: "14/09/2024", size: "1.8 MB", type: "PDF" },
                    { title: "Projeção Demográfica 2025", date: "13/09/2024", size: "3.1 MB", type: "PDF" },
                    { title: "Otimização de Rotas de Transporte", date: "12/09/2024", size: "1.5 MB", type: "PDF" },
                  ].map((report, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <FileText className="h-5 w-5 text-blue-500" />
                        <div>
                          <h4 className="font-medium">{report.title}</h4>
                          <p className="text-sm text-muted-foreground">
                            {report.date} • {report.size}
                          </p>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Badge variant="outline">{report.type}</Badge>
                        <Button size="sm" variant="outline">
                          Download
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="config" className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold mb-2">Configurações da IA</h2>
              <p className="text-muted-foreground">Ajuste os parâmetros e comportamento da inteligência artificial</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Parâmetros Gerais</CardTitle>
                  <CardDescription>Configurações básicas do sistema de IA</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="text-sm font-medium">Frequência de Análise</label>
                    <div className="grid grid-cols-3 gap-2 mt-2">
                      <Button variant="outline" size="sm">
                        Tempo Real
                      </Button>
                      <Button size="sm">Horária</Button>
                      <Button variant="outline" size="sm">
                        Diária
                      </Button>
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-medium">Sensibilidade de Alertas</label>
                    <Input type="range" min="1" max="10" defaultValue="7" className="mt-2" />
                    <div className="flex justify-between text-xs text-muted-foreground mt-1">
                      <span>Baixa</span>
                      <span>Alta</span>
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-medium">Contexto Adicional</label>
                    <Textarea
                      placeholder="Forneça contexto específico sobre São Paulo para melhorar as análises..."
                      className="mt-2"
                    />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Fontes de Dados</CardTitle>
                  <CardDescription>Integração com sistemas externos</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { name: "Sistema de Segurança", status: "Ativo", lastSync: "2min" },
                      { name: "CET - Trânsito", status: "Ativo", lastSync: "1min" },
                      { name: "Secretaria de Saúde", status: "Ativo", lastSync: "5min" },
                      { name: "Secretaria de Educação", status: "Ativo", lastSync: "10min" },
                      { name: "INMET - Clima", status: "Ativo", lastSync: "15min" },
                      { name: "IBGE - Demografia", status: "Inativo", lastSync: "2h" },
                    ].map((source, index) => (
                      <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                        <div>
                          <h4 className="font-medium">{source.name}</h4>
                          <p className="text-sm text-muted-foreground">Última sincronização: {source.lastSync}</p>
                        </div>
                        <Badge variant={source.status === "Ativo" ? "default" : "destructive"}>{source.status}</Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Configurações Avançadas</CardTitle>
                <CardDescription>Parâmetros técnicos do modelo de IA</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-medium">Modelo de IA</label>
                      <div className="mt-2">
                        <Button variant="outline" className="w-full justify-start bg-transparent">
                          Azure OpenAI GPT-5
                        </Button>
                      </div>
                    </div>

                    <div>
                      <label className="text-sm font-medium">Temperatura</label>
                      <Input type="number" step="0.1" min="0" max="2" defaultValue="0.7" className="mt-2" />
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-medium">Max Tokens</label>
                      <Input type="number" defaultValue="2048" className="mt-2" />
                    </div>

                    <div>
                      <label className="text-sm font-medium">Top P</label>
                      <Input type="number" step="0.1" min="0" max="1" defaultValue="0.9" className="mt-2" />
                    </div>
                  </div>
                </div>

                <div className="flex gap-2 mt-6">
                  <Button>Salvar Configurações</Button>
                  <Button variant="outline">Restaurar Padrões</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
