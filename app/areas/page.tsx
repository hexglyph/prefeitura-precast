import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  Shield,
  GraduationCap,
  Heart,
  Home,
  Trash2,
  Leaf,
  Car,
  MapPin,
  Settings,
  TrendingUp,
  TrendingDown,
} from "lucide-react"
import Link from "next/link"

const areas = [
  {
    id: "seguranca",
    name: "Segurança Pública",
    icon: Shield,
    color: "#ef4444",
    performance: 85,
    trend: "up",
    alerts: 3,
    description: "Policiamento, bombeiros e defesa civil",
    metrics: {
      ocorrencias: "2.847/mês",
      tempoResposta: "8.2 min",
      satisfacao: "78%",
    },
  },
  {
    id: "educacao",
    name: "Educação",
    icon: GraduationCap,
    color: "#3b82f6",
    performance: 92,
    trend: "up",
    alerts: 0,
    description: "Escolas municipais e programas educacionais",
    metrics: {
      matriculas: "1.2M alunos",
      aprovacao: "94.2%",
      infraestrutura: "88%",
    },
  },
  {
    id: "saude",
    name: "Saúde",
    icon: Heart,
    color: "#10b981",
    performance: 78,
    trend: "down",
    alerts: 2,
    description: "UBS, hospitais e programas de saúde",
    metrics: {
      atendimentos: "450K/mês",
      leitos: "85% ocupação",
      vacinacao: "92%",
    },
  },
  {
    id: "moradia",
    name: "Habitação",
    icon: Home,
    color: "#f59e0b",
    performance: 65,
    trend: "stable",
    alerts: 1,
    description: "Programas habitacionais e regularização",
    metrics: {
      unidades: "15.2K entregues",
      deficit: "580K famílias",
      regularizacao: "67%",
    },
  },
  {
    id: "limpeza",
    name: "Limpeza Urbana",
    icon: Trash2,
    color: "#8b5cf6",
    performance: 88,
    trend: "up",
    alerts: 0,
    description: "Coleta de lixo e limpeza pública",
    metrics: {
      coleta: "12K ton/dia",
      reciclagem: "35%",
      cobertura: "98.5%",
    },
  },
  {
    id: "meio-ambiente",
    name: "Meio Ambiente",
    icon: Leaf,
    color: "#22c55e",
    performance: 73,
    trend: "up",
    alerts: 1,
    description: "Parques, áreas verdes e sustentabilidade",
    metrics: {
      areasVerdes: "15.8 m²/hab",
      qualidadeAr: "Moderada",
      plantio: "25K árvores",
    },
  },
  {
    id: "transito",
    name: "Trânsito (CET)",
    icon: Car,
    color: "#f97316",
    performance: 45,
    trend: "down",
    alerts: 5,
    description: "Gestão de trânsito e mobilidade urbana",
    metrics: {
      velocidade: "18.5 km/h",
      acidentes: "1.2K/mês",
      multas: "180K/mês",
    },
  },
  {
    id: "turismo",
    name: "Turismo",
    icon: MapPin,
    color: "#06b6d4",
    performance: 82,
    trend: "up",
    alerts: 0,
    description: "Promoção turística e eventos culturais",
    metrics: {
      visitantes: "15.2M/ano",
      ocupacao: "72%",
      eventos: "450/mês",
    },
  },
]

export default function AreasPage() {
  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-card">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-foreground">Gestão por Áreas</h1>
              <p className="text-muted-foreground">Dashboards específicos e configurações de políticas</p>
            </div>
            <Link href="/">
              <Button variant="outline">Voltar ao Dashboard</Button>
            </Link>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {areas.map((area) => {
            const Icon = area.icon
            return (
              <Card key={area.id} className="hover:shadow-lg transition-all duration-200 cursor-pointer group">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <Icon
                      className="h-8 w-8 group-hover:scale-110 transition-transform"
                      style={{ color: area.color }}
                    />
                    <div className="flex items-center gap-2">
                      {area.alerts > 0 && (
                        <Badge variant="destructive" className="text-xs">
                          {area.alerts}
                        </Badge>
                      )}
                      {area.trend === "up" && <TrendingUp className="h-4 w-4 text-green-500" />}
                      {area.trend === "down" && <TrendingDown className="h-4 w-4 text-red-500" />}
                    </div>
                  </div>
                  <CardTitle className="text-lg">{area.name}</CardTitle>
                  <CardDescription className="text-sm">{area.description}</CardDescription>
                </CardHeader>

                <CardContent className="space-y-4">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium">Performance</span>
                      <span className="text-sm font-bold">{area.performance}%</span>
                    </div>
                    <Progress value={area.performance} className="h-2" />
                  </div>

                  <div className="space-y-2">
                    {Object.entries(area.metrics).map(([key, value]) => (
                      <div key={key} className="flex justify-between text-sm">
                        <span className="text-muted-foreground capitalize">{key}:</span>
                        <span className="font-medium">{value}</span>
                      </div>
                    ))}
                  </div>

                  <div className="flex gap-2 pt-2">
                    <Link href={`/areas/${area.id}`} className="flex-1">
                      <Button className="w-full" size="sm">
                        Dashboard
                      </Button>
                    </Link>
                    <Link href={`/areas/${area.id}/config`}>
                      <Button variant="outline" size="sm">
                        <Settings className="h-4 w-4" />
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </div>
  )
}
