'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Users, Package, MessageSquare, ShieldCheck,
  AlertTriangle, ArrowRight, TrendingUp, Activity,
} from 'lucide-react';
import api from '@/lib/api';

export default function AdminDashboardPage() {
  const [data,    setData]    = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/admin/stats')
      .then((r) => setData(r.data.data))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  if (loading) return (
    <div className="flex items-center justify-center py-24">
      <div className="flex flex-col items-center gap-4">
        <div className="w-10 h-10 rounded-xl bg-[#1E3A5F] flex items-center justify-center">
          <span className="text-white font-black text-lg">B</span>
        </div>
        <div className="flex gap-1.5">
          {[0,1,2].map((i) => (
            <div key={i} className="w-2 h-2 bg-orange-500 rounded-full animate-bounce"
              style={{ animationDelay: `${i * 0.15}s` }} />
          ))}
        </div>
      </div>
    </div>
  );

  const stats  = data?.stats  || {};
  const recent = data?.recentVendors    || [];
  const inqs   = data?.recentInquiries  || [];

  const STAT_CARDS = [
    { label: 'Total Vendors',    value: stats.totalVendors    || 0, icon: <Users size={20} />,         color: 'text-blue-600',    bg: 'bg-blue-50',    href: '/admin/vendors' },
    { label: 'Pending KYC',      value: stats.pendingKyc      || 0, icon: <AlertTriangle size={20} />,  color: 'text-amber-600',   bg: 'bg-amber-50',   href: '/admin/vendors?status=pending' },
    { label: 'Total Products',   value: stats.totalProducts   || 0, icon: <Package size={20} />,        color: 'text-emerald-600', bg: 'bg-emerald-50', href: '/admin/products' },
    { label: 'Total Inquiries',  value: stats.totalInquiries  || 0, icon: <MessageSquare size={20} />,  color: 'text-purple-600',  bg: 'bg-purple-50',  href: '/admin/inquiries' },
    { label: 'New Inquiries',    value: stats.newInquiries    || 0, icon: <TrendingUp size={20} />,     color: 'text-red-600',     bg: 'bg-red-50',     href: '/admin/inquiries?status=NEW' },
    { label: 'Total Users',      value: stats.totalUsers      || 0, icon: <Users size={20} />,          color: 'text-indigo-600',  bg: 'bg-indigo-50',  href: '/admin/users' },
  ];

  const kycBadgeClass = (s) => {
    if (s === 'VERIFIED') return 'bg-emerald-100 text-emerald-700';
    if (s === 'PENDING')  return 'bg-amber-100 text-amber-700';
    return 'bg-red-100 text-red-700';
  };
  const inqBadgeClass = (s) => {
    if (s === 'NEW')      return 'bg-blue-100 text-blue-700';
    if (s === 'REPLIED')  return 'bg-emerald-100 text-emerald-700';
    return 'bg-slate-100 text-slate-600';
  };

  return (
    <div className="space-y-6">

      {/* Page header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-black text-[#1E3A5F]">Admin Control Panel</h1>
          <p className="text-sm text-slate-500 mt-0.5">Full platform oversight — vendors, products, inquiries, users.</p>
        </div>
        {stats.pendingKyc > 0 && (
          <Link href="/admin/vendors?status=pending"
            className="flex items-center gap-2 bg-amber-500 hover:bg-amber-600 text-white text-xs font-bold px-4 py-2 rounded-xl transition">
            <AlertTriangle size={14} />
            {stats.pendingKyc} Pending KYC
          </Link>
        )}
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        {STAT_CARDS.map((card) => (
          <Link key={card.label} href={card.href}
            className="bg-white rounded-2xl p-4 border border-slate-100 hover:border-[#1E3A5F]/20 hover:shadow-md transition group">
            <div className={`w-10 h-10 ${card.bg} rounded-xl flex items-center justify-center mb-3 ${card.color} group-hover:scale-110 transition-transform`}>
              {card.icon}
            </div>
            <div className="text-2xl font-black text-[#1E3A5F]">{card.value}</div>
            <div className="text-xs text-slate-500 mt-0.5">{card.label}</div>
          </Link>
        ))}
      </div>

      {/* Bottom grid */}
      <div className="grid lg:grid-cols-2 gap-6">

        {/* Recent Vendors */}
        <div className="bg-white rounded-2xl border border-slate-100 overflow-hidden">
          <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100">
            <h3 className="font-bold text-[#1E3A5F] text-sm">Recent Vendor Registrations</h3>
            <Link href="/admin/vendors" className="flex items-center gap-1 text-xs text-orange-500 hover:text-orange-600 font-semibold transition">
              Manage all <ArrowRight size={12} />
            </Link>
          </div>
          <div className="divide-y divide-slate-50">
            {recent.length === 0 && (
              <div className="px-5 py-8 text-center text-sm text-slate-400">No recent vendors</div>
            )}
            {recent.map((v) => (
              <div key={v._id} className="flex items-center gap-3 px-5 py-3 hover:bg-slate-50 transition">
                <div className="w-8 h-8 rounded-xl bg-[#1E3A5F] text-white flex items-center justify-center font-bold text-sm flex-shrink-0">
                  {v.companyName?.charAt(0)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-semibold text-slate-800 truncate">{v.companyName}</div>
                  <div className="text-xs text-slate-400 truncate">{v.user?.email}</div>
                </div>
                <span className={`text-xs font-semibold px-2 py-0.5 rounded-lg ${kycBadgeClass(v.kycStatus)}`}>
                  {v.kycStatus}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Inquiries */}
        <div className="bg-white rounded-2xl border border-slate-100 overflow-hidden">
          <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100">
            <h3 className="font-bold text-[#1E3A5F] text-sm">Recent Inquiries</h3>
            <Link href="/admin/inquiries" className="flex items-center gap-1 text-xs text-orange-500 hover:text-orange-600 font-semibold transition">
              View all <ArrowRight size={12} />
            </Link>
          </div>
          <div className="divide-y divide-slate-50">
            {inqs.length === 0 && (
              <div className="px-5 py-8 text-center text-sm text-slate-400">No recent inquiries</div>
            )}
            {inqs.map((inq) => (
              <div key={inq._id} className="flex items-center gap-3 px-5 py-3 hover:bg-slate-50 transition">
                <div className="w-8 h-8 rounded-xl bg-orange-100 text-orange-700 flex items-center justify-center font-bold text-sm flex-shrink-0">
                  {inq.buyerName?.charAt(0)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-semibold text-slate-800 truncate">{inq.buyerName}</div>
                  <div className="text-xs text-slate-400 truncate">{inq.product?.name} · {inq.buyerCountry}</div>
                </div>
                <span className={`text-xs font-semibold px-2 py-0.5 rounded-lg ${inqBadgeClass(inq.status)}`}>
                  {inq.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
