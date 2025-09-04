import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { MapPin, Users, AlertTriangle, TrendingUp, TrendingDown, Building } from "lucide-react"
import Link from "next/link"

const subprefeituras = [
  {
    id: "aricanduva",
    name: "Aricanduva",
    population: 89000,
    area: "21.5 km²",
    density: "4,140 hab/km²",
    performance: 78,
    trend: "up",
    alerts: 2,
    description: "Região em desenvolvimento com crescimento comercial",
    coordinates: { lat: -23.5436, lng: -46.4731 },
    districts: ["Aricanduva", "Carrão", "Vila Formosa"],
    metrics: { seguranca: 75, educacao: 80, saude: 77, transporte: 72, limpeza: 82, economia: 79 },
    highlights: ["Shopping Aricanduva", "Crescimento imobiliário", "Melhoria no transporte"],
  },
  {
    id: "butanta",
    name: "Butantã",
    population: 428000,
    area: "56.1 km²",
    density: "7,630 hab/km²",
    performance: 89,
    trend: "stable",
    alerts: 1,
    description: "Região universitária e residencial de classe média",
    coordinates: { lat: -23.5629, lng: -46.7291 },
    districts: ["Butantã", "Morumbi", "Raposo Tavares", "Rio Pequeno", "Vila Sônia"],
    metrics: { seguranca: 91, educacao: 94, saude: 88, transporte: 85, limpeza: 92, economia: 90 },
    highlights: ["USP - Cidade Universitária", "Morumbi - bairro nobre", "Instituto Butantã"],
  },
  {
    id: "campo-limpo",
    name: "Campo Limpo",
    population: 607000,
    area: "36.7 km²",
    density: "16,540 hab/km²",
    performance: 72,
    trend: "up",
    alerts: 4,
    description: "Região periférica com programas sociais ativos",
    coordinates: { lat: -23.6532, lng: -46.7089 },
    districts: ["Campo Limpo", "Capão Redondo", "Vila Andrade"],
    metrics: { seguranca: 68, educacao: 75, saude: 71, transporte: 69, limpeza: 78, economia: 70 },
    highlights: ["Programas habitacionais", "Centro de formação profissional", "Crescimento do comércio local"],
  },
  {
    id: "capela-do-socorro",
    name: "Capela do Socorro",
    population: 594000,
    area: "134.2 km²",
    density: "4,430 hab/km²",
    performance: 74,
    trend: "stable",
    alerts: 3,
    description: "Região sul com áreas de preservação ambiental",
    coordinates: { lat: -23.6789, lng: -46.7456 },
    districts: ["Capela do Socorro", "Cidade Dutra", "Grajaú"],
    metrics: { seguranca: 72, educacao: 76, saude: 73, transporte: 70, limpeza: 79, economia: 74 },
    highlights: ["Represa Billings", "Área de mananciais", "Projetos ambientais"],
  },
  {
    id: "casa-verde",
    name: "Casa Verde",
    population: 309000,
    area: "26.7 km²",
    density: "11,570 hab/km²",
    performance: 81,
    trend: "up",
    alerts: 2,
    description: "Região tradicional com boa infraestrutura",
    coordinates: { lat: -23.4858, lng: -46.6653 },
    districts: ["Casa Verde", "Limão", "Nossa Senhora do Ó"],
    metrics: { seguranca: 83, educacao: 82, saude: 79, transporte: 78, limpeza: 85, economia: 81 },
    highlights: ["Tradição italiana", "Comércio consolidado", "Boa conectividade"],
  },
  {
    id: "cidade-ademar",
    name: "Cidade Ademar",
    population: 266000,
    area: "30.7 km²",
    density: "8,660 hab/km²",
    performance: 73,
    trend: "stable",
    alerts: 3,
    description: "Região sul em processo de urbanização",
    coordinates: { lat: -23.6532, lng: -46.7089 },
    districts: ["Cidade Ademar", "Pedreira"],
    metrics: { seguranca: 71, educacao: 74, saude: 72, transporte: 68, limpeza: 77, economia: 73 },
    highlights: ["Crescimento populacional", "Novos equipamentos públicos", "Melhoria na mobilidade"],
  },
  {
    id: "cidade-tiradentes",
    name: "Cidade Tiradentes",
    population: 211000,
    area: "15.0 km²",
    density: "14,070 hab/km²",
    performance: 69,
    trend: "up",
    alerts: 5,
    description: "Região periférica com grandes conjuntos habitacionais",
    coordinates: { lat: -23.5436, lng: -46.4731 },
    districts: ["Cidade Tiradentes"],
    metrics: { seguranca: 65, educacao: 72, saude: 68, transporte: 64, limpeza: 74, economia: 67 },
    highlights: ["Maior conjunto habitacional da América Latina", "Programas sociais", "Centro de formação"],
  },
  {
    id: "ermelino-matarazzo",
    name: "Ermelino Matarazzo",
    population: 207000,
    area: "15.1 km²",
    density: "13,710 hab/km²",
    performance: 76,
    trend: "stable",
    alerts: 2,
    description: "Região leste com tradição industrial",
    coordinates: { lat: -23.5436, lng: -46.4731 },
    districts: ["Ermelino Matarazzo", "Ponte Rasa"],
    metrics: { seguranca: 74, educacao: 78, saude: 75, transporte: 73, limpeza: 79, economia: 77 },
    highlights: ["Tradição operária", "Parque Ecológico", "Revitalização urbana"],
  },
  {
    id: "freguesia-do-o",
    name: "Freguesia do Ó",
    population: 394000,
    area: "31.4 km²",
    density: "12,550 hab/km²",
    performance: 79,
    trend: "stable",
    alerts: 3,
    description: "Região norte com centro histórico preservado",
    coordinates: { lat: -23.4858, lng: -46.6653 },
    districts: ["Freguesia do Ó", "Brasilândia"],
    metrics: { seguranca: 77, educacao: 81, saude: 78, transporte: 76, limpeza: 82, economia: 80 },
    highlights: ["Igreja histórica", "Feira da Freguesia", "Crescimento comercial"],
  },
  {
    id: "guaianases",
    name: "Guaianases",
    population: 268000,
    area: "17.8 km²",
    density: "15,060 hab/km²",
    performance: 71,
    trend: "up",
    alerts: 4,
    description: "Região leste com desafios urbanos",
    coordinates: { lat: -23.5436, lng: -46.4731 },
    districts: ["Guaianases", "Lajeado"],
    metrics: { seguranca: 68, educacao: 73, saude: 70, transporte: 67, limpeza: 75, economia: 72 },
    highlights: ["Projetos de urbanização", "Centro de capacitação", "Melhoria na segurança"],
  },
  {
    id: "ipiranga",
    name: "Ipiranga",
    population: 463000,
    area: "37.5 km²",
    density: "12,350 hab/km²",
    performance: 84,
    trend: "up",
    alerts: 1,
    description: "Região histórica com importância nacional",
    coordinates: { lat: -23.6532, lng: -46.7089 },
    districts: ["Ipiranga", "Cursino", "Sacomã"],
    metrics: { seguranca: 86, educacao: 85, saude: 82, transporte: 81, limpeza: 87, economia: 85 },
    highlights: ["Museu do Ipiranga", "Parque da Independência", "Desenvolvimento tecnológico"],
  },
  {
    id: "itaim-paulista",
    name: "Itaim Paulista",
    population: 224000,
    area: "21.7 km²",
    density: "10,320 hab/km²",
    performance: 75,
    trend: "stable",
    alerts: 3,
    description: "Região leste com crescimento ordenado",
    coordinates: { lat: -23.5436, lng: -46.4731 },
    districts: ["Itaim Paulista", "Vila Curuçá"],
    metrics: { seguranca: 73, educacao: 77, saude: 74, transporte: 72, limpeza: 78, economia: 76 },
    highlights: ["Parque Raul Seixas", "Centro comercial", "Projetos habitacionais"],
  },
  {
    id: "itaquera",
    name: "Itaquera",
    population: 523000,
    area: "54.3 km²",
    density: "9,630 hab/km²",
    performance: 77,
    trend: "up",
    alerts: 2,
    description: "Região leste com infraestrutura esportiva",
    coordinates: { lat: -23.5436, lng: -46.4731 },
    districts: ["Itaquera", "Cidade Líder", "José Bonifácio", "Parque do Carmo"],
    metrics: { seguranca: 75, educacao: 79, saude: 76, transporte: 74, limpeza: 80, economia: 78 },
    highlights: ["Arena Corinthians", "Parque do Carmo", "Polo Itaquera"],
  },
  {
    id: "jabaquara",
    name: "Jabaquara",
    population: 223000,
    area: "14.1 km²",
    density: "15,820 hab/km²",
    performance: 82,
    trend: "stable",
    alerts: 1,
    description: "Região sul bem conectada ao centro",
    coordinates: { lat: -23.6532, lng: -46.7089 },
    districts: ["Jabaquara"],
    metrics: { seguranca: 84, educacao: 83, saude: 80, transporte: 85, limpeza: 84, economia: 82 },
    highlights: ["Terminal Jabaquara", "Boa conectividade", "Comércio diversificado"],
  },
  {
    id: "jacana-tremembe",
    name: "Jaçanã/Tremembé",
    population: 291000,
    area: "64.1 km²",
    density: "4,540 hab/km²",
    performance: 78,
    trend: "up",
    alerts: 2,
    description: "Região norte com áreas verdes preservadas",
    coordinates: { lat: -23.4858, lng: -46.6653 },
    districts: ["Jaçanã", "Tremembé"],
    metrics: { seguranca: 76, educacao: 80, saude: 77, transporte: 75, limpeza: 81, economia: 79 },
    highlights: ["Serra da Cantareira", "Parque Estadual", "Turismo ecológico"],
  },
  {
    id: "lapa",
    name: "Lapa",
    population: 305000,
    area: "40.1 km²",
    density: "7,610 hab/km²",
    performance: 87,
    trend: "stable",
    alerts: 1,
    description: "Região oeste com tradição e modernidade",
    coordinates: { lat: -23.5629, lng: -46.7291 },
    districts: ["Lapa", "Barra Funda", "Perdizes", "Vila Leopoldina", "Jaguaré", "Jaguará"],
    metrics: { seguranca: 89, educacao: 88, saude: 85, transporte: 86, limpeza: 90, economia: 88 },
    highlights: ["Memorial da América Latina", "Centro empresarial", "Revitalização urbana"],
  },
  {
    id: "mboi-mirim",
    name: "M'Boi Mirim",
    population: 563000,
    area: "62.1 km²",
    density: "9,070 hab/km²",
    performance: 73,
    trend: "up",
    alerts: 4,
    description: "Região sul com grandes desafios sociais",
    coordinates: { lat: -23.6532, lng: -46.7089 },
    districts: ["Jardim Ângela", "Jardim São Luís"],
    metrics: { seguranca: 70, educacao: 75, saude: 72, transporte: 69, limpeza: 76, economia: 74 },
    highlights: ["Programas sociais intensivos", "Biblioteca Beco do Aprendiz", "Projetos culturais"],
  },
  {
    id: "mooca",
    name: "Mooca",
    population: 343000,
    area: "35.2 km²",
    density: "9,740 hab/km²",
    performance: 85,
    trend: "up",
    alerts: 1,
    description: "Região leste com tradição industrial e cultural",
    coordinates: { lat: -23.5436, lng: -46.4731 },
    districts: ["Mooca", "Água Rasa", "Belém", "Brás", "Pari", "Tatuapé"],
    metrics: { seguranca: 87, educacao: 86, saude: 83, transporte: 84, limpeza: 88, economia: 86 },
    highlights: ["Tradição italiana", "Revitalização do Brás", "Polo gastronômico"],
  },
  {
    id: "parelheiros",
    name: "Parelheiros",
    population: 139000,
    area: "353.5 km²",
    density: "393 hab/km²",
    performance: 76,
    trend: "stable",
    alerts: 2,
    description: "Região sul com maior área de preservação",
    coordinates: { lat: -23.6789, lng: -46.7456 },
    districts: ["Parelheiros", "Marsilac"],
    metrics: { seguranca: 74, educacao: 78, saude: 75, transporte: 71, limpeza: 80, economia: 77 },
    highlights: ["Maior área verde da cidade", "Turismo rural", "Preservação ambiental"],
  },
  {
    id: "penha",
    name: "Penha",
    population: 474000,
    area: "42.8 km²",
    density: "11,070 hab/km²",
    performance: 79,
    trend: "stable",
    alerts: 2,
    description: "Região leste com tradição religiosa",
    coordinates: { lat: -23.5436, lng: -46.4731 },
    districts: ["Penha", "Cangaíba", "Vila Esperança", "Arthur Alvim"],
    metrics: { seguranca: 77, educacao: 81, saude: 78, transporte: 76, limpeza: 82, economia: 80 },
    highlights: ["Igreja da Penha", "Festa da Penha", "Comércio tradicional"],
  },
  {
    id: "perus",
    name: "Perus",
    population: 146000,
    area: "57.2 km²",
    density: "2,550 hab/km²",
    performance: 74,
    trend: "up",
    alerts: 3,
    description: "Região noroeste com potencial de crescimento",
    coordinates: { lat: -23.4858, lng: -46.6653 },
    districts: ["Perus", "Anhanguera"],
    metrics: { seguranca: 72, educacao: 76, saude: 73, transporte: 70, limpeza: 77, economia: 75 },
    highlights: ["Parque Anhanguera", "Desenvolvimento sustentável", "Projetos habitacionais"],
  },
  {
    id: "pinheiros",
    name: "Pinheiros",
    population: 289000,
    area: "31.7 km²",
    density: "9,120 hab/km²",
    performance: 93,
    trend: "stable",
    alerts: 0,
    description: "Região oeste de alto padrão e inovação",
    coordinates: { lat: -23.5629, lng: -46.7291 },
    districts: ["Pinheiros", "Alto de Pinheiros", "Itaim Bibi", "Jardim Paulista"],
    metrics: { seguranca: 95, educacao: 96, saude: 92, transporte: 91, limpeza: 96, economia: 97 },
    highlights: ["Centro financeiro", "Inovação tecnológica", "Vida cultural intensa"],
  },
  {
    id: "pirituba-jaragua",
    name: "Pirituba/Jaraguá",
    population: 436000,
    area: "54.7 km²",
    density: "7,970 hab/km²",
    performance: 77,
    trend: "up",
    alerts: 3,
    description: "Região noroeste em expansão",
    coordinates: { lat: -23.4858, lng: -46.6653 },
    districts: ["Pirituba", "São Domingos", "Jaraguá"],
    metrics: { seguranca: 75, educacao: 79, saude: 76, transporte: 74, limpeza: 80, economia: 78 },
    highlights: ["Pico do Jaraguá", "Crescimento imobiliário", "Melhoria no transporte"],
  },
  {
    id: "santana-tucuruvi",
    name: "Santana/Tucuruvi",
    population: 324000,
    area: "34.7 km²",
    density: "9,340 hab/km²",
    performance: 83,
    trend: "stable",
    alerts: 1,
    description: "Região norte bem estruturada",
    coordinates: { lat: -23.4858, lng: -46.6653 },
    districts: ["Santana", "Tucuruvi", "Mandaqui"],
    metrics: { seguranca: 85, educacao: 84, saude: 81, transporte: 82, limpeza: 86, economia: 84 },
    highlights: ["Centro comercial consolidado", "Boa infraestrutura", "Qualidade de vida"],
  },
  {
    id: "santo-amaro",
    name: "Santo Amaro",
    population: 238000,
    area: "37.5 km²",
    density: "6,350 hab/km²",
    performance: 88,
    trend: "up",
    alerts: 1,
    description: "Região sul empresarial e residencial",
    coordinates: { lat: -23.6532, lng: -46.7089 },
    districts: ["Santo Amaro", "Campo Belo", "Campo Grande"],
    metrics: { seguranca: 90, educacao: 89, saude: 86, transporte: 87, limpeza: 91, economia: 89 },
    highlights: ["Centro empresarial", "Shopping centers", "Boa conectividade"],
  },
  {
    id: "sao-mateus",
    name: "São Mateus",
    population: 426000,
    area: "45.8 km²",
    density: "9,300 hab/km²",
    performance: 74,
    trend: "up",
    alerts: 3,
    description: "Região leste com crescimento acelerado",
    coordinates: { lat: -23.5436, lng: -46.4731 },
    districts: ["São Mateus", "São Rafael", "Iguatemi"],
    metrics: { seguranca: 72, educacao: 76, saude: 73, transporte: 71, limpeza: 77, economia: 75 },
    highlights: ["Shopping Aricanduva próximo", "Crescimento populacional", "Novos empreendimentos"],
  },
  {
    id: "sao-miguel",
    name: "São Miguel",
    population: 369000,
    area: "24.3 km²",
    density: "15,190 hab/km²",
    performance: 76,
    trend: "stable",
    alerts: 2,
    description: "Região leste com tradição histórica",
    coordinates: { lat: -23.5436, lng: -46.4731 },
    districts: ["São Miguel", "Jardim Helena", "Vila Jacuí"],
    metrics: { seguranca: 74, educacao: 78, saude: 75, transporte: 73, limpeza: 79, economia: 77 },
    highlights: ["Capela de São Miguel", "Centro histórico", "Desenvolvimento cultural"],
  },
  {
    id: "sapopemba",
    name: "Sapopemba",
    population: 284000,
    area: "13.5 km²",
    density: "21,040 hab/km²",
    performance: 75,
    trend: "up",
    alerts: 3,
    description: "Região leste densamente povoada",
    coordinates: { lat: -23.5436, lng: -46.4731 },
    districts: ["Sapopemba", "Vila Prudente"],
    metrics: { seguranca: 73, educacao: 77, saude: 74, transporte: 72, limpeza: 78, economia: 76 },
    highlights: ["Alta densidade populacional", "Projetos de mobilidade", "Comércio local forte"],
  },
  {
    id: "se",
    name: "Sé",
    population: 431000,
    area: "26.2 km²",
    density: "16,450 hab/km²",
    performance: 86,
    trend: "stable",
    alerts: 2,
    description: "Centro histórico e financeiro da cidade",
    coordinates: { lat: -23.5505, lng: -46.6333 },
    districts: ["Sé", "República", "Santa Cecília", "Consolação", "Bela Vista", "Liberdade", "Cambuci", "Bom Retiro"],
    metrics: { seguranca: 88, educacao: 90, saude: 84, transporte: 89, limpeza: 87, economia: 92 },
    highlights: ["Marco zero da cidade", "Centro financeiro", "Patrimônio histórico"],
  },
  {
    id: "vila-maria-vila-guilherme",
    name: "Vila Maria/Vila Guilherme",
    population: 297000,
    area: "26.4 km²",
    density: "11,250 hab/km²",
    performance: 80,
    trend: "stable",
    alerts: 2,
    description: "Região norte com tradição industrial",
    coordinates: { lat: -23.4858, lng: -46.6653 },
    districts: ["Vila Maria", "Vila Guilherme", "Vila Medeiros"],
    metrics: { seguranca: 78, educacao: 82, saude: 79, transporte: 77, limpeza: 83, economia: 81 },
    highlights: ["Tradição operária", "Polo industrial", "Revitalização urbana"],
  },
  {
    id: "vila-mariana",
    name: "Vila Mariana",
    population: 344000,
    area: "26.5 km²",
    density: "12,980 hab/km²",
    performance: 89,
    trend: "up",
    alerts: 1,
    description: "Região sul de classe média alta",
    coordinates: { lat: -23.6532, lng: -46.7089 },
    districts: ["Vila Mariana", "Moema", "Saúde"],
    metrics: { seguranca: 91, educacao: 92, saude: 87, transporte: 88, limpeza: 93, economia: 90 },
    highlights: ["Parque Ibirapuera próximo", "Vida cultural ativa", "Excelente infraestrutura"],
  },
  {
    id: "vila-prudente",
    name: "Vila Prudente",
    population: 529000,
    area: "33.3 km²",
    density: "15,890 hab/km²",
    performance: 78,
    trend: "up",
    alerts: 2,
    description: "Região leste com boa conectividade",
    coordinates: { lat: -23.5436, lng: -46.4731 },
    districts: ["Vila Prudente", "São Lucas"],
    metrics: { seguranca: 76, educacao: 80, saude: 77, transporte: 79, limpeza: 81, economia: 79 },
    highlights: ["Linha do metrô", "Centro comercial", "Desenvolvimento imobiliário"],
  },
]

