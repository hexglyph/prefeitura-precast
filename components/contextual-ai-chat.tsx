"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Send, Bot, User, MessageCircle, X } from "lucide-react"
import { useState } from "react"

interface Message {
  id: string
  role: "user" | "assistant"
  content: string
}

interface ContextualAIChatProps {
  context: {
    type: "geral" | "area" | "subprefeitura"
    name?: string
    data?: any
  }
}

export function ContextualAIChat({ context }: ContextualAIChatProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const generateContextualResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase()

    if (context.type === "area") {
      if (lowerMessage.includes("população") || lowerMessage.includes("habitantes")) {
        return `Na área de ${context.name}, temos aproximadamente 2.1M de habitantes distribuídos em diferentes distritos. A densidade populacional varia entre 8.500 hab/km² nas regiões centrais.`
      }
      if (lowerMessage.includes("indicador") || lowerMessage.includes("performance")) {
        return `Os indicadores da ${context.name} mostram performance de 8.2/10 este mês, com melhoria de 0.3 pontos. Principais métricas: eficiência operacional 87%, satisfação cidadã 82%.`
      }
      if (lowerMessage.includes("problema") || lowerMessage.includes("alerta")) {
        return `Detectei 3 alertas ativos na ${context.name}: aumento de 15% em ocorrências, congestionamento acima da média, e necessidade de manutenção preventiva em 2 equipamentos.`
      }
      return `Como especialista em ${context.name}, posso fornecer dados sobre população, indicadores, alertas, orçamento, projetos em andamento e comparações históricas. O que especificamente gostaria de saber?`
    }

    if (context.type === "subprefeitura") {
      if (lowerMessage.includes("população")) {
        return `A ${context.name} possui 431.000 habitantes em uma área de 26.2 km², com densidade de 16.450 hab/km². É uma das regiões mais densas da cidade.`
      }
      if (lowerMessage.includes("serviço") || lowerMessage.includes("equipamento")) {
        return `Na ${context.name} temos: 45 UBS, 12 escolas municipais, 8 CEUs, 23 praças, 156 pontos de ônibus e 3 estações de metrô. Taxa de cobertura: 94%.`
      }
      return `Sobre a ${context.name}: posso informar dados demográficos, equipamentos públicos, indicadores sociais, projetos locais e comparações com outras subprefeituras.`
    }

    // Geral
    if (lowerMessage.includes("população")) {
      return `São Paulo possui 12.4 milhões de habitantes, distribuídos em 32 subprefeituras e 96 distritos. Crescimento populacional de 0.8% no último ano.`
    }
    if (lowerMessage.includes("orçamento")) {
      return `O orçamento municipal de 2024 é de R$ 78.5 bilhões, com 31% destinado à Educação, 24% à Saúde, 15% ao Transporte e 30% às demais áreas.`
    }
    if (lowerMessage.includes("trânsito")) {
      return `Situação atual do trânsito: 187km de lentidão (23% acima da média), principais pontos críticos na Marginal Tietê e Radial Leste. Tempo médio de deslocamento: 2h43min.`
    }

    return `Como IA Precast, posso ajudar com dados sobre população, orçamento, indicadores por área, situação do trânsito, eventos programados, alertas ativos e análises comparativas. O que gostaria de saber?`
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() || isLoading) return

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input,
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsLoading(true)

    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: generateContextualResponse(input),
      }
      setMessages((prev) => [...prev, aiResponse])
      setIsLoading(false)
    }, 1000)
  }

  const getContextualPlaceholder = () => {
    switch (context.type) {
      case "area":
        return `Pergunte sobre dados da ${context.name}...`
      case "subprefeitura":
        return `Pergunte sobre dados da ${context.name}...`
      default:
        return "Pergunte sobre dados gerais da cidade..."
    }
  }

  const getContextualWelcome = () => {
    switch (context.type) {
      case "area":
        return `Olá! Posso ajudar com informações específicas da ${context.name}. O que gostaria de saber?`
      case "subprefeitura":
        return `Olá! Posso ajudar com dados e análises da ${context.name}. Como posso auxiliar?`
      default:
        return "Olá! Sou a IA Precast. Como posso ajudar com a gestão da cidade hoje?"
    }
  }

  if (!isOpen) {
    return (
      <Button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 h-14 w-14 rounded-full shadow-lg z-50"
        size="icon"
      >
        <MessageCircle className="h-6 w-6" />
      </Button>
    )
  }

  return (
    <div className="fixed bottom-6 right-6 w-96 h-[500px] bg-background border rounded-lg shadow-xl z-50 flex flex-col">
      <div className="flex items-center justify-between p-4 border-b">
        <div>
          <h3 className="font-semibold">IA Precast</h3>
          <p className="text-sm text-muted-foreground">
            {context.type === "area" && `Área: ${context.name}`}
            {context.type === "subprefeitura" && `Subprefeitura: ${context.name}`}
            {context.type === "geral" && "Dashboard Geral"}
          </p>
        </div>
        <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)}>
          <X className="h-4 w-4" />
        </Button>
      </div>

      <ScrollArea className="flex-1 p-4">
        <div className="space-y-4">
          {messages.length === 0 && (
            <div className="text-center text-muted-foreground py-4">
              <Bot className="h-8 w-8 mx-auto mb-2 opacity-50" />
              <p className="text-sm">{getContextualWelcome()}</p>
            </div>
          )}

          {messages.map((message) => (
            <div key={message.id} className={`flex gap-2 ${message.role === "user" ? "justify-end" : "justify-start"}`}>
              <div className={`flex gap-2 max-w-[85%] ${message.role === "user" ? "flex-row-reverse" : "flex-row"}`}>
                <div
                  className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 ${
                    message.role === "user" ? "bg-blue-500" : "bg-green-500"
                  }`}
                >
                  {message.role === "user" ? (
                    <User className="h-3 w-3 text-white" />
                  ) : (
                    <Bot className="h-3 w-3 text-white" />
                  )}
                </div>
                <div
                  className={`p-2 rounded-lg text-sm ${message.role === "user" ? "bg-blue-500 text-white" : "bg-muted"}`}
                >
                  <p className="whitespace-pre-wrap">{message.content}</p>
                </div>
              </div>
            </div>
          ))}

          {isLoading && (
            <div className="flex gap-2">
              <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center">
                <Bot className="h-3 w-3 text-white" />
              </div>
              <div className="bg-muted p-2 rounded-lg">
                <div className="flex space-x-1">
                  <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce"></div>
                  <div
                    className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce"
                    style={{ animationDelay: "0.1s" }}
                  ></div>
                  <div
                    className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce"
                    style={{ animationDelay: "0.2s" }}
                  ></div>
                </div>
              </div>
            </div>
          )}
        </div>
      </ScrollArea>

      <form onSubmit={handleSubmit} className="flex gap-2 p-3 border-t">
        <Input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={getContextualPlaceholder()}
          disabled={isLoading}
          className="flex-1 text-sm"
        />
        <Button type="submit" disabled={isLoading || !input.trim()} size="sm">
          <Send className="h-3 w-3" />
        </Button>
      </form>
    </div>
  )
}
