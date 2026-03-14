'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Users, Package, MessageSquare, ShieldCheck, AlertTriangle, ArrowRight, TrendingUp } from 'lucide-react';
import api from '@/lib/api';
import Spinner from '@/components/ui/Spinner';

export default function AdminDashboardPage() {
  const [data,    setData]    = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/admin/stats')
      .then((r) => setData(r.data.data))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="flex justify-center py-20"><Spinner size="lg" /></div>;

  const stats  = data?.stats  || {};
  const recent = data?.recentVendors    || [];
  const inqs   = data?.recentInquiries  || [];

  const STAT_CARDS = [
    { label: 'Total Vendors',   value: stats.totalVendors   || 0, icon: <Users size={22} />,       color: 'text-blue-600',    bg: 'bg-blue-50',    href: '/admin/vendors' },
    { label: 'Pending KYC',     value: stats.pendingKyc     || 0, icon: <AlertTriangle size={22}/>, color: 'text-amber-600',   bg: 'bg-amber-50',   href: '/admin/vendors?status=pending' },
    { label: 'Total Products',  value: stats.totalProducts  || 0, icon: <Package size={22} />,      color: 'text-emerald-600', bg: 'bg-emerald-50', href: '/admin/products' },
    { label: 'Total Inquiries', value: stats.totalInquiries || 0, icon: <MessageSquare size={22}/>, color: 'text-purple-600',  bg: 'bg-purple-50',  href: '/admin/inquiries' },
    { label: 'New Inquiries',   value: stats.newInquiries   || 0, icon: <TrendingUp size={22} />,   color: 'text-red-600',     bg: 'bg-red-50',     href: '/admin/inquiries?status=NEW' },
    { label: 'Total Users',     value: stats.totalUsers     || 0, icon: <Users size={22} />,        color: 'text-indigo-600',  bg: 'bg-indigo-50',  href: '/admin/users' },
  ];

  return (
    <div className="space-y-6">

      {/* Banner */}
      <div className="bg-gradient-to-r from-slate-800 to-slate-900 rounded-2xl p-6 text-white flex items-center justify-between">
        <div>
          <h2 className="font-heading font-bold text-xl mb-1">🛡️ Admin Control Panel</h2>
          <p className="text-slate-300 text-sm">Full platform oversight — vendors, products, inquiries, users.</p>
        </div>
        <div className="flex gap-2">
          <Link href="/admin/vendors?status=pending"
            className="bb-btn bg-amber-500 hover:bg-amber-600 text-white bb-btn-sm">
            <AlertTriangle size={14} /> {stats.pendingKyc || 0} Pending KYC
          </Link>
        </div>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        {STAT_CARDS.map((card) => (
          <Link key={card.label} href={card.href} className="bb-card-hover p-5 group">
            <div className={`w-11 h-11 ${card.bg} rounded-xl flex items-center justify-center mb-3 ${card.color} group-hover:scale-110 transition-transform`}>
              {card.icon}
            </div>
            <div className="font-heading font-black text-2xl text-slate-900">{card.value}</div>
            <div className="text-slate-500 text-xs mt-0.5 font-medium">{card.label}</div>
          </Link>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        {/* Recent Vendors */}
        <div className="bb-card">
          <div className="flex items-center justify-between px-6 py-4 border-b border-slate-50">
            <h3 className="font-heading font-bold text-slate-900">Recent Vendor Registrations</h3>
            <Link href="/admin/vendors" className="text-xs text-blue-600 font-semibold hover:underline flex items-center gap-1">
              Manage all <ArrowRight size={12} />
            </Link>
          </div>
          <div className="divide-y divide-slate-50">
            {recent.map((v) => (
              <div key={v.id} className="flex items-center gap-3 px-6 py-3.5 hover:bg-slate-50">
                <div className="w-9 h-9 bg-blue-100 rounded-xl flex items-center justify-center text-blue-700 font-bold text-sm flex-shrink-0">
                  {v.companyName?.charAt(0)}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-slate-900 text-sm">{v.companyName}</p>
                  <p className="text-slate-400 text-xs">{v.user?.email}</p>
                </div>
                <span className={`bb-badge text-[10px] ${
                  v.kycStatus === 'VERIFIED' ? 'bb-badge-verified' :
                  v.kycStatus === 'PENDING'  ? 'bb-badge-featured' :
                  'bb-badge-hot'
                }`}>{v.kycStatus}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Inquiries */}
        <div className="bb-card">
          <div className="flex items-center justify-between px-6 py-4 border-b border-slate-50">
            <h3 className="font-heading font-bold text-slate-900">Recent Inquiries</h3>
            <Link href="/admin/inquiries" className="text-xs text-blue-600 font-semibold hover:underline flex items-center gap-1">
              View all <ArrowRight size={12} />
            </Link>
          </div>
          <div className="divide-y divide-slate-50">
            {inqs.map((inq) => (
              <div key={inq.id} className="flex items-center gap-3 px-6 py-3.5 hover:bg-slate-50">
                <div className="w-9 h-9 bg-purple-100 rounded-xl flex items-center justify-center text-purple-700 font-bold text-sm flex-shrink-0">
                  {inq.buyerName?.charAt(0)}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-slate-900 text-sm">{inq.buyerName}</p>
                  <p className="text-slate-400 text-xs truncate">{inq.product?.name} · {inq.buyerCountry}</p>
                </div>
                <span className={`bb-badge text-[10px] ${
                  inq.status === 'NEW' ? 'bb-badge-hot' : 'bb-badge-new'
                }`}>{inq.status}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
