import Link from 'next/link';

const LINKS = {
  'Products': [
    ['All Products',       '/products'],
    ['Rice & Grains',      '/products?cat=rice'],
    ['Spices',             '/products?cat=spices'],
    ['Furniture',          '/products?cat=furniture'],
    ['Chemicals',          '/products?cat=chemicals'],
    ['Millets & Noodles',  '/products?cat=millets'],
  ],
  'Company': [
    ['About BharatBridge', '/about'],
    ['How It Works',       '/about#how-it-works'],
    ['Become a Vendor',    '/vendor/register'],
    ['Submit Inquiry',     '/inquiry'],
    ['Contact Us',         '/contact'],
  ],
  'Resources': [
    ['Export Guides',      '/export-guides'],
    ['Import from India',  '/blog/import-from-india'],
    ['Vendor Login',       '/login'],
    ['Admin Login',        '/admin/login'],
    ['Privacy Policy',     '/privacy'],
  ],
};

export default function Footer() {
  return (
    <footer className="bg-navy text-white">
      {/* Main footer */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">

          {/* Brand col */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center shadow-lg">
                <span className="text-white font-black text-xl">B</span>
              </div>
              <div>
                <div className="font-black text-2xl">
                  <span className="text-white">Bharat</span>
                  <span className="text-orange-400">Bridge</span>
                </div>
                <div className="text-[10px] text-gray-400 uppercase tracking-widest">B2B Export Platform</div>
              </div>
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed mb-6 max-w-xs">
              Connecting global buyers with 500+ KYC-verified Indian manufacturers.
              Source premium Made-in-India products across Rice, Spices, Furniture, Chemicals & more.
            </p>
            <div className="space-y-2 text-sm text-gray-400">
              <div className="flex items-center gap-2">
                <span className="text-orange-400">📍</span>
                <span>Secunderabad, Telangana, India — 500003</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-orange-400">📞</span>
                <a href="tel:+919876543210" className="hover:text-orange-400 transition">+91 98765 43210</a>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-orange-400">✉️</span>
                <a href="mailto:hello@bharatbridge.com" className="hover:text-orange-400 transition">hello@bharatbridge.com</a>
              </div>
            </div>
          </div>

          {/* Link cols */}
          {Object.entries(LINKS).map(([title, links]) => (
            <div key={title}>
              <h4 className="text-white font-bold text-sm uppercase tracking-widest mb-4">{title}</h4>
              <ul className="space-y-2">
                {links.map(([label, href]) => (
                  <li key={href}>
                    <Link href={href} className="text-gray-400 text-sm hover:text-orange-400 transition-colors">
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-5 flex flex-col md:flex-row justify-between items-center gap-3 text-xs text-gray-500">
          <span>© {new Date().getFullYear()} BharatBridge Technologies Pvt. Ltd. All rights reserved.</span>
          <div className="flex items-center gap-1">
            <span className="text-gray-500">Made with</span>
            <span className="text-red-400">❤️</span>
            <span className="text-gray-500">in India 🇮🇳</span>
          </div>
          <div className="flex gap-4">
            <Link href="/privacy" className="hover:text-orange-400 transition">Privacy</Link>
            <Link href="/terms" className="hover:text-orange-400 transition">Terms</Link>
            <Link href="/sitemap.xml" className="hover:text-orange-400 transition">Sitemap</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
