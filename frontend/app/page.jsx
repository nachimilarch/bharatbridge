import HeroSearch        from '@/components/home/HeroSearch';
import CategoryGrid      from '@/components/home/CategoryGrid';
import FeaturedProducts  from '@/components/home/FeaturedProducts';
import HowItWorks        from '@/components/home/HowItWorks';
import WhyChooseUs       from '@/components/home/WhyChooseUs';
import VendorCTA         from '@/components/home/VendorCTA';
import GlobalInquiryForm from '@/components/home/GlobalInquiryForm';
import Testimonials      from '@/components/home/Testimonials';
import BlogPreview       from '@/components/home/BlogPreview';
import TrustBar          from '@/components/home/TrustBar';

const API = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001';

export const revalidate = 3600;

export const metadata = {
  title: 'BharatBridge — Export Quality Indian Products Worldwide',
  description: 'BharatBridge connects global buyers with 500+ verified Indian exporters. Browse textiles, spices, pharmaceuticals, handicrafts. Submit bulk inquiries today.',
  alternates: { canonical: 'https://bharatbridge.com' },
  openGraph: { url: 'https://bharatbridge.com' },
};

async function getHomeData() {
  try {
    const [pRes, cRes] = await Promise.all([
      fetch(`${API}/api/v1/products?featured=true&limit=12`, { next: { revalidate: 3600 } }),
      fetch(`${API}/api/v1/categories`,                      { next: { revalidate: 7200 } }),
    ]);
    return {
      products:   pRes.ok ? (await pRes.json()).data?.products || [] : [],
      categories: cRes.ok ? (await cRes.json()).data           || [] : [],
    };
  } catch {
    return { products: [], categories: [] };
  }
}

// JSON-LD structured data for homepage
const WebsiteSchema = () => (
  <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'BharatBridge',
    url: 'https://bharatbridge.com',
    potentialAction: {
      '@type': 'SearchAction',
      target: 'https://bharatbridge.com/products?search={search_term_string}',
      'query-input': 'required name=search_term_string',
    },
  })}} />
);

export default async function HomePage() {
  const { products, categories } = await getHomeData();

  return (
    <>
      <WebsiteSchema />
      {/* S1: Hero */}
      <HeroSearch />
      {/* S2: Trust indicators bar */}
      <TrustBar />
      {/* S3: Category marketplace grid */}
      <CategoryGrid categories={categories} />
      {/* S4: Featured products (12) */}
      <FeaturedProducts products={products} />
      {/* S5: How it works */}
      <HowItWorks />
      {/* S6: Why choose us */}
      <WhyChooseUs />
      {/* S7: Vendor CTA */}
      <VendorCTA />
      {/* S8: Global buyer inquiry form */}
      <GlobalInquiryForm categories={categories} />
      {/* S9: Testimonials */}
      <Testimonials />
      {/* S10: SEO blog preview */}
      <BlogPreview />
    </>
  );
}
