'use client';
import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { Save, ArrowLeft, Package } from 'lucide-react';
import Link from 'next/link';
import api from '@/lib/api';

const CATEGORIES = [
  'Agriculture & Food', 'Textiles & Apparel', 'Chemicals & Pharma',
  'Engineering & Metals', 'Gems & Jewellery', 'Handicrafts & Furniture',
  'Electronics & IT', 'Leather & Footwear', 'Plastics & Rubber', 'Other',
];

export default function EditProductPage() {
  const router   = useRouter();
  const { id }   = useParams();
  const [saving,   setSaving]   = useState(false);
  const [loading,  setLoading]  = useState(true);

  const { register, handleSubmit, reset, formState: { errors } } = useForm();

  useEffect(() => {
    if (!id) return;
    api.get(`/vendors/products/${id}`)
      .then((r) => { reset(r.data); })
      .catch(() => { toast.error('Failed to load product.'); router.push('/dashboard/products'); })
      .finally(() => setLoading(false));
  }, [id]);

  const onSubmit = async (data) => {
    setSaving(true);
    try {
      const payload = {
        ...data,
        minOrderQty: Number(data.minOrderQty) || 1,
        price:       data.price ? Number(data.price) : undefined,
      };
      await api.put(`/vendors/products/${id}`, payload);
      toast.success('Product updated successfully!');
      router.push('/dashboard/products');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to update product.');
    } finally {
      setSaving(false);
    }
  };

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
    <div className="max-w-3xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <Link href="/dashboard/products"
          className="w-9 h-9 rounded-xl border border-slate-200 flex items-center justify-center hover:bg-slate-50 transition">
          <ArrowLeft size={18} className="text-slate-500" />
        </Link>
        <div>
          <h1 className="text-xl font-black text-[#1E3A5F]">Edit Product</h1>
          <p className="text-sm text-slate-500">Update your product listing</p>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">

        {/* Basic Info */}
        <div className="bb-card p-6 space-y-4">
          <h2 className="text-sm font-black text-[#1E3A5F] flex items-center gap-2 pb-3 border-b border-slate-100">
            <Package size={16} /> Basic Information
          </h2>

          <div>
            <label className="bb-label">Product Name *</label>
            <input {...register('name', { required: 'Product name is required' })}
              className="bb-input" placeholder="e.g. Organic Basmati Rice" />
            {errors.name && <p className="bb-error">{errors.name.message}</p>}
          </div>

          <div>
            <label className="bb-label">Category *</label>
            <select {...register('category', { required: 'Category is required' })} className="bb-input">
              <option value="">Select a category</option>
              {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
            </select>
            {errors.category && <p className="bb-error">{errors.category.message}</p>}
          </div>

          <div>
            <label className="bb-label">Description *</label>
            <textarea {...register('description', { required: 'Description is required' })}
              rows={4} className="bb-input resize-none"
              placeholder="Describe your product, quality, origin..." />
            {errors.description && <p className="bb-error">{errors.description.message}</p>}
          </div>
        </div>

        {/* Pricing & MOQ */}
        <div className="bb-card p-6 space-y-4">
          <h2 className="text-sm font-black text-[#1E3A5F] pb-3 border-b border-slate-100">Pricing & Order</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="bb-label">Price (USD)</label>
              <input {...register('price')} type="number" step="0.01" min="0"
                className="bb-input" placeholder="0.00" />
            </div>
            <div>
              <label className="bb-label">Min. Order Qty</label>
              <input {...register('minOrderQty')} type="number" min="1"
                className="bb-input" placeholder="e.g. 100" />
            </div>
            <div>
              <label className="bb-label">Unit</label>
              <input {...register('unit')} className="bb-input" placeholder="kg, pcs, MT" />
            </div>
          </div>
          <div>
            <label className="bb-label">Lead Time</label>
            <input {...register('leadTime')} className="bb-input" placeholder="e.g. 7-10 days" />
          </div>
        </div>

        {/* Additional */}
        <div className="bb-card p-6 space-y-4">
          <h2 className="text-sm font-black text-[#1E3A5F] pb-3 border-b border-slate-100">Additional Details</h2>
          <div>
            <label className="bb-label">Certifications</label>
            <input {...register('certifications')} className="bb-input"
              placeholder="FSSAI, ISO 9001, Organic..." />
          </div>
          <div>
            <label className="bb-label">Tags</label>
            <input {...register('tags')} className="bb-input"
              placeholder="basmati, organic, rice, export (comma separated)" />
          </div>
        </div>

        {/* Submit */}
        <div className="flex justify-end">
          <button type="submit" disabled={saving}
            className="bb-btn bb-btn-primary btn-shine min-w-[140px] justify-center">
            {saving ? (
              <><svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" /></svg> Saving...</>
            ) : (
              <><Save size={16} /> Update Product</>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
