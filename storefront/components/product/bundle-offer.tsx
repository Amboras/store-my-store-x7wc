'use client'

import { useState } from 'react'
import { Package, Check, Loader2, Tag } from 'lucide-react'
import { useCart } from '@/hooks/use-cart'
import { toast } from 'sonner'
import type { Product } from '@/types'
import { type VariantExtension } from '@/components/product/product-price'

interface BundleOfferProps {
  product: Product
  variantExtensions?: Record<string, VariantExtension>
}

interface ProductVariantWithPrice {
  id: string
  calculated_price?: {
    calculated_amount?: number
    currency_code?: string
  } | number
  [key: string]: unknown
}

function formatEur(cents: number) {
  return `€${(cents / 100).toFixed(2)}`
}

const BUNDLE_OPTIONS = [
  {
    id: 'single',
    label: '1 t-krekls',
    qty: 1,
    badge: null,
    discount: 0,
  },
  {
    id: 'double',
    label: '2 t-krekli',
    qty: 2,
    badge: 'Populārs',
    discount: 10, // 10% off
  },
  {
    id: 'triple',
    label: '3 t-krekli',
    qty: 3,
    badge: 'Labākā vērtība',
    discount: 20, // 20% off
  },
]

export default function BundleOffer({ product, variantExtensions }: BundleOfferProps) {
  const [selectedBundle, setSelectedBundle] = useState('single')
  const [isAdding, setIsAdding] = useState(false)
  const [justAdded, setJustAdded] = useState(false)
  const { addItem } = useCart()

  const variants = (product.variants || []) as unknown as ProductVariantWithPrice[]
  const firstVariant = variants[0]

  if (!firstVariant) return null

  const cp = firstVariant.calculated_price
  const basePrice: number = cp
    ? typeof cp === 'number'
      ? cp
      : (cp.calculated_amount ?? 0)
    : 0

  const bundle = BUNDLE_OPTIONS.find((b) => b.id === selectedBundle) || BUNDLE_OPTIONS[0]
  const discountedPrice = Math.round(basePrice * (1 - bundle.discount / 100))
  const totalPrice = discountedPrice * bundle.qty
  const savedAmount = (basePrice * bundle.qty) - totalPrice

  const handleBundleAdd = async () => {
    if (!firstVariant?.id || isAdding) return
    setIsAdding(true)
    try {
      await new Promise<void>((resolve, reject) =>
        addItem(
          { variantId: firstVariant.id, quantity: bundle.qty },
          { onSuccess: () => resolve(), onError: (err: Error) => reject(err) }
        )
      )
      setJustAdded(true)
      toast.success(`${bundle.qty} t-krekls pievienots grozam!`)
      setTimeout(() => setJustAdded(false), 2500)
    } catch {
      toast.error('Neizdevās pievienot grozam')
    } finally {
      setIsAdding(false)
    }
  }

  return (
    <div className="border-2 border-accent/40 bg-accent/5 p-4 space-y-3">
      {/* Header */}
      <div className="flex items-center gap-2">
        <Tag className="h-4 w-4 text-accent" />
        <p className="text-sm font-bold uppercase tracking-wider">Komplekta piedāvājums</p>
      </div>

      {/* Bundle options */}
      <div className="space-y-2">
        {BUNDLE_OPTIONS.map((opt) => {
          const optPrice = Math.round(basePrice * (1 - opt.discount / 100))
          const optTotal = optPrice * opt.qty
          const isSelected = selectedBundle === opt.id

          return (
            <button
              key={opt.id}
              onClick={() => setSelectedBundle(opt.id)}
              className={`w-full flex items-center justify-between px-3 py-2.5 border-2 text-left transition-all ${
                isSelected
                  ? 'border-accent bg-white'
                  : 'border-border/60 bg-white/60 hover:border-accent/50'
              }`}
            >
              <div className="flex items-center gap-3">
                {/* Radio circle */}
                <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                  isSelected ? 'border-accent' : 'border-border'
                }`}>
                  {isSelected && <div className="w-2 h-2 rounded-full bg-accent" />}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-semibold">{opt.label}</span>
                    {opt.badge && (
                      <span className="text-[10px] font-bold uppercase bg-accent text-white px-1.5 py-0.5 rounded-sm">
                        {opt.badge}
                      </span>
                    )}
                  </div>
                  {opt.discount > 0 && (
                    <p className="text-xs text-accent font-medium">{opt.discount}% atlaide</p>
                  )}
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm font-bold">{formatEur(optTotal)}</p>
                {opt.discount > 0 && (
                  <p className="text-xs text-muted-foreground line-through">{formatEur(basePrice * opt.qty)}</p>
                )}
              </div>
            </button>
          )
        })}
      </div>

      {/* Savings badge */}
      {savedAmount > 0 && (
        <div className="text-xs text-accent font-semibold text-center">
          Tu ietaupi {formatEur(savedAmount)} ar šo komplektu!
        </div>
      )}

      {/* CTA */}
      <button
        onClick={handleBundleAdd}
        disabled={isAdding || justAdded}
        className={`w-full flex items-center justify-center gap-2 py-3.5 text-sm font-bold uppercase tracking-widest transition-all ${
          justAdded
            ? 'bg-green-600 text-white'
            : 'bg-accent text-white hover:opacity-90'
        }`}
      >
        {isAdding ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : justAdded ? (
          <>
            <Check className="h-4 w-4" />
            Pievienots!
          </>
        ) : (
          <>
            <Package className="h-4 w-4" />
            Pievienot komplektu — {formatEur(totalPrice)}
          </>
        )}
      </button>
    </div>
  )
}
