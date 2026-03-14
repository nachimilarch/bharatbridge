import { notFound } from 'next/navigation';
import Link from 'next/link';
import ProductGrid from '@/components/products/ProductGrid';
import { ArrowRight, ShieldCheck, Globe } from 'lucide-react';

const API = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001';

const CATEGORY_META = {
  'indian-spices':       { title: 'Buy Indian Spices in Bulk',        h1: 'Export Indian Spices Worldwide',        desc: 'Source premium quality Indian spices — turmeric, cardamom, pepper, cumin — directly from verified Indian exporters. Bulk pricing available.', icon: '🌶️' },
  'textiles-fabrics':    { title: 'Indian Textiles & Fabric Exporters', h1: 'Export Indian Textiles & Fabrics',      desc: 'Connect with verified Indian textile manufacturers. Cotton, silk, linen and technical fabrics for global buyers. MOQ flexible.', icon: '🧵' },
  'pharmaceuticals':     { title: 'Indian Pharmaceutical Exporters',    h1: 'Export Indian Pharmaceuticals',         desc: 'Source WHO-GMP certified generic medicines, APIs and healthcare products from verified Indian pharma exporters.', icon: '💊' },
  'agriculture-products':{ title: 'Indian Agriculture Export',          h1: 'Export Indian Agriculture Products',    desc: 'Buy basmati rice, wheat, pulses, fresh produce and processed agricultural goods from certified Indian exporters.', icon: '🌾' },
  'handicrafts':         { title: 'Indian Handicraft Exporters',        h1: 'Export Authentic Indian Handicrafts',   desc: 'Source handmade Indian crafts — wooden, brass, textile and ceramic artisan products from verified artisan exporters.', icon: '🏺' },
  'herbal-products':     { title: 'Indian Herbal Product Exporters',    h1: 'Export Indian Herbal Products',         desc: 'Source certified herbal extracts, essential oils, herbal formulations from verified Indian herbal exporters.', icon: '🌿' },
  'industrial-goods':    { title: 'Indian Industrial Goods Exporters',  h1: 'Export Indian Industrial Goods',        desc: 'Source engineering components, castings, forgings, and industrial machinery parts from Indian manufacturers.', icon: '⚙️' },
  'chemicals':           { title: 'Indian Chemical Exporters',          h1: 'Export Indian Chemicals',               desc: 'Source specialty chemicals, dyes, agrochemicals, and industrial chemicals from verified Indian chemical exporters.', icon: '🧪' },
  'food-processing':     { title: 'Indian Processed Food Exporters',    h1: 'Export Indian Processed Foods',         desc: 'Source FSSAI certified processed foods, packaged goods, ready-to-eat products from Indian food manufacturers.', icon: '🥫' },
  'ayurvedic-products':  { title: 'Ayurvedic Product Exporters India',  h1: 'Export Authentic Ayurvedic Products',  desc: 'Source GMP-certified Ayurvedic formulations, herbal supplements and wellness products from verified Indian manufacturers.', icon: '🍃' },
};

export async function generateMetadata({ params }) {
  const meta = CATEGORY_META[params.slug];
  const title = meta ? `${meta.title} | BharatBridge` : `Indian Export Products | BharatBridge`;
  const description = meta?.desc || 'Source export quality Indian products from verified exporters on BharatBridge.';
  return {
    title,
    description,
    alternates: { canonical: `https://bharatbridge.com/categories/${params.slug}` },
    openGraph: { title, description, url: `https://bharatbridge.com/categories/${params.slug}` },
  };
}

async function getCategoryProducts(slug) {
  try {
    const res = await fetch(`${API}/api/v1/products?category=${slug}&limit=24`, { next: { revalidate: 3600 } });
    if (!res.ok) return [];
    const data = await res.json();
    return data.data?.products || data.data || [];
  } catch { return []; }
}

export default async function CategoryPage({ params }) {
  const meta = CATEGORY_META[params.slug];
  const products = await getCategoryProducts(params.slug);
  const displayName = meta?.h1 || params.slug.replace(/-/g, ' ');

  // Category schema
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: meta?.title || displayName,
    description: meta?.desc,
    url: `https://bharatbridge.com/categories/${params.slug}`,
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />

      {/* Hero */}
      <section className="bg-blue-gradient py-14 md:py-20">
        <div className="bb-container text-center">
          <div className="text-5xl mb-4">{meta?.icon || '📦'}</div>
          <div className="bb-section-pill bg-white/10 border-white/20 text-blue-100 mb-4">
            Export Category
          </div>
          <h1 className="text-3xl md:text-5xl font-heading font-black text-white mb-4 leading-tight">
            {displayName}
          </h1>
          {meta?.desc && (
            <p className="text-blue-100 text-lg max-w-2xl mx-auto mb-8 leading-relaxed">
              {meta.desc}
            </p>
          )}
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/inquiry" className="bb-btn bb-btn-saffron btn-shine">
              Submit Buying Inquiry <ArrowRight size={18} />
            </Link>
            <Link href="/products" className="bb-btn bb-btn-white">
              Browse All Products
            </Link>
          </div>
        </div>
      </section>

      {/* Trust bar */}
      <div className="bg-slate-50 border-b border-slate-100 py-4">
        <div className="bb-container flex flex-wrap justify-center gap-6 text-sm text-slate-600">
          {[
            <><ShieldCheck size={16} className="text-emerald-500" /> KYC Verified Exporters</>,
            <><Globe size={16} className="text-blue-500" /> Export to 50+ Countries</>,
            <>🏆 ISO / FSSAI Certified Products</>,
            <>📦 MOQ as Low as 50 KG</>,
          ].map((item, i) => (
            <span key={i} className="flex items-center gap-2 font-medium">{item}</span>
          ))}
        </div>
      </div>

      {/* Products */}
      <section className="bb-section">
        <div className="bb-container">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-xl font-heading font-bold text-slate-900">
              {products.length > 0 ? `${products.length} Products Available` : 'Browse Products'}
            </h2>
            <Link href="/inquiry" className="bb-btn bb-btn-primary bb-btn-sm">
              Can't find what you need? →
            </Link>
          </div>

          <ProductGrid products={products} />

          {/* SEO text block */}
          <div className="mt-16 p-8 bg-slate-50 rounded-2xl border border-slate-100">
            <h2 className="font-heading font-bold text-slate-900 text-xl mb-4">
              Why Source {displayName.replace('Export ', '')} from India?
            </h2>
            <div className="prose prose-slate max-w-none text-sm">
              <p>
                India is one of the world's leading exporters of quality products across all major
                categories. BharatBridge connects international buyers directly with verified Indian
                manufacturers and exporters, eliminating middlemen and ensuring competitive pricing.
              </p>
              <p className="mt-3">
                All vendors listed on BharatBridge undergo strict KYC verification including IEC code
                verification, GST registration, and business credential checks. This ensures you are
                always dealing with legitimate, export-compliant Indian businesses.
              </p>
              <p className="mt-3">
                Submit a buying inquiry today and our trade facilitation team will match you with
                2–3 suitable exporters for your specific requirements within 24 business hours.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
