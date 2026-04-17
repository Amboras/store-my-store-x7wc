'use client'

import { useState } from 'react'
import { ChevronDown } from 'lucide-react'

interface ProductAccordionProps {
  description?: string | null
  details?: Record<string, string>
}

function AccordionItem({
  title,
  children,
  defaultOpen = false,
}: {
  title: string
  children: React.ReactNode
  defaultOpen?: boolean
}) {
  const [isOpen, setIsOpen] = useState(defaultOpen)

  return (
    <div className="border-b last:border-0">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-center justify-between py-4 text-left"
      >
        <span className="text-sm font-semibold uppercase tracking-wider">{title}</span>
        <ChevronDown
          className={`h-4 w-4 text-muted-foreground transition-transform duration-200 ${
            isOpen ? 'rotate-180' : ''
          }`}
        />
      </button>
      <div
        className={`overflow-hidden transition-all duration-200 ${
          isOpen ? 'max-h-96 pb-4' : 'max-h-0'
        }`}
      >
        <div className="text-sm text-muted-foreground leading-relaxed">
          {children}
        </div>
      </div>
    </div>
  )
}

export default function ProductAccordion({ description, details }: ProductAccordionProps) {
  return (
    <div className="border-t">
      {description && (
        <AccordionItem title="Apraksts" defaultOpen>
          <div dangerouslySetInnerHTML={{ __html: description }} />
        </AccordionItem>
      )}

      <AccordionItem title="Piegāde un atgriešana">
        <ul className="space-y-2">
          <li>Bezmaksas standarta piegāde pasūtījumiem virs €50</li>
          <li>Piegāde visā Latvijā: 2–4 darba dienas</li>
          <li>Starptautiskā piegāde: 5–10 darba dienas</li>
          <li>Bezmaksas atgriešana 30 dienu laikā</li>
          <li>Prece jābūt nelietotai ar oriģinālajām etiķetēm</li>
        </ul>
      </AccordionItem>

      <AccordionItem title="Kopšanas instrukcijas">
        <ul className="space-y-2">
          <li>Mazgāt mazgāšanas mašīnā 30°C temperatūrā</li>
          <li>Negludināt uz apdrukājuma</li>
          <li>Ķīmiskā tīrīšana nav ieteicama</li>
          <li>Kaltēt horizontāli ēnā</li>
        </ul>
      </AccordionItem>

      <AccordionItem title="Materiāls">
        <ul className="space-y-2">
          <li>100% organiskā kokvilna, 180 g/m²</li>
          <li>Pastiprināts apkakles šuvums</li>
          <li>Dubultā šūšana uz pleciem un padusēm</li>
          <li>Noskalotas, lai novērstu saraušanos</li>
        </ul>
      </AccordionItem>
    </div>
  )
}
