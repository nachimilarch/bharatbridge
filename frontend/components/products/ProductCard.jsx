'use client';
import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';

export default function ProductCard({ product }) {
  const [imgError, setImgError] = useState(false);
  const apiBase = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001';
  const img = product.images?.[0]?.url;
  const imageUrl = img ? (img.startsWith('http') ? img : `${apiBase}${img}`) : null;

  const moq = product.minOrderQty ? `MOQ: ${product.minOrderQty} ${product.unit || 'units'}` : null;
  const price = product.price
    ? `$${Number(product.price).toLocaleString()} / ${product.unit || 'unit'}`
    : 'Price on request';

  return (
    <div className="group bg-white rounded-2xl border border-slate-200 overflow-hidden flex flex-col h-full shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
      {/* Image */}
      <Link href={`/products/${product.slug}`} className="block">
        <div className="relative overflow-hidden bg-slate-50" style={{ aspectRatio: '4/3' }}>
          {imageUrl && !imgError ? (
            <Image
              src={imageUrl}
              alt={product.name}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
              sizes="(max-width:640px) 100vw,(max-width:1024px) 50vw,25vw"
              onError={() => setImgError(true)}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <span className="text-5xl opacity-30">📦</span>
            </div>
          )}
          {/* Badges */}
          <div className="absolute top-0 left-0 right-0 p-2.5 flex justify-between items-start">
            {product.isFeatured && (
              <span className="bg-orange-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wide">Featured</span>
            )}
            {product.isVerified && (
              <span className="ml-auto bg-[#1E3A5F] text-white text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
                <svg className="w-2.5 h-2.5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/></svg>
                Verified
              </span>
            )}
          </div>
        </div>
      </Link>

      {/* Content */}
      <div className="p-4 flex flex-col flex-1">
        {/* Category */}
        {product.category && (
          <span className="text-[10px] font-bold text-orange-500 uppercase tracking-widest mb-1.5">
            {product.category.name}
          </span>
        )}

        {/* Name */}
        <Link href={`/products/${product.slug}`}>
          <h3 className="font-bold text-[#1F2937] text-sm leading-snug mb-2 line-clamp-2 hover:text-[#1E3A5F] transition-colors">
            {product.name}
          </h3>
        </Link>

        {/* Vendor */}
        {product.vendor && (
          <div className="flex items-center gap-1.5 mb-3 text-xs text-slate-500">
            <svg className="w-3 h-3 flex-shrink-0 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-2 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/></svg>
            <span className="truncate">{product.vendor.companyName}{product.vendor.city && `, ${product.vendor.city}`}</span>
          </div>
        )}

        {/* Countries */}
        {product.productCountries?.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-3">
            {product.productCountries.slice(0, 3).map(({ country }) => (
              <span key={country.id} className="text-[10px] bg-blue-50 text-blue-700 px-1.5 py-0.5 rounded font-medium">
                {country.flagEmoji} {country.isoCode}
              </span>
            ))}
            {product.productCountries.length > 3 && (
              <span className="text-[10px] bg-slate-100 text-slate-500 px-1.5 py-0.5 rounded">+{product.productCountries.length - 3}</span>
            )}
          </div>
        )}

        {/* Spacer */}
        <div className="flex-1" />

        {/* Price & MOQ */}
        <div className="border-t border-slate-100 pt-3 mt-1 flex items-end justify-between gap-2">
          <div>
            <div className="text-[#1E3A5F] font-bold text-sm">{price}</div>
            {moq && <div className="text-[10px] text-slate-400 mt-0.5">{moq}</div>}
          </div>
          <Link
            href={`/inquiry?product=${product.slug}`}
            className="text-xs font-semibold bg-orange-500 hover:bg-orange-600 text-white px-3 py-1.5 rounded-lg transition-colors whitespace-nowrap"
          >
            Get Quote
          </Link>
        </div>
      </div>
    </div>
  );
}
