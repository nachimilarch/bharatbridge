'use client';
import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import api from '@/lib/api';
import toast from 'react-hot-toast';
import Spinner from '@/components/ui/Spinner';
import { CheckCircle, XCircle, Eye, Search, Trash2 } from 'lucide-react';

function AdminVendorsContent() {
  const params   = useSearchParams();
  const [vendors,  setVendors]  = useState([]);
  const [loading,  setLoading]  = useState(true);
  const [filter,   setFilter]   = useState(params.get('status') || '');
  const [search,   setSearch]   = useState('');
  const [acting,   setActing]   = useState(null);

  const fetchVendors = async () => {
    setLoading(true);
    try {
      const q = new URLSearchParams();
      if (filter) q.set('status', filter);
      if (search) q.set('search', search);
      const { data } = await api.get(`/admin/vendors?${q.toString()}`);
      setVendors(data.data || []);
    } catch {} finally { setLoading(false); }
  };

  useEffect(() => { fetchVendors(); }, [filter, search]);

  const approve = async (id) => {
    setActing(id + '_approve');
    try {
      await api.patch(`/admin/vendors/${id}/approve`);
      toast.success('Vendor approved!');
      setVendors((v) => v.map((x) => x.id === id ? { ...x, isApproved: true, kycStatus: 'VERIFIED' } : x));
    } catch { toast.error('Failed to approve.'); } finally { setActing(null); }
  };

  const reject = async (id) => {
    if (!confirm('Reject this vendor?')) return;
    setActing(id + '_reject');
    try {
      await api.patch(`/admin/vendors/${id}/reject`);
      toast.success('Vendor rejected.');
      setVendors((v) => v.map((x) => x.id === id ? { ...x, isApproved: false, kycStatus: 'REJECTED' } : x));
    } catch { toast.error('Failed.'); } finally { setActing(null); }
  };

  const remove = async (id) => {
    if (!confirm('Permanently delete this vendor? This cannot be undone.')) return;
    try {
      await api.delete(`/admin/vendors/${id}`);
      toast.success('Vendor deleted.');
      setVendors((v) => v.filter((x) => x.id !== id));
    } catch { toast.error('Failed to delete.'); }
  };

  return (
    <div className="space-y-5">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-heading font-bold text-xl text-slate-900">Vendor Management</h1>
          <p className="text-slate-500 text-sm mt-0.5">{vendors.length} vendors</p>
        </div>
        {/* Search */}
        <div className="relative">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input value={search} onChange={(e) => setSearch(e.target.value)}
            placeholder="Search vendors..." className="bb-input pl-9 py-2 text-xs w-44" />
        </div>
      </div>

      {/* Filter tabs */}
      <div className="flex gap-2 flex-wrap">
        {[['', 'All'], ['pending', 'Pending KYC'], ['approved', 'Approved'], ['rejected', 'Rejected']].map(([v, l]) => (
          <button key={v} onClick={() => setFilter(v)}
            className={`text-xs font-semibold px-3 py-2 rounded-lg border transition-all ${
              filter === v ? 'bg-blue-700 text-white border-blue-700' : 'bg-white text-slate-600 border-slate-200 hover:border-blue-400'
            }`}>
            {l}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="flex justify-center py-12"><Spinner /></div>
      ) : (
        <div className="bb-card overflow-x-auto">
          {vendors.length === 0 ? (
            <div className="flex items-center justify-center py-16 text-slate-400 text-sm">No vendors found</div>
          ) : (
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-100 text-xs text-slate-500 font-semibold">
                  <th className="text-left px-4 py-3">Company</th>
                  <th className="text-left px-4 py-3">Contact</th>
                  <th className="text-left px-4 py-3">Products</th>
                  <th className="text-left px-4 py-3">KYC Status</th>
                  <th className="text-left px-4 py-3">Joined</th>
                  <th className="text-left px-4 py-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {vendors.map((v) => (
                  <tr key={v.id} className="border-b border-slate-50 hover:bg-slate-50 transition">
                    <td className="px-4 py-3 font-semibold text-slate-800">
                      {v.companyName}<br />
                      <span className="text-xs text-slate-400 font-normal">{v.city && `${v.city}, `}{v.state}</span>
                    </td>
                    <td className="px-4 py-3 text-slate-600">
                      {v.user?.name}<br />
                      <span className="text-xs text-slate-400">{v.user?.email}</span>
                    </td>
                    <td className="px-4 py-3 text-slate-600">{v._count?.products ?? 0} products</td>
                    <td className="px-4 py-3">
                      <span className={`text-[10px] font-bold px-2 py-1 rounded-full ${
                        v.kycStatus === 'VERIFIED'  ? 'bg-emerald-100 text-emerald-700' :
                        v.kycStatus === 'REJECTED'  ? 'bg-red-100 text-red-600' :
                        'bg-amber-100 text-amber-700'
                      }`}>{v.kycStatus}</span>
                    </td>
                    <td className="px-4 py-3 text-slate-500 text-xs">
                      {new Date(v.user?.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: '2-digit' })}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-1">
                        {v.kycStatus !== 'VERIFIED' && (
                          <button onClick={() => approve(v.id)} disabled={!!acting}
                            className="p-1.5 rounded-lg bg-emerald-50 text-emerald-600 hover:bg-emerald-100 transition-colors" title="Approve">
                            {acting === v.id + '_approve' ? <Spinner size="xs" /> : <CheckCircle size={14} />}
                          </button>
                        )}
                        {v.kycStatus !== 'REJECTED' && (
                          <button onClick={() => reject(v.id)} disabled={!!acting}
                            className="p-1.5 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 transition-colors" title="Reject">
                            <XCircle size={14} />
                          </button>
                        )}
                        <button onClick={() => remove(v.id)}
                          className="p-1.5 rounded-lg bg-slate-50 text-slate-500 hover:bg-red-50 hover:text-red-600 transition-colors" title="Delete">
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}
    </div>
  );
}

export default function AdminVendorsPage() {
  return (
    <Suspense fallback={
      <div className="flex justify-center py-12"><Spinner /></div>
    }>
      <AdminVendorsContent />
    </Suspense>
  );
}
