'use client';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Send, CheckCircle } from 'lucide-react';
import toast from 'react-hot-toast';
import api from '@/lib/api';

const schema = z.object({
  buyerName: z.string().min(2, 'Name is required'),
  buyerCompany: z.string().optional(),
  buyerEmail: z.string().email('Valid email required'),
  buyerPhone: z.string().optional(),
  buyerCountry: z.string().min(1, 'Country is required'),
  quantity: z.string().optional(),
  message: z.string().optional(),
});

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
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to submit inquiry. Please try again.');
    }
  };

  if (submitted) {
    return (
      <div className="bg-white border border-green-200 rounded-xl p-6 text-center">
        <CheckCircle className="text-green-500 mx-auto mb-3" size={40} />
        <h3 className="font-semibold text-gray-900 mb-2">Inquiry Sent!</h3>
        <p className="text-gray-600 text-sm">
          Thank you! We've received your inquiry for <strong>{productName}</strong>.
          Our team will connect you with the vendor within 24–48 hours.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm sticky top-24">
      <h3 className="font-heading font-semibold text-gray-900 mb-1">Send Inquiry</h3>
      <p className="text-xs text-gray-500 mb-4">For: <span className="font-medium text-gray-700">{productName}</span></p>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
        <div>
          <label className="form-label">Your Name *</label>
          <input {...register('buyerName')} className={errors.buyerName ? 'form-input-error' : 'form-input'} placeholder="John Smith" />
          {errors.buyerName && <p className="form-error">{errors.buyerName.message}</p>}
        </div>

        <div>
          <label className="form-label">Company Name</label>
          <input {...register('buyerCompany')} className="form-input" placeholder="Acme Corp" />
        </div>

        <div>
          <label className="form-label">Email Address *</label>
          <input {...register('buyerEmail')} type="email" className={errors.buyerEmail ? 'form-input-error' : 'form-input'} placeholder="john@example.com" />
          {errors.buyerEmail && <p className="form-error">{errors.buyerEmail.message}</p>}
        </div>

        <div className="grid grid-cols-2 gap-2">
          <div>
            <label className="form-label">Phone</label>
            <input {...register('buyerPhone')} className="form-input" placeholder="+1 234 567 890" />
          </div>
          <div>
            <label className="form-label">Country *</label>
            <input {...register('buyerCountry')} className={errors.buyerCountry ? 'form-input-error' : 'form-input'} placeholder="USA" />
            {errors.buyerCountry && <p className="form-error">{errors.buyerCountry.message}</p>}
          </div>
        </div>

        <div>
          <label className="form-label">Quantity Required</label>
          <input {...register('quantity')} type="number" min="1" className="form-input" placeholder="e.g. 500" />
        </div>

        <div>
          <label className="form-label">Message / Requirements</label>
          <textarea
            {...register('message')}
            rows={3}
            className="form-input resize-none"
            placeholder="Describe your requirements, specifications, target price..."
          />
        </div>

        <button type="submit" disabled={isSubmitting} className="btn btn-primary w-full">
          {isSubmitting ? (
            <span className="flex items-center gap-2">
              <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
              </svg>
              Sending...
            </span>
          ) : (
            <span className="flex items-center gap-2"><Send size={16} /> Send Inquiry</span>
          )}
        </button>

        <p className="text-xs text-gray-400 text-center">
          🔒 Your information is kept confidential
        </p>
      </form>
    </div>
  );
}
