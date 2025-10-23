import type React from "react"
import type { Metadata } from "next"
import { Playfair_Display } from "next/font/google"
import { Source_Sans_3 as Source_Sans_Pro } from "next/font/google"
import "./globals.css"
import { HeaderChat } from "@/components/header-chat"

const playfairDisplay = Playfair_Display({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-playfair",
  weight: ["400", "600", "700", "800", "900"],
})

const sourceSansPro = Source_Sans_Pro({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-source-sans",
  weight: ["300", "400", "600", "700"],
})

export const metadata: Metadata = {
  title: "Prefeitura Precast - Sistema Inteligente de Gestão Municipal",
  description:
    "Plataforma integrada com IA para gestão municipal de São Paulo - Harnessing Data and AI for a Smarter City",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR" className={`${playfairDisplay.variable} ${sourceSansPro.variable} antialiased`}>
      <body className="font-sans">
        <div className="sticky top-0 z-50 bg-primary border-b">
          <div className="container mx-auto px-6 py-3 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="text-primary-foreground text-sm sm:text-base font-medium">Prefeitura Precast</span>
            </div>
            <div>
              {/* Global Chat in Header */}
              {/* @ts-expect-error Client Component in Server Layout */}
              <HeaderChat />
            </div>
          </div>
        </div>
        {children}
      </body>
    </html>
  )
}
