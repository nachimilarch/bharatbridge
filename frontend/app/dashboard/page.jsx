'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Package, MessageSquare, TrendingUp,
  AlertCircle, ArrowRight, Plus,
} from 'lucide-react';
import api       from '@/lib/api';
import { useAuth } from '@/context/AuthContext';

export default function VendorDashboardPage() {
  const { user } = useAuth();
  const [data,    setData]    = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/vendors/dashboard/stats')
      .then((r)  => setData(r.data.data))
      .catch(()  => setData(null))
      .finally(() => setLoading(false));
  }, []);

  const stats  = data?.stats           || {};
  const vendor = data?.vendor          || {};
  const recent = data?.recentInquiries || [];

  const STAT_CARDS = [
    { label: 'Total Products',  value: stats.totalProducts  || 0, icon: <Package       size={22} />, color: 'text-blue-600',    bg: 'bg-blue-50',    href: '/dashboard/products'  },
    { label: 'Active Listings', value: stats.activeProducts || 0, icon: <TrendingUp     size={22} />, color: 'text-emerald-600', bg: 'bg-emerald-50', href: '/dashboard/products'  },
    { label: 'Total Inquiries', value: stats.totalInquiries || 0, icon: <MessageSquare  size={22} />, color: 'text-purple-600',  bg: 'bg-purple-50',  href: '/dashboard/inquiries' },
    { label: 'New Inquiries',   value: stats.newInquiries   || 0, icon: <AlertCircle    size={22} />, color: 'text-amber-600',   bg: 'bg-amber-50',   href: '/dashboard/inquiries' },
  ];

  return (
    <div className="space-y-6">

      {/* ── Welcome banner ── */}
      <div className="bg-blue-gradient rounded-2xl p-6 text-white flex flex-col sm:flex-row justify-between gap-4">
        <div>
          <h2 className="font-heading font-bold text-xl mb-1">
            Welcome back, {user?.name?.split(' ')[0] || 'Vendor'}! 👋
          </h2>
          <p className="text-blue-100 text-sm">
            {vendor.companyName || 'Your Company'} ·{' '}
            {vendor.kycStatus === 'VERIFIED' || vendor.kycStatus === 'verified'
              ? '✅ KYC Verified — Your products are live'
              : '⏳ KYC Pending — Submit documents to go live'}
          </p>
        </div>
        <div className="flex gap-2 flex-shrink-0 flex-wrap">
          <Link href="/dashboard/products/add"
            className="bb-btn bb-btn-saffron bb-btn-sm btn-shine">
            <Plus size={16} /> Add Product
          </Link>
          <Link href="/dashboard/inquiries"
            className="bb-btn bg-white/20 text-white border border-white/30 hover:bg-white/30 bb-btn-sm">
            View Inquiries
          </Link>
        </div>
      </div>

      {/* ── KYC warning ── */}
      {(vendor.kycStatus === 'PENDING' || vendor.kycStatus === 'pending') && (
        <div className="bg-amber-50 border-2 border-amber-200 rounded-2xl p-4 flex items-start gap-3">
          <AlertCircle className="text-amber-500 flex-shrink-0 mt-0.5" size={20} />
          <div>
            <p className="font-semibold text-amber-900 text-sm">KYC Verification Pending</p>
            <p className="text-amber-700 text-xs mt-0.5">
              Complete your profile to get products visible to global buyers.
            </p>
            <Link href="/dashboard/profile"
              className="text-amber-700 font-bold text-xs hover:underline mt-1 inline-block">
              Complete Profile →
            </Link>
          </div>
        </div>
      )}

      {/* ── Stats ── */}
      {loading ? (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[0,1,2,3].map((i) => (
            <div key={i} className="bb-card p-5 animate-pulse">
              <div className="w-12 h-12 bg-slate-100 rounded-xl mb-4" />
              <div className="h-7 bg-slate-100 rounded w-16 mb-2" />
              <div className="h-3 bg-slate-100 rounded w-24" />
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {STAT_CARDS.map((card) => (
            <Link key={card.label} href={card.href}
              className="bb-card-hover p-5 group">
              <div className={`w-12 h-12 ${card.bg} rounded-xl flex items-center justify-center mb-4 ${card.color} group-hover:scale-110 transition-transform`}>
                {card.icon}
              </div>
              <div className="font-heading font-black text-2xl text-slate-900">{card.value}</div>
              <div className="text-slate-500 text-xs mt-0.5 font-medium">{card.label}</div>
            </Link>
          ))}
        </div>
      )}

      {/* ── Recent inquiries ── */}
      <div className="bb-card">
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
          <h3 className="font-heading font-bold text-slate-900">Recent Inquiries</h3>
          <Link href="/dashboard/inquiries"
            className="text-xs text-blue-600 font-semibold hover:underline flex items-center gap-1">
            View all <ArrowRight size={12} />
          </Link>
        </div>

        {loading ? (
          <div className="p-6 space-y-3">
            {[0,1,2].map((i) => (
              <div key={i} className="flex gap-3 animate-pulse">
                <div className="w-9 h-9 bg-slate-100 rounded-xl flex-shrink-0" />
                <div className="flex-1 space-y-2">
                  <div className="h-3 bg-slate-100 rounded w-1/3" />
                  <div className="h-3 bg-slate-100 rounded w-1/2" />
                </div>
              </div>
            ))}
          </div>
        ) : recent.length === 0 ? (
          <div className="py-14 text-center">
            <MessageSquare className="text-slate-200 mx-auto mb-3" size={40} />
            <p className="text-slate-400 text-sm font-medium">No inquiries yet.</p>
            <p className="text-slate-400 text-xs mt-1">
              Add products and buyers will start reaching out.
            </p>
          </div>
        ) : (
          <div className="divide-y divide-slate-50">
            {recent.map((inq) => (
              <div key={inq.id}
                className="flex items-center gap-4 px-6 py-4 hover:bg-slate-50 transition-colors">
                <div className="w-9 h-9 bg-blue-100 rounded-xl flex items-center justify-center text-blue-700 font-bold text-sm flex-shrink-0">
                  {inq.buyerName?.charAt(0)?.toUpperCase() || '?'}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-slate-900 text-sm">{inq.buyerName}</p>
                  <p className="text-slate-400 text-xs truncate">
                    {inq.product?.name} · {inq.buyerCountry}
                  </p>
                </div>
                <div className="flex items-center gap-2 flex-shrink-0">
                  <span className={`bb-badge text-[10px] ${
                    inq.status === 'NEW'       || inq.status === 'new'       ? 'bb-badge-hot'      :
                    inq.status === 'CONTACTED' || inq.status === 'contacted' ? 'bb-badge-new'      :
                    inq.status === 'QUOTED'    || inq.status === 'quoted'    ? 'bb-badge-featured' :
                    'bb-badge-verified'
                  }`}>
                    {inq.status}
                  </span>
                  <span className="text-slate-400 text-xs">
                    {new Date(inq.createdAt).toLocaleDateString('en-IN', {
                      day: 'numeric', month: 'short',
                    })}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
