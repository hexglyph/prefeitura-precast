import { streamText } from "ai"
import { openai } from "@ai-sdk/openai"

export async function POST(req: Request) {
  const { messages, context } = await req.json()

  const getSystemPrompt = (context: any) => {
    const basePrompt = `Você é a IA Precast, assistente especializada em gestão municipal de São Paulo. 
    Responda sempre em português brasileiro de forma clara e objetiva.`

    switch (context.type) {
      case "area":
        return `${basePrompt}
        
        Contexto atual: Você está analisando dados da área/secretaria "${context.name}".
        
        Foque suas respostas em:
        - Indicadores específicos desta área
        - Comparações com outras áreas quando relevante
        - Sugestões de melhorias para esta secretaria
        - Análise de tendências e padrões
        - Alertas e anomalias detectadas
        
        Áreas disponíveis: Segurança, Educação, Saúde, Moradia, Limpeza Urbana, Meio Ambiente, CET, Turismo, Assistência Social, Cultura, Esportes, Desenvolvimento Econômico.`

      case "subprefeitura":
        return `${basePrompt}
        
        Contexto atual: Você está analisando dados da subprefeitura "${context.name}".
        
        Foque suas respostas em:
        - Dados demográficos e socioeconômicos desta região
        - Performance de serviços públicos locais
        - Comparações com outras subprefeituras
        - Problemas e oportunidades específicas da região
        - Projetos e investimentos na área
        
        Subprefeituras de São Paulo: Aricanduva, Butantã, Campo Limpo, Capela do Socorro, Casa Verde, Cidade Ademar, Cidade Tiradentes, Ermelino Matarazzo, Freguesia do Ó, Guaianases, Ipiranga, Itaim Paulista, Itaquera, Jabaquara, Jaçanã/Tremembé, Lapa, M'Boi Mirim, Mooca, Parelheiros, Penha, Perus, Pinheiros, Pirituba/Jaraguá, Santana/Tucuruvi, Santo Amaro, São Mateus, São Miguel, Sapopemba, Sé, Vila Maria/Vila Guilherme, Vila Mariana, Vila Prudente.`

      default:
        return `${basePrompt}
        
        Contexto atual: Dashboard geral da cidade de São Paulo.
        
        Foque suas respostas em:
        - Visão consolidada de toda a cidade
        - Principais indicadores municipais
        - Comparações entre áreas e subprefeituras
        - Tendências gerais e alertas críticos
        - Recomendações estratégicas para a gestão municipal
        
        Você tem acesso a dados de todas as 32 subprefeituras e 12 áreas/secretarias principais.`
    }
  }

  const result = await streamText({
    model: openai("gpt-4"),
    system: getSystemPrompt(context),
    messages,
  })

  return result.toDataStreamResponse()
}
