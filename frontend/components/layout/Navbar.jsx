'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';

const NAV_LINKS = [
  { label: 'Products',    href: '/products' },
  { label: 'Categories',  href: '/products' },
  { label: 'Exporters',   href: '/vendors' },
  { label: 'About',       href: '/about' },
  { label: 'Contact',     href: '/contact' },
];

export default function Navbar() {
  const [scrolled,  setScrolled]  = useState(false);
  const [menuOpen,  setMenuOpen]  = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', fn);
    return () => window.removeEventListener('scroll', fn);
  }, []);

  return (
    <>
      {/* Top strip */}
      <div className="bg-navy text-white text-xs py-2 hidden md:block">
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <div className="flex items-center gap-6 text-gray-300">
            <span>🇮🇳 India’s #1 Verified B2B Export Marketplace</span>
            <span>📞 +91 98765 43210</span>
            <span>✉️ hello@bharatbridge.com</span>
          </div>
          <div className="flex items-center gap-5">
            <Link href="/export-guides" className="hover:text-orange-400 transition">Export Guides</Link>
            <Link href="/vendor/register" className="hover:text-orange-400 transition">Sell on BharatBridge</Link>
          </div>
        </div>
      </div>

      {/* Main nav */}
      <nav className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-white/95 backdrop-blur-md shadow-lg border-b border-gray-100' : 'bg-white shadow-sm'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">

            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 flex-shrink-0">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center shadow-md">
                <span className="text-white font-black text-lg leading-none">B</span>
              </div>
              <div className="leading-none">
                <div className="font-black text-xl">
                  <span className="text-navy">Bharat</span>
                  <span className="text-orange-500">Bridge</span>
                </div>
                <div className="text-[9px] text-gray-400 uppercase tracking-widest font-medium">B2B Export Platform</div>
              </div>
            </Link>

            {/* Desktop links */}
            <div className="hidden md:flex items-center gap-1">
              {NAV_LINKS.map(l => (
                <Link key={l.href} href={l.href}
                  className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-orange-500 hover:bg-orange-50 rounded-lg transition-all">
                  {l.label}
                </Link>
              ))}
            </div>

            {/* CTA */}
            <div className="hidden md:flex items-center gap-3">
              <Link href="/login" className="text-sm font-semibold text-gray-700 hover:text-orange-500 px-3 py-2 rounded-lg hover:bg-gray-50 transition">
                Login
              </Link>
              <Link href="/vendor/register" className="text-sm font-bold bg-navy text-white px-5 py-2 rounded-full hover:opacity-90 transition shadow">
                Become Vendor
              </Link>
              <Link href="/inquiry" className="text-sm font-bold bg-orange-500 text-white px-5 py-2 rounded-full hover:bg-orange-600 transition shadow shadow-orange-200">
                Submit Inquiry
              </Link>
            </div>

            {/* Hamburger */}
            <button className="md:hidden p-2 rounded-lg text-gray-700 hover:bg-gray-100" onClick={() => setMenuOpen(!menuOpen)}>
              <div className={`w-5 h-0.5 bg-current mb-1.5 transition-all ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
              <div className={`w-5 h-0.5 bg-current mb-1.5 transition-all ${menuOpen ? 'opacity-0' : ''}`} />
              <div className={`w-5 h-0.5 bg-current transition-all ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div className="md:hidden bg-white border-t border-gray-100 px-4 py-3 space-y-1 shadow-lg">
            {NAV_LINKS.map(l => (
              <Link key={l.href} href={l.href}
                className="block px-4 py-3 text-sm font-medium text-gray-700 hover:text-orange-500 hover:bg-orange-50 rounded-xl transition"
                onClick={() => setMenuOpen(false)}>{l.label}</Link>
            ))}
            <div className="pt-3 space-y-2">
              <Link href="/login" className="block text-center py-2.5 border border-gray-200 rounded-full text-sm font-semibold text-gray-700 hover:border-orange-400 transition">Login</Link>
              <Link href="/vendor/register" className="block text-center py-2.5 bg-navy text-white rounded-full text-sm font-bold">Become Vendor</Link>
              <Link href="/inquiry" className="block text-center py-2.5 bg-orange-500 text-white rounded-full text-sm font-bold">Submit Inquiry</Link>
            </div>
          </div>
        )}
      </nav>
    </>
  );
}
