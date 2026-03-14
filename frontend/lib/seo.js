const SITE_URL  = 'https://bharatbridge.com';
const SITE_NAME = 'BharatBridge';

/**
 * Generate consistent metadata for any page
 */
export function generateMetadata({
  title,
  description,
  path        = '/',
  image       = '/og-image.jpg',
  type        = 'website',
  keywords    = [],
  noIndex     = false,
}) {
  const url      = `${SITE_URL}${path}`;
  const fullTitle = title.includes(SITE_NAME) ? title : `${title} | ${SITE_NAME}`;

  return {
    title:       fullTitle,
    description,
    keywords:    [
      ...keywords,
      'Indian exporters', 'B2B India', 'export quality products',
      'buy from India', 'Indian manufacturers',
    ],
    openGraph: {
      title:       fullTitle,
      description,
      url,
      type,
      siteName:    SITE_NAME,
      images:      [{ url: image.startsWith('http') ? image : `${SITE_URL}${image}`, width: 1200, height: 630 }],
    },
    twitter: {
      card:        'summary_large_image',
      title:       fullTitle,
      description,
      images:      [image.startsWith('http') ? image : `${SITE_URL}${image}`],
    },
    alternates: { canonical: url },
    robots:     noIndex
      ? { index: false, follow: false }
      : { index: true, follow: true },
  };
}

/**
 * Generate Product schema.org JSON-LD
 */
export function productSchema(product, apiBase) {
  return {
    '@context':   'https://schema.org',
    '@type':      'Product',
    name:         product.name,
    description:  product.description,
    image:        product.images?.map((i) =>
                    i.url.startsWith('http') ? i.url : `${apiBase}${i.url}`) || [],
    sku:          product.id,
    brand: {
      '@type': 'Brand',
      name:    product.vendor?.companyName || 'BharatBridge Verified Vendor',
    },
    offers: {
      '@type':         'Offer',
      priceCurrency:   'INR',
      price:           product.basePriceInr,
      availability:    'https://schema.org/InStock',
      seller: {
        '@type': 'Organization',
        name:    product.vendor?.companyName,
      },
    },
  };
}

/**
 * Generate BreadcrumbList schema
 */
export function breadcrumbSchema(crumbs) {
  return {
    '@context': 'https://schema.org',
    '@type':    'BreadcrumbList',
    itemListElement: crumbs.map((c, i) => ({
      '@type':   'ListItem',
      position:  i + 1,
      name:      c.name,
      item:      `${SITE_URL}${c.path}`,
    })),
  };
}
