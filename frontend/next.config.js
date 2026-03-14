/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,

  images: {
    remotePatterns: [
      { protocol: 'http',  hostname: 'localhost',          port: '5001', pathname: '/uploads/**' },
      { protocol: 'https', hostname: 'bharatbridge.com',                 pathname: '/uploads/**' },
      { protocol: 'https', hostname: 'cdn.bharatbridge.com',             pathname: '/**' },
    ],
    formats:        ['image/avif', 'image/webp'],
    minimumCacheTTL: 86400,
  },

  // Redirect SEO slug URLs to category pages
  async redirects() {
    const slugMap = [
      ['export-indian-spices',          '/categories/indian-spices'],
      ['export-indian-textiles',        '/categories/textiles-fabrics'],
      ['export-indian-pharmaceuticals', '/categories/pharmaceuticals'],
      ['export-indian-handicrafts',     '/categories/handicrafts'],
      ['export-indian-agriculture',     '/categories/agriculture-products'],
      ['export-indian-chemicals',       '/categories/chemicals'],
    ];
    return slugMap.map(([source, destination]) => ({
      source: `/${source}`,
      destination,
      permanent: true,
    }));
  },

  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'X-Frame-Options',           value: 'DENY' },
          { key: 'X-Content-Type-Options',     value: 'nosniff' },
          { key: 'Referrer-Policy',            value: 'strict-origin-when-cross-origin' },
          { key: 'Permissions-Policy',         value: 'camera=(), microphone=(), geolocation=()' },
        ],
      },
      {
        source: '/uploads/(.*)',
        headers: [{ key: 'Cache-Control', value: 'public, max-age=86400, stale-while-revalidate' }],
      },
    ];
  },

  experimental: {
    optimizePackageImports: ['lucide-react'],
  },
};

module.exports = nextConfig;
