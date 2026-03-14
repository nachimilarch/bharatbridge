'use client';
import { useRouter, useSearchParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import { Filter, X } from 'lucide-react';
import api from '@/lib/api';

export default function ProductFilter() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [categories, setCategories] = useState([]);
  const [countries, setCountries] = useState([]);
  const [open, setOpen] = useState(false);

  const currentCategory = searchParams.get('category') || '';
  const currentCountry = searchParams.get('country') || '';
  const currentSearch = searchParams.get('search') || '';

  useEffect(() => {
    Promise.all([
      api.get('/categories'),
      api.get('/countries'),
    ]).then(([catRes, cntRes]) => {
      setCategories(catRes.data.data || []);
      setCountries(cntRes.data.data || []);
    }).catch(() => {});
  }, []);

  const apply = (key, value) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value) params.set(key, value);
    else params.delete(key);
    params.delete('page');
    router.push(`/products?${params.toString()}`);
  };

  const clearAll = () => router.push('/products');
  const hasFilters = currentCategory || currentCountry || currentSearch;

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-gray-900 flex items-center gap-2">
          <Filter size={16} /> Filters
        </h3>
        {hasFilters && (
          <button onClick={clearAll} className="text-xs text-brand-600 hover:underline flex items-center gap-1">
            <X size={12} /> Clear all
          </button>
        )}
      </div>

      {/* Category */}
      <div className="mb-4">
        <label className="form-label">Category</label>
        <select
          value={currentCategory}
          onChange={(e) => apply('category', e.target.value)}
          className="form-input text-sm"
        >
          <option value="">All Categories</option>
          {categories.map((c) => (
            <option key={c.slug} value={c.slug}>{c.name}</option>
          ))}
        </select>
      </div>

      {/* Country */}
      <div className="mb-4">
        <label className="form-label">Export Country</label>
        <select
          value={currentCountry}
          onChange={(e) => apply('country', e.target.value)}
          className="form-input text-sm"
        >
          <option value="">All Countries</option>
          {countries.map((c) => (
            <option key={c.isoCode} value={c.isoCode}>
              {c.flagEmoji} {c.name}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
