"use client"

import { useEffect, useRef, useState } from "react"
import { AIChat } from "@/components/ai-chat"
import { Button } from "@/components/ui/button"
import { MessageSquare } from "lucide-react"

export function HeaderChat() {
  const [open, setOpen] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function onClickOutside(e: MouseEvent) {
      if (!containerRef.current) return
      if (!containerRef.current.contains(e.target as Node)) {
        // collapse on outside click
        setOpen(false)
      }
    }
    document.addEventListener("mousedown", onClickOutside)
    return () => document.removeEventListener("mousedown", onClickOutside)
  }, [])

  return (
    <div ref={containerRef} className="relative">
      <div className="flex items-center gap-3">
        <Button size="sm" variant="secondary" onClick={() => setOpen(true)} aria-expanded={open}>
          <MessageSquare className="h-4 w-4 mr-1" /> IA Precast
        </Button>
        {!open && (
          <input
            onFocus={() => setOpen(true)}
            placeholder="Pergunte à IA..."
            className="h-9 w-56 rounded-md border bg-background px-3 text-sm outline-none"
          />
        )}
      </div>

      {open && (
        <div className="fixed inset-x-0 md:inset-x-auto md:right-4 top-16 md:top-20 md:w-[min(900px,85vw)] z-50">
          <div className="bg-background border rounded-lg shadow-xl p-2 md:p-3">
            <div className="h-[60vh] md:h-[70vh]">
              <AIChat />
            </div>
            <div className="flex justify-end mt-2">
              <Button variant="ghost" size="sm" onClick={() => setOpen(false)}>
                Recolher
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
