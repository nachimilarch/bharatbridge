'use client';
import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const TRENDING = ['Basmati Rice', 'Turmeric Powder', 'Cotton Fabric', 'Detergent Pods', 'Office Furniture'];

export default function HeroSection() {
  const [query, setQuery] = useState('');
  const router = useRouter();

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) router.push(`/products?search=${encodeURIComponent(query.trim())}`);
  };

  return (
    <section
      className="relative overflow-hidden"
      style={{ background: 'linear-gradient(135deg, #0a0f2e 0%, #0d1a4e 50%, #1a0f60 100%)' }}
    >
      {/* Background orbs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full bg-orange-500/10 blur-[120px]" />
        <div className="absolute -bottom-40 -left-40 w-[500px] h-[500px] rounded-full bg-indigo-500/10 blur-[100px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] rounded-full bg-blue-600/5 blur-[80px]" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-24 text-center">

        {/* Trust badge */}
        <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-5 py-2 text-sm text-white mb-8 backdrop-blur">
          <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
          <span>🇮🇳 India’s #1 Verified B2B Export Marketplace</span>
        </div>

        {/* Headline */}
        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black text-white leading-tight mb-6">
          Source
          <span
            style={{
              background: 'linear-gradient(135deg, #f97316, #fbbf24)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          > Premium<br />Indian Products </span>
          Globally
        </h1>

        {/* Sub */}
        <p className="text-xl text-blue-200 max-w-2xl mx-auto mb-10 leading-relaxed">
          Connect directly with <strong className="text-white">500+ KYC-verified Indian manufacturers</strong>.
          Browse Rice, Spices, Furniture, Chemicals & more.
          Submit bulk inquiries and get factory-direct prices.
        </p>

        {/* Search bar */}
        <form onSubmit={handleSearch} className="max-w-2xl mx-auto mb-6">
          <div className="flex bg-white rounded-2xl shadow-2xl overflow-hidden p-1.5 gap-2">
            <div className="flex items-center pl-3 text-gray-400">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
              </svg>
            </div>
            <input
              type="text"
              value={query}
              onChange={e => setQuery(e.target.value)}
              placeholder='Search products… e.g. &quot;Basmati Rice&quot;, &quot;Cotton Fabric&quot;'
              className="flex-1 py-3 px-2 text-gray-800 outline-none text-sm bg-transparent"
            />
            <select className="px-3 text-sm text-gray-600 border-l border-gray-200 bg-transparent outline-none hidden sm:block">
              <option>All Categories</option>
              <option>Rice & Grains</option>
              <option>Spices</option>
              <option>Furniture</option>
              <option>Chemicals</option>
            </select>
            <button type="submit" className="bg-orange-500 hover:bg-orange-600 text-white font-bold px-6 py-3 rounded-xl transition text-sm whitespace-nowrap">
              Search
            </button>
          </div>
        </form>

        {/* Trending */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          <span className="text-blue-300 text-sm">Trending:</span>
          {TRENDING.map(t => (
            <button key={t} onClick={() => { setQuery(t); router.push(`/products?search=${encodeURIComponent(t)}`); }}
              className="text-sm text-white bg-white/10 hover:bg-orange-500/80 border border-white/20 px-4 py-1.5 rounded-full transition">
              {t}
            </button>
          ))}
        </div>

        {/* CTA buttons */}
        <div className="flex flex-wrap items-center justify-center gap-4">
          <Link href="/products" className="bg-orange-500 hover:bg-orange-600 text-white font-bold px-8 py-4 rounded-full text-base transition shadow-lg shadow-orange-500/30 hover:scale-105">
            Browse All Products →
          </Link>
          <Link href="/inquiry" className="border-2 border-white/40 hover:border-white text-white font-bold px-8 py-4 rounded-full text-base transition hover:bg-white/10">
            Submit Buying Inquiry
          </Link>
        </div>

      </div>
    </section>
  );
}
