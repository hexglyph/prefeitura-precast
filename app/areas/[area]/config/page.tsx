import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Save, Settings, Target, AlertTriangle } from "lucide-react"
import Link from "next/link"

const policies = [
  {
    id: 1,
    name: "Patrulhamento Inteligente",
    description: "Algoritmo de otimização de rotas baseado em dados históricos",
    status: "active",
    impact: "Alto",
    lastUpdated: "15/09/2024",
  },
  {
    id: 2,
    name: "Resposta Rápida",
    description: "Protocolo de resposta em menos de 10 minutos para emergências",
    status: "active",
    impact: "Crítico",
    lastUpdated: "10/09/2024",
  },
  {
    id: 3,
    name: "Prevenção Comunitária",
    description: "Programa de engajamento com a comunidade local",
    status: "draft",
    impact: "Médio",
    lastUpdated: "08/09/2024",
  },
]

const metrics = [
  { name: "Tempo Máximo de Resposta", value: "10", unit: "minutos" },
  { name: "Meta de Satisfação", value: "85", unit: "%" },
  { name: "Cobertura Mínima", value: "95", unit: "%" },
  { name: "Efetivo por 1000 hab", value: "3.2", unit: "policiais" },
]

export default function AreaConfigPage({ params }: { params: { area: string } }) {
  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-card">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href={`/areas/${params.area}`}>
                <Button variant="outline" size="sm">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Voltar
                </Button>
              </Link>
              <div className="flex items-center gap-3">
                <Settings className="h-8 w-8 text-blue-500" />
                <div>
                  <h1 className="text-3xl font-bold text-foreground">Configurações - Segurança</h1>
                  <p className="text-muted-foreground">Políticas, metas e parâmetros da área</p>
                </div>
              </div>
            </div>
            <Button className="flex items-center gap-2">
              <Save className="h-4 w-4" />
              Salvar Alterações
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-6">
        <Tabs defaultValue="policies" className="space-y-6">
          <TabsList>
            <TabsTrigger value="policies">Políticas</TabsTrigger>
            <TabsTrigger value="metrics">Metas</TabsTrigger>
            <TabsTrigger value="alerts">Alertas</TabsTrigger>
            <TabsTrigger value="integration">Integração IA</TabsTrigger>
          </TabsList>

          <TabsContent value="policies" className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold">Políticas Ativas</h2>
                <p className="text-muted-foreground">Medidas e protocolos implementados</p>
              </div>
              <Button>Nova Política</Button>
            </div>

            <div className="grid gap-6">
              {policies.map((policy) => (
                <Card key={policy.id}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="flex items-center gap-2">
                          <Target className="h-5 w-5" />
                          {policy.name}
                        </CardTitle>
                        <CardDescription>{policy.description}</CardDescription>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant={policy.status === "active" ? "default" : "secondary"}>
                          {policy.status === "active" ? "Ativa" : "Rascunho"}
                        </Badge>
                        <Badge
                          variant={
                            policy.impact === "Crítico"
                              ? "destructive"
                              : policy.impact === "Alto"
                                ? "default"
                                : "secondary"
                          }
                        >
                          {policy.impact}
                        </Badge>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Última atualização: {policy.lastUpdated}</span>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          Editar
                        </Button>
                        <Button variant="outline" size="sm">
                          Histórico
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="metrics" className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold mb-2">Metas e Indicadores</h2>
              <p className="text-muted-foreground">Defina os parâmetros de performance da área</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {metrics.map((metric, index) => (
                <Card key={index}>
                  <CardHeader>
                    <CardTitle className="text-lg">{metric.name}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center gap-4">
                      <Input type="number" value={metric.value} className="w-24" />
                      <span className="text-sm text-muted-foreground">{metric.unit}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Switch id={`alert-${index}`} />
                      <Label htmlFor={`alert-${index}`} className="text-sm">
                        Alertar quando não atingir meta
                      </Label>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="alerts" className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold mb-2">Configuração de Alertas</h2>
              <p className="text-muted-foreground">Configure quando e como receber notificações</p>
            </div>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5" />
                  Critérios de Alerta
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="text-base">Variação acima de 20%</Label>
                      <p className="text-sm text-muted-foreground">Alertar quando indicadores variarem mais que 20%</p>
                    </div>
                    <Switch defaultChecked />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="text-base">Metas não atingidas</Label>
                      <p className="text-sm text-muted-foreground">Alertar quando metas mensais não forem cumpridas</p>
                    </div>
                    <Switch defaultChecked />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="text-base">Padrões anômalos</Label>
                      <p className="text-sm text-muted-foreground">IA detecta comportamentos incomuns nos dados</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                </div>

                <div className="space-y-4">
                  <Label className="text-base">Frequência de Relatórios</Label>
                  <div className="grid grid-cols-3 gap-4">
                    <Button variant="outline">Diário</Button>
                    <Button>Semanal</Button>
                    <Button variant="outline">Mensal</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="integration" className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold mb-2">Integração com IA</h2>
              <p className="text-muted-foreground">Configure como a IA analisa e sugere ações</p>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Parâmetros da IA</CardTitle>
                <CardDescription>Ajuste como a IA processa os dados desta área</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="sensitivity">Sensibilidade de Detecção</Label>
                    <Input id="sensitivity" type="range" min="1" max="10" defaultValue="7" className="mt-2" />
                    <p className="text-xs text-muted-foreground mt-1">
                      Maior sensibilidade = mais alertas, menor = apenas mudanças significativas
                    </p>
                  </div>

                  <div>
                    <Label htmlFor="context">Contexto Adicional</Label>
                    <Textarea
                      id="context"
                      placeholder="Forneça contexto específico sobre esta área para melhorar as análises da IA..."
                      className="mt-2"
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="text-base">Sugestões Automáticas</Label>
                      <p className="text-sm text-muted-foreground">
                        IA sugere ações baseadas nos padrões identificados
                      </p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
