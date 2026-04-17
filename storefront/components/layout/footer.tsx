'use client'

import Link from 'next/link'
import { clearConsent } from '@/lib/cookie-consent'
import { usePolicies } from '@/hooks/use-policies'
import { Share2, Mail, MapPin } from 'lucide-react'

const footerLinks = {
  shop: [
    { label: 'Visi t-krekli', href: '/products' },
    { label: 'Jaunumi', href: '/products?sort=newest' },
    { label: 'Kolekcijas', href: '/collections' },
  ],
  help: [
    { label: 'BUJ', href: '/faq' },
    { label: 'Piegāde un atgriešana', href: '/shipping' },
    { label: 'Sazinies ar mums', href: '/contact' },
  ],
}

export default function Footer() {
  const { policies } = usePolicies()

  const companyLinks = [
    { label: 'Par mums', href: '/about' },
  ]

  if (policies?.privacy_policy) {
    companyLinks.push({ label: 'Privātuma politika', href: '/privacy' })
  }
  if (policies?.terms_of_service) {
    companyLinks.push({ label: 'Lietošanas noteikumi', href: '/terms' })
  }
  if (policies?.refund_policy) {
    companyLinks.push({ label: 'Atgriešanas politika', href: '/refund-policy' })
  }
  if (policies?.cookie_policy) {
    companyLinks.push({ label: 'Sīkdatņu politika', href: '/cookie-policy' })
  }

  return (
    <footer className="border-t bg-foreground text-background">
      <div className="container-custom py-section-sm">
        {/* Main Footer */}
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link href="/" className="inline-block">
              <span className="font-heading text-3xl font-bold uppercase tracking-tight text-background">
                URBA
              </span>
            </Link>
            <p className="mt-4 text-sm text-background/60 leading-relaxed max-w-xs">
              Oriģināli latviesu dizaina t-krekli. Radīts Latvijā, domāts ikvienam.
            </p>
            <div className="mt-5 flex items-center gap-4">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-background/60 hover:text-background transition-colors"
                aria-label="Instagram"
              >
                <Share2 className="h-5 w-5" />
              </a>
              <a
                href="mailto:info@urba.lv"
                className="text-background/60 hover:text-background transition-colors"
                aria-label="E-pasts"
              >
                <Mail className="h-5 w-5" />
              </a>
              <div className="flex items-center gap-1.5 text-background/60 text-xs">
                <MapPin className="h-3.5 w-3.5" />
                <span>Rīga, Latvija</span>
              </div>
            </div>
          </div>

          {/* Shop Links */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-widest mb-4 text-background/40">Veikals</h3>
            <ul className="space-y-3">
              {footerLinks.shop.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-background/70 hover:text-background transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Help Links */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-widest mb-4 text-background/40">Palīdzība</h3>
            <ul className="space-y-3">
              {footerLinks.help.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-background/70 hover:text-background transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-widest mb-4 text-background/40">Uzņēmums</h3>
            <ul className="space-y-3">
              {companyLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-background/70 hover:text-background transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-background/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-background/40">
            &copy; {new Date().getFullYear()} URBA. Visas tiesības aizsargātas.
          </p>
          <div className="flex items-center gap-6">
            <button
              onClick={() => {
                clearConsent()
                window.dispatchEvent(new Event('manage-cookies'))
              }}
              className="text-xs text-background/40 hover:text-background/70 transition-colors"
            >
              Pārvaldīt sīkdatnes
            </button>
            <span className="text-xs text-background/30">Powered by Amboras</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
