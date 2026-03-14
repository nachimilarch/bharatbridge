import ProductCard from './ProductCard';
import Link from 'next/link';

function SkeletonCard() {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden animate-pulse">
      <div className="bg-slate-100" style={{ aspectRatio: '4/3' }} />
      <div className="p-4 space-y-3">
        <div className="h-2.5 bg-slate-100 rounded w-1/4" />
        <div className="h-4 bg-slate-100 rounded w-full" />
        <div className="h-4 bg-slate-100 rounded w-3/4" />
        <div className="h-3 bg-slate-100 rounded w-1/2 mt-2" />
        <div className="flex justify-between items-center pt-3 border-t border-slate-100 mt-2">
          <div className="h-4 bg-slate-100 rounded w-1/3" />
          <div className="h-7 bg-slate-100 rounded w-1/4" />
        </div>
      </div>
    </div>
  );
}

export default function ProductGrid({ products = [], loading = false, total, page, perPage, onPageChange }) {
  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {Array.from({ length: 8 }).map((_, i) => <SkeletonCard key={i} />)}
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="text-center py-20 bg-white rounded-2xl border border-slate-200">
        <div className="text-6xl mb-4">📦</div>
        <h3 className="text-xl font-bold text-[#1E3A5F] mb-2">No products found</h3>
        <p className="text-slate-500 text-sm mb-6">Try adjusting your search or filters.</p>
        <Link
          href="/products"
          className="inline-flex items-center gap-2 bg-[#1E3A5F] text-white text-sm font-semibold px-5 py-2.5 rounded-xl hover:bg-[#16304F] transition"
        >
          Clear Filters
        </Link>
      </div>
    );
  }

  const totalPages = total && perPage ? Math.ceil(total / perPage) : null;

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {/* Pagination */}
      {totalPages && totalPages > 1 && onPageChange && (
        <div className="flex items-center justify-center gap-2 mt-10">
          <button
            onClick={() => onPageChange(page - 1)}
            disabled={page <= 1}
            className="px-4 py-2 text-sm font-semibold rounded-lg border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition"
          >
            Previous
          </button>
          <div className="flex items-center gap-1">
            {Array.from({ length: Math.min(totalPages, 7) }).map((_, i) => {
              const p = i + 1;
              return (
                <button
                  key={p}
                  onClick={() => onPageChange(p)}
                  className={`w-9 h-9 text-sm font-semibold rounded-lg transition ${
                    p === page
                      ? 'bg-[#1E3A5F] text-white'
                      : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  {p}
                </button>
              );
            })}
          </div>
          <button
            onClick={() => onPageChange(page + 1)}
            disabled={page >= totalPages}
            className="px-4 py-2 text-sm font-semibold rounded-lg border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}
