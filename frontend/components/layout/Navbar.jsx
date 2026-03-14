'use client';
import Link from 'next/link';
import { useState, useRef, useEffect } from 'react';
import { Menu, X, ChevronDown, Globe, Search, LayoutDashboard, LogOut, ChevronRight } from 'lucide-react';
import { useAuth }     from '@/context/AuthContext';
import { useCurrency } from '@/context/CurrencyContext';

const NAV_LINKS = [
  { label: 'Products',       href: '/products' },
  { label: 'Categories',     href: '/products',
    dropdown: [
      { label: '🌾 Agriculture',      href: '/categories/agriculture-products' },
      { label: '🌶️ Indian Spices',     href: '/categories/indian-spices' },
      { label: '🧵 Textiles',          href: '/categories/textiles-fabrics' },
      { label: '💊 Pharmaceuticals',   href: '/categories/pharmaceuticals' },
      { label: '🌿 Herbal Products',   href: '/categories/herbal-products' },
      { label: '⚙️ Industrial Goods',  href: '/categories/industrial-goods' },
      { label: '🏺 Handicrafts',       href: '/categories/handicrafts' },
      { label: '🧪 Chemicals',         href: '/categories/chemicals' },
      { label: '🥫 Food Processing',   href: '/categories/food-processing' },
      { label: '🍃 Ayurvedic',         href: '/categories/ayurvedic-products' },
    ],
  },
  { label: 'Exporters',      href: '/vendors' },
  { label: 'Submit Inquiry', href: '/inquiry' },
  { label: 'About',          href: '/about' },
];

