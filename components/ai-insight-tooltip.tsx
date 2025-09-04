"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Zap, X, TrendingUp, AlertTriangle, CheckCircle } from "lucide-react"

interface AIInsightTooltipProps {
  title: string
  value: string | number
  context: string
  type: "metric" | "alert" | "performance" | "event"
}

export function AIInsightTooltip({ title, value, context, type }: AIInsightTooltipProps) {
  const [showInsight, setShowInsight] = useState(false)

  const generateInsight = () => {
    const insights = {
      População: {
        explanation:
          "A população de São Paulo cresceu 0.8% comparado ao ano anterior, indicando crescimento demográfico controlado.",
        reason: "Crescimento natural e migração interna equilibrados. Taxa dentro da média histórica da cidade.",
        action:
          "Monitorar demanda por serviços públicos. Planejar expansão de infraestrutura nas regiões de maior crescimento.",
        severity: "normal",
      },
      "Índice de Qualidade": {
        explanation: "Índice de 8.2 representa boa qualidade dos serviços municipais, com melhoria de 0.3 pontos.",
        reason: "Melhorias em educação (+0.4) e meio ambiente (+0.2) compensaram leve queda na segurança (-0.1).",
        action: "Manter investimentos em educação e meio ambiente. Reforçar estratégias de segurança pública.",
        severity: "good",
      },
      "Alertas Ativos": {
        explanation: "12 alertas ativos sendo 3 críticos relacionados a trânsito e segurança.",
        reason: "Aumento sazonal de crimes patrimoniais e congestionamentos devido a eventos programados.",
        action: "Reforçar policiamento nas áreas críticas. Implementar rotas alternativas durante eventos.",
        severity: "warning",
      },
      "Eficiência Geral": {
        explanation: "87% de eficiência representa bom desempenho operacional com melhoria de 2%.",
        reason: "Otimização de processos digitais e melhor coordenação entre secretarias.",
        action: "Expandir digitalização para áreas com menor eficiência. Compartilhar boas práticas.",
        severity: "good",
      },
      Segurança: {
        explanation: "Score 7.8 com leve melhoria. Crimes patrimoniais aumentaram 15% na Zona Sul.",
        reason: "Redução de policiamento em algumas regiões devido a realocação para eventos.",
        action: "Reforçar patrulhamento na Zona Sul. Implementar videomonitoramento inteligente.",
        severity: "warning",
      },
      Educação: {
        explanation: "Score 8.5 mantém São Paulo entre as melhores capitais em educação pública.",
        reason: "Investimentos em tecnologia educacional e capacitação docente mostrando resultados.",
        action: "Expandir programa de tablets para mais escolas. Aumentar carga horária de reforço.",
        severity: "good",
      },
      Saúde: {
        explanation: "Score 8.1 com leve queda devido ao aumento da demanda sazonal.",
        reason: "Aumento de casos respiratórios típicos do inverno. UTIs em 78% de ocupação.",
        action: "Reforçar campanhas de vacinação. Monitorar capacidade hospitalar.",
        severity: "normal",
      },
      Trânsito: {
        explanation: "Score 6.9 com melhoria devido a otimizações no sistema semafórico.",
        reason: "IA do CET otimizou 340 semáforos reduzindo tempo médio de deslocamento em 8%.",
        action: "Expandir IA semafórica para mais corredores. Incentivar transporte público.",
        severity: "normal",
      },
      "Meio Ambiente": {
        explanation: "Score 8.3 reflete melhoria na qualidade do ar e aumento de áreas verdes.",
        reason: "Plantio de 15mil árvores e redução de 12% nas emissões de poluentes.",
        action: "Acelerar programa de arborização. Expandir ciclovias e transporte limpo.",
        severity: "good",
      },
    }

    return (
      insights[title as keyof typeof insights] || {
        explanation: `Métrica ${title} com valor ${value} requer análise detalhada.`,
        reason: "Dados insuficientes para análise completa. Recomenda-se coleta de mais informações.",
        action: "Solicitar relatório detalhado da área responsável para análise aprofundada.",
        severity: "normal",
      }
    )
  }

  const insight = generateInsight()

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case "good":
        return <CheckCircle className="h-4 w-4 text-green-500" />
      case "warning":
        return <AlertTriangle className="h-4 w-4 text-yellow-500" />
      case "critical":
        return <AlertTriangle className="h-4 w-4 text-red-500" />
      default:
        return <TrendingUp className="h-4 w-4 text-blue-500" />
    }
  }

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "good":
        return "border-green-500 bg-green-50 dark:bg-green-950"
      case "warning":
        return "border-yellow-500 bg-yellow-50 dark:bg-yellow-950"
      case "critical":
        return "border-red-500 bg-red-50 dark:bg-red-950"
      default:
        return "border-blue-500 bg-blue-50 dark:bg-blue-950"
    }
  }

  if (showInsight) {
    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
        <Card className={`max-w-2xl w-full ${getSeverityColor(insight.severity)}`}>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                {getSeverityIcon(insight.severity)}
                Insight da IA: {title}
              </CardTitle>
              <Button variant="ghost" size="sm" onClick={() => setShowInsight(false)}>
                <X className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h4 className="font-semibold mb-2 flex items-center gap-2">
                <TrendingUp className="h-4 w-4" />O que significa
              </h4>
              <p className="text-sm text-muted-foreground">{insight.explanation}</p>
            </div>

            <div>
              <h4 className="font-semibold mb-2 flex items-center gap-2">
                <AlertTriangle className="h-4 w-4" />
                Por que aconteceu
              </h4>
              <p className="text-sm text-muted-foreground">{insight.reason}</p>
            </div>

            <div>
              <h4 className="font-semibold mb-2 flex items-center gap-2">
                <CheckCircle className="h-4 w-4" />
                Ação recomendada
              </h4>
              <p className="text-sm text-muted-foreground">{insight.action}</p>
            </div>

            <div className="flex items-center justify-between pt-2 border-t">
              <Badge variant="outline" className="text-xs">
                Análise gerada pela IA Precast
              </Badge>
              <span className="text-xs text-muted-foreground">
                Baseado em dados de {new Date().toLocaleDateString("pt-BR")}
              </span>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <Button
      variant="ghost"
      size="sm"
      className="h-6 w-6 p-0 hover:bg-yellow-100 dark:hover:bg-yellow-900"
      onClick={() => setShowInsight(true)}
      title="Ver insight da IA"
    >
      <Zap className="h-3 w-3 text-yellow-600" />
    </Button>
  )
}
