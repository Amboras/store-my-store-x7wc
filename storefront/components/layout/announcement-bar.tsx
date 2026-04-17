'use client'

import { useState } from 'react'
import { X, Package } from 'lucide-react'

export default function AnnouncementBar() {
  const [isVisible, setIsVisible] = useState(true)

  if (!isVisible) return null

  return (
    <div className="relative bg-foreground text-background">
      <div className="container-custom flex items-center justify-center gap-2 py-2.5 text-xs sm:text-sm tracking-wide font-medium">
        <Package className="h-3.5 w-3.5 flex-shrink-0" strokeWidth={2} />
        <p>Bezmaksas piegāde pasūtījumiem virs €50 — Latvijā un visā Eiropā</p>
        <button
          onClick={() => setIsVisible(false)}
          className="absolute right-4 p-1 hover:opacity-70 transition-opacity"
          aria-label="Aizvērt paziņojumu"
        >
          <X className="h-3.5 w-3.5" />
        </button>
      </div>
    </div>
  )
}
