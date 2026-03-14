const API = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001';
const SITE = 'https://bharatbridge.com';

const STATIC_ROUTES = [
  { url: '/',                   priority: 1.0,  changeFreq: 'daily' },
  { url: '/products',           priority: 0.9,  changeFreq: 'daily' },
  { url: '/inquiry',            priority: 0.9,  changeFreq: 'monthly' },
  { url: '/vendors/register',   priority: 0.8,  changeFreq: 'monthly' },
  { url: '/about',              priority: 0.6,  changeFreq: 'monthly' },
  { url: '/contact',            priority: 0.6,  changeFreq: 'monthly' },
  { url: '/blog',               priority: 0.7,  changeFreq: 'weekly' },
];

const SEO_CATEGORY_SLUGS = [
  'indian-spices', 'textiles-fabrics', 'pharmaceuticals',
  'agriculture-products', 'handicrafts', 'herbal-products',
  'industrial-goods', 'chemicals', 'food-processing', 'ayurvedic-products',
];

const BLOG_SLUGS = [
  'top-indian-products-exported-worldwide',
  'how-to-import-goods-from-india',
  'best-indian-spice-exporters',
  'india-export-market-trends-2025',
];

export default async function sitemap() {
  const now = new Date();

  const staticEntries = STATIC_ROUTES.map((r) => ({
    url:              `${SITE}${r.url}`,
    lastModified:     now,
    changeFrequency:  r.changeFreq,
    priority:         r.priority,
  }));

  const categoryEntries = SEO_CATEGORY_SLUGS.map((slug) => ({
    url:             `${SITE}/categories/${slug}`,
    lastModified:    now,
    changeFrequency: 'weekly',
    priority:        0.8,
  }));

  const blogEntries = BLOG_SLUGS.map((slug) => ({
    url:             `${SITE}/blog/${slug}`,
    lastModified:    now,
    changeFrequency: 'monthly',
    priority:        0.6,
  }));

  // Dynamic product URLs
  let productEntries = [];
  try {
    const res = await fetch(`${API}/api/v1/products?limit=200&page=1`);
    if (res.ok) {
      const data = await res.json();
      const products = data.data?.products || data.data || [];
      productEntries = products.map((p) => ({
        url:             `${SITE}/products/${p.slug}`,
        lastModified:    new Date(p.updatedAt || now),
        changeFrequency: 'weekly',
        priority:        0.7,
      }));
    }
  } catch { /* skip dynamic products if API unavailable */ }

  return [...staticEntries, ...categoryEntries, ...blogEntries, ...productEntries];
}
