import type React from "react"
import type { Metadata } from "next"
import { Playfair_Display } from "next/font/google"
import { Source_Sans_3 as Source_Sans_Pro } from "next/font/google"
import "./globals.css"

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
      <body className="font-sans">{children}</body>
    </html>
  )
}
