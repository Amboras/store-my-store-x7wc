import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, Check, Heart, Leaf, Award } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Par mums',
  description: 'URBA stāsts — latviesu t-kreklu zīmols, kas nes latviesu kultūru un identitāti caur dizainu.',
}

const ABOUT_IMAGE = 'https://images.unsplash.com/photo-1503341504253-dff4815485f1?w=1200&q=80'
const ABOUT_IMAGE_2 = 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=800&q=80'

const values = [
  {
    icon: Heart,
    title: 'Latviesu identitāte',
    desc: 'Katrs dizains stāsta latviesu kultūras stāstu — ar lepnumu un mīlestību.',
  },
  {
    icon: Leaf,
    title: 'Ilgtspējība',
    desc: 'Organiskā kokvilna, atbildīga ražošana — mēs rūpējamies par planētu.',
  },
  {
    icon: Award,
    title: 'Premium kvalitāte',
    desc: 'Katrs t-krekls ir pārbaudes izturēts, lai nodrošinātu augstāko kvalitāti.',
  },
]

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-foreground text-background py-section">
        <div className="container-custom max-w-3xl text-center space-y-5">
          <p className="text-xs uppercase tracking-[0.25em] text-background/50">Mūsu stāsts</p>
          <h1 className="font-heading font-bold text-[clamp(2.5rem,7vw,5rem)] uppercase leading-tight">
            Radīts ar<br />
            <span className="text-accent">latviesu sirdi</span>
          </h1>
          <p className="text-background/70 text-lg max-w-xl mx-auto leading-relaxed">
            URBA ir vairāk nekā apģērbu zīmols — tas ir lepnums par to, kas mēs esam.
          </p>
        </div>
      </section>

      {/* Story section */}
      <section className="py-section">
        <div className="container-custom grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div className="relative aspect-[4/5] overflow-hidden">
            <Image
              src={ABOUT_IMAGE}
              alt="URBA — Par mums"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
          <div className="space-y-6 lg:max-w-md">
            <p className="text-xs uppercase tracking-[0.25em] text-muted-foreground font-medium">Kā tas sākās</p>
            <h2 className="font-heading font-bold text-h2 uppercase">No Rīgas<br />uz pasauli</h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                URBA dzima 2023. gadā ar vienu vienkāršu ideju: radīt t-kreklus, kas ar lepnumu
                pārstāv Latviju. Ne suvenirusveida, bet patiesi stilīgus, augstas kvalitātes
                apģērbus, ko valkāt ikdienā.
              </p>
              <p>
                Mūsu dizaineri ir dzimuši un auguši Latvijā. Katra kolekcija iedvesmojas no
                latviesu dabas, arhitektūras, folklorai un modernās pilsētas kultūras.
              </p>
              <p>
                Mēs ticam, ka mode var būt gan skaista, gan jēgpilna. Tāpēc katrs URBA t-krekls
                ir stāsts — stāsts par Latviju, tās cilvēkiem un vērtībām.
              </p>
            </div>
            <ul className="space-y-2.5">
              {[
                'Dibināts Rīgā, 2023. gadā',
                'Vairāk kā 500 apmierinātu klientu',
                '100% organiskā kokvilna',
                'Piegāde visā Latvijā un Eiropā',
              ].map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm">
                  <Check className="h-4 w-4 text-accent flex-shrink-0 mt-0.5" strokeWidth={2.5} />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-section bg-muted/20">
        <div className="container-custom">
          <div className="text-center space-y-3 mb-12">
            <p className="text-xs uppercase tracking-[0.25em] text-muted-foreground font-medium">Mūsu vērtības</p>
            <h2 className="font-heading font-bold text-h2 uppercase">Par ko mēs stāvam</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {values.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="text-center space-y-4 p-8 bg-background border border-border/50">
                <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center mx-auto">
                  <Icon className="h-6 w-6 text-accent" strokeWidth={1.5} />
                </div>
                <h3 className="font-heading font-bold text-lg uppercase">{title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Second image section */}
      <section className="py-section">
        <div className="container-custom grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div className="space-y-6 lg:max-w-md">
            <p className="text-xs uppercase tracking-[0.25em] text-muted-foreground font-medium">Mūsu process</p>
            <h2 className="font-heading font-bold text-h2 uppercase">Kvalitāte katrā<br />detaļā</h2>
            <p className="text-muted-foreground leading-relaxed">
              No idejas līdz gatavam produktam — mēs kontrolējam katru soli. Mūsu t-krekli
              tiek ražoti ar stingriem kvalitātes standartiem, nodrošinot, ka katra prece,
              ko tu saņem, ir perfekta.
            </p>
            <Link
              href="/products"
              className="inline-flex items-center gap-2 bg-foreground text-background px-8 py-3.5 text-sm font-bold uppercase tracking-widest hover:bg-accent transition-colors"
            >
              Iepirkties tagad
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="relative aspect-[4/5] overflow-hidden">
            <Image
              src={ABOUT_IMAGE_2}
              alt="URBA — kvalitātes kontrole"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
        </div>
      </section>
    </>
  )
}