export default function SubprefeiturasPage() {
  const totalPopulation = subprefeituras.reduce((sum, sub) => sum + sub.population, 0)
  const totalArea = subprefeituras.reduce((sum, sub) => sum + Number.parseFloat(sub.area.replace(" km²", "")), 0)
  const totalAlerts = subprefeituras.reduce((sum, sub) => sum + sub.alerts, 0)

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-card">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-foreground">Subprefeituras</h1>
              <p className="text-muted-foreground">32 Prefeituras Regionais de São Paulo</p>
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
              <div className="text-2xl font-bold">32</div>
              <p className="text-xs text-muted-foreground">Prefeituras regionais</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">População Total</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{(totalPopulation / 1000000).toFixed(1)}M</div>
              <p className="text-xs text-muted-foreground">Habitantes distribuídos</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Área Total</CardTitle>
              <MapPin className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalArea.toFixed(0)} km²</div>
              <p className="text-xs text-muted-foreground">Território municipal</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Alertas Ativos</CardTitle>
              <AlertTriangle className="h-4 w-4 text-orange-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalAlerts}</div>
              <p className="text-xs text-orange-600">Distribuídos nas regiões</p>
            </CardContent>
          </Card>
        </div>

        {/* Subprefeituras Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {subprefeituras.map((sub) => (
            <Card key={sub.id} className="hover:shadow-lg transition-all duration-200 cursor-pointer group">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <MapPin className="h-6 w-6 text-blue-500 group-hover:scale-110 transition-transform" />
                    <div>
                      <CardTitle className="text-xl">{sub.name}</CardTitle>
                      <CardDescription>{sub.description}</CardDescription>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {sub.alerts > 0 && (
                      <Badge variant="destructive" className="text-xs">
                        {sub.alerts}
                      </Badge>
                    )}
                    {sub.trend === "up" && <TrendingUp className="h-4 w-4 text-green-500" />}
                    {sub.trend === "down" && <TrendingDown className="h-4 w-4 text-red-500" />}
                  </div>
                </div>
              </CardHeader>

              <CardContent className="space-y-4">
                {/* Demographics */}
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-muted-foreground">População:</span>
                    <div className="font-semibold">{sub.population.toLocaleString("pt-BR")}</div>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Área:</span>
                    <div className="font-semibold">{sub.area}</div>
                  </div>
                  <div className="col-span-2">
                    <span className="text-muted-foreground">Densidade:</span>
                    <div className="font-semibold">{sub.density}</div>
                  </div>
                </div>

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
                    <div className="font-semibold">{sub.metrics.seguranca}%</div>
                    <div className="text-muted-foreground">Segurança</div>
                  </div>
                  <div className="text-center p-2 bg-muted rounded">
                    <div className="font-semibold">{sub.metrics.educacao}%</div>
                    <div className="text-muted-foreground">Educação</div>
                  </div>
                  <div className="text-center p-2 bg-muted rounded">
                    <div className="font-semibold">{sub.metrics.saude}%</div>
                    <div className="text-muted-foreground">Saúde</div>
                  </div>
                </div>

                {/* Highlights */}
                <div>
                  <span className="text-sm font-medium text-muted-foreground">Destaques:</span>
                  <ul className="text-xs mt-1 space-y-1">
                    {sub.highlights.slice(0, 2).map((highlight, index) => (
                      <li key={index} className="flex items-center gap-1">
                        <div className="w-1 h-1 bg-blue-500 rounded-full"></div>
                        {highlight}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Actions */}
                <div className="flex gap-2 pt-2">
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
          ))}
        </div>
      </div>
    </div>
  )
}
