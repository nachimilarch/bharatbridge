'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Package, MessageSquare, TrendingUp,
  AlertCircle, ArrowRight, Plus, CheckCircle2, Clock,
} from 'lucide-react';
import api         from '@/lib/api';
import { useAuth } from '@/context/AuthContext';

export default function VendorDashboardPage() {
  const { user }                    = useAuth();
  const [data,    setData]    = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/vendors/dashboard/stats')
      .then((r)  => setData(r.data.data))
      .catch(()  => setData(null))
      .finally(() => setLoading(false));
  }, []);

  const stats  = data?.stats          || {};
  const vendor = data?.vendor         || {};
  const recent = data?.recentInquiries || [];

  const STAT_CARDS = [
    { label: 'Total Products',   value: stats.totalProducts   || 0, icon: <Package size={20} />,       color: 'text-blue-600',    bg: 'bg-blue-50',    href: '/dashboard/products' },
    { label: 'Active Listings',  value: stats.activeProducts  || 0, icon: <TrendingUp size={20} />,    color: 'text-emerald-600', bg: 'bg-emerald-50', href: '/dashboard/products' },
    { label: 'Total Inquiries',  value: stats.totalInquiries  || 0, icon: <MessageSquare size={20} />, color: 'text-purple-600',  bg: 'bg-purple-50',  href: '/dashboard/inquiries' },
    { label: 'New Inquiries',    value: stats.newInquiries    || 0, icon: <AlertCircle size={20} />,   color: 'text-amber-600',   bg: 'bg-amber-50',   href: '/dashboard/inquiries' },
  ];

  const inqBadge = (s) => {
    if (s === 'NEW')     return 'bg-blue-100 text-blue-700';
    if (s === 'REPLIED') return 'bg-emerald-100 text-emerald-700';
    return 'bg-slate-100 text-slate-600';
  };

  const isVerified = vendor.kycStatus === 'VERIFIED' || vendor.kycStatus === 'verified';
  const isPending  = vendor.kycStatus === 'PENDING'  || vendor.kycStatus === 'pending';

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

  return (
    <div className="space-y-6">

      {/* Welcome header */}
      <div className="bg-[#1E3A5F] rounded-2xl p-6 text-white flex flex-col sm:flex-row justify-between gap-4">
        <div>
          <h1 className="text-xl font-black mb-1">
            Welcome back, {user?.name?.split(' ')[0] || 'Vendor'}!
          </h1>
          <p className="text-blue-200 text-sm">
            {vendor.companyName || 'Your Company'} ·{' '}
            {isVerified
              ? <span className="text-emerald-300 font-semibold">✓ KYC Verified — Your products are live</span>
              : isPending
              ? <span className="text-amber-300 font-semibold">⏳ KYC Pending — Submit documents to go live</span>
              : <span className="text-red-300 font-semibold">✗ KYC Not Started</span>}
          </p>
        </div>
        <div className="flex gap-2 flex-shrink-0 items-start">
          <Link href="/dashboard/products/add"
            className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white text-xs font-bold px-4 py-2.5 rounded-xl transition">
            <Plus size={14} /> Add Product
          </Link>
          <Link href="/dashboard/inquiries"
            className="flex items-center gap-2 bg-white/15 hover:bg-white/25 text-white text-xs font-bold px-4 py-2.5 rounded-xl transition border border-white/20">
            View Inquiries
          </Link>
        </div>
      </div>

      {/* KYC warning */}
      {!isVerified && (
        <div className={`rounded-2xl p-4 flex items-start gap-3 ${ isPending ? 'bg-amber-50 border border-amber-200' : 'bg-red-50 border border-red-200'}`}>
          <AlertCircle size={18} className={isPending ? 'text-amber-500 flex-shrink-0 mt-0.5' : 'text-red-500 flex-shrink-0 mt-0.5'} />
          <div>
            <div className={`text-sm font-bold ${ isPending ? 'text-amber-800' : 'text-red-800'}`}>
              {isPending ? 'KYC Verification Pending' : 'Complete KYC to list products'}
            </div>
            <div className={`text-xs mt-0.5 ${ isPending ? 'text-amber-600' : 'text-red-600'}`}>
              {isPending ? 'Your documents are under review. We\'ll notify you once verified.' : 'Submit your business documents to start selling on BharatBridge.'}
            </div>
          </div>
          {!isPending && (
            <Link href="/dashboard/profile" className="ml-auto flex-shrink-0 bg-[#1E3A5F] text-white text-xs font-bold px-3 py-1.5 rounded-xl hover:bg-[#16304F] transition">
              Complete KYC
            </Link>
          )}
        </div>
      )}

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
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

      {/* Recent Inquiries */}
      <div className="bg-white rounded-2xl border border-slate-100 overflow-hidden">
        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100">
          <h3 className="font-bold text-[#1E3A5F] text-sm">Recent Inquiries</h3>
          <Link href="/dashboard/inquiries" className="flex items-center gap-1 text-xs text-orange-500 hover:text-orange-600 font-semibold transition">
            View all <ArrowRight size={12} />
          </Link>
        </div>
        <div className="divide-y divide-slate-50">
          {recent.length === 0 && (
            <div className="px-5 py-10 text-center">
              <MessageSquare size={32} className="text-slate-200 mx-auto mb-3" />
              <div className="text-sm text-slate-400">No inquiries yet</div>
              <div className="text-xs text-slate-300 mt-1">Inquiries from buyers will appear here</div>
            </div>
          )}
          {recent.map((inq) => (
            <Link key={inq._id} href={`/dashboard/inquiries`}
              className="flex items-center gap-3 px-5 py-3 hover:bg-slate-50 transition">
              <div className="w-8 h-8 rounded-xl bg-[#1E3A5F]/10 text-[#1E3A5F] flex items-center justify-center font-bold text-sm flex-shrink-0">
                {inq.buyerName?.charAt(0)}
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-sm font-semibold text-slate-800 truncate">{inq.buyerName}</div>
                <div className="text-xs text-slate-400 truncate">{inq.product?.name} · {inq.buyerCountry}</div>
              </div>
              <span className={`text-xs font-semibold px-2 py-0.5 rounded-lg ${inqBadge(inq.status)}`}>
                {inq.status}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
