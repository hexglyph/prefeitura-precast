"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AlertTriangle, Bell, CheckCircle, Clock, Settings, TrendingUp } from "lucide-react"

const alertsData = [
  {
    id: 1,
    tipo: "Crítico",
    area: "Segurança",
    subprefeitura: "Centro",
    indicador: "Taxa de Criminalidade",
    valor: 15.2,
    threshold: 12.0,
    variacao: "+27%",
    timestamp: "2024-01-15 14:30",
    status: "ativo",
    descricao: "Aumento significativo na taxa de criminalidade na região central",
  },
  {
    id: 2,
    tipo: "Alerta",
    area: "Trânsito",
    subprefeitura: "Zona Sul",
    indicador: "Tempo Médio de Deslocamento",
    valor: 45.8,
    threshold: 40.0,
    variacao: "+14%",
    timestamp: "2024-01-15 13:15",
    status: "ativo",
    descricao: "Congestionamento acima do normal na Zona Sul",
  },
  {
    id: 3,
    tipo: "Informativo",
    area: "Saúde",
    subprefeitura: "Zona Norte",
    indicador: "Ocupação UTI",
    valor: 78.5,
    threshold: 80.0,
    variacao: "+5%",
    timestamp: "2024-01-15 12:00",
    status: "resolvido",
    descricao: "Ocupação de UTI próxima ao limite na Zona Norte",
  },
]

const configuracoes = [
  { area: "Segurança", indicador: "Taxa de Criminalidade", threshold: 12.0, unidade: "por 100k hab" },
  { area: "Saúde", indicador: "Ocupação UTI", threshold: 80.0, unidade: "%" },
  { area: "Educação", indicador: "Taxa de Evasão", threshold: 15.0, unidade: "%" },
  { area: "Trânsito", indicador: "Tempo Médio", threshold: 40.0, unidade: "min" },
]

