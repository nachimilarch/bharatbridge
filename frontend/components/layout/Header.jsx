'use client';
import Link from 'next/link';
import { useState, useRef, useEffect } from 'react';
import { Menu, X, ChevronDown, Globe, LayoutDashboard, LogOut } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { useCurrency } from '@/context/CurrencyContext';

export default function Header() {
  const { user, logout } = useAuth();
  const { currency, setCurrency, SUPPORTED_CURRENCIES } = useCurrency();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [currencyOpen, setCurrencyOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const currencyRef = useRef(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const handler = (e) => {
      if (currencyRef.current && !currencyRef.current.contains(e.target))
        setCurrencyOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const currentCurrency = SUPPORTED_CURRENCIES?.find((c) => c.code === currency);

  return (
    <header className={`sticky top-0 z-50 transition-all duration-300 ${
      scrolled ? 'bg-white/95 backdrop-blur-md shadow-sm border-b border-gray-100' : 'bg-white border-b border-gray-100'
    }`}>
      {/* Announcement bar */}
      <div className="bg-gradient-brand text-white text-xs py-2 text-center font-medium tracking-wide">
        🇮🇳 India's Premier B2B Export Marketplace &nbsp;·&nbsp; 10,000+ Products &nbsp;·&nbsp; 50+ Countries &nbsp;·&nbsp; KYC Verified Exporters
      </div>

      <div className="page-container">
        <div className="flex items-center justify-between h-16">

          {/* ── Logo ── */}
          <Link href="/" className="flex items-center gap-2.5 no-underline group">
            <div className="w-9 h-9 bg-gradient-brand rounded-xl flex items-center justify-center shadow-sm group-hover:scale-105 transition-transform">
              <span className="text-white font-bold text-lg leading-none">B</span>
            </div>
            <div className="flex flex-col leading-none">
              <span className="font-heading font-bold text-gray-900 text-lg tracking-tight">
                Bharat<span className="text-brand-500">Bridge</span>
              </span>
              <span className="text-[10px] text-gray-400 font-medium tracking-widest uppercase">B2B Export</span>
            </div>
          </Link>

          {/* ── Desktop Nav ── */}
          <nav className="hidden md:flex items-center gap-1">
            {[
              ['/products',          'Products'],
              ['/vendors/register',  'Become a Vendor'],
              ['/about',             'About'],
              ['/contact',           'Contact'],
            ].map(([href, label]) => (
              <Link key={href} href={href}
                className="px-4 py-2 rounded-xl text-sm font-medium text-gray-600 hover:text-brand-600 hover:bg-brand-50 no-underline transition-all duration-150">
                {label}
              </Link>
            ))}
          </nav>

          {/* ── Right Actions ── */}
          <div className="flex items-center gap-2">

            {/* Currency selector */}
            <div className="relative hidden sm:block" ref={currencyRef}>
              <button
                onClick={() => setCurrencyOpen(!currencyOpen)}
                className="flex items-center gap-1.5 text-sm font-medium text-gray-600 hover:text-gray-900 bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded-xl px-3 py-2 transition-all"
              >
                <Globe size={14} className="text-gray-400" />
                <span>{currentCurrency?.flag}</span>
                <span>{currency}</span>
                <ChevronDown size={12} className={`transition-transform ${currencyOpen ? 'rotate-180' : ''}`} />
              </button>

              {currencyOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-xl border border-gray-100 py-2 z-50 max-h-64 overflow-y-auto">
                  <div className="px-3 py-1.5 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Select Currency</div>
                  {SUPPORTED_CURRENCIES?.map((c) => (
                    <button
                      key={c.code}
                      onClick={() => { setCurrency(c.code); setCurrencyOpen(false); }}
                      className={`w-full flex items-center gap-2.5 px-3 py-2 text-sm hover:bg-gray-50 text-left transition-colors ${
                        currency === c.code ? 'text-brand-600 font-semibold bg-brand-50/50' : 'text-gray-700'
                      }`}
                    >
                      <span className="text-base">{c.flag}</span>
                      <span className="font-medium">{c.code}</span>
                      <span className="text-gray-400 text-xs ml-auto">{c.symbol}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {user ? (
              <div className="flex items-center gap-2">
                <Link href={user.role === 'admin' ? '/admin' : '/dashboard'}
                  className="btn btn-primary btn-sm no-underline shine">
                  <LayoutDashboard size={14} /> Dashboard
                </Link>
                <button onClick={logout} className="btn btn-ghost btn-sm text-gray-500">
                  <LogOut size={14} />
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link href="/login" className="btn btn-secondary btn-sm no-underline">Login</Link>
                <Link href="/vendors/register" className="btn btn-primary btn-sm no-underline shine hidden sm:inline-flex">
                  Register Free
                </Link>
              </div>
            )}

            {/* Mobile toggle */}
            <button
              className="md:hidden p-2 rounded-xl hover:bg-gray-100 transition-colors"
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* ── Mobile Menu ── */}
        {mobileOpen && (
          <div className="md:hidden border-t border-gray-100 py-3 space-y-1 animate-fade-in">
            {[
              ['/', 'Home'],
              ['/products', 'Products'],
              ['/vendors/register', 'Become a Vendor'],
              ['/about', 'About'],
              ['/contact', 'Contact'],
            ].map(([href, label]) => (
              <Link key={href} href={href}
                onClick={() => setMobileOpen(false)}
                className="block px-4 py-2.5 rounded-xl text-gray-700 hover:bg-brand-50 hover:text-brand-700 no-underline text-sm font-medium transition-colors">
                {label}
              </Link>
            ))}
          </div>
        )}
      </div>
    </header>
  );
}
