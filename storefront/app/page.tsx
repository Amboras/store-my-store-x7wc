'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'
import { ArrowRight, Truck, Shield, RotateCcw, Flame, Star, Check } from 'lucide-react'
import CollectionSection from '@/components/marketing/collection-section'
import { useCollections } from '@/hooks/use-collections'
import { trackMetaEvent } from '@/lib/meta-pixel'

const HERO_IMAGE = 'https://images.unsplash.com/photo-1529374255404-311a2a4f1fd9?w=1200&q=80'
const LIFESTYLE_IMAGE = 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=1200&q=80'
const LIFESTYLE_IMAGE_2 = 'https://images.unsplash.com/photo-1503341504253-dff4815485f1?w=1200&q=80'

const features = [
  {
    icon: Truck,
    title: 'Bezmaksas piegāde',
    desc: 'Pasūtījumiem virs €50',
  },
  {
    icon: RotateCcw,
    title: 'Viegla atgriešana',
    desc: '30 dienu atgriešanas politika',
  },
  {
    icon: Shield,
    title: 'Droša apmaksa',
    desc: '256-bitu SSL šifrēšana',
  },
]

export default function HomePage() {
  const { data: collections, isLoading } = useCollections()
  const [newsletterEmail, setNewsletterEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newsletterEmail.trim()) return
    trackMetaEvent('Lead', {
      content_name: 'newsletter_signup',
      status: 'submitted',
    })
    setSubmitted(true)
  }

  return (
    <>
      {/* ─── HERO ─────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-muted/20">
        <div className="container-custom grid lg:grid-cols-2 gap-0 lg:gap-12 items-center py-12 lg:py-20">
          {/* Text */}
          <div className="space-y-7 animate-fade-in-up order-2 lg:order-1 pt-8 lg:pt-0">
            <div className="flex items-center gap-2">
              <span className="inline-block h-px w-8 bg-accent" />
              <p className="text-xs uppercase tracking-[0.25em] text-muted-foreground font-medium">
                Jauna Kolekcija — 2025
              </p>
            </div>
            <h1 className="font-heading font-bold text-[clamp(3rem,8vw,5.5rem)] leading-[0.95] uppercase tracking-tight">
              Latviesu<br />
              <span className="text-accent">Stils.</span><br />
              Tava Identitāte.
            </h1>
            <p className="text-base text-muted-foreground max-w-md leading-relaxed">
              T-krekli ar latviesu dvēseli — oriģināli dizaini, kas runā par to, kas tu esi.
              Ražoti no premium kokvilnas, radīti, lai paliek.
            </p>

            {/* Social proof pill */}
            <div className="flex items-center gap-2 bg-muted/60 border border-border/60 rounded-full px-4 py-2 w-fit">
              <div className="flex -space-x-1.5">
                {['bg-orange-400', 'bg-blue-400', 'bg-green-400', 'bg-purple-400'].map((c, i) => (
                  <div key={i} className={`w-6 h-6 rounded-full border-2 border-background ${c}`} />
                ))}
              </div>
              <div className="flex items-center gap-1">
                {[1,2,3,4,5].map(i => <Star key={i} className="h-3 w-3 fill-accent text-accent" />)}
              </div>
              <span className="text-xs text-muted-foreground font-medium">500+ apmierināti klienti</span>
            </div>

            <div className="flex flex-wrap gap-3 pt-1">
              <Link
                href="/products"
                className="inline-flex items-center gap-2 bg-foreground text-background px-8 py-3.5 text-sm font-semibold uppercase tracking-widest hover:bg-accent transition-colors"
                prefetch={true}
              >
                Iepirkties tagad
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/about"
                className="inline-flex items-center gap-2 border border-foreground px-8 py-3.5 text-sm font-semibold uppercase tracking-widest hover:bg-foreground hover:text-background transition-colors"
                prefetch={true}
              >
                Mūsu stāsts
              </Link>
            </div>
          </div>

          {/* Hero Image */}
          <div className="relative order-1 lg:order-2">
            <div className="relative aspect-[4/5] bg-muted overflow-hidden">
              <Image
                src={HERO_IMAGE}
                alt="URBA — Latviesu t-krekli"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
                priority
              />
              {/* Urgency badge */}
              <div className="absolute top-4 left-4 bg-accent text-white text-xs font-bold uppercase tracking-wider px-3 py-1.5 flex items-center gap-1.5">
                <Flame className="h-3.5 w-3.5" />
                Limitēts daudzums
              </div>
            </div>
            {/* Offset accent block */}
            <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-accent/15 -z-10" />
          </div>
        </div>
      </section>

      {/* ─── TRUST BAR ─────────────────────────────────────────────── */}
      <section className="border-y bg-foreground text-background">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-background/10">
            {features.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="flex items-center gap-4 justify-center py-5 px-6">
                <Icon className="h-5 w-5 flex-shrink-0 text-accent" strokeWidth={1.5} />
                <div>
                  <p className="text-sm font-semibold text-background">{title}</p>
                  <p className="text-xs text-background/50">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── COLLECTIONS ───────────────────────────────────────────── */}
      {isLoading ? (
        <section className="py-section">
          <div className="container-custom">
            <div className="animate-pulse space-y-4 text-center">
              <div className="h-3 w-20 bg-muted rounded mx-auto" />
              <div className="h-8 w-64 bg-muted rounded mx-auto" />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
              {[1, 2, 3].map((i) => (
                <div key={i} className="aspect-[3/4] bg-muted rounded animate-pulse" />
              ))}
            </div>
          </div>
        </section>
      ) : collections && collections.length > 0 ? (
        <>
          {collections.map((collection: { id: string; handle: string; title: string; metadata?: Record<string, unknown> }, index: number) => (
            <CollectionSection
              key={collection.id}
              collection={collection}
              alternate={index % 2 === 1}
            />
          ))}
        </>
      ) : null}

      {/* ─── FEATURED PRODUCTS CTA ─────────────────────────────────── */}
      <section className="py-section">
        <div className="container-custom text-center space-y-4">
          <p className="text-xs uppercase tracking-[0.25em] text-muted-foreground font-medium">Mūsu izlase</p>
          <h2 className="font-heading font-bold text-h2 uppercase">Populārākie t-krekli</h2>
          <p className="text-muted-foreground max-w-md mx-auto">
            Šie dizaini ir mūsu klientu favorīti — katrs ar savu stāstu un latviesu identitāti.
          </p>
          <div className="pt-4">
            <Link
              href="/products"
              className="inline-flex items-center gap-2 bg-foreground text-background px-10 py-4 text-sm font-semibold uppercase tracking-widest hover:bg-accent transition-colors"
              prefetch={true}
            >
              Skatīt visus
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ─── BRAND STORY ───────────────────────────────────────────── */}
      <section className="py-section bg-muted/20">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div className="relative">
              <div className="aspect-[4/5] overflow-hidden">
                <Image
                  src={LIFESTYLE_IMAGE}
                  alt="URBA — Latviesu stils"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>
              <div className="absolute -bottom-3 -right-3 bg-accent text-white p-4 text-center">
                <p className="font-heading font-bold text-2xl leading-none">100%</p>
                <p className="text-xs uppercase tracking-wider mt-0.5">Kokvilna</p>
              </div>
            </div>
            <div className="space-y-6 lg:max-w-md">
              <p className="text-xs uppercase tracking-[0.25em] text-muted-foreground font-medium">Mūsu stāsts</p>
              <h2 className="font-heading font-bold text-h2 uppercase leading-tight">
                Radīts Latvijā<br />Domāts pasaulei
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                URBA piedzima no mīlestības pret Latviju un vēlmes parādīt mūsu kultūru
                pasaulei. Katrs t-krekls ir vairāk nekā apģērbs — tas ir stāsts, identitāte,
                un lepnums par to, kas mēs esam.
              </p>
              <ul className="space-y-3">
                {[
                  'Premium 100% organiskā kokvilna',
                  'Oriģināli latviesu dizaini',
                  'Ražots atbildīgi un ilgtspējīgi',
                  'Bezmaksas piegāde visā Latvijā',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm">
                    <Check className="h-4 w-4 text-accent flex-shrink-0 mt-0.5" strokeWidth={2.5} />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <Link
                href="/about"
                className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-widest border-b border-foreground pb-0.5 hover:text-accent hover:border-accent transition-colors"
                prefetch={true}
              >
                Uzzināt vairāk
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ─── LIFESTYLE GRID ────────────────────────────────────────── */}
      <section className="py-section">
        <div className="container-custom">
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-3">
            <div className="relative aspect-square overflow-hidden col-span-2 lg:col-span-1 lg:row-span-2">
              <Image
                src={LIFESTYLE_IMAGE_2}
                alt="Urbāns stils"
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover hover:scale-105 transition-transform duration-700"
              />
            </div>
            <div className="relative aspect-square overflow-hidden">
              <Image
                src={HERO_IMAGE}
                alt="T-kreklu kolekcija"
                fill
                sizes="25vw"
                className="object-cover hover:scale-105 transition-transform duration-700"
              />
            </div>
            <div className="relative aspect-square overflow-hidden">
              <Image
                src={LIFESTYLE_IMAGE}
                alt="Latviesu dizains"
                fill
                sizes="25vw"
                className="object-cover hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-foreground/60 flex items-center justify-center">
                <div className="text-center text-background">
                  <p className="font-heading font-bold text-2xl uppercase">@urba.lv</p>
                  <p className="text-xs mt-1 text-background/70">Seko mums Instagram</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── NEWSLETTER ────────────────────────────────────────────── */}
      <section className="py-section bg-foreground text-background">
        <div className="container-custom max-w-xl text-center">
          <p className="text-xs uppercase tracking-[0.25em] text-background/50 font-medium mb-3">Paliec kontaktā</p>
          <h2 className="font-heading font-bold text-h2 uppercase text-background">
            Esi pirmais, kas uzzina
          </h2>
          <p className="mt-3 text-background/60 text-sm">
            Jaunumi, ekskluzīvi piedāvājumi un jaunas kolekcijas — tieši uz tavu e-pastu.
          </p>
          {submitted ? (
            <div className="mt-8 flex items-center justify-center gap-2 text-accent font-semibold">
              <Check className="h-5 w-5" />
              <span>Paldies! Tev iesūtīsim jaunumus.</span>
            </div>
          ) : (
            <form className="mt-8 flex gap-0" onSubmit={handleNewsletterSubmit}>
              <input
                type="email"
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                placeholder="tavs@epasts.lv"
                className="flex-1 border border-background/20 bg-background/10 px-4 py-3.5 text-sm placeholder:text-background/40 text-background focus:outline-none focus:border-accent transition-colors"
              />
              <button
                type="submit"
                className="bg-accent text-white px-6 py-3.5 text-sm font-semibold uppercase tracking-widest hover:opacity-90 transition-opacity whitespace-nowrap"
              >
                Pieteikties
              </button>
            </form>
          )}
        </div>
      </section>
    </>
  )
}
