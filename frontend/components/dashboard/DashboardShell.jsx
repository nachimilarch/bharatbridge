'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import {
  LayoutDashboard, Package, MessageSquare, User,
  Settings, LogOut, Menu, X, ShieldCheck, Bell, ChevronRight,
} from 'lucide-react';
import { useState } from 'react';

const VENDOR_NAV = [
  { href: '/dashboard',            label: 'Dashboard',  icon: <LayoutDashboard size={18} /> },
  { href: '/dashboard/products',   label: 'Products',   icon: <Package size={18} /> },
  { href: '/dashboard/inquiries',  label: 'Inquiries',  icon: <MessageSquare size={18} /> },
  { href: '/dashboard/profile',    label: 'Profile',    icon: <User size={18} /> },
  { href: '/dashboard/settings',   label: 'Settings',   icon: <Settings size={18} /> },
];

const ADMIN_NAV = [
  { href: '/admin',             label: 'Dashboard',  icon: <LayoutDashboard size={18} /> },
  { href: '/admin/vendors',     label: 'Vendors',    icon: <ShieldCheck size={18} /> },
  { href: '/admin/products',    label: 'Products',   icon: <Package size={18} /> },
  { href: '/admin/inquiries',   label: 'Inquiries',  icon: <MessageSquare size={18} /> },
  { href: '/admin/users',       label: 'Users',      icon: <User size={18} /> },
];

export default function DashboardShell({ children, role = 'vendor' }) {
  const pathname   = usePathname();
  const { user, logout } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const NAV     = role === 'admin' ? ADMIN_NAV : VENDOR_NAV;
  const isAdmin = role === 'admin';
  const accentBg    = isAdmin ? 'bg-orange-500'  : 'bg-orange-500';
  const accentText  = isAdmin ? 'text-orange-400' : 'text-orange-400';

  const kycBadge = user?.vendor?.kycStatus;

  return (
    <div className="min-h-screen bg-slate-50 flex">

      {/* ── Sidebar ── */}
      <aside className={`fixed inset-y-0 left-0 z-50 w-64 bg-[#1E3A5F] flex flex-col transition-transform duration-300
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 lg:static lg:flex`}>

        {/* Logo */}
        <div className="h-16 flex items-center gap-3 px-5 border-b border-white/10">
          <div className={`w-8 h-8 rounded-xl ${accentBg} flex items-center justify-center flex-shrink-0`}>
            <span className="text-white font-black text-sm">B</span>
          </div>
          <div className="flex-1 min-w-0">
            <div className="font-black text-white text-sm">Bharat<span className={accentText}>Bridge</span></div>
            <div className="text-[10px] text-slate-400 uppercase tracking-widest">
              {isAdmin ? 'Admin Panel' : 'Vendor Portal'}
            </div>
          </div>
          <button className="lg:hidden text-slate-400 hover:text-white" onClick={() => setSidebarOpen(false)}>
            <X size={18} />
          </button>
        </div>

        {/* User info */}
        <div className="px-4 py-4 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className={`w-9 h-9 rounded-xl flex items-center justify-center text-white font-bold text-sm flex-shrink-0 ${accentBg}`}>
              {user?.name?.charAt(0).toUpperCase() || 'U'}
            </div>
            <div className="min-w-0">
              <div className="text-white text-sm font-semibold truncate">{user?.name || 'User'}</div>
              <div className="text-slate-400 text-xs truncate">{user?.email}</div>
            </div>
          </div>
          {kycBadge && (
            <div className={`mt-2.5 text-xs font-semibold px-2.5 py-1 rounded-lg inline-block
              ${ kycBadge === 'VERIFIED' ? 'bg-emerald-500/20 text-emerald-300'
                : kycBadge === 'PENDING'  ? 'bg-amber-500/20 text-amber-300'
                : 'bg-red-500/20 text-red-300'}`}>
              {kycBadge === 'VERIFIED' ? '✓ KYC Verified'
               : kycBadge === 'PENDING' ? '⏳ KYC Pending'
               : '✗ KYC Rejected'}
            </div>
          )}
        </div>

        {/* Nav */}
        <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-0.5">
          {NAV.map((item) => {
            const active =
              pathname === item.href ||
              (item.href !== '/dashboard' && item.href !== '/admin' && pathname.startsWith(item.href));
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all group
                  ${ active
                    ? 'bg-white/15 text-white'
                    : 'text-slate-300 hover:bg-white/10 hover:text-white'}`}
              >
                <span className={`transition-colors ${ active ? 'text-orange-400' : 'text-slate-400 group-hover:text-orange-400'}`}>
                  {item.icon}
                </span>
                <span className="flex-1">{item.label}</span>
                {active && <ChevronRight size={14} className="text-orange-400" />}
              </Link>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="px-3 py-4 border-t border-white/10 space-y-1">
          <Link href="/" className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-slate-300 hover:bg-white/10 hover:text-white transition">
            <span className="text-slate-400">🌐</span>
            <span>View Website</span>
          </Link>
          <button
            onClick={logout}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-slate-300 hover:bg-red-500/20 hover:text-red-300 transition"
          >
            <LogOut size={18} className="text-slate-400" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Mobile overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-40 bg-black/50 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {/* ── Main ── */}
      <div className="flex-1 flex flex-col min-w-0">

        {/* Top bar */}
        <header className="h-16 bg-white border-b border-slate-100 flex items-center gap-4 px-6 flex-shrink-0">
          <button
            className="lg:hidden text-slate-500 hover:text-[#1E3A5F] transition"
            onClick={() => setSidebarOpen(true)}
          >
            <Menu size={22} />
          </button>
          {/* Breadcrumb */}
          <div className="flex-1">
            <span className="text-sm font-semibold text-[#1E3A5F]">
              {NAV.find((n) => n.href === pathname)?.label ||
               NAV.find((n) => pathname.startsWith(n.href) && n.href !== '/dashboard' && n.href !== '/admin')?.label ||
               'Dashboard'}
            </span>
          </div>
          <button className="p-2 rounded-xl text-slate-400 hover:text-[#1E3A5F] hover:bg-slate-100 transition">
            <Bell size={18} />
          </button>
          <div className={`w-8 h-8 rounded-xl ${accentBg} flex items-center justify-center text-white font-bold text-sm`}>
            {user?.name?.charAt(0).toUpperCase() || 'U'}
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 overflow-y-auto p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
