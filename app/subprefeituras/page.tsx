import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { MapPin, Users, AlertTriangle, TrendingUp, TrendingDown, Building } from "lucide-react"
import Link from "next/link"

import { getSubprefeituras } from "@/lib/subprefeituras"

const MILLION_FORMAT = new Intl.NumberFormat("pt-BR", { maximumFractionDigits: 1 })
const NUMBER_FORMAT = new Intl.NumberFormat("pt-BR")
const AREA_FORMAT = new Intl.NumberFormat("pt-BR", { minimumFractionDigits: 1, maximumFractionDigits: 1 })

function formatMillions(value: number): string {
  if (!value) return "0"
  const millions = value / 1_000_000
  if (millions >= 1) return `${MILLION_FORMAT.format(millions)}M`
  return NUMBER_FORMAT.format(value)
}

export default async function SubprefeiturasPage() {
  const subprefeituras = await getSubprefeituras()

  const totalPopulation = subprefeituras.reduce((sum, sub) => sum + (sub.population ?? 0), 0)
  const totalArea = subprefeituras.reduce((sum, sub) => sum + (sub.areaKm2 ?? 0), 0)
  const totalAlerts = subprefeituras.reduce((sum, sub) => sum + (sub.alerts ?? 0), 0)

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-card">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-foreground">Subprefeituras</h1>
              <p className="text-muted-foreground">
                {subprefeituras.length
                  ? `${subprefeituras.length} Prefeituras Regionais de São Paulo`
                  : "Nenhuma subprefeitura cadastrada"}
              </p>
            </div>
            <Link href="/">
              <Button variant="outline">Voltar ao Dashboard</Button>
            </Link>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-6">
        {/* Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total de Subprefeituras</CardTitle>
              <Building className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{subprefeituras.length}</div>
              <p className="text-xs text-muted-foreground">Prefeituras regionais</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">População Total</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{formatMillions(totalPopulation)}</div>
              <p className="text-xs text-muted-foreground">Habitantes distribuídos</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Área Total</CardTitle>
              <MapPin className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{AREA_FORMAT.format(totalArea)} km²</div>
              <p className="text-xs text-muted-foreground">Território coberto</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Alertas Ativos</CardTitle>
              <AlertTriangle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalAlerts}</div>
              <p className="text-xs text-muted-foreground">Registros no momento</p>
            </CardContent>
          </Card>
        </div>

        {!subprefeituras.length ? (
          <Card>
            <CardHeader>
              <CardTitle>Nenhuma subprefeitura cadastrada</CardTitle>
              <CardDescription>
                Cadastre subprefeituras no banco de dados para visualizar os indicadores e dashboards regionais.
              </CardDescription>
            </CardHeader>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {subprefeituras.map((sub) => {
              const metrics = {
                seguranca: sub.metrics.seguranca ?? 0,
                educacao: sub.metrics.educacao ?? 0,
                saude: sub.metrics.saude ?? 0,
              }
              return (
                <Card key={sub.id} className="flex flex-col">
                  <CardHeader className="border-b space-y-2 pb-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="flex items-center gap-2">
                          {sub.name}
                          {sub.trend === "up" && <TrendingUp className="h-4 w-4 text-green-500" />}
                          {sub.trend === "down" && <TrendingDown className="h-4 w-4 text-red-500" />}
                        </CardTitle>
                        <CardDescription>{sub.description || "Sem descrição cadastrada"}</CardDescription>
                      </div>
                      <Badge variant="secondary">{NUMBER_FORMAT.format(sub.population)} hab</Badge>
                    </div>

                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <div>
                        <span className="text-muted-foreground">Área</span>
                        <div className="font-medium">{sub.areaDisplay}</div>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Densidade</span>
                        <div className="font-medium">{sub.densityDisplay}</div>
                      </div>
                    </div>
                  </CardHeader>

                  <CardContent className="flex-1 flex flex-col gap-4 pt-4">
                    {/* Performance */}
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium">Performance Geral</span>
                        <span className="text-sm font-bold">{sub.performance}%</span>
                      </div>
                      <Progress value={sub.performance} className="h-2" />
                    </div>

                    {/* Key Metrics */}
                    <div className="grid grid-cols-3 gap-2 text-xs">
                      <div className="text-center p-2 bg-muted rounded">
                        <div className="font-semibold">{metrics.seguranca}%</div>
                        <div className="text-muted-foreground">Segurança</div>
                      </div>
                      <div className="text-center p-2 bg-muted rounded">
                        <div className="font-semibold">{metrics.educacao}%</div>
                        <div className="text-muted-foreground">Educação</div>
                      </div>
                      <div className="text-center p-2 bg-muted rounded">
                        <div className="font-semibold">{metrics.saude}%</div>
                        <div className="text-muted-foreground">Saúde</div>
                      </div>
                    </div>

                    {/* Highlights */}
                    <div>
                      <span className="text-sm font-medium text-muted-foreground">Destaques:</span>
                      {sub.highlights.length === 0 ? (
                        <p className="text-xs text-muted-foreground mt-1">Nenhum destaque cadastrado.</p>
                      ) : (
                        <ul className="text-xs mt-1 space-y-1">
                          {sub.highlights.slice(0, 2).map((highlight, index) => (
                            <li key={index} className="flex items-center gap-1">
                              <div className="w-1 h-1 bg-blue-500 rounded-full"></div>
                              {highlight}
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>

                    {/* Alerts & districts */}
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <div className="p-2 bg-muted rounded">
                        <div className="text-muted-foreground">Alertas</div>
                        <div className="font-semibold">{sub.alerts}</div>
                      </div>
                      <div className="p-2 bg-muted rounded">
                        <div className="text-muted-foreground">Distritos</div>
                        <div className="font-semibold">{sub.districts.length}</div>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="mt-auto flex gap-2 pt-2">
                      <Link href={`/subprefeituras/${sub.id}`} className="flex-1">
                        <Button className="w-full" size="sm">
                          Dashboard
                        </Button>
                      </Link>
                      <Link href={`/subprefeituras/${sub.id}/mapa`}>
                        <Button variant="outline" size="sm">
                          <MapPin className="h-4 w-4" />
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}
