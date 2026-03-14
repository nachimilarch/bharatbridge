'use client';
import { useState, useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import ProductGrid from '@/components/products/ProductGrid';
import ProductFilter from '@/components/products/ProductFilter';
import api from '@/lib/api';

function ProductsContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [products, setProducts]   = useState([]);
  const [pagination, setPagination] = useState({});
  const [loading, setLoading]     = useState(true);
  const [search, setSearch]       = useState(searchParams.get('search') || '');

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams(searchParams.toString());
      const { data } = await api.get(`/products?${params.toString()}`);
      setProducts(data?.products || []);
      setPagination(data?.pagination || {});
    } catch {
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchProducts(); }, [searchParams.toString()]);

  const handleSearch = (e) => {
    e.preventDefault();
    const params = new URLSearchParams(searchParams.toString());
    if (search) params.set('search', search);
    else params.delete('search');
    params.delete('page');
    router.push(`/products?${params.toString()}`);
  };

  const category = searchParams.get('category') || '';
  const totalCount = pagination.total || products.length;

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Page header */}
      <div className="bg-[#1E3A5F] text-white">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <p className="text-orange-400 text-xs font-bold uppercase tracking-widest mb-2">Made in India</p>
              <h1 className="text-3xl md:text-4xl font-black mb-2">
                {category ? `${category.charAt(0).toUpperCase() + category.slice(1)} Products` : 'All Products'}
              </h1>
              <p className="text-blue-200 text-sm">
                {loading ? 'Loading...' : `${totalCount.toLocaleString()} verified products from Indian exporters`}
              </p>
            </div>
            {/* Search bar */}
            <form onSubmit={handleSearch} className="flex gap-2 w-full md:w-auto">
              <div className="relative flex-1 md:w-72">
                <svg className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><circle cx="11" cy="11" r="8"/><path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35"/></svg>
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search products..."
                  className="w-full pl-10 pr-4 py-2.5 text-sm bg-white/10 border border-white/20 rounded-xl text-white placeholder-blue-200 focus:outline-none focus:bg-white/20 focus:border-white/50 transition"
                />
              </div>
              <button type="submit" className="bg-orange-500 hover:bg-orange-600 text-white font-bold text-sm px-5 py-2.5 rounded-xl transition whitespace-nowrap">
                Search
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="flex gap-8">
          {/* Sidebar */}
          <aside className="hidden lg:block w-64 flex-shrink-0">
            <ProductFilter />
          </aside>

          {/* Main */}
          <main className="flex-1 min-w-0">
            {/* Mobile filter */}
            <div className="lg:hidden mb-4">
              <ProductFilter />
            </div>

            {/* Results bar */}
            <div className="flex items-center justify-between mb-5">
              <p className="text-sm text-slate-500">
                {loading ? 'Loading...' : `Showing ${products.length} of ${totalCount} products`}
              </p>
            </div>

            <ProductGrid
              products={products}
              loading={loading}
              total={pagination.total}
              page={pagination.page}
              perPage={pagination.perPage}
              onPageChange={(p) => {
                const params = new URLSearchParams(searchParams.toString());
                params.set('page', p);
                router.push(`/products?${params.toString()}`);
              }}
            />
          </main>
        </div>
      </div>
    </div>
  );
}

export default function ProductsPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-slate-50 flex items-center justify-center"><div className="text-slate-400">Loading products...</div></div>}>
      <ProductsContent />
    </Suspense>
  );
}
