'use client';
import Link  from 'next/link';
import Image from 'next/image';
import { MapPin, Package, ShieldCheck, MessageSquare } from 'lucide-react';
import { useCurrency } from '@/context/CurrencyContext';

export default function ProductCard({ product }) {
  const { format } = useCurrency();
  const apiBase = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001';
  const img = product.images?.[0]?.url;
  const imageUrl = img ? (img.startsWith('http') ? img : `${apiBase}${img}`) : null;

  return (
    <div className="bb-card-hover flex flex-col h-full group">
      {/* Image */}
      <Link href={`/products/${product.slug}`} className="block">
        <div className="relative overflow-hidden bg-slate-50" style={{ aspectRatio: '4/3' }}>
          {imageUrl ? (
            <Image src={imageUrl} alt={product.name} fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
              sizes="(max-width:640px) 100vw,(max-width:1024px) 50vw,25vw" />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <span className="text-5xl opacity-40">📦</span>
            </div>
          )}

          {/* Overlays */}
          <div className="absolute top-0 left-0 right-0 p-2.5 flex justify-between items-start">
            {product.isFeatured && (
              <span className="bb-badge bb-badge-featured text-[10px]">⭐ Featured</span>
            )}
            <span className="ml-auto bb-badge bb-badge-verified text-[10px]">
              <ShieldCheck size={10} /> Verified
            </span>
          </div>
        </div>
      </Link>

      {/* Content */}
      <div className="p-4 flex flex-col flex-1">
        {/* Category */}
        {product.category && (
          <span className="text-[10px] font-bold text-blue-600 uppercase tracking-widest mb-1.5">
            {product.category.name}
          </span>
        )}

        {/* Name */}
        <Link href={`/products/${product.slug}`}>
          <h3 className="font-heading font-bold text-slate-900 text-sm leading-snug mb-2 line-clamp-2 hover:text-blue-700 transition-colors">
            {product.name}
          </h3>
        </Link>

        {/* Vendor */}
        {product.vendor && (
          <p className="text-xs text-slate-400 flex items-center gap-1 mb-3">
            <MapPin size={10} className="flex-shrink-0 text-slate-300" />
            <span className="truncate">{product.vendor.companyName}{product.vendor.city && `, ${product.vendor.city}`}</span>
          </p>
        )}

        {/* Countries */}
        {product.productCountries?.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-3">
            {product.productCountries.slice(0, 3).map(({ country }) => (
              <span key={country.id} className="text-[10px] bg-blue-50 text-blue-600 px-2 py-0.5 rounded-md font-medium">
                {country.flagEmoji} {country.isoCode}
              </span>
            ))}
            {product.productCountries.length > 3 && (
              <span className="text-[10px] bg-slate-100 text-slate-500 px-2 py-0.5 rounded-md">
                +{product.productCountries.length - 3}
              </span>
            )}
          </div>
        )}

        {/* Price + MOQ */}
        <div className="mt-auto pt-3 border-t border-slate-50">
          <div className="flex items-end justify-between mb-3">
            <div>
              <p className="text-[10px] text-slate-400 font-semibold uppercase tracking-wide mb-0.5">Starting from</p>
              <p className="font-heading font-black text-blue-700 text-lg leading-none">
                {format(product.basePriceInr)}
              </p>
            </div>
            {product.minOrderQty > 1 && (
              <span className="text-[10px] text-slate-500 flex items-center gap-1 bg-slate-50 border border-slate-100 px-2 py-1 rounded-lg">
                <Package size={10} /> MOQ: {product.minOrderQty} {product.unit}
              </span>
            )}
          </div>

          {/* CTA */}
          <Link href={`/products/${product.slug}#inquiry`}
            className="bb-btn bb-btn-primary w-full justify-center text-xs py-2.5 rounded-lg">
            <MessageSquare size={13} /> Request Quote
          </Link>
        </div>
      </div>
    </div>
  );
}