export default function AlertasPage() {
  const [filtroStatus, setFiltroStatus] = useState("todos")
  const [filtroTipo, setFiltroTipo] = useState("todos")

  const alertasFiltrados = alertsData.filter((alerta) => {
    const statusMatch = filtroStatus === "todos" || alerta.status === filtroStatus
    const tipoMatch = filtroTipo === "todos" || alerta.tipo.toLowerCase() === filtroTipo
    return statusMatch && tipoMatch
  })

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "ativo":
        return <AlertTriangle className="h-4 w-4 text-red-500" />
      case "resolvido":
        return <CheckCircle className="h-4 w-4 text-green-500" />
      default:
        return <Clock className="h-4 w-4 text-yellow-500" />
    }
  }

  const getTipoColor = (tipo: string) => {
    switch (tipo) {
      case "Crítico":
        return "destructive"
      case "Alerta":
        return "default"
      case "Informativo":
        return "secondary"
      default:
        return "outline"
    }
  }

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Sistema de Alertas e Monitoramento</h1>
          <p className="text-muted-foreground">Monitoramento inteligente de indicadores municipais</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Bell className="h-4 w-4 mr-2" />
            Configurar Notificações
          </Button>
          <Button size="sm">
            <Settings className="h-4 w-4 mr-2" />
            Configurações
          </Button>
        </div>
      </div>

      <Tabs defaultValue="alertas" className="space-y-6">
        <TabsList>
          <TabsTrigger value="alertas">Alertas Ativos</TabsTrigger>
          <TabsTrigger value="configuracoes">Configurações</TabsTrigger>
          <TabsTrigger value="historico">Histórico</TabsTrigger>
          <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
        </TabsList>

        <TabsContent value="alertas" className="space-y-6">
          <div className="flex gap-4">
            <Select value={filtroStatus} onValueChange={setFiltroStatus}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Filtrar por status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="todos">Todos os Status</SelectItem>
                <SelectItem value="ativo">Ativos</SelectItem>
                <SelectItem value="resolvido">Resolvidos</SelectItem>
              </SelectContent>
            </Select>

            <Select value={filtroTipo} onValueChange={setFiltroTipo}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Filtrar por tipo" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="todos">Todos os Tipos</SelectItem>
                <SelectItem value="crítico">Crítico</SelectItem>
                <SelectItem value="alerta">Alerta</SelectItem>
                <SelectItem value="informativo">Informativo</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid gap-4">
            {alertasFiltrados.map((alerta) => (
              <Card key={alerta.id} className="border-l-4 border-l-red-500">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      {getStatusIcon(alerta.status)}
                      <div>
                        <CardTitle className="text-lg">{alerta.indicador}</CardTitle>
                        <CardDescription>
                          {alerta.area} - {alerta.subprefeitura}
                        </CardDescription>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant={getTipoColor(alerta.tipo)}>{alerta.tipo}</Badge>
                      <Badge variant="outline">{alerta.status}</Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div>
                      <Label className="text-sm text-muted-foreground">Valor Atual</Label>
                      <p className="text-2xl font-bold">{alerta.valor}</p>
                    </div>
                    <div>
                      <Label className="text-sm text-muted-foreground">Limite</Label>
                      <p className="text-lg">{alerta.threshold}</p>
                    </div>
                    <div>
                      <Label className="text-sm text-muted-foreground">Variação</Label>
                      <div className="flex items-center gap-1">
                        <TrendingUp className="h-4 w-4 text-red-500" />
                        <p className="text-lg font-semibold text-red-500">{alerta.variacao}</p>
                      </div>
                    </div>
                    <div>
                      <Label className="text-sm text-muted-foreground">Detectado em</Label>
                      <p className="text-sm">{alerta.timestamp}</p>
                    </div>
                  </div>
                  <div className="mt-4">
                    <p className="text-sm text-muted-foreground mb-2">Descrição:</p>
                    <p>{alerta.descricao}</p>
                  </div>
                  <div className="flex gap-2 mt-4">
                    <Button size="sm">Investigar</Button>
                    <Button variant="outline" size="sm">
                      Marcar como Resolvido
                    </Button>
                    <Button variant="ghost" size="sm">
                      Ver Histórico
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="configuracoes" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Configuração de Limites</CardTitle>
              <CardDescription>Defina os thresholds para cada indicador</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {configuracoes.map((config, index) => (
                  <div key={index} className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end p-4 border rounded-lg">
                    <div>
                      <Label>Área</Label>
                      <p className="font-medium">{config.area}</p>
                    </div>
                    <div>
                      <Label>Indicador</Label>
                      <p className="font-medium">{config.indicador}</p>
                    </div>
                    <div>
                      <Label htmlFor={`threshold-${index}`}>Limite de Alerta</Label>
                      <div className="flex gap-2">
                        <Input
                          id={`threshold-${index}`}
                          type="number"
                          defaultValue={config.threshold}
                          className="w-24"
                        />
                        <span className="text-sm text-muted-foreground self-center">{config.unidade}</span>
                      </div>
                    </div>
                    <Button size="sm">Salvar</Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="dashboard" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Alertas Ativos</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-red-500">12</div>
                <p className="text-xs text-muted-foreground">+3 nas últimas 24h</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Críticos</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-red-600">3</div>
                <p className="text-xs text-muted-foreground">Requer ação imediata</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Resolvidos Hoje</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-500">8</div>
                <p className="text-xs text-muted-foreground">Tempo médio: 2.5h</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Eficiência</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">87%</div>
                <p className="text-xs text-muted-foreground">Alertas resolvidos</p>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Áreas com Mais Alertas</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {["Segurança", "Trânsito", "Saúde", "Educação"].map((area, index) => (
                  <div key={area} className="flex items-center justify-between">
                    <span>{area}</span>
                    <div className="flex items-center gap-2">
                      <div className="w-32 bg-gray-200 rounded-full h-2">
                        <div className="bg-red-500 h-2 rounded-full" style={{ width: `${(4 - index) * 25}%` }}></div>
                      </div>
                      <span className="text-sm font-medium">{4 - index}</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
