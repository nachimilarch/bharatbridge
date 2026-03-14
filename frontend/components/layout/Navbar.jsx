'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const NAV = [
  { label: 'Products',   href: '/products' },
  { label: 'Exporters',  href: '/vendors'  },
  { label: 'Categories', href: '/products' },
  { label: 'About Us',   href: '/about'    },
  { label: 'Contact',    href: '/contact'  },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open,     setOpen]     = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 8);
    window.addEventListener('scroll', fn);
    return () => window.removeEventListener('scroll', fn);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  return (
    <>
      {/* Utility bar */}
      <div className="hidden md:block bg-[#1E3A5F] text-white text-xs">
        <div className="max-w-7xl mx-auto px-6 h-9 flex items-center justify-between">
          <div className="flex items-center gap-6 text-blue-200">
            <span className="flex items-center gap-1.5">
              <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
              +91 98765 43210
            </span>
            <span className="flex items-center gap-1.5">
              <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
              hello@bharatbridge.com
            </span>
          </div>
          <div className="flex items-center gap-5 text-blue-200">
            <Link href="/vendor/register" className="hover:text-white transition-colors">List Your Products</Link>
            <span className="text-blue-700">|</span>
            <Link href="/login" className="hover:text-white transition-colors">Sign In</Link>
          </div>
        </div>
      </div>

      {/* Main navbar */}
      <nav className={`sticky top-0 z-50 bg-white transition-shadow duration-200 ${
        scrolled ? 'shadow-[0_1px_8px_rgba(0,0,0,0.10)]' : 'border-b border-gray-200'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">

            {/* Logo */}
            <Link href="/" className="flex items-center gap-2.5 flex-shrink-0">
              <div className="w-8 h-8 rounded bg-[#1E3A5F] flex items-center justify-center">
                <span className="text-white font-bold text-base font-heading leading-none">B</span>
              </div>
              <div>
                <div className="font-heading font-bold text-[1.05rem] leading-tight text-[#1E3A5F]">
                  BharatBridge
                </div>
                <div className="text-[9px] text-[#6B7280] uppercase tracking-[0.15em] leading-none font-sans">
                  B2B Export Platform
                </div>
              </div>
            </Link>

            {/* Desktop nav links */}
            <div className="hidden lg:flex items-center">
              {NAV.map(l => {
                const active = pathname === l.href;
                return (
                  <Link key={l.href} href={l.href}
                    className={`px-4 py-5 text-sm font-medium border-b-2 transition-colors duration-150 ${
                      active
                        ? 'border-[#1E3A5F] text-[#1E3A5F]'
                        : 'border-transparent text-[#1F2937] hover:text-[#1E3A5F] hover:border-[#3A6EA5]'
                    }`}>
                    {l.label}
                  </Link>
                );
              })}
            </div>

            {/* CTA */}
            <div className="hidden lg:flex items-center gap-3">
              <Link href="/inquiry"
                className="text-sm font-semibold text-[#1E3A5F] border border-[#1E3A5F] px-5 py-2 rounded hover:bg-[#1E3A5F] hover:text-white transition-colors duration-200">
                Submit Inquiry
              </Link>
              <Link href="/vendor/register"
                className="text-sm font-semibold bg-[#1E3A5F] text-white px-5 py-2 rounded hover:bg-[#16304f] transition-colors duration-200">
                List Products
              </Link>
            </div>

            {/* Mobile hamburger */}
            <button className="lg:hidden p-2 rounded text-gray-600 hover:bg-gray-100 transition-colors"
              onClick={() => setOpen(!open)} aria-label="Menu">
              {open ? (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
              ) : (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" /></svg>
              )}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {open && (
          <div className="lg:hidden border-t border-gray-100 bg-white">
            <div className="max-w-7xl mx-auto px-4 py-3 space-y-0.5">
              {NAV.map(l => (
                <Link key={l.href} href={l.href}
                  className="block px-3 py-2.5 text-sm font-medium text-[#1F2937] hover:text-[#1E3A5F] hover:bg-[#F5F7FA] rounded transition-colors">
                  {l.label}
                </Link>
              ))}
              <div className="pt-3 pb-1 flex flex-col gap-2">
                <Link href="/inquiry" className="text-center py-2.5 text-sm font-semibold text-[#1E3A5F] border border-[#1E3A5F] rounded hover:bg-[#1E3A5F] hover:text-white transition-colors">Submit Inquiry</Link>
                <Link href="/vendor/register" className="text-center py-2.5 text-sm font-semibold bg-[#1E3A5F] text-white rounded">List Products</Link>
              </div>
            </div>
          </div>
        )}
      </nav>
    </>
  );
}
