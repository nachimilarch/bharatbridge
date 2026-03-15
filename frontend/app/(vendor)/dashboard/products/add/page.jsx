'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
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

export default function AddProductPage() {
  const router = useRouter();
  const [saving, setSaving] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = async (data) => {
    setSaving(true);
    try {
      const payload = {
        ...data,
        minOrderQty: Number(data.minOrderQty) || 1,
        price:       data.price ? Number(data.price) : undefined,
      };
      await api.post('/vendors/products', payload);
      toast.success('Product added successfully!');
      router.push('/dashboard/products');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to add product.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="max-w-3xl space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <Link href="/dashboard/products"
          className="w-8 h-8 rounded-xl bg-white border border-slate-200 flex items-center justify-center hover:bg-slate-50 transition">
          <ArrowLeft size={16} className="text-slate-500" />
        </Link>
        <div>
          <h1 className="font-heading font-bold text-xl text-slate-900">Add New Product</h1>
          <p className="text-slate-500 text-sm mt-0.5">Fill in the details to list your product for global buyers.</p>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">

        {/* Basic Info */}
        <div className="bb-card p-6 space-y-4">
          <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
            <Package size={16} className="text-blue-500" />
            <h2 className="font-heading font-bold text-slate-900">Product Information</h2>
          </div>

          <div>
            <label className="bb-label">Product Name *</label>
            <input
              {...register('name', { required: 'Product name is required' })}
              className={`bb-input ${errors.name ? 'border-red-400' : ''}`}
              placeholder="e.g. Organic Basmati Rice 1121"
            />
            {errors.name && <p className="text-xs text-red-500 mt-1">{errors.name.message}</p>}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="bb-label">Category *</label>
              <select
                {...register('category', { required: 'Category is required' })}
                className={`bb-input ${errors.category ? 'border-red-400' : ''}`}
              >
                <option value="">Select a category</option>
                {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
              {errors.category && <p className="text-xs text-red-500 mt-1">{errors.category.message}</p>}
            </div>
            <div>
              <label className="bb-label">HSN Code</label>
              <input {...register('hsnCode')} className="bb-input" placeholder="e.g. 1006" />
            </div>
          </div>

          <div>
            <label className="bb-label">Description *</label>
            <textarea
              {...register('description', { required: 'Description is required' })}
              rows={4}
              className={`bb-input resize-none ${errors.description ? 'border-red-400' : ''}`}
              placeholder="Describe your product: quality, grade, certifications, packaging..."
            />
            {errors.description && <p className="text-xs text-red-500 mt-1">{errors.description.message}</p>}
          </div>
        </div>

        {/* Pricing & MOQ */}
        <div className="bb-card p-6 space-y-4">
          <h2 className="font-heading font-bold text-slate-900 border-b border-slate-100 pb-3">Pricing &amp; Order Details</h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="bb-label">Price (USD)</label>
              <input {...register('price')} type="number" step="0.01" min="0" className="bb-input" placeholder="0.00" />
            </div>
            <div>
              <label className="bb-label">Price Unit</label>
              <input {...register('priceUnit')} className="bb-input" placeholder="per kg / per piece / per MT" />
            </div>
            <div>
              <label className="bb-label">Min. Order Qty *</label>
              <input
                {...register('minOrderQty', { required: true, min: 1 })}
                type="number" min="1"
                className={`bb-input ${errors.minOrderQty ? 'border-red-400' : ''}`}
                placeholder="100"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="bb-label">MOQ Unit</label>
              <input {...register('moqUnit')} className="bb-input" placeholder="kg / pieces / MT / boxes" />
            </div>
            <div>
              <label className="bb-label">Lead Time</label>
              <input {...register('leadTime')} className="bb-input" placeholder="e.g. 7–10 days" />
            </div>
          </div>
        </div>

        {/* Certifications */}
        <div className="bb-card p-6 space-y-4">
          <h2 className="font-heading font-bold text-slate-900 border-b border-slate-100 pb-3">Certifications &amp; Tags</h2>
          <div>
            <label className="bb-label">Certifications</label>
            <input {...register('certifications')} className="bb-input" placeholder="FSSAI, ISO 9001, Organic, Halal (comma-separated)" />
          </div>
          <div>
            <label className="bb-label">Tags</label>
            <input {...register('tags')} className="bb-input" placeholder="basmati, organic, rice, export (comma-separated)" />
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-between">
          <Link href="/dashboard/products" className="bb-btn bb-btn-secondary">
            Cancel
          </Link>
          <button type="submit" disabled={saving} className="bb-btn bb-btn-primary btn-shine min-w-[140px] justify-center">
            {saving ? (
              <><svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"/></svg> Saving...</>
            ) : (
              <><Save size={16} /> Add Product</>
            )}
          </button>
        </div>

      </form>
    </div>
  );
}
