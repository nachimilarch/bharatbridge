import Link from 'next/link';
import { Mail, Phone, MapPin, ArrowRight } from 'lucide-react';

const FOOTER_LINKS = {
  'Products': [
    ['All Products',         '/products'],
    ['Featured Listings',    '/products?featured=true'],
    ['New Arrivals',         '/products?sort=newest'],
    ['Submit Inquiry',       '/inquiry'],
    ['Request a Product',    '/inquiry'],
  ],
  'Export Categories': [
    ['Indian Spices',        '/categories/indian-spices'],
    ['Textiles & Fabrics',   '/categories/textiles-fabrics'],
    ['Pharmaceuticals',      '/categories/pharmaceuticals'],
    ['Handicrafts',          '/categories/handicrafts'],
    ['Ayurvedic Products',   '/categories/ayurvedic-products'],
    ['Agriculture',          '/categories/agriculture-products'],
  ],
  'Company': [
    ['About BharatBridge',   '/about'],
    ['How It Works',         '/about#how-it-works'],
    ['Become a Vendor',      '/vendors/register'],
    ['Vendor Dashboard',     '/dashboard'],
    ['Contact Us',           '/contact'],
    ['Careers',              '/careers'],
  ],
  'Export Guides': [
    ['Import from India',    '/blog/how-to-import-goods-from-india'],
    ['Top Indian Exports',   '/blog/top-indian-products-exported-worldwide'],
    ['Spice Sourcing Guide', '/blog/best-indian-spice-exporters'],
    ['Export Trends 2025',   '/blog/india-export-market-trends-2025'],
    ['Trade Documentation',  '/blog/india-export-documentation'],
  ],
};

const CERTIFICATIONS = ['🏆 ISO Certified Vendors', '✅ IEC Code Verified', '🔒 SSL Secured', '🇮🇳 Made in India Platform'];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-slate-950 text-slate-400">

      {/* ── Top CTA band ── */}
      <div className="bg-blue-gradient">
        <div className="bb-container py-14">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-2xl md:text-3xl font-heading font-black text-white mb-2">
                Ready to Source from India?
              </h2>
              <p className="text-blue-100 text-sm">
                Submit a free buying inquiry and connect with verified Indian exporters today.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 sm:justify-end">
              <Link href="/inquiry"
                className="bb-btn bb-btn-saffron btn-shine">
                Submit Buying Inquiry <ArrowRight size={16} />
              </Link>
              <Link href="/vendors/register"
                className="bb-btn bb-btn-white">
                Register as Vendor
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* ── Main footer ── */}
      <div className="bb-container py-14">
        <div className="grid grid-cols-1 lg:grid-cols-6 gap-10 mb-12">

          {/* Brand col */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-3 mb-5 group">
              <div className="w-10 h-10 bg-blue-gradient rounded-xl flex items-center justify-center">
                <span className="text-white font-black text-xl font-heading">B</span>
              </div>
              <div>
                <div className="font-heading font-black text-xl text-white">
                  Bharat<span className="text-saffron-400">Bridge</span>
                </div>
                <div className="text-[9px] text-slate-500 font-semibold tracking-widest uppercase">B2B Export Platform</div>
              </div>
            </Link>

            <p className="text-sm leading-relaxed mb-6 text-slate-500">
              India's premier B2B export marketplace. Connecting 500+ verified Indian
              exporters with global buyers across 50+ countries.
            </p>

            {/* Contact */}
            <div className="space-y-2.5">
              {[
                { icon: <Mail size={14} />,    text: 'hello@bharatbridge.com' },
                { icon: <Phone size={14} />,   text: '+91 98765 43210' },
                { icon: <MapPin size={14} />,  text: 'Mumbai, India 400001' },
              ].map((c) => (
                <div key={c.text} className="flex items-center gap-2.5 text-sm text-slate-500 hover:text-slate-300 transition-colors">
                  <span className="text-blue-500">{c.icon}</span>
                  {c.text}
                </div>
              ))}
            </div>

            {/* Certifications */}
            <div className="flex flex-wrap gap-2 mt-6">
              {CERTIFICATIONS.map((c) => (
                <span key={c} className="text-[10px] bg-slate-800 text-slate-400 px-2.5 py-1 rounded-lg border border-slate-700">
                  {c}
                </span>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(FOOTER_LINKS).map(([title, links]) => (
            <div key={title}>
              <h4 className="font-heading font-bold text-white text-sm mb-5 tracking-wide">{title}</h4>
              <ul className="space-y-2.5">
                {links.map(([label, href]) => (
                  <li key={href}>
                    <Link href={href}
                      className="text-sm text-slate-500 hover:text-white transition-colors">
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom */}
        <div className="border-t border-slate-800 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-slate-600">
          <p>© {year} BharatBridge Technologies Pvt. Ltd. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <Link href="/privacy" className="hover:text-slate-400 transition-colors">Privacy Policy</Link>
            <Link href="/terms"   className="hover:text-slate-400 transition-colors">Terms of Use</Link>
            <Link href="/sitemap.xml" className="hover:text-slate-400 transition-colors">Sitemap</Link>
          </div>
          <p className="flex items-center gap-1.5">
            Made with <span className="text-red-500">❤️</span> in India 🇮🇳
          </p>
        </div>
      </div>
    </footer>
  );
}
