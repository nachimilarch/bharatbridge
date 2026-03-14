'use client';
import Link from 'next/link';
import { Search, ArrowRight, ShieldCheck, Globe, TrendingUp, Star } from 'lucide-react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

const POPULAR = ['Basmati Rice', 'Cotton Fabric', 'Spices', 'Handicrafts', 'Leather Bags'];

export default function HeroSection() {
  const [search, setSearch] = useState('');
  const router = useRouter();

  const handleSearch = (e) => {
    e.preventDefault();
    if (search.trim()) router.push(`/products?search=${encodeURIComponent(search.trim())}`);
  };

  return (
    <section className="relative overflow-hidden bg-gradient-hero">
      {/* Blobs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-brand-100/40 rounded-full blur-[120px] -translate-y-1/3 translate-x-1/3" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-orange-100/50 rounded-full blur-[80px] translate-y-1/2 -translate-x-1/4" />
      </div>

      <div className="page-container relative py-20 md:py-28 lg:py-32">
        <div className="max-w-3xl mx-auto text-center">

          {/* Pill badge */}
          <div className="inline-flex items-center gap-2 bg-white border border-brand-200 text-brand-700 text-xs font-semibold px-4 py-2 rounded-full mb-8 shadow-sm animate-fade-in">
            <span className="w-1.5 h-1.5 bg-brand-500 rounded-full animate-pulse" />
            🇮🇳 India's #1 B2B Export Marketplace
          </div>

          {/* Headline */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-heading font-bold text-gray-900 mb-6 leading-[1.1] text-balance animate-slide-up">
            Connect with
            <span className="block text-gradient-brand">Verified Indian</span>
            Exporters Worldwide
          </h1>

          <p className="text-lg md:text-xl text-gray-500 mb-10 leading-relaxed max-w-2xl mx-auto">
            Browse 10,000+ quality products — textiles, spices, handicrafts and more.
            Submit inquiries directly to KYC-verified manufacturers.
          </p>

          {/* Search */}
          <form onSubmit={handleSearch} className="flex gap-2 max-w-xl mx-auto mb-4">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input
                type="text"
                placeholder="Search products, categories..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-11 pr-4 py-3.5 bg-white border border-gray-200 rounded-2xl text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-brand-500/30 focus:border-brand-500 transition-all"
              />
            </div>
            <button type="submit" className="btn btn-primary shine px-6 py-3.5 text-sm rounded-2xl">
              Search
            </button>
          </form>

          {/* Popular searches */}
          <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
            <span className="text-xs text-gray-400 font-medium">Popular:</span>
            {POPULAR.map((term) => (
              <button
                key={term}
                onClick={() => router.push(`/products?search=${encodeURIComponent(term)}`)}
                className="text-xs bg-white border border-gray-200 text-gray-600 hover:border-brand-400 hover:text-brand-600 px-3 py-1 rounded-full transition-all hover:shadow-sm"
              >
                {term}
              </button>
            ))}
          </div>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center mb-14">
            <Link href="/products" className="btn btn-primary btn-lg no-underline shine">
              Browse Products <ArrowRight size={18} />
            </Link>
            <Link href="/vendors/register" className="btn btn-secondary btn-lg no-underline">
              Register as Vendor
            </Link>
          </div>

          {/* Trust stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-2xl mx-auto">
            {[
              { icon: <ShieldCheck className="text-emerald-500" size={22} />, value: '500+', label: 'KYC Verified Exporters', bg: 'bg-emerald-50 border-emerald-100' },
              { icon: <Globe className="text-blue-500" size={22} />,         value: '50+',  label: 'Export Countries',       bg: 'bg-blue-50 border-blue-100' },
              { icon: <TrendingUp className="text-brand-500" size={22} />,   value: '10K+', label: 'Products Listed',        bg: 'bg-brand-50 border-brand-100' },
            ].map((item) => (
              <div key={item.label} className={`flex items-center gap-3 ${item.bg} border rounded-2xl p-4 shadow-sm`}>
                <div className="flex-shrink-0">{item.icon}</div>
                <div className="text-left">
                  <div className="font-heading font-bold text-gray-900 text-xl leading-none mb-0.5">{item.value}</div>
                  <div className="text-gray-500 text-xs">{item.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
