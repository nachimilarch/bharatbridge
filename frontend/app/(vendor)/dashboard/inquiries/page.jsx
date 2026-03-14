'use client';
import { useState, useEffect } from 'react';
import api from '@/lib/api';
import { MessageSquare, Mail, Phone, Globe, Package, ChevronDown } from 'lucide-react';

const STATUS_OPTIONS = ['NEW', 'CONTACTED', 'QUOTED', 'CLOSED', 'REJECTED'];

const statusBadge = (s) => ({
  NEW:       'bg-blue-100 text-blue-700',
  CONTACTED: 'bg-purple-100 text-purple-700',
  QUOTED:    'bg-amber-100 text-amber-700',
  CLOSED:    'bg-emerald-100 text-emerald-700',
  REJECTED:  'bg-red-100 text-red-600',
}[s] || 'bg-slate-100 text-slate-600');

export default function VendorInquiriesPage() {
  const [inquiries,  setInquiries] = useState([]);
  const [loading,   setLoading]   = useState(true);
  const [filter,    setFilter]    = useState('');
  const [updating,  setUpdating]  = useState(null);
  const [expanded,  setExpanded]  = useState(null);

  const fetch_ = async () => {
    setLoading(true);
    try {
      const { data } = await api.get(`/vendors/inquiries${filter ? `?status=${filter}` : ''}`);
      setInquiries(data.data || []);
    } catch {} finally { setLoading(false); }
  };

  useEffect(() => { fetch_(); }, [filter]);

  const updateStatus = async (id, status) => {
    setUpdating(id);
    try {
      await api.patch(`/vendors/inquiries/${id}/status`, { status });
      setInquiries((prev) => prev.map((i) => i.id === id ? { ...i, status } : i));
    } catch {} finally { setUpdating(null); }
  };

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
          <h1 className="text-xl font-black text-[#1E3A5F]">Buyer Inquiries</h1>
          <p className="text-sm text-slate-500 mt-0.5">{inquiries.length} inquir{inquiries.length !== 1 ? 'ies' : 'y'}</p>
        </div>
      </div>

      {/* Filter tabs */}
      <div className="flex gap-2 flex-wrap">
        {['', 'NEW', 'CONTACTED', 'QUOTED', 'CLOSED'].map((s) => (
          <button key={s} onClick={() => setFilter(s)}
            className={`text-xs font-semibold px-3 py-1.5 rounded-xl border transition
              ${ filter === s
                ? 'bg-[#1E3A5F] text-white border-[#1E3A5F]'
                : 'bg-white text-slate-600 border-slate-200 hover:border-[#1E3A5F]/40'}`}>
            {s || 'All'}
          </button>
        ))}
      </div>

      {/* Inquiries list */}
      {inquiries.length === 0 ? (
        <div className="bg-white rounded-2xl border border-slate-100 py-16 text-center">
          <MessageSquare size={40} className="text-slate-200 mx-auto mb-4" />
          <p className="text-slate-500 font-semibold text-sm">No inquiries {filter ? `with status ${filter}` : 'yet'}</p>
        </div>
      ) : (
        <div className="space-y-3">
          {inquiries.map((inq) => (
            <div key={inq._id} className="bg-white rounded-2xl border border-slate-100 overflow-hidden">
              {/* Summary row */}
              <button
                onClick={() => setExpanded(expanded === inq._id ? null : inq._id)}
                className="w-full flex items-center gap-4 px-5 py-4 hover:bg-slate-50 transition text-left"
              >
                <div className="w-10 h-10 rounded-xl bg-[#1E3A5F]/10 text-[#1E3A5F] flex items-center justify-center font-bold text-sm flex-shrink-0">
                  {inq.buyerName?.charAt(0)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-semibold text-slate-800">{inq.buyerName}</div>
                  <div className="text-xs text-slate-400 truncate">
                    {inq.product?.name} · {inq.buyerCountry}
                    {inq.quantity && ` · Qty: ${inq.quantity}`}
                  </div>
                </div>
                <span className={`text-xs font-semibold px-2 py-0.5 rounded-lg flex-shrink-0 ${statusBadge(inq.status)}`}>
                  {inq.status}
                </span>
                <ChevronDown size={16} className={`text-slate-400 flex-shrink-0 transition-transform ${expanded === inq._id ? 'rotate-180' : ''}`} />
              </button>

              {/* Expanded details */}
              {expanded === inq._id && (
                <div className="px-5 pb-5 border-t border-slate-50">
                  <div className="pt-4 grid sm:grid-cols-2 gap-4 mb-4">
                    {inq.buyerEmail && (
                      <div className="flex items-center gap-2 text-sm text-slate-600">
                        <Mail size={14} className="text-slate-400" />
                        <a href={`mailto:${inq.buyerEmail}`} className="hover:text-orange-500 transition">{inq.buyerEmail}</a>
                      </div>
                    )}
                    {inq.buyerPhone && (
                      <div className="flex items-center gap-2 text-sm text-slate-600">
                        <Phone size={14} className="text-slate-400" />
                        <span>{inq.buyerPhone}</span>
                      </div>
                    )}
                    {inq.buyerCompany && (
                      <div className="flex items-center gap-2 text-sm text-slate-600">
                        <Package size={14} className="text-slate-400" />
                        <span>{inq.buyerCompany}</span>
                      </div>
                    )}
                    {inq.buyerCountry && (
                      <div className="flex items-center gap-2 text-sm text-slate-600">
                        <Globe size={14} className="text-slate-400" />
                        <span>{inq.buyerCountry}</span>
                      </div>
                    )}
                  </div>
                  {inq.message && (
                    <div className="bg-slate-50 rounded-xl p-3 text-sm text-slate-600 mb-4">{inq.message}</div>
                  )}
                  {/* Status update */}
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-xs font-bold text-slate-500">Update Status:</span>
                    {STATUS_OPTIONS.map((s) => (
                      <button key={s} onClick={() => updateStatus(inq._id, s)}
                        disabled={updating === inq._id || inq.status === s}
                        className={`text-xs font-semibold px-2.5 py-1 rounded-lg border transition disabled:opacity-40
                          ${ inq.status === s
                            ? statusBadge(s) + ' border-transparent'
                            : 'bg-white text-slate-600 border-slate-200 hover:border-[#1E3A5F]/40'}`}>
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
