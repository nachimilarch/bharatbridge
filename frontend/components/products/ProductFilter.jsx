'use client';
import { useRouter, useSearchParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import api from '@/lib/api';

export default function ProductFilter() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [categories, setCategories] = useState([]);
  const [countries, setCountries] = useState([]);
  const [open, setOpen] = useState(false);

  const currentCategory = searchParams.get('category') || '';
  const currentCountry  = searchParams.get('country')  || '';
  const currentSearch   = searchParams.get('search')   || '';
  const currentSort     = searchParams.get('sort')     || '';

  useEffect(() => {
    Promise.all([api.get('/categories'), api.get('/countries')])
      .then(([catRes, cntRes]) => {
        setCategories(catRes.data.data || []);
        setCountries(cntRes.data.data || []);
      })
      .catch(() => {});
  }, []);

  const apply = (key, value) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value) params.set(key, value);
    else params.delete(key);
    params.delete('page');
    router.push(`/products?${params.toString()}`);
  };

  const clear = () => router.push('/products');

  const hasFilters = currentCategory || currentCountry || currentSearch || currentSort;

  return (
    <>
      {/* Mobile toggle */}
      <button
        onClick={() => setOpen(!open)}
        className="lg:hidden w-full flex items-center justify-between px-4 py-3 bg-white border border-slate-200 rounded-xl text-sm font-semibold text-[#1F2937] shadow-sm mb-4"
      >
        <span className="flex items-center gap-2">
          <svg className="w-4 h-4 text-[#1E3A5F]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2a1 1 0 01-.293.707L13 13.414V19a1 1 0 01-.553.894l-4 2A1 1 0 017 21v-7.586L3.293 6.707A1 1 0 013 6V4z"/></svg>
          Filters
          {hasFilters && <span className="bg-orange-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">ON</span>}
        </span>
        <svg className={`w-4 h-4 transition-transform ${open ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7"/></svg>
      </button>

      <div className={`${open ? 'block' : 'hidden'} lg:block space-y-5`}>
        {/* Header */}
        <div className="flex items-center justify-between">
          <h3 className="font-bold text-[#1E3A5F] text-sm uppercase tracking-wider flex items-center gap-2">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2a1 1 0 01-.293.707L13 13.414V19a1 1 0 01-.553.894l-4 2A1 1 0 017 21v-7.586L3.293 6.707A1 1 0 013 6V4z"/></svg>
            Filters
          </h3>
          {hasFilters && (
            <button onClick={clear} className="text-xs text-orange-500 hover:text-orange-600 font-semibold transition">
              Clear all
            </button>
          )}
        </div>

        {/* Search */}
        <div className="bg-white rounded-xl border border-slate-200 p-4">
          <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Search</label>
          <div className="relative">
            <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><circle cx="11" cy="11" r="8"/><path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35"/></svg>
            <input
              type="text"
              defaultValue={currentSearch}
              placeholder="Product name..."
              className="w-full pl-8 pr-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1E3A5F]/30 focus:border-[#1E3A5F]"
              onKeyDown={(e) => e.key === 'Enter' && apply('search', e.target.value)}
              onBlur={(e) => apply('search', e.target.value)}
            />
          </div>
        </div>

        {/* Category */}
        <div className="bg-white rounded-xl border border-slate-200 p-4">
          <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">Category</label>
          <div className="space-y-1.5 max-h-52 overflow-y-auto pr-1">
            <button
              onClick={() => apply('category', '')}
              className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                !currentCategory
                  ? 'bg-[#1E3A5F] text-white font-semibold'
                  : 'text-slate-700 hover:bg-slate-50'
              }`}
            >
              All Categories
            </button>
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => apply('category', cat.slug)}
                className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                  currentCategory === cat.slug
                    ? 'bg-[#1E3A5F] text-white font-semibold'
                    : 'text-slate-700 hover:bg-slate-50'
                }`}
              >
                {cat.icon && <span className="mr-1.5">{cat.icon}</span>}
                {cat.name}
              </button>
            ))}
          </div>
        </div>

        {/* Country */}
        {countries.length > 0 && (
          <div className="bg-white rounded-xl border border-slate-200 p-4">
            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Ships To</label>
            <select
              value={currentCountry}
              onChange={(e) => apply('country', e.target.value)}
              className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1E3A5F]/30 focus:border-[#1E3A5F] bg-white"
            >
              <option value="">All Countries</option>
              {countries.map((c) => (
                <option key={c.id} value={c.isoCode}>{c.flagEmoji} {c.name}</option>
              ))}
            </select>
          </div>
        )}

        {/* Sort */}
        <div className="bg-white rounded-xl border border-slate-200 p-4">
          <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Sort By</label>
          <select
            value={currentSort}
            onChange={(e) => apply('sort', e.target.value)}
            className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1E3A5F]/30 focus:border-[#1E3A5F] bg-white"
          >
            <option value="">Most Relevant</option>
            <option value="newest">Newest First</option>
            <option value="price_asc">Price: Low to High</option>
            <option value="price_desc">Price: High to Low</option>
            <option value="popular">Most Popular</option>
          </select>
        </div>

        {/* Post Inquiry CTA */}
        <div className="bg-gradient-to-br from-[#1E3A5F] to-[#16304F] rounded-xl p-4 text-white text-center">
          <p className="text-xs font-semibold mb-2">Can't find what you need?</p>
          <a
            href="/inquiry"
            className="block w-full bg-orange-500 hover:bg-orange-600 text-white text-xs font-bold py-2 rounded-lg transition-colors"
          >
            Post a Buying Request
          </a>
        </div>
      </div>
    </>
  );
}
