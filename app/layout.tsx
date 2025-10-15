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
  const hexglyphHref = "https://hexglyph.com"

  return (
    <html lang="pt-BR" className={`${playfairDisplay.variable} ${sourceSansPro.variable} antialiased`}>
      <body className="font-sans">
        <div className="sticky top-0 z-50 bg-primary border-b">
          <div className="container mx-auto px-6 py-3 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <a
                href={hexglyphHref}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 text-primary-foreground hover:text-primary-foreground/80 transition"
                aria-label="Hexglyph"
              >
                <span className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-primary-foreground/40 bg-primary-foreground/10">
                  <svg
                    viewBox="0 0 64 64"
                    role="img"
                    aria-hidden="true"
                    className="h-7 w-7 text-primary-foreground"
                  >
                    <path
                      d="M32 4.5a3 3 0 0 0-2.6 1.5L12.8 34a3 3 0 0 0 0 3l16.6 28a3 3 0 0 0 5.2 0l16.6-28a3 3 0 0 0 0-3L34.6 6a3 3 0 0 0-2.6-1.5Zm0 6.9 14.2 24.1L32 59.6 17.8 35.5 32 11.4Z"
                      fill="currentColor"
                    />
                    <path
                      d="M32 18a2 2 0 0 0-2 2v24a2 2 0 0 0 4 0V20a2 2 0 0 0-2-2Zm-9 9a2 2 0 0 0-2 2v6a2 2 0 1 0 4 0v-6a2 2 0 0 0-2-2Zm18 0a2 2 0 0 0-2 2v6a2 2 0 1 0 4 0v-6a2 2 0 0 0-2-2Z"
                      fill="currentColor"
                      opacity="0.75"
                    />
                  </svg>
                </span>
                <span className="hidden sm:inline text-sm font-semibold tracking-wide uppercase">Hexglyph</span>
              </a>
              <span className="text-primary-foreground text-sm sm:text-base font-medium">Daniel NieBraz</span>
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
