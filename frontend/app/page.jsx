import HeroSection      from '@/components/home/HeroSection';
import StatsBar         from '@/components/home/StatsBar';
import HowItWorks       from '@/components/home/HowItWorks';
import CategorySection  from '@/components/home/CategorySection';
import FeaturedProducts from '@/components/home/FeaturedProducts';
import WhyChooseUs      from '@/components/home/WhyChooseUs';
import CTASection       from '@/components/home/CTASection';

const API = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001';
export const revalidate = 3600;

export const metadata = {
  title: 'BharatBridge — India\'s #1 B2B Export Marketplace',
  description:
    'BharatBridge connects global buyers with 500+ KYC-verified Indian manufacturers. Source Rice, Spices, Furniture, Chemicals & more.',
  alternates: { canonical: 'https://bharatbridge.com' },
};

async function getHomeData() {
  try {
    const [pRes, cRes] = await Promise.all([
      fetch(`${API}/api/v1/products?featured=true&limit=8`, { next: { revalidate: 3600 } }),
      fetch(`${API}/api/v1/categories`,                      { next: { revalidate: 7200 } }),
    ]);
    return {
      products:   pRes.ok ? (await pRes.json()).data?.products || [] : [],
      categories: cRes.ok ? (await cRes.json()).data            || [] : [],
    };
  } catch {
    return { products: [], categories: [] };
  }
}

export default async function HomePage() {
  const { products, categories } = await getHomeData();
  return (
    <>
      <HeroSection />
      <StatsBar />
      <HowItWorks />
      <CategorySection categories={categories} />
      <FeaturedProducts products={products} />
      <WhyChooseUs />
      <CTASection />
    </>
  );
}
