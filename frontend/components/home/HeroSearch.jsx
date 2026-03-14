'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Search, ArrowRight, ChevronDown } from 'lucide-react';

const POPULAR_SEARCHES = [
  'Basmati Rice', 'Turmeric Powder', 'Cotton Fabric',
  'Ayurvedic Medicine', 'Leather Goods', 'Steel Products',
];

const SEARCH_TABS = ['Products', 'Categories', 'Exporters'];

export default function HeroSearch() {
  const router = useRouter();
  const [query,     setQuery]     = useState('');
  const [tab,       setTab]       = useState('Products');
  const [catOpen,   setCatOpen]   = useState(false);
  const [selCat,    setSelCat]    = useState('All Categories');

  const CATEGORIES = [
    'All Categories', 'Agriculture', 'Spices', 'Textiles',
    'Pharmaceuticals', 'Handicrafts', 'Chemicals', 'Industrial',
  ];

  const handleSearch = (e) => {
    e.preventDefault();
    const q = query.trim();
    const base = tab === 'Exporters' ? '/vendors' : '/products';
    const params = new URLSearchParams();
    if (q) params.set('search', q);
    if (selCat !== 'All Categories') params.set('category', selCat.toLowerCase().replace(/ /g, '-'));
    router.push(`${base}?${params.toString()}`);
  };

  return (
    <section className="relative bg-hero-gradient overflow-hidden">
      {/* Dot pattern overlay */}
      <div className="absolute inset-0 bg-dot-pattern opacity-10 pointer-events-none" />
      {/* Glows */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-blue-500/10 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-saffron-500/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="bb-container relative py-20 md:py-28 lg:py-32">
        <div className="max-w-4xl mx-auto text-center">

          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 text-blue-100 text-xs font-bold px-5 py-2 rounded-full mb-8 backdrop-blur-sm">
            <span className="w-2 h-2 bg-saffron-400 rounded-full animate-pulse" />
            🇮🇳 India's #1 Verified B2B Export Marketplace
          </div>

          {/* Headline */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-heading font-black text-white mb-6 leading-[1.05] tracking-tight">
            Export Quality
            <span className="block text-saffron-400">Indian Products</span>
            <span className="block text-blue-200 text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold mt-1">Worldwide</span>
          </h1>

          <p className="text-blue-100 text-lg md:text-xl mb-10 leading-relaxed max-w-2xl mx-auto font-light">
            BharatBridge connects global buyers with <strong className="text-white font-semibold">500+ KYC-verified Indian exporters</strong>.
            Browse, inquire, and source directly.
          </p>

          {/* ── Search Box ── */}
          <div className="bg-white rounded-2xl shadow-2xl p-2 max-w-3xl mx-auto mb-6">
            {/* Tabs */}
            <div className="flex border-b border-slate-100 mb-2 px-2 pt-1 gap-1">
              {SEARCH_TABS.map((t) => (
                <button key={t} onClick={() => setTab(t)}
                  className={`px-4 py-1.5 text-xs font-bold rounded-lg transition-all ${
                    tab === t
                      ? 'bg-blue-700 text-white'
                      : 'text-slate-500 hover:text-slate-800 hover:bg-slate-50'
                  }`}>
                  {t}
                </button>
              ))}
            </div>

            <form onSubmit={handleSearch} className="flex items-center gap-2 p-1">
              {/* Category dropdown */}
              <div className="relative hidden sm:block">
                <button type="button" onClick={() => setCatOpen(!catOpen)}
                  className="flex items-center gap-1.5 text-xs font-semibold text-slate-600 bg-slate-50 border border-slate-200 rounded-xl px-3 py-3 whitespace-nowrap hover:bg-slate-100 transition-colors">
                  {selCat}
                  <ChevronDown size={12} />
                </button>
                {catOpen && (
                  <div className="absolute top-full left-0 mt-1 w-48 bg-white rounded-xl shadow-xl border border-slate-100 py-1 z-50">
                    {CATEGORIES.map((c) => (
                      <button key={c} type="button"
                        onClick={() => { setSelCat(c); setCatOpen(false); }}
                        className={`w-full text-left px-4 py-2 text-sm hover:bg-blue-50 hover:text-blue-700 transition-colors ${
                          selCat === c ? 'text-blue-700 font-semibold' : 'text-slate-700'
                        }`}>{c}</button>
                    ))}
                  </div>
                )}
              </div>

              {/* Divider */}
              <div className="hidden sm:block w-px h-6 bg-slate-200" />

              {/* Search input */}
              <div className="relative flex-1">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder={`Search ${tab.toLowerCase()}... e.g. "Basmati Rice", "Cotton Fabric"`}
                  className="w-full pl-11 pr-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none"
                />
              </div>

              <button type="submit"
                className="bb-btn bb-btn-primary btn-shine px-6 py-3 text-sm rounded-xl flex-shrink-0">
                Search
              </button>
            </form>
          </div>

          {/* Popular searches */}
          <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
            <span className="text-blue-300 text-xs font-semibold">Trending:</span>
            {POPULAR_SEARCHES.map((term) => (
              <button key={term}
                onClick={() => router.push(`/products?search=${encodeURIComponent(term)}`)}
                className="text-xs bg-white/10 hover:bg-white/20 border border-white/20 text-blue-100 hover:text-white px-3 py-1.5 rounded-full transition-all">
                {term}
              </button>
            ))}
          </div>

          {/* CTA row */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/products"
              className="bb-btn bb-btn-saffron bb-btn-lg btn-shine shadow-cta">
              Browse All Products <ArrowRight size={20} />
            </Link>
            <Link href="/inquiry"
              className="bb-btn bb-btn-white bb-btn-lg">
              Submit Buying Inquiry
            </Link>
          </div>
        </div>
      </div>

      {/* Wave SVG */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
          <path d="M0 60L1440 60L1440 20C1200 60 960 0 720 20C480 40 240 0 0 20L0 60Z" fill="white"/>
        </svg>
      </div>
    </section>
  );
}
