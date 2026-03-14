'use client';
import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { Save, Upload } from 'lucide-react';
import api from '@/lib/api';
import Spinner from '@/components/ui/Spinner';
import { useAuth } from '@/context/AuthContext';

export default function VendorProfilePage() {
  const { refreshUser } = useAuth();
  const [vendor,   setVendor]   = useState(null);
  const [loading,  setLoading]  = useState(true);
  const [saving,   setSaving]   = useState(false);

  const { register, handleSubmit, reset, formState: { errors } } = useForm();

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
      <div>
        <h1 className="font-heading font-bold text-xl text-slate-900">Vendor Profile</h1>
        <p className="text-slate-500 text-sm mt-1">Complete your profile to improve visibility to global buyers.</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">

        {/* Company Details */}
        <div className="bb-card p-6 space-y-4">
          <h2 className="font-heading font-bold text-slate-900 border-b border-slate-100 pb-3">Company Details</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="bb-label">Company Name *</label>
              <input {...register('companyName', { required: true })} className="bb-input" placeholder="Acme Exports Pvt. Ltd." />
            </div>
            <div>
              <label className="bb-label">Website</label>
              <input {...register('website')} className="bb-input" placeholder="https://yourcompany.com" />
            </div>
          </div>

          <div>
            <label className="bb-label">Company Description</label>
            <textarea {...register('description')} rows={4} className="bb-input resize-none"
              placeholder="Describe your company, products, certifications, and export experience..." />
          </div>

          <div>
            <label className="bb-label">Contact Phone</label>
            <input {...register('contactPhone')} className="bb-input" placeholder="+91 98765 43210" />
          </div>
        </div>

        {/* Address */}
        <div className="bb-card p-6 space-y-4">
          <h2 className="font-heading font-bold text-slate-900 border-b border-slate-100 pb-3">Address</h2>
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

        {/* KYC Details */}
        <div className="bb-card p-6 space-y-4">
          <h2 className="font-heading font-bold text-slate-900 border-b border-slate-100 pb-3">
            KYC / Export Credentials
          </h2>
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

        <button type="submit" disabled={saving} className="bb-btn bb-btn-primary btn-shine">
          {saving ? (
            <><svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"/></svg> Saving...</>
          ) : (
            <><Save size={16} /> Save Profile</>
          )}
        </button>
      </form>
    </div>
  );
}
