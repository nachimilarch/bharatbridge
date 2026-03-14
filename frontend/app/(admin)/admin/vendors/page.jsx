'use client';
import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import api from '@/lib/api';
import toast from 'react-hot-toast';
import Spinner from '@/components/ui/Spinner';
import { CheckCircle, XCircle, Eye, Search, Trash2 } from 'lucide-react';

export default function AdminVendorsPage() {
  const params  = useSearchParams();
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
        <div className="flex gap-2 flex-wrap items-center">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={14} />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search vendors..."
              className="bb-input pl-9 py-2 text-xs w-44"
            />
          </div>
          {/* Filter tabs */}
          {[['', 'All'], ['pending', 'Pending KYC'], ['approved', 'Approved'], ['rejected', 'Rejected']].map(([v, l]) => (
            <button key={v} onClick={() => setFilter(v)}
              className={`text-xs font-semibold px-3 py-2 rounded-lg border transition-all ${
                filter === v
                  ? 'bg-blue-700 text-white border-blue-700'
                  : 'bg-white text-slate-600 border-slate-200 hover:border-blue-400'
              }`}>
              {l}
            </button>
          ))}
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center py-20"><Spinner size="lg" /></div>
      ) : (
        <div className="bb-table-wrap">
          <table className="bb-table">
            <thead>
              <tr>
                <th>Company</th>
                <th>Contact</th>
                <th>Products</th>
                <th>KYC Status</th>
                <th>Joined</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {vendors.length === 0 ? (
                <tr><td colSpan={6} className="text-center py-12 text-slate-400">No vendors found.</td></tr>
              ) : vendors.map((v) => (
                <tr key={v.id}>
                  <td>
                    <div className="font-semibold text-slate-900">{v.companyName}</div>
                    <div className="text-slate-400 text-xs">{v.city && `${v.city}, `}{v.state}</div>
                  </td>
                  <td>
                    <div className="text-slate-700 text-sm">{v.user?.name}</div>
                    <div className="text-slate-400 text-xs">{v.user?.email}</div>
                  </td>
                  <td>
                    <span className="font-bold text-slate-900">{v._count?.products || 0}</span>
                    <span className="text-slate-400 text-xs ml-1">products</span>
                  </td>
                  <td>
                    <span className={`bb-badge text-xs ${
                      v.kycStatus === 'VERIFIED'  ? 'bb-badge-verified' :
                      v.kycStatus === 'PENDING'   ? 'bb-badge-featured' :
                      v.kycStatus === 'REJECTED'  ? 'bb-badge-hot' :
                      'bb-badge-neutral'
                    }`}>{v.kycStatus}</span>
                  </td>
                  <td className="text-slate-500 text-xs">
                    {new Date(v.user?.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: '2-digit' })}
                  </td>
                  <td>
                    <div className="flex items-center gap-1.5">
                      {v.kycStatus !== 'VERIFIED' && (
                        <button onClick={() => approve(v.id)} disabled={!!acting}
                          className="p-1.5 rounded-lg bg-emerald-50 text-emerald-600 hover:bg-emerald-100 transition-colors"
                          title="Approve">
                          {acting === v.id + '_approve'
                            ? <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"/></svg>
                            : <CheckCircle size={16} />}
                        </button>
                      )}
                      {v.kycStatus !== 'REJECTED' && (
                        <button onClick={() => reject(v.id)} disabled={!!acting}
                          className="p-1.5 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 transition-colors"
                          title="Reject">
                          <XCircle size={16} />
                        </button>
                      )}
                      <button onClick={() => remove(v.id)}
                        className="p-1.5 rounded-lg bg-slate-50 text-slate-500 hover:bg-red-50 hover:text-red-600 transition-colors"
                        title="Delete">
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
