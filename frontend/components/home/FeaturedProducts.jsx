import Link from 'next/link';

const SAMPLE = [
  { id:1, name:'Premium Basmati Rice XXL',     category:'Rice & Grains',    price:'$1.20/kg',  moq:'1 MT',  origin:'Punjab',        badge:'Bestseller' },
  { id:2, name:'Organic Turmeric Powder',       category:'Spices',           price:'$2.50/kg',  moq:'500 KG',origin:'Erode TN',      badge:'Organic' },
  { id:3, name:'Office Ergonomic Chair',        category:'Furniture',        price:'$85/unit',  moq:'50 PCS',origin:'Rajkot GJ',     badge:'Export Ready' },
  { id:4, name:'Detergent Pods (Pack of 50)',   category:'Chemicals',        price:'$3.00/pack',moq:'1000 pcs',origin:'Ahmedabad', badge:'Bulk Avail.' },
  { id:5, name:'Sona Masuri Rice',              category:'Rice & Grains',    price:'$0.90/kg',  moq:'2 MT',  origin:'Andhra Pradesh', badge:'New' },
  { id:6, name:'Black Pepper Whole',            category:'Spices',           price:'$4.50/kg',  moq:'200 KG',origin:'Kerala',        badge:'Premium' },
  { id:7, name:'Millet Pasta (Wheat-Free)',     category:'Millets',          price:'$1.80/kg',  moq:'500 KG',origin:'Hyderabad',     badge:'Healthy' },
  { id:8, name:'Office Writing Desk 1.2m',      category:'Furniture',        price:'$120/unit', moq:'20 PCS',origin:'Nagpur MH',     badge:'Popular' },
];

const EMOJIS = { 'Rice & Grains':'🌾','Spices':'🌶️','Furniture':'🪑','Chemicals':'🧪','Millets':'🍜' };

export default function FeaturedProducts({ products = [] }) {
  const items = products.length > 0
    ? products.slice(0, 8).map(p => ({
        id: p.id, name: p.name,
        category: p.category?.name || 'Product',
        price: p.minPrice ? `$${p.minPrice}` : 'Get Quote',
        moq: p.moq || 'Contact',
        origin: p.vendor?.city || 'India',
        badge: p.badge || '',
      }))
    : SAMPLE;

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
          <div>
            <span className="text-orange-500 font-semibold uppercase tracking-[0.2em] text-xs">Featured Listings</span>
            <h2 className="text-4xl font-black text-gray-900 mt-2">Featured Export Products</h2>
            <p className="text-gray-500 mt-2">
              Handpicked export-quality products from India’s verified manufacturers.
            </p>
          </div>
          <Link href="/products" className="flex-shrink-0 text-sm font-bold text-orange-500 hover:text-orange-600 border border-orange-200 hover:border-orange-400 rounded-full px-6 py-2.5 transition">
            View All Products →
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {items.map((p) => (
            <Link key={p.id} href={`/products/${p.id}`}
              className="group bg-white rounded-2xl border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden">
              {/* Image placeholder */}
              <div className="h-40 bg-gradient-to-br from-orange-50 to-orange-100 flex items-center justify-center relative">
                <span className="text-6xl">{EMOJIS[p.category] || '📦'}</span>
                {p.badge && (
                  <span className="absolute top-3 left-3 bg-orange-500 text-white text-[10px] font-bold px-2.5 py-1 rounded-full">
                    {p.badge}
                  </span>
                )}
                <span className="absolute top-3 right-3 bg-green-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                  Verified
                </span>
              </div>
              {/* Info */}
              <div className="p-4">
                <span className="text-xs text-orange-500 font-semibold bg-orange-50 px-2 py-0.5 rounded-full">{p.category}</span>
                <h3 className="font-bold text-gray-900 text-sm mt-2 mb-3 leading-tight group-hover:text-orange-500 transition-colors line-clamp-2">
                  {p.name}
                </h3>
                <div className="flex items-center justify-between text-xs text-gray-500 mb-3">
                  <span>📍 {p.origin}</span>
                  <span>MOQ: {p.moq}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-black text-gray-900">{p.price}</span>
                  <span className="text-xs bg-navy text-white font-bold px-3 py-1.5 rounded-full group-hover:bg-orange-500 transition-colors">
                    Get Quote
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
