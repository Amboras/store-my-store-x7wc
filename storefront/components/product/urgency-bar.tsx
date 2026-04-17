'use client'

import { useEffect, useState } from 'react'
import { Flame, Clock } from 'lucide-react'

export default function UrgencyBar() {
  const [stock] = useState(() => Math.floor(Math.random() * 6) + 4) // 4-9
  const [viewers] = useState(() => Math.floor(Math.random() * 8) + 7) // 7-14
  const [timeLeft, setTimeLeft] = useState({ hours: 2, minutes: 47, seconds: 33 })

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        let { hours, minutes, seconds } = prev
        seconds -= 1
        if (seconds < 0) { seconds = 59; minutes -= 1 }
        if (minutes < 0) { minutes = 59; hours -= 1 }
        if (hours < 0) { hours = 2; minutes = 59; seconds = 59 }
        return { hours, minutes, seconds }
      })
    }, 1000)
    return () => clearInterval(interval)
  }, [])

  const pad = (n: number) => String(n).padStart(2, '0')

  return (
    <div className="space-y-2">
      {/* Low stock */}
      <div className="flex items-center gap-2 bg-red-50 border border-red-200 px-3 py-2.5 text-xs font-medium text-red-700">
        <Flame className="h-3.5 w-3.5 flex-shrink-0" />
        <span>
          Uzmanību! Atlicis tikai <strong>{stock} gabali</strong> —{' '}
          <span className="text-red-500">{viewers} cilvēki šobrīd apskata šo produktu</span>
        </span>
      </div>

      {/* Sale countdown */}
      <div className="flex items-center gap-2 bg-accent/10 border border-accent/30 px-3 py-2.5 text-xs font-medium text-foreground">
        <Clock className="h-3.5 w-3.5 flex-shrink-0 text-accent" />
        <span>
          Izpārdošanas cena beidzas pēc:{' '}
          <strong className="text-accent font-bold tabular-nums">
            {pad(timeLeft.hours)}:{pad(timeLeft.minutes)}:{pad(timeLeft.seconds)}
          </strong>
        </span>
      </div>
    </div>
  )
}
