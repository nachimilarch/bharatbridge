'use client';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import api from '@/lib/api';

const schema = z.object({
  buyerName:    z.string().min(2, 'Name is required'),
  buyerCompany: z.string().optional(),
  buyerEmail:   z.string().email('Valid email required'),
  buyerPhone:   z.string().optional(),
  buyerCountry: z.string().min(1, 'Country is required'),
  quantity:     z.string().optional(),
  message:      z.string().optional(),
});

const inputCls = 'w-full px-4 py-2.5 text-sm border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1E3A5F]/30 focus:border-[#1E3A5F] transition placeholder-slate-400';
const errorCls = 'text-red-500 text-xs mt-1';

export default function InquiryForm({ productId, productName }) {
  const [submitted, setSubmitted] = useState(false);

  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data) => {
    try {
      await api.post('/inquiries', {
        ...data,
        productId,
        quantity: data.quantity ? parseInt(data.quantity) : undefined,
      });
      setSubmitted(true);
    } catch {
      alert('Failed to submit. Please try again.');
    }
  };

  if (submitted) {
    return (
      <div className="text-center py-12 px-6">
        <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="text-xl font-bold text-[#1E3A5F] mb-2">Inquiry Sent!</h3>
        <p className="text-slate-500 text-sm">
          Thank you! The exporter will contact you within 24 hours.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {productName && (
        <div className="bg-blue-50 border border-blue-100 rounded-xl px-4 py-3 flex items-center gap-3">
          <svg className="w-5 h-5 text-[#1E3A5F] flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"/></svg>
          <div>
            <p className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">Inquiring about</p>
            <p className="text-sm font-semibold text-[#1E3A5F]">{productName}</p>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-bold text-slate-600 mb-1.5">Full Name <span className="text-red-500">*</span></label>
          <input {...register('buyerName')} placeholder="John Smith" className={inputCls} />
          {errors.buyerName && <p className={errorCls}>{errors.buyerName.message}</p>}
        </div>
        <div>
          <label className="block text-xs font-bold text-slate-600 mb-1.5">Company Name</label>
          <input {...register('buyerCompany')} placeholder="Your company" className={inputCls} />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-bold text-slate-600 mb-1.5">Business Email <span className="text-red-500">*</span></label>
          <input {...register('buyerEmail')} type="email" placeholder="you@company.com" className={inputCls} />
          {errors.buyerEmail && <p className={errorCls}>{errors.buyerEmail.message}</p>}
        </div>
        <div>
          <label className="block text-xs font-bold text-slate-600 mb-1.5">Phone / WhatsApp</label>
          <input {...register('buyerPhone')} placeholder="+1 555 000 0000" className={inputCls} />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-bold text-slate-600 mb-1.5">Country <span className="text-red-500">*</span></label>
          <input {...register('buyerCountry')} placeholder="e.g. United States" className={inputCls} />
          {errors.buyerCountry && <p className={errorCls}>{errors.buyerCountry.message}</p>}
        </div>
        <div>
          <label className="block text-xs font-bold text-slate-600 mb-1.5">Quantity Required</label>
          <input {...register('quantity')} type="number" min="1" placeholder="e.g. 500 kg" className={inputCls} />
        </div>
      </div>

      <div>
        <label className="block text-xs font-bold text-slate-600 mb-1.5">Message / Specifications</label>
        <textarea
          {...register('message')}
          rows={4}
          placeholder="Describe your requirements, preferred packaging, certifications needed, delivery timeline..."
          className={`${inputCls} resize-none`}
        />
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-orange-500 hover:bg-orange-600 disabled:opacity-60 text-white font-bold py-3 px-6 rounded-xl transition-colors flex items-center justify-center gap-2"
      >
        {isSubmitting ? (
          <>
            <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/></svg>
            Sending...
          </>
        ) : (
          <>
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"/></svg>
            Send Inquiry
          </>
        )}
      </button>

      <p className="text-center text-xs text-slate-400">
        By submitting, you agree to our{' '}
        <a href="/privacy" className="underline hover:text-slate-600">Privacy Policy</a>.
        Your information is shared only with the exporter.
      </p>
    </form>
  );
}
