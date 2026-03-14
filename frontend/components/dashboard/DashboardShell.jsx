'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import {
  LayoutDashboard, Package, MessageSquare, User,
  Settings, LogOut, Menu, X, ShieldCheck, Bell,
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
  { href: '/admin',                label: 'Dashboard',  icon: <LayoutDashboard size={18} /> },
  { href: '/admin/vendors',        label: 'Vendors',    icon: <ShieldCheck size={18} /> },
  { href: '/admin/products',       label: 'Products',   icon: <Package size={18} /> },
  { href: '/admin/inquiries',      label: 'Inquiries',  icon: <MessageSquare size={18} /> },
  { href: '/admin/users',          label: 'Users',      icon: <User size={18} /> },
];

export default function DashboardShell({ children, role = 'vendor' }) {
  const pathname = usePathname();
  const { user, logout } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const NAV    = role === 'admin' ? ADMIN_NAV : VENDOR_NAV;
  const isAdmin = role === 'admin';

  return (
    <div className="min-h-screen bg-slate-50 flex">

      {/* ── Sidebar ── */}
      <aside className={`fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-slate-100 shadow-sm flex flex-col transition-transform duration-300
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 lg:static lg:flex`}>

        {/* Logo */}
        <div className="h-16 flex items-center gap-3 px-5 border-b border-slate-100">
          <div className={`w-8 h-8 rounded-xl flex items-center justify-center ${isAdmin ? 'bg-red-500' : 'bg-blue-700'}`}>
            <span className="text-white font-black text-sm">B</span>
          </div>
          <div>
            <div className="font-heading font-black text-slate-900 text-sm">
              Bharat<span className={isAdmin ? 'text-red-500' : 'text-blue-700'}>Bridge</span>
            </div>
            <div className={`text-[10px] font-bold uppercase tracking-widest ${isAdmin ? 'text-red-400' : 'text-blue-400'}`}>
              {isAdmin ? 'Admin Panel' : 'Vendor Portal'}
            </div>
          </div>
          <button className="ml-auto lg:hidden" onClick={() => setSidebarOpen(false)}>
            <X size={18} className="text-slate-400" />
          </button>
        </div>

        {/* User info */}
        <div className="px-4 py-4 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-white font-bold text-sm ${isAdmin ? 'bg-red-500' : 'bg-blue-700'}`}>
              {user?.name?.charAt(0).toUpperCase() || 'U'}
            </div>
            <div className="flex-1 min-w-0">
              <div className="font-semibold text-slate-900 text-sm truncate">{user?.name}</div>
              <div className="text-xs text-slate-400 truncate">{user?.email}</div>
            </div>
          </div>
          {user?.vendor?.kycStatus && (
            <div className="mt-2">
              <span className={`bb-badge text-[10px] ${
                user.vendor.kycStatus === 'VERIFIED'  ? 'bb-badge-verified' :
                user.vendor.kycStatus === 'PENDING'   ? 'bb-badge-featured' :
                'bb-badge-hot'
              }`}>
                {user.vendor.kycStatus === 'VERIFIED' ? '✅ KYC Verified' :
                 user.vendor.kycStatus === 'PENDING'  ? '⏳ KYC Pending' :
                 '❌ KYC Rejected'}
              </span>
            </div>
          )}
        </div>

        {/* Nav */}
        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          {NAV.map((item) => {
            const active = pathname === item.href || (item.href !== '/dashboard' && item.href !== '/admin' && pathname.startsWith(item.href));
            return (
              <Link key={item.href} href={item.href}
                onClick={() => setSidebarOpen(false)}
                className={active ? 'bb-nav-link-active' : 'bb-nav-link'}>
                {item.icon}
                <span>{item.label}</span>
                {item.label === 'Inquiries' && (
                  <span className={`ml-auto text-[10px] font-bold px-1.5 py-0.5 rounded-full ${isAdmin ? 'bg-red-100 text-red-600' : 'bg-blue-100 text-blue-600'}`}>
                    •
                  </span>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-slate-100 space-y-1">
          <Link href="/" className="bb-nav-link text-slate-500">
            <span>🌐</span> View Website
          </Link>
          <button onClick={logout} className="bb-nav-link w-full text-red-500 hover:bg-red-50 hover:text-red-700">
            <LogOut size={16} /> Sign Out
          </button>
        </div>
      </aside>

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black/30 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)} />
      )}

      {/* ── Main ── */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top bar */}
        <header className="h-16 bg-white border-b border-slate-100 flex items-center gap-4 px-5 sticky top-0 z-30">
          <button className="lg:hidden p-2 rounded-lg hover:bg-slate-100"
            onClick={() => setSidebarOpen(true)}>
            <Menu size={20} className="text-slate-600" />
          </button>

          {/* Breadcrumb */}
          <div className="flex-1">
            <h1 className="font-heading font-bold text-slate-900 text-sm">
              {NAV.find((n) => n.href === pathname)?.label ||
               NAV.find((n) => pathname.startsWith(n.href) && n.href !== '/dashboard' && n.href !== '/admin')?.label ||
               'Dashboard'}
            </h1>
          </div>

          <div className="flex items-center gap-2">
            <button className="relative p-2 rounded-xl hover:bg-slate-100 transition-colors">
              <Bell size={18} className="text-slate-500" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
            </button>
            <div className={`w-8 h-8 rounded-xl flex items-center justify-center text-white font-bold text-xs ${isAdmin ? 'bg-red-500' : 'bg-blue-700'}`}>
              {user?.name?.charAt(0).toUpperCase() || 'U'}
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 p-5 md:p-8 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
