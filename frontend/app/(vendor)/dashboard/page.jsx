'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import api from '@/lib/api';
import {
  Package, MessageSquare, TrendingUp, Plus,
  ArrowRight, Eye, Clock, CheckCircle, AlertCircle,
  BarChart3, ShoppingBag,
} from 'lucide-react';

export default function VendorDashboardPage() {
  const [stats, setStats]     = useState(null);
  const [loading, setLoading] = useState(true);
  const [recent, setRecent]   = useState([]);

  useEffect(() => {
    const load = async () => {
      try {
        const [sRes, iRes] = await Promise.all([
          api.get('/vendors/stats'),
          api.get('/vendors/inquiries?limit=5'),
        ]);
        setStats(sRes.data);
        setRecent(iRes.data?.data || []);
      } catch {
        setStats({ products: 0, inquiries: 0, views: 0, revenue: 0 });
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const statCards = [
    {
      label:   'Total Products',
      value:   stats?.products ?? '—',
      icon:    Package,
      color:   'bg-blue-50 text-blue-600',
      href:    '/dashboard/products',
    },
    {
      label:   'Active Inquiries',
      value:   stats?.inquiries ?? '—',
      icon:    MessageSquare,
      color:   'bg-orange-50 text-orange-600',
      href:    '/dashboard/inquiries',
    },
    {
      label:   'Profile Views',
      value:   stats?.views ?? '—',
      icon:    Eye,
      color:   'bg-purple-50 text-purple-600',
      href:    '/dashboard/profile',
    },
    {
      label:   'Est. Revenue',
      value:   stats?.revenue ? `$${stats.revenue.toLocaleString()}` : '—',
      icon:    TrendingUp,
      color:   'bg-emerald-50 text-emerald-600',
      href:    '/dashboard/products',
    },
  ];

  const statusColor = (s) => ({
    NEW:        'bg-blue-100 text-blue-700',
    CONTACTED:  'bg-purple-100 text-purple-700',
    QUOTED:     'bg-amber-100 text-amber-700',
    CLOSED:     'bg-emerald-100 text-emerald-700',
    REJECTED:   'bg-red-100 text-red-600',
  }[s] || 'bg-slate-100 text-slate-600');

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

  return (
    <div className="space-y-6">

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-black text-[#1E3A5F]">Dashboard</h1>
          <p className="text-sm text-slate-500 mt-0.5">Welcome back! Here&apos;s what&apos;s happening.</p>
        </div>
        <Link href="/dashboard/products/add"
          className="inline-flex items-center gap-2 bg-[#1E3A5F] text-white text-sm font-bold px-4 py-2.5 rounded-xl hover:bg-[#16304f] transition">
          <Plus size={16} /> Add Product
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map((card) => (
          <Link key={card.label} href={card.href}
            className="bb-card p-5 hover:shadow-md transition group">
            <div className="flex items-start justify-between mb-3">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${card.color}`}>
                <card.icon size={20} />
              </div>
              <ArrowRight size={14} className="text-slate-300 group-hover:text-slate-500 transition mt-1" />
            </div>
            <p className="text-2xl font-black text-[#1E3A5F]">{card.value}</p>
            <p className="text-xs text-slate-500 mt-0.5">{card.label}</p>
          </Link>
        ))}
      </div>

      {/* Quick Actions + Recent Inquiries */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* Quick Actions */}
        <div className="bb-card p-5">
          <h2 className="text-sm font-black text-[#1E3A5F] mb-4 flex items-center gap-2">
            <BarChart3 size={16} /> Quick Actions
          </h2>
          <div className="space-y-2">
            {[
              { label: 'Add New Product',      href: '/dashboard/products/add',  icon: Plus,          color: 'text-blue-600' },
              { label: 'View All Products',    href: '/dashboard/products',       icon: ShoppingBag,   color: 'text-slate-600' },
              { label: 'Check Inquiries',      href: '/dashboard/inquiries',      icon: MessageSquare, color: 'text-orange-600' },
              { label: 'Update Profile',       href: '/dashboard/profile',        icon: CheckCircle,   color: 'text-emerald-600' },
            ].map((a) => (
              <Link key={a.label} href={a.href}
                className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-slate-50 transition group">
                <a.icon size={16} className={a.color} />
                <span className="text-sm text-slate-700 group-hover:text-[#1E3A5F] font-medium">{a.label}</span>
                <ArrowRight size={12} className="ml-auto text-slate-300 group-hover:text-slate-500" />
              </Link>
            ))}
          </div>
        </div>

        {/* Recent Inquiries */}
        <div className="bb-card p-5 lg:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-black text-[#1E3A5F] flex items-center gap-2">
              <Clock size={16} /> Recent Inquiries
            </h2>
            <Link href="/dashboard/inquiries" className="text-xs text-orange-600 hover:underline font-bold">
              View all
            </Link>
          </div>
          {recent.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-10 gap-2">
              <AlertCircle size={32} className="text-slate-200" />
              <p className="text-sm text-slate-400">No inquiries yet</p>
              <p className="text-xs text-slate-300">New buyer inquiries will appear here</p>
            </div>
          ) : (
            <div className="space-y-3">
              {recent.map((inq) => (
                <div key={inq._id} className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl">
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-bold text-[#1E3A5F] truncate">
                      {inq.buyerName || inq.buyer?.companyName || 'Buyer'}
                    </p>
                    <p className="text-xs text-slate-500 truncate">
                      {inq.product?.name || 'Product inquiry'}
                    </p>
                  </div>
                  <span className={`text-[10px] font-bold px-2 py-1 rounded-full ${statusColor(inq.status)}`}>
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
