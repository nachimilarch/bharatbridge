import Link from 'next/link';

const EXPORT_CATEGORIES = [
  { name: 'Agriculture Products', slug: 'agriculture-products', seoSlug: 'export-indian-agriculture',      icon: '🌾', color: 'from-lime-500   to-green-600',  bg: 'bg-lime-50   border-lime-200',   count: '2,400+' },
  { name: 'Indian Spices',        slug: 'indian-spices',        seoSlug: 'export-indian-spices',           icon: '🌶️', color: 'from-red-500    to-orange-600', bg: 'bg-red-50    border-red-200',    count: '1,800+' },
  { name: 'Textiles & Fabrics',   slug: 'textiles-fabrics',     seoSlug: 'export-indian-textiles',         icon: '🧵', color: 'from-purple-500 to-indigo-600', bg: 'bg-purple-50 border-purple-200', count: '3,200+' },
  { name: 'Pharmaceuticals',      slug: 'pharmaceuticals',      seoSlug: 'export-indian-pharmaceuticals',  icon: '💊', color: 'from-sky-500    to-blue-600',   bg: 'bg-sky-50    border-sky-200',    count: '950+' },
  { name: 'Herbal Products',      slug: 'herbal-products',      seoSlug: 'export-indian-herbal-products',  icon: '🌿', color: 'from-emerald-500 to-teal-600', bg: 'bg-emerald-50 border-emerald-200', count: '1,100+' },
  { name: 'Industrial Goods',     slug: 'industrial-goods',     seoSlug: 'export-indian-industrial-goods', icon: '⚙️', color: 'from-slate-500  to-gray-700',   bg: 'bg-slate-50  border-slate-200',  count: '4,500+' },
  { name: 'Handicrafts',          slug: 'handicrafts',          seoSlug: 'export-indian-handicrafts',      icon: '🏺', color: 'from-amber-500  to-yellow-600', bg: 'bg-amber-50  border-amber-200',  count: '2,100+' },
  { name: 'Chemicals',            slug: 'chemicals',            seoSlug: 'export-indian-chemicals',        icon: '🧪', color: 'from-cyan-500   to-teal-600',   bg: 'bg-cyan-50   border-cyan-200',   count: '880+' },
  { name: 'Food Processing',      slug: 'food-processing',      seoSlug: 'export-indian-food-products',    icon: '🥫', color: 'from-orange-500 to-red-500',    bg: 'bg-orange-50 border-orange-200', count: '1,650+' },
  { name: 'Ayurvedic Products',   slug: 'ayurvedic-products',   seoSlug: 'export-indian-ayurvedic',        icon: '🍃', color: 'from-green-500  to-emerald-600', bg: 'bg-green-50 border-green-200',  count: '720+' },
];

export default function CategoryGrid({ categories = [] }) {
  return (
    <section className="bb-section bg-slate-50/50">
      <div className="bb-container">

        {/* Header */}
        <div className="text-center mb-12">
          <div className="bb-section-pill">📦 Export Categories</div>
          <h2 className="bb-section-title">
            Browse by Export Category
          </h2>
          <p className="bb-section-sub max-w-2xl mx-auto">
            India exports to 200+ countries. Find the right category and connect directly with verified manufacturers and exporters.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {EXPORT_CATEGORIES.map((cat) => (
            <Link
              key={cat.slug}
              href={`/categories/${cat.slug}`}
              className={`group relative flex flex-col items-center p-5 rounded-2xl border-2 ${cat.bg} transition-all duration-300 hover:shadow-lg hover:-translate-y-1 hover:border-opacity-60`}
            >
              {/* Icon circle */}
              <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${cat.color} flex items-center justify-center text-2xl mb-3 shadow-md group-hover:scale-110 transition-transform duration-300`}>
                {cat.icon}
              </div>

              <h3 className="font-heading font-bold text-slate-800 text-sm text-center leading-tight mb-1.5 group-hover:text-blue-700 transition-colors">
                {cat.name}
              </h3>

              <span className="text-[11px] font-semibold text-slate-400 bg-white/80 px-2 py-0.5 rounded-full">
                {cat.count} products
              </span>

              {/* Arrow on hover */}
              <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="w-5 h-5 bg-blue-700 rounded-full flex items-center justify-center">
                  <span className="text-white text-[10px]">→</span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* View all */}
        <div className="text-center mt-8">
          <Link href="/products" className="bb-btn bb-btn-outline">
            View All Export Categories →
          </Link>
        </div>
      </div>
    </section>
  );
}
