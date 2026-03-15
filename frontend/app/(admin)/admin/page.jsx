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
        <div className="w-10 h-10 bg-[#1E3A5F] rounded-xl flex items-center justify-center">
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

  const stats   = data?.stats  || {};
  const recent  = data?.recentVendors    || [];
  const inqs    = data?.recentInquiries  || [];

  const STAT_CARDS = [
    { label: 'Total Vendors',    value: stats.totalVendors    || 0, icon: Users,         color: 'text-blue-600',    bg: 'bg-blue-50',    href: '/admin/vendors' },
    { label: 'Pending KYC',      value: stats.pendingKyc      || 0, icon: AlertTriangle,  color: 'text-amber-600',   bg: 'bg-amber-50',   href: '/admin/vendors?status=pending' },
    { label: 'Total Products',   value: stats.totalProducts   || 0, icon: Package,        color: 'text-emerald-600', bg: 'bg-emerald-50', href: '/admin/products' },
    { label: 'Total Inquiries',  value: stats.totalInquiries  || 0, icon: MessageSquare,  color: 'text-purple-600',  bg: 'bg-purple-50',  href: '/admin/inquiries' },
    { label: 'New Inquiries',    value: stats.newInquiries    || 0, icon: TrendingUp,     color: 'text-red-600',     bg: 'bg-red-50',     href: '/admin/inquiries?status=NEW' },
    { label: 'Total Users',      value: stats.totalUsers      || 0, icon: Users,          color: 'text-indigo-600',  bg: 'bg-indigo-50',  href: '/admin/users' },
  ];

  const kycBadgeClass = (s) => {
    if (s === 'VERIFIED') return 'bg-emerald-100 text-emerald-700';
    if (s === 'PENDING')  return 'bg-amber-100 text-amber-700';
    return 'bg-red-100 text-red-700';
  };

  const inqBadgeClass = (s) => {
    if (s === 'NEW')     return 'bg-blue-100 text-blue-700';
    if (s === 'REPLIED') return 'bg-emerald-100 text-emerald-700';
    return 'bg-slate-100 text-slate-600';
  };

  return (
    <div className="space-y-6">

      {/* Header */}
      <div>
        <h1 className="text-xl font-black text-[#1E3A5F]">Admin Dashboard</h1>
        <p className="text-sm text-slate-500 mt-0.5">Platform overview and management</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
        {STAT_CARDS.map((card) => (
          <Link key={card.label} href={card.href}
            className="bb-card p-5 hover:shadow-md transition group">
            <div className="flex items-start justify-between mb-3">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${card.bg}`}>
                <card.icon size={20} className={card.color} />
              </div>
              <ArrowRight size={14} className="text-slate-300 group-hover:text-slate-500 transition mt-1" />
            </div>
            <p className="text-2xl font-black text-[#1E3A5F]">{card.value}</p>
            <p className="text-xs text-slate-500 mt-0.5">{card.label}</p>
          </Link>
        ))}
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        {/* Recent Vendors */}
        <div className="bb-card p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-black text-[#1E3A5F] flex items-center gap-2">
              <ShieldCheck size={16} /> Recent Vendor Signups
            </h2>
            <Link href="/admin/vendors" className="text-xs text-orange-600 hover:underline font-bold">View all</Link>
          </div>
          {recent.length === 0 ? (
            <p className="text-sm text-slate-400 py-6 text-center">No vendors yet</p>
          ) : (
            <div className="space-y-3">
              {recent.map((v) => (
                <div key={v.id} className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl">
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-bold text-[#1E3A5F] truncate">{v.companyName}</p>
                    <p className="text-xs text-slate-500 truncate">{v.user?.email}</p>
                  </div>
                  <span className={`text-[10px] font-bold px-2 py-1 rounded-full ${kycBadgeClass(v.kycStatus)}`}>
                    {v.kycStatus}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Recent Inquiries */}
        <div className="bb-card p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-black text-[#1E3A5F] flex items-center gap-2">
              <Activity size={16} /> Recent Inquiries
            </h2>
            <Link href="/admin/inquiries" className="text-xs text-orange-600 hover:underline font-bold">View all</Link>
          </div>
          {inqs.length === 0 ? (
            <p className="text-sm text-slate-400 py-6 text-center">No inquiries yet</p>
          ) : (
            <div className="space-y-3">
              {inqs.map((inq) => (
                <div key={inq._id} className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl">
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-bold text-[#1E3A5F] truncate">
                      {inq.buyerName || 'Buyer'}
                    </p>
                    <p className="text-xs text-slate-500 truncate">{inq.product?.name || 'Product inquiry'}</p>
                  </div>
                  <span className={`text-[10px] font-bold px-2 py-1 rounded-full ${inqBadgeClass(inq.status)}`}>
                    {inq.status}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
