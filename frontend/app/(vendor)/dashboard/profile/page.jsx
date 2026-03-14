'use client';
import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { Save, Building2, Globe, Phone, MapPin, ShieldCheck, User, CheckCircle } from 'lucide-react';
import api from '@/lib/api';
import Spinner from '@/components/ui/Spinner';
import { useAuth } from '@/context/AuthContext';

const PROFILE_FIELDS = [
  'companyName', 'website', 'description', 'contactPhone',
  'address', 'city', 'state', 'pincode', 'gstin', 'iecCode',
];

function completionPercent(data) {
  if (!data) return 0;
  const filled = PROFILE_FIELDS.filter(f => data[f] && String(data[f]).trim() !== '').length;
  return Math.round((filled / PROFILE_FIELDS.length) * 100);
}

export default function VendorProfilePage() {
  const { refreshUser } = useAuth();
  const [vendor,  setVendor]  = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving,  setSaving]  = useState(false);

  const { register, handleSubmit, reset, watch, formState: { errors } } = useForm();
  const watchedValues = watch();
  const completion = completionPercent(watchedValues);

  useEffect(() => {
    api.get('/vendors/profile')
      .then(({ data }) => { setVendor(data.data); reset(data.data); })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const onSubmit = async (data) => {
    setSaving(true);
    try {
      await api.put('/vendors/profile', data);
      toast.success('Profile updated!');
      refreshUser();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Update failed.');
    } finally { setSaving(false); }
  };

  if (loading) return <div className="flex justify-center py-20"><Spinner size="lg" /></div>;

  return (
    <div className="max-w-3xl space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="font-heading font-bold text-xl text-slate-900">Vendor Profile</h1>
          <p className="text-slate-500 text-sm mt-1">Complete your profile to improve visibility to global buyers.</p>
        </div>
        {completion === 100 && (
          <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 px-3 py-1.5 rounded-full">
            <CheckCircle size={13} /> Profile Complete
          </span>
        )}
      </div>

      {/* Completion Bar */}
      <div className="bb-card p-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-semibold text-slate-600">Profile Completion</span>
          <span className={`text-xs font-bold ${
            completion === 100 ? 'text-emerald-600' : completion >= 60 ? 'text-amber-600' : 'text-red-500'
          }`}>{completion}%</span>
        </div>
        <div className="w-full bg-slate-100 rounded-full h-2">
          <div
            className={`h-2 rounded-full transition-all duration-500 ${
              completion === 100 ? 'bg-emerald-500' : completion >= 60 ? 'bg-amber-400' : 'bg-blue-500'
            }`}
            style={{ width: `${completion}%` }}
          />
        </div>
        {completion < 100 && (
          <p className="text-xs text-slate-400 mt-2">
            Fill in all fields to unlock priority listing for global buyers.
          </p>
        )}
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">

        {/* Company Details */}
        <div className="bb-card p-6 space-y-4">
          <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
            <Building2 size={16} className="text-blue-500" />
            <h2 className="font-heading font-bold text-slate-900">Company Details</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="bb-label">Company Name *</label>
              <input
                {...register('companyName', { required: 'Company name is required' })}
                className={`bb-input ${errors.companyName ? 'border-red-400 focus:ring-red-300' : ''}`}
                placeholder="Acme Exports Pvt. Ltd."
              />
              {errors.companyName && <p className="text-xs text-red-500 mt-1">{errors.companyName.message}</p>}
            </div>
            <div>
              <label className="bb-label">Website</label>
              <input {...register('website')} className="bb-input" placeholder="https://yourcompany.com" />
            </div>
          </div>

          <div>
            <label className="bb-label">Company Description</label>
            <textarea
              {...register('description')}
              rows={4}
              className="bb-input resize-none"
              placeholder="Describe your company, products, certifications, and export experience..."
            />
          </div>

          <div>
            <label className="bb-label">Contact Phone</label>
            <div className="relative">
              <Phone size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input {...register('contactPhone')} className="bb-input pl-9" placeholder="+91 98765 43210" />
            </div>
          </div>
        </div>

        {/* Address */}
        <div className="bb-card p-6 space-y-4">
          <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
            <MapPin size={16} className="text-blue-500" />
            <h2 className="font-heading font-bold text-slate-900">Address</h2>
          </div>

          <div>
            <label className="bb-label">Street Address</label>
            <input {...register('address')} className="bb-input" placeholder="123 Export Industrial Area" />
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div>
              <label className="bb-label">City</label>
              <input {...register('city')} className="bb-input" placeholder="Surat" />
            </div>
            <div>
              <label className="bb-label">State</label>
              <input {...register('state')} className="bb-input" placeholder="Gujarat" />
            </div>
            <div>
              <label className="bb-label">Pincode</label>
              <input {...register('pincode')} className="bb-input" placeholder="395001" />
            </div>
            <div>
              <label className="bb-label">Country</label>
              <input {...register('country')} className="bb-input" defaultValue="India" />
            </div>
          </div>
        </div>

        {/* KYC / Export Credentials */}
        <div className="bb-card p-6 space-y-4">
          <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
            <ShieldCheck size={16} className="text-blue-500" />
            <h2 className="font-heading font-bold text-slate-900">KYC / Export Credentials</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="bb-label">GST Number</label>
              <input {...register('gstin')} className="bb-input" placeholder="27XXXXX1234Z1ZX" />
            </div>
            <div>
              <label className="bb-label">IEC Code (Import Export Code)</label>
              <input {...register('iecCode')} className="bb-input" placeholder="ABCDE1234F" />
            </div>
          </div>

          <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 text-sm text-blue-700">
            💡 IEC Code is mandatory for export eligibility. Vendors with verified IEC codes get priority placement.
          </div>
        </div>

        {/* Save Button */}
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={saving}
            className="bb-btn bb-btn-primary btn-shine min-w-[140px] justify-center"
          >
            {saving ? (
              <>
                <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"/>
                </svg>
                Saving...
              </>
            ) : (
              <><Save size={16} /> Save Profile</>
            )}
          </button>
        </div>

      </form>
    </div>
  );
}
