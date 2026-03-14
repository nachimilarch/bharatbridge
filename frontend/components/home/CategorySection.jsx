import Link from 'next/link';

const DEFAULT_CATS = [
  { name: 'Rice & Grains',    slug: 'rice',       icon: '🌾', count: 12, grad: 'from-yellow-400 to-amber-500',  desc: 'Basmati (Small, Large, XXL, XXXL), Sona Masuri' },
  { name: 'Spices',           slug: 'spices',     icon: '🌶️', count: 18, grad: 'from-red-400 to-orange-500',   desc: 'Black Pepper, Turmeric, Cardamom & more' },
  { name: 'Millets & Noodles',slug: 'millets',    icon: '🍜', count: 8,  grad: 'from-green-400 to-emerald-500',  desc: 'Pasta, Noodles, Millet varieties' },
  { name: 'Furniture',        slug: 'furniture',  icon: '🪑', count: 10, grad: 'from-amber-600 to-yellow-700',   desc: 'Office Tables, Office Chairs' },
  { name: 'Chemicals',        slug: 'chemicals',  icon: '🧪', count: 6,  grad: 'from-blue-400 to-cyan-500',     desc: 'Detergent Pods, Industrial Chemicals' },
  { name: 'Textiles',         slug: 'textiles',   icon: '🧵', count: 20, grad: 'from-purple-400 to-violet-500',  desc: 'Cotton Fabric, Silk, Linen' },
  { name: 'Ayurvedic',        slug: 'ayurvedic',  icon: '🌿', count: 14, grad: 'from-teal-400 to-green-600',    desc: 'Herbal Supplements, Ayurvedic Medicine' },
  { name: 'Steel & Metals',   slug: 'steel',      icon: '⚙️', count: 9,  grad: 'from-gray-400 to-slate-600',    desc: 'Steel Products, Metal Components' },
];

export default function CategorySection({ categories = [] }) {
  const cats = categories.length > 0
    ? categories.slice(0, 8).map((c, i) => ({
        name: c.name,
        slug: c.slug,
        icon: DEFAULT_CATS[i % DEFAULT_CATS.length].icon,
        count: c._count?.products || 0,
        grad:  DEFAULT_CATS[i % DEFAULT_CATS.length].grad,
        desc:  c.description || DEFAULT_CATS[i % DEFAULT_CATS.length].desc,
      }))
    : DEFAULT_CATS;

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <span className="text-orange-500 font-semibold uppercase tracking-[0.2em] text-xs">Product Categories</span>
          <h2 className="text-4xl font-black text-gray-900 mt-2">Browse by Category</h2>
          <p className="text-gray-500 text-lg mt-3">
            Source premium Made-in-India products across 8 export-ready categories.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
          {cats.map((cat) => (
            <Link
              key={cat.slug}
              href={`/products?category=${cat.slug}`}
              className="group relative overflow-hidden rounded-2xl bg-white border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
            >
              {/* Gradient header */}
              <div className={`h-28 bg-gradient-to-br ${cat.grad} flex items-center justify-center relative overflow-hidden`}>
                <span className="text-5xl">{cat.icon}</span>
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-300" />
              </div>
              {/* Content */}
              <div className="p-4">
                <div className="flex items-center justify-between mb-1">
                  <h3 className="font-bold text-gray-900 text-sm">{cat.name}</h3>
                  <span className="text-xs text-gray-400 bg-gray-50 border border-gray-200 rounded-full px-2 py-0.5">{cat.count} items</span>
                </div>
                <p className="text-xs text-gray-500 leading-relaxed">{cat.desc}</p>
                <div className="mt-3 flex items-center text-orange-500 text-xs font-semibold group-hover:gap-2 transition-all">
                  <span>Browse</span>
                  <span className="ml-1 group-hover:translate-x-1 transition-transform">→</span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="text-center mt-10">
          <Link href="/products" className="inline-flex items-center gap-2 bg-navy text-white font-bold px-8 py-3.5 rounded-full hover:bg-navy-light transition shadow-lg">
            View All Products →
          </Link>
        </div>
      </div>
    </section>
  );
}