export default function Navbar() {
  const { user, logout }  = useAuth();
  const { currency, setCurrency, SUPPORTED_CURRENCIES } = useCurrency();
  const [mobileOpen,    setMobileOpen]    = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [currencyOpen,  setCurrencyOpen]  = useState(false);
  const [scrolled,      setScrolled]      = useState(false);
  const navRef = useRef(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const handler = (e) => {
      if (navRef.current && !navRef.current.contains(e.target)) {
        setActiveDropdown(null);
        setCurrencyOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  return (
    <header ref={navRef} className={`sticky top-0 z-50 transition-all duration-300 ${
      scrolled ? 'glass-nav shadow-nav' : 'bg-white border-b border-slate-100'
    }`}>

      {/* ── Top bar ── */}
      <div className="bg-blue-900 text-blue-100 text-xs py-2 hidden md:block">
        <div className="bb-container flex items-center justify-between">
          <div className="flex items-center gap-6">
            <span>🇮🇳 India's #1 B2B Export Marketplace</span>
            <span className="text-blue-300">|</span>
            <span>📞 +91 98765 43210</span>
            <span className="text-blue-300">|</span>
            <span>📧 hello@bharatbridge.com</span>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/blog" className="hover:text-white transition-colors">Export Guides</Link>
            <Link href="/vendors/register" className="hover:text-white transition-colors">Sell on BharatBridge</Link>
          </div>
        </div>
      </div>

      {/* ── Main nav ── */}
      <div className="bb-container">
        <div className="flex items-center justify-between h-16 gap-4">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 flex-shrink-0 group">
            <div className="w-10 h-10 bg-blue-gradient rounded-xl flex items-center justify-center shadow-sm group-hover:scale-105 transition-transform">
              <span className="text-white font-black text-xl leading-none font-heading">B</span>
            </div>
            <div>
              <div className="font-heading font-black text-xl leading-none text-slate-900 tracking-tight">
                Bharat<span className="text-blue-700">Bridge</span>
              </div>
              <div className="text-[9px] font-semibold text-slate-400 tracking-[0.15em] uppercase">B2B Export Platform</div>
            </div>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-1 flex-1 justify-center">
            {NAV_LINKS.map((link) => (
              <div key={link.label} className="relative">
                {link.dropdown ? (
                  <>
                    <button
                      onClick={() => setActiveDropdown(activeDropdown === link.label ? null : link.label)}
                      className={`flex items-center gap-1 px-3.5 py-2 rounded-lg text-sm font-semibold transition-all ${
                        activeDropdown === link.label
                          ? 'bg-blue-50 text-blue-700'
                          : 'text-slate-600 hover:text-blue-700 hover:bg-blue-50'
                      }`}
                    >
                      {link.label}
                      <ChevronDown size={14} className={`transition-transform ${activeDropdown === link.label ? 'rotate-180' : ''}`} />
                    </button>

                    {activeDropdown === link.label && (
                      <div className="absolute top-full left-0 mt-2 w-56 bg-white rounded-2xl shadow-xl border border-slate-100 py-2 z-50">
                        <div className="px-3 py-1.5 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Export Categories</div>
                        {link.dropdown.map((item) => (
                          <Link key={item.href} href={item.href}
                            onClick={() => setActiveDropdown(null)}
                            className="flex items-center justify-between px-4 py-2.5 text-sm text-slate-700 hover:bg-blue-50 hover:text-blue-700 transition-colors">
                            <span>{item.label}</span>
                            <ChevronRight size={12} className="text-slate-300" />
                          </Link>
                        ))}
                        <div className="border-t border-slate-100 mt-1 pt-1 px-3">
                          <Link href="/products" onClick={() => setActiveDropdown(null)}
                            className="flex items-center gap-2 py-2 text-xs font-semibold text-blue-700 hover:text-blue-800">
                            View all categories →
                          </Link>
                        </div>
                      </div>
                    )}
                  </>
                ) : (
                  <Link href={link.href}
                    className={`px-3.5 py-2 rounded-lg text-sm font-semibold transition-all text-slate-600 hover:text-blue-700 hover:bg-blue-50 ${
                      link.label === 'Submit Inquiry' ? 'text-blue-700 bg-blue-50 border border-blue-200' : ''
                    }`}>
                    {link.label}
                  </Link>
                )}
              </div>
            ))}
          </nav>

          {/* Right side */}
          <div className="flex items-center gap-2 flex-shrink-0">

            {/* Currency */}
            <div className="relative hidden md:block">
              <button
                onClick={() => setCurrencyOpen(!currencyOpen)}
                className="flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-slate-900 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-lg px-3 py-2 transition-all"
              >
                <Globe size={13} />
                <span>{SUPPORTED_CURRENCIES?.find(c => c.code === currency)?.flag || '🌐'}</span>
                <span>{currency}</span>
                <ChevronDown size={11} className={`transition-transform ${currencyOpen ? 'rotate-180' : ''}`} />
              </button>

              {currencyOpen && (
                <div className="absolute right-0 mt-2 w-52 bg-white rounded-2xl shadow-xl border border-slate-100 py-2 z-50 max-h-64 overflow-y-auto">
                  {SUPPORTED_CURRENCIES?.map((c) => (
                    <button key={c.code}
                      onClick={() => { setCurrency(c.code); setCurrencyOpen(false); }}
                      className={`w-full flex items-center gap-2.5 px-3.5 py-2.5 text-sm hover:bg-slate-50 text-left transition-colors ${
                        currency === c.code ? 'text-blue-700 font-bold bg-blue-50/50' : 'text-slate-700'
                      }`}>
                      <span>{c.flag}</span>
                      <span className="font-semibold">{c.code}</span>
                      <span className="text-slate-400 text-xs ml-auto">{c.name}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Vendor CTA */}
            <Link href="/vendors/register"
              className="hidden md:inline-flex bb-btn bb-btn-saffron bb-btn-sm btn-shine text-xs font-bold">
              Become Vendor
            </Link>

            {user ? (
              <div className="flex items-center gap-1.5">
                <Link href={user.role === 'admin' ? '/admin' : '/dashboard'}
                  className="bb-btn bb-btn-primary bb-btn-sm btn-shine text-xs">
                  <LayoutDashboard size={13} /> Dashboard
                </Link>
                <button onClick={logout} className="p-2 rounded-lg hover:bg-slate-100 text-slate-500 transition-colors">
                  <LogOut size={16} />
                </button>
              </div>
            ) : (
              <Link href="/login" className="bb-btn bb-btn-outline bb-btn-sm text-xs">Login</Link>
            )}

            {/* Mobile toggle */}
            <button
              className="lg:hidden p-2 rounded-lg hover:bg-slate-100 transition-colors"
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="lg:hidden border-t border-slate-100 py-4 space-y-1">
            {NAV_LINKS.map((link) => (
              <Link key={link.href} href={link.href}
                onClick={() => setMobileOpen(false)}
                className="block px-4 py-3 rounded-lg text-sm font-semibold text-slate-700 hover:bg-blue-50 hover:text-blue-700 transition-colors">
                {link.label}
              </Link>
            ))}
            <div className="pt-3 border-t border-slate-100 flex gap-2">
              <Link href="/vendors/register" onClick={() => setMobileOpen(false)}
                className="bb-btn bb-btn-saffron bb-btn-sm flex-1 justify-center text-xs">
                Become Vendor
              </Link>
              <Link href="/login" onClick={() => setMobileOpen(false)}
                className="bb-btn bb-btn-outline bb-btn-sm flex-1 justify-center text-xs">
                Login
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
