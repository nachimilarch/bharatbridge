'use client';
import { useState, useEffect } from 'react';
import api from '@/lib/api';
import Spinner from '@/components/ui/Spinner';
import { MessageSquare, Mail, Phone, Globe, Package } from 'lucide-react';

const STATUS_OPTIONS = ['NEW', 'CONTACTED', 'QUOTED', 'CLOSED', 'REJECTED'];

export default function VendorInquiriesPage() {
  const [inquiries, setInquiries] = useState([]);
  const [loading,   setLoading]   = useState(true);
  const [filter,    setFilter]    = useState('');
  const [updating,  setUpdating]  = useState(null);

  const fetch = async () => {
    setLoading(true);
    try {
      const { data } = await api.get(`/vendors/inquiries${filter ? `?status=${filter}` : ''}`);
      setInquiries(data.data || []);
    } catch {} finally { setLoading(false); }
  };

  useEffect(() => { fetch(); }, [filter]);

  const updateStatus = async (id, status) => {
    setUpdating(id);
    try {
      await api.patch(`/vendors/inquiries/${id}/status`, { status });
      setInquiries((prev) => prev.map((i) => i.id === id ? { ...i, status } : i));
    } catch {} finally { setUpdating(null); }
  };

  const statusColor = (s) => ({
    NEW:       'bg-red-100 text-red-700',
    CONTACTED: 'bg-blue-100 text-blue-700',
    QUOTED:    'bg-amber-100 text-amber-700',
    CLOSED:    'bg-emerald-100 text-emerald-700',
    REJECTED:  'bg-slate-100 text-slate-500',
  }[s] || 'bg-gray-100 text-gray-600');

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-heading font-bold text-xl text-slate-900">Buyer Inquiries</h1>
          <p className="text-slate-500 text-sm mt-0.5">{inquiries.length} inquiries</p>
        </div>
        {/* Filter */}
        <div className="flex gap-2 flex-wrap">
          {['', 'NEW', 'CONTACTED', 'QUOTED', 'CLOSED'].map((s) => (
            <button key={s} onClick={() => setFilter(s)}
              className={`text-xs font-semibold px-3 py-1.5 rounded-lg border transition-all ${
                filter === s
                  ? 'bg-blue-700 text-white border-blue-700'
                  : 'bg-white text-slate-600 border-slate-200 hover:border-blue-400'
              }`}>
              {s || 'All'}
            </button>
          ))}
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center py-20"><Spinner size="lg" /></div>
      ) : inquiries.length === 0 ? (
        <div className="bb-card py-16 text-center">
          <MessageSquare className="text-slate-200 mx-auto mb-3" size={48} />
          <p className="text-slate-400 font-medium">No inquiries found.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {inquiries.map((inq) => (
            <div key={inq.id} className="bb-card p-5">
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap mb-2">
                    <span className={`bb-badge text-xs ${statusColor(inq.status)}`}>{inq.status}</span>
                    {inq.product && (
                      <span className="bb-badge bb-badge-new text-xs">
                        <Package size={10} /> {inq.product.name}
                      </span>
                    )}
                    <span className="text-slate-400 text-xs">
                      {new Date(inq.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}
                    </span>
                  </div>

                  <h3 className="font-heading font-bold text-slate-900 text-base mb-1">
                    {inq.buyerName}
                    {inq.buyerCompany && <span className="font-normal text-slate-500"> · {inq.buyerCompany}</span>}
                  </h3>

                  <div className="flex flex-wrap gap-3 text-xs text-slate-500 mb-3">
                    <span className="flex items-center gap-1"><Mail size={12} /> {inq.buyerEmail}</span>
                    {inq.buyerPhone && <span className="flex items-center gap-1"><Phone size={12} /> {inq.buyerPhone}</span>}
                    <span className="flex items-center gap-1"><Globe size={12} /> {inq.buyerCountry}</span>
                    {inq.quantity && <span className="flex items-center gap-1"><Package size={12} /> Qty: {inq.quantity}</span>}
                  </div>

                  {inq.message && (
                    <p className="text-slate-600 text-sm bg-slate-50 rounded-lg p-3 leading-relaxed">
                      {inq.message}
                    </p>
                  )}
                </div>

                {/* Status updater */}
                <div className="flex-shrink-0">
                  <label className="text-xs font-semibold text-slate-500 block mb-1">Update Status</label>
                  <select
                    value={inq.status}
                    onChange={(e) => updateStatus(inq.id, e.target.value)}
                    disabled={updating === inq.id}
                    className="bb-select text-xs w-36"
                  >
                    {STATUS_OPTIONS.map((s) => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
