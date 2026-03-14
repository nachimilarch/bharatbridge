import Link from 'next/link';
import ProductCard from '@/components/products/ProductCard';

export default function FeaturedProducts({ products = [] }) {
  return (
    <section className="bb-section bg-white">
      <div className="bb-container">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
          <div>
            <div className="bb-section-pill">🔥 Featured Listings</div>
            <h2 className="bb-section-title">Featured Export Products</h2>
            <p className="text-slate-500 mt-2 max-w-xl">
              Handpicked export-quality products from India's verified manufacturers and exporters.
            </p>
          </div>
          <Link href="/products" className="bb-btn bb-btn-outline bb-btn-sm flex-shrink-0">
            View All Products →
          </Link>
        </div>

        {products.length === 0 ? (
          /* Skeleton grid while loading */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="bb-card animate-pulse">
                <div className="aspect-[4/3] bg-slate-100" />
                <div className="p-4 space-y-2">
                  <div className="h-2.5 bg-slate-100 rounded w-1/4" />
                  <div className="h-4 bg-slate-100 rounded w-full" />
                  <div className="h-4 bg-slate-100 rounded w-3/4" />
                  <div className="h-6 bg-slate-100 rounded w-1/2 mt-3" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {products.slice(0, 12).map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
