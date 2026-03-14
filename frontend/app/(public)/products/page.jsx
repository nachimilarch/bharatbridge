'use client';
import { useState, useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import ProductGrid from '@/components/products/ProductGrid';
import ProductFilter from '@/components/products/ProductFilter';
import { Search } from 'lucide-react';
import api from '@/lib/api';

function ProductsContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [products, setProducts] = useState([]);
  const [pagination, setPagination] = useState({});
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState(searchParams.get('search') || '');

    const fetchProducts = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams(searchParams.toString());
      const { data } = await api.get(`/products?${params.toString()}`);
      setProducts(data.data?.products || []);    // ← fix here
      setPagination(data.pagination || {});
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
    if (search.trim()) params.set('search', search.trim());
    else params.delete('search');
    params.delete('page');
    router.push(`/products?${params.toString()}`);
  };

  const goToPage = (page) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('page', page);
    router.push(`/products?${params.toString()}`);
  };

  return (
    <div className="page-container py-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-heading font-bold text-gray-900">All Products</h1>
          {pagination.total > 0 && (
            <p className="text-sm text-gray-500 mt-1">{pagination.total} products found</p>
          )}
        </div>
        <form onSubmit={handleSearch} className="flex gap-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={15} />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search products..."
              className="form-input pl-9 h-9 text-sm w-52"
            />
          </div>
          <button type="submit" className="btn btn-primary btn-sm">Search</button>
        </form>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <aside className="lg:col-span-1">
          <ProductFilter />
        </aside>
        <main className="lg:col-span-3">
          <ProductGrid products={products} loading={loading} />

          {/* Pagination */}
          {pagination.totalPages > 1 && (
            <div className="flex justify-center gap-2 mt-8">
              {Array.from({ length: pagination.totalPages }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  onClick={() => goToPage(page)}
                  className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                    page === pagination.page
                      ? 'bg-brand-500 text-white'
                      : 'bg-white text-gray-600 border border-gray-200 hover:border-brand-300'
                  }`}
                >
                  {page}
                </button>
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

export default function ProductsPage() {
  return (
    <Suspense fallback={<div className="page-container py-16 text-center text-gray-400">Loading products...</div>}>
      <ProductsContent />
    </Suspense>
  );
}
