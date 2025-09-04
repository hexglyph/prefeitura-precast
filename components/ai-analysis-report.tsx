"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { TrendingUp, TrendingDown, AlertTriangle, CheckCircle, Target, Lightbulb } from "lucide-react"

interface AnalysisReportProps {
  context: {
    type: string
    name: string
    data?: any
  }
}

export function AIAnalysisReport({ context }: AnalysisReportProps) {
  // Generate contextual analysis based on the context type
  const generateAnalysis = () => {
    const baseAnalysis = {
      strengths: [] as Array<{ title: string; description: string; impact: string }>,
      weaknesses: [] as Array<{ title: string; description: string; impact: string }>,
      opportunities: [] as Array<{ title: string; description: string; priority: string }>,
      threats: [] as Array<{ title: string; description: string; urgency: string }>,
      recommendations: [] as Array<{ title: string; description: string; timeline: string }>,
    }

    if (context.type === "geral") {
      return {
        ...baseAnalysis,
        strengths: [
          {
            title: "Crescimento Populacional Controlado",
            description: "Aumento de 0.8% na população demonstra crescimento sustentável e planejado",
            impact: "Alto",
          },
          {
            title: "Índice de Qualidade Elevado",
            description: "Score de 8.2 indica alta satisfação dos cidadãos com serviços públicos",
            impact: "Alto",
          },
          {
            title: "Eficiência Operacional",
            description: "87% de eficiência geral com tendência de melhoria (+2%)",
            impact: "Médio",
          },
        ],
        weaknesses: [
          {
            title: "Gestão de Alertas",
            description: "12 alertas ativos indicam necessidade de resposta mais ágil",
            impact: "Médio",
          },
          {
            title: "Desempenho do Trânsito",
            description: "Score de 6.9 é o mais baixo entre todas as áreas",
            impact: "Alto",
          },
        ],
        opportunities: [
          {
            title: "Integração de Dados",
            description: "Potencial para melhorar correlação entre diferentes secretarias",
            priority: "Alta",
          },
          {
            title: "Automação de Processos",
            description: "IA pode automatizar 40% das tarefas administrativas",
            priority: "Média",
          },
        ],
        threats: [
          {
            title: "Eventos de Grande Porte",
            description: "Rock in Rio pode sobrecarregar infraestrutura urbana",
            urgency: "Imediata",
          },
        ],
        recommendations: [
          {
            title: "Implementar Centro de Comando Unificado",
            description: "Centralizar monitoramento de todas as áreas para resposta mais rápida",
            timeline: "30 dias",
          },
          {
            title: "Otimizar Fluxo de Trânsito",
            description: "Usar IA para ajustar semáforos em tempo real",
            timeline: "60 dias",
          },
        ],
      }
    }

    if (context.type === "area") {
      return {
        ...baseAnalysis,
        strengths: [
          {
            title: "Performance Consistente",
            description: `Área de ${context.name} mantém indicadores estáveis`,
            impact: "Médio",
          },
        ],
        weaknesses: [
          {
            title: "Integração Limitada",
            description: "Pouca sinergia com outras secretarias",
            impact: "Médio",
          },
        ],
        opportunities: [
          {
            title: "Digitalização de Processos",
            description: "Modernizar atendimento ao cidadão",
            priority: "Alta",
          },
        ],
        threats: [
          {
            title: "Orçamento Limitado",
            description: "Restrições podem impactar qualidade dos serviços",
            urgency: "Média",
          },
        ],
        recommendations: [
          {
            title: "Implementar Atendimento Digital",
            description: "Reduzir filas e melhorar experiência do cidadão",
            timeline: "45 dias",
          },
        ],
      }
    }

    if (context.type === "subprefeitura") {
      return {
        ...baseAnalysis,
        strengths: [
          {
            title: "Proximidade com Cidadão",
            description: `${context.name} tem forte conexão com comunidade local`,
            impact: "Alto",
          },
        ],
        weaknesses: [
          {
            title: "Recursos Limitados",
            description: "Necessita de mais autonomia para decisões locais",
            impact: "Médio",
          },
        ],
        opportunities: [
          {
            title: "Parcerias Locais",
            description: "Potencial para colaboração com empresas da região",
            priority: "Média",
          },
        ],
        threats: [
          {
            title: "Desigualdade Regional",
            description: "Diferenças socioeconômicas podem gerar tensões",
            urgency: "Média",
          },
        ],
        recommendations: [
          {
            title: "Programa de Desenvolvimento Local",
            description: "Criar iniciativas específicas para a região",
            timeline: "90 dias",
          },
        ],
      }
    }

    return baseAnalysis
  }

  const analysis = generateAnalysis()

  return (
    <div className="space-y-6">
      {/* Executive Summary */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5" />
            Resumo Executivo
          </CardTitle>
          <CardDescription>
            Análise completa gerada pela IA para {context.type === "geral" ? "São Paulo" : context.name}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-green-50 dark:bg-green-950 rounded-lg">
              <div className="text-2xl font-bold text-green-600">{analysis.strengths.length}</div>
              <div className="text-sm text-green-700 dark:text-green-300">Pontos Fortes</div>
            </div>
            <div className="text-center p-4 bg-red-50 dark:bg-red-950 rounded-lg">
              <div className="text-2xl font-bold text-red-600">{analysis.weaknesses.length}</div>
              <div className="text-sm text-red-700 dark:text-red-300">Pontos Fracos</div>
            </div>
            <div className="text-center p-4 bg-blue-50 dark:bg-blue-950 rounded-lg">
              <div className="text-2xl font-bold text-blue-600">{analysis.opportunities.length}</div>
              <div className="text-sm text-blue-700 dark:text-blue-300">Oportunidades</div>
            </div>
            <div className="text-center p-4 bg-orange-50 dark:bg-orange-950 rounded-lg">
              <div className="text-2xl font-bold text-orange-600">{analysis.threats.length}</div>
              <div className="text-sm text-orange-700 dark:text-orange-300">Ameaças</div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Strengths */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-green-600">
              <TrendingUp className="h-5 w-5" />
              Pontos Fortes
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {analysis.strengths.map((strength, index) => (
              <div key={index} className="border-l-4 border-green-500 pl-4">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium">{strength.title}</h4>
                  <Badge variant="secondary" className="bg-green-100 text-green-800">
                    {strength.impact}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground">{strength.description}</p>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Weaknesses */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-red-600">
              <TrendingDown className="h-5 w-5" />
              Pontos Fracos
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {analysis.weaknesses.map((weakness, index) => (
              <div key={index} className="border-l-4 border-red-500 pl-4">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium">{weakness.title}</h4>
                  <Badge variant="destructive" className="bg-red-100 text-red-800">
                    {weakness.impact}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground">{weakness.description}</p>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Opportunities */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-blue-600">
              <CheckCircle className="h-5 w-5" />
              Oportunidades
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {analysis.opportunities.map((opportunity, index) => (
              <div key={index} className="border-l-4 border-blue-500 pl-4">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium">{opportunity.title}</h4>
                  <Badge variant="outline" className="border-blue-500 text-blue-600">
                    {opportunity.priority}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground">{opportunity.description}</p>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Threats */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-orange-600">
              <AlertTriangle className="h-5 w-5" />
              Ameaças
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {analysis.threats.map((threat, index) => (
              <div key={index} className="border-l-4 border-orange-500 pl-4">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium">{threat.title}</h4>
                  <Badge variant="outline" className="border-orange-500 text-orange-600">
                    {threat.urgency}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground">{threat.description}</p>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Recommendations */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Lightbulb className="h-5 w-5 text-yellow-500" />
            Recomendações da IA
          </CardTitle>
          <CardDescription>Ações prioritárias sugeridas para melhoria</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {analysis.recommendations.map((rec, index) => (
              <div key={index} className="flex items-start gap-4 p-4 border rounded-lg">
                <div className="flex-shrink-0 w-8 h-8 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
                  <span className="text-sm font-bold text-blue-600">{index + 1}</span>
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium">{rec.title}</h4>
                    <Badge variant="outline">{rec.timeline}</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">{rec.description}</p>
                </div>
                <Button variant="outline" size="sm">
                  Implementar
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
