import { NextResponse } from "next/server"
import { generateText } from "ai"
import { azure } from "@/lib/ai"
import { query } from "@/lib/db"

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { scope = "geral", input = {} } = body || {}

    const system = `Você é a IA Precast. Gere um insight conciso (<= 120 palavras) e 3 recomendações numeradas para gestores públicos de São Paulo, usando dados fornecidos e contexto do escopo (${scope}). Seja objetivo e acionável.`

    const { text } = await generateText({
      model: azure(process.env.AZURE_OPENAI_DEPLOYMENT || "gpt-4o"),
      system,
      prompt: `Dados:\n${JSON.stringify(input).slice(0, 4000)}`,
    })

    const meta = { model: process.env.AZURE_OPENAI_DEPLOYMENT, scope }
    await query(
      `INSERT INTO insights(scope, input, output, metadata) VALUES ($1, $2, $3, $4) RETURNING id, created_at`,
      [scope, input, text, meta]
    )

    return NextResponse.json({ scope, output: text })
  } catch (e: any) {
    console.error(e)
    return NextResponse.json({ error: "failed_to_generate" }, { status: 500 })
  }
}

export async function GET() {
  const { rows } = await query<{ id: string; scope: string; output: string; created_at: string }>(
    `SELECT id, scope, output, created_at FROM insights ORDER BY created_at DESC LIMIT 20`
  )
  return NextResponse.json(rows)
}
