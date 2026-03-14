'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import api from '@/lib/api';
import {
  Plus, Package, Edit, Trash2, Eye, EyeOff,
  Search, ChevronRight,
} from 'lucide-react';

export default function VendorProductsPage() {
  const [products, setProducts] = useState([]);
  const [loading,  setLoading]  = useState(true);
  const [search,   setSearch]   = useState('');
  const [deleting, setDeleting] = useState(null);

  const fetch_ = async () => {
    setLoading(true);
    try {
      const { data } = await api.get('/vendors/products');
      setProducts(data.data || []);
    } catch {}
    finally { setLoading(false); }
  };

  useEffect(() => { fetch_(); }, []);

  const handleDelete = async (id) => {
    if (!confirm('Delete this product? This action cannot be undone.')) return;
    setDeleting(id);
    try {
      await api.delete(`/vendors/products/${id}`);
      setProducts((prev) => prev.filter((p) => p._id !== id));
    } catch {}
    finally { setDeleting(null); }
  };

  const handleToggle = async (id, currentStatus) => {
    const next = currentStatus === 'active' ? 'inactive' : 'active';
    try {
      await api.patch(`/vendors/products/${id}`, { status: next });
      setProducts((prev) => prev.map((p) => p._id === id ? { ...p, status: next } : p));
    } catch {}
  };

  const filtered = products.filter((p) =>
    !search || p.name?.toLowerCase().includes(search.toLowerCase())
  );

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
    <div className="space-y-5">

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-black text-[#1E3A5F]">My Products</h1>
          <p className="text-sm text-slate-500 mt-0.5">{products.length} product{products.length !== 1 ? 's' : ''} listed</p>
        </div>
        <Link href="/dashboard/products/add"
          className="inline-flex items-center gap-2 bg-[#1E3A5F] hover:bg-[#16304F] text-white text-sm font-bold px-4 py-2.5 rounded-xl transition">
          <Plus size={16} /> Add Product
        </Link>
      </div>

      {/* Search */}
      <div className="relative">
        <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          type="text"
          placeholder="Search products..."
          className="w-full pl-10 pr-4 py-2.5 text-sm border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1E3A5F]/30 focus:border-[#1E3A5F] transition"
        />
      </div>

      {/* Products list */}
      {filtered.length === 0 ? (
        <div className="bg-white rounded-2xl border border-slate-100 py-16 text-center">
          <Package size={40} className="text-slate-200 mx-auto mb-4" />
          <p className="text-slate-500 font-semibold text-sm">
            {search ? 'No products match your search' : 'No products yet'}
          </p>
          {!search && (
            <Link href="/dashboard/products/add"
              className="mt-4 inline-flex items-center gap-2 bg-[#1E3A5F] text-white text-sm font-bold px-4 py-2.5 rounded-xl hover:bg-[#16304F] transition">
              <Plus size={16} /> Add Your First Product
            </Link>
          )}
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-slate-100 overflow-hidden">
          <div className="divide-y divide-slate-50">
            {filtered.map((p) => (
              <div key={p._id} className="flex items-center gap-4 px-5 py-4 hover:bg-slate-50 transition group">

                {/* Image / Icon */}
                <div className="w-12 h-12 rounded-xl bg-slate-100 flex items-center justify-center flex-shrink-0 overflow-hidden">
                  {p.images?.[0] ? (
                    <img src={p.images[0]} alt={p.name} className="w-full h-full object-cover" />
                  ) : (
                    <Package size={20} className="text-slate-400" />
                  )}
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-semibold text-slate-800 truncate">{p.name}</div>
                  <div className="text-xs text-slate-400 mt-0.5">
                    {p.category && <span className="mr-2">{p.category}</span>}
                    {p.moq && <span>MOQ: {p.moq}</span>}
                  </div>
                </div>

                {/* Price */}
                {p.price && (
                  <div className="text-sm font-bold text-[#1E3A5F] flex-shrink-0 hidden sm:block">
                    ${p.price}
                    {p.unit && <span className="text-slate-400 font-normal text-xs">/{p.unit}</span>}
                  </div>
                )}

                {/* Status badge */}
                <span className={`text-xs font-semibold px-2 py-0.5 rounded-lg flex-shrink-0
                  ${ p.status === 'active' ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-500'}`}>
                  {p.status === 'active' ? 'Active' : 'Inactive'}
                </span>

                {/* Actions */}
                <div className="flex items-center gap-1 flex-shrink-0">
                  <button
                    onClick={() => handleToggle(p._id, p.status)}
                    className="p-2 rounded-xl text-slate-400 hover:text-[#1E3A5F] hover:bg-slate-100 transition"
                    title={p.status === 'active' ? 'Deactivate' : 'Activate'}
                  >
                    {p.status === 'active' ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                  <Link href={`/dashboard/products/${p._id}`}
                    className="p-2 rounded-xl text-slate-400 hover:text-[#1E3A5F] hover:bg-slate-100 transition">
                    <Edit size={16} />
                  </Link>
                  <button
                    onClick={() => handleDelete(p._id)}
                    disabled={deleting === p._id}
                    className="p-2 rounded-xl text-slate-400 hover:text-red-500 hover:bg-red-50 transition disabled:opacity-50"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
