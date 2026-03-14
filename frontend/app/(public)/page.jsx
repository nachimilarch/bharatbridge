import CategoryGrid from '@/components/home/CategoryGrid';
import FeaturedProducts from '@/components/home/FeaturedProducts';
import HeroSection from '@/components/home/HeroSection';

export const revalidate = 3600;

async function getHomeData() {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001';
  try {
    const [productsRes, categoriesRes] = await Promise.all([
      fetch(`${apiUrl}/api/v1/products?featured=true&limit=8`, { next: { revalidate: 3600 } }),
      fetch(`${apiUrl}/api/v1/categories`, { next: { revalidate: 3600 } }),
    ]);
    const products = productsRes.ok ? await productsRes.json() : { data: { products: [] } };
    const categories = categoriesRes.ok ? await categoriesRes.json() : { data: [] };
    return {
      products: products.data?.products || products.data || [],
      categories: categories.data || [],
    };
  } catch {
    return { products: [], categories: [] };
  }
}

export const metadata = {
  title: 'BharatBridge — Indian B2B Export Marketplace',
  description: "Connect with India's verified exporters. Browse textiles, spices, handicrafts, engineering goods and more.",
};

export default async function HomePage() {
  const { products, categories } = await getHomeData();
  return (
    <>
      <HeroSection />
      <CategoryGrid categories={categories} />
      <FeaturedProducts products={products} />

      {/* How it works */}
      <section className="section bg-white">
        <div className="page-container">
          <h2 className="text-3xl font-heading font-bold text-center text-gray-900 mb-10">
            How BharatBridge Works
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {[
              { step: '01', title: 'Browse Products', desc: 'Explore thousands of verified Indian export products across all major categories.', icon: '🔍' },
              { step: '02', title: 'Submit Inquiry', desc: 'Send a detailed inquiry to the vendor with your requirements and quantity.', icon: '📬' },
              { step: '03', title: 'Get Connected', desc: 'Our team connects you with the right exporter. Negotiate and close deals offline.', icon: '🤝' },
            ].map((item) => (
              <div key={item.step} className="text-center">
                <div className="text-4xl mb-3">{item.icon}</div>
                <div className="text-xs font-bold text-brand-500 tracking-widest uppercase mb-2">Step {item.step}</div>
                <h3 className="font-heading font-semibold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
