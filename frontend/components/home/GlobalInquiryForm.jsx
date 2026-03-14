'use client';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Send, CheckCircle } from 'lucide-react';
import toast from 'react-hot-toast';
import api from '@/lib/api';

const schema = z.object({
  product:        z.string().min(2, 'Product name required'),
  quantity:       z.string().min(1, 'Quantity required'),
  unit:           z.string().min(1, 'Unit required'),
  destCountry:    z.string().min(2, 'Destination country required'),
  companyName:    z.string().min(2, 'Company name required'),
  buyerName:      z.string().min(2, 'Your name required'),
  buyerEmail:     z.string().email('Valid email required'),
  buyerPhone:     z.string().optional(),
  message:        z.string().optional(),
  category:       z.string().optional(),
});

const UNITS = ['MT', 'KG', 'Tonnes', 'Pieces', 'Dozen', 'Boxes', 'Containers', 'Liters'];

export default function GlobalInquiryForm({ categories = [] }) {
  const [submitted, setSubmitted] = useState(false);

  const { register, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data) => {
    try {
      await api.post('/inquiries', {
        buyerName:    data.buyerName,
        buyerCompany: data.companyName,
        buyerEmail:   data.buyerEmail,
        buyerPhone:   data.buyerPhone,
        buyerCountry: data.destCountry,
        quantity:     parseInt(data.quantity),
        message:      `Product: ${data.product}\nQty: ${data.quantity} ${data.unit}\nDest: ${data.destCountry}\n\n${data.message || ''}`,
      });
      setSubmitted(true);
      reset();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to submit. Please try again.');
    }
  };

  return (
    <section id="inquiry" className="bb-section bg-slate-50">
      <div className="bb-container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">

          {/* Left — info */}
          <div>
            <div className="bb-section-pill">📬 Global Buyers</div>
            <h2 className="bb-section-title mb-4">
              Tell Us What You Want to Source from India
            </h2>
            <p className="text-slate-500 text-lg leading-relaxed mb-8">
              Submit a buying inquiry and our trade team will match you with the most suitable
              verified Indian exporters within 24 business hours — completely free.
            </p>

            <div className="space-y-4">
              {[
                { icon: '🔍', title: 'We match you',    desc: 'Our team reviews your inquiry and matches you with verified exporters.' },
                { icon: '📧', title: 'You get intros',  desc: 'Receive direct introductions to 2–3 suitable exporters for your requirement.' },
                { icon: '🤝', title: 'You negotiate',   desc: 'Negotiate pricing, samples, and terms directly with the exporter.' },
              ].map((item) => (
                <div key={item.title} className="flex items-start gap-4 p-4 bg-white rounded-xl border border-slate-100">
                  <span className="text-2xl">{item.icon}</span>
                  <div>
                    <div className="font-heading font-bold text-slate-900 text-sm mb-0.5">{item.title}</div>
                    <div className="text-slate-500 text-sm">{item.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right — form */}
          <div className="bb-card p-8 shadow-lg">
            {submitted ? (
              <div className="text-center py-10">
                <CheckCircle className="text-emerald-500 mx-auto mb-4" size={56} />
                <h3 className="font-heading font-bold text-slate-900 text-xl mb-2">Inquiry Submitted!</h3>
                <p className="text-slate-500 text-sm leading-relaxed mb-6">
                  Thank you! Our trade team will review your inquiry and get back to you
                  with exporter introductions within 24 business hours.
                </p>
                <button onClick={() => setSubmitted(false)}
                  className="bb-btn bb-btn-outline bb-btn-sm">
                  Submit Another Inquiry
                </button>
              </div>
            ) : (
              <>
                <h3 className="font-heading font-bold text-slate-900 text-xl mb-6">
                  Submit Buying Inquiry
                  <span className="block text-sm font-normal text-slate-400 mt-1">Free · No registration required</span>
                </h3>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                  {/* Product + Category */}
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="bb-label">Product Name *</label>
                      <input {...register('product')}
                        className={errors.product ? 'bb-input-error' : 'bb-input'}
                        placeholder="e.g. Basmati Rice" />
                      {errors.product && <p className="bb-error">{errors.product.message}</p>}
                    </div>
                    <div>
                      <label className="bb-label">Category</label>
                      <select {...register('category')} className="bb-select">
                        <option value="">Select category</option>
                        {categories.map((c) => (
                          <option key={c.id} value={c.slug}>{c.name}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Quantity + Unit */}
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="bb-label">Quantity Required *</label>
                      <input {...register('quantity')} type="number" min="1"
                        className={errors.quantity ? 'bb-input-error' : 'bb-input'}
                        placeholder="e.g. 500" />
                      {errors.quantity && <p className="bb-error">{errors.quantity.message}</p>}
                    </div>
                    <div>
                      <label className="bb-label">Unit *</label>
                      <select {...register('unit')} className={errors.unit ? 'bb-input-error' : 'bb-select'}>
                        <option value="">Select unit</option>
                        {UNITS.map((u) => <option key={u} value={u}>{u}</option>)}
                      </select>
                      {errors.unit && <p className="bb-error">{errors.unit.message}</p>}
                    </div>
                  </div>

                  {/* Destination */}
                  <div>
                    <label className="bb-label">Destination Country *</label>
                    <input {...register('destCountry')}
                      className={errors.destCountry ? 'bb-input-error' : 'bb-input'}
                      placeholder="e.g. United States, Germany, UAE" />
                    {errors.destCountry && <p className="bb-error">{errors.destCountry.message}</p>}
                  </div>

                  {/* Company + Name */}
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="bb-label">Company Name *</label>
                      <input {...register('companyName')}
                        className={errors.companyName ? 'bb-input-error' : 'bb-input'}
                        placeholder="Acme Corp" />
                      {errors.companyName && <p className="bb-error">{errors.companyName.message}</p>}
                    </div>
                    <div>
                      <label className="bb-label">Your Name *</label>
                      <input {...register('buyerName')}
                        className={errors.buyerName ? 'bb-input-error' : 'bb-input'}
                        placeholder="John Smith" />
                      {errors.buyerName && <p className="bb-error">{errors.buyerName.message}</p>}
                    </div>
                  </div>

                  {/* Email + Phone */}
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="bb-label">Email Address *</label>
                      <input {...register('buyerEmail')} type="email"
                        className={errors.buyerEmail ? 'bb-input-error' : 'bb-input'}
                        placeholder="john@company.com" />
                      {errors.buyerEmail && <p className="bb-error">{errors.buyerEmail.message}</p>}
                    </div>
                    <div>
                      <label className="bb-label">Phone / WhatsApp</label>
                      <input {...register('buyerPhone')}
                        className="bb-input" placeholder="+1 234 567 890" />
                    </div>
                  </div>

                  {/* Message */}
                  <div>
                    <label className="bb-label">Additional Requirements</label>
                    <textarea {...register('message')} rows={3}
                      className="bb-input resize-none"
                      placeholder="Describe specifications, certifications needed, target price range..." />
                  </div>

                  <button type="submit" disabled={isSubmitting}
                    className="bb-btn bb-btn-primary w-full justify-center py-3.5 text-base btn-shine">
                    {isSubmitting ? (
                      <span className="flex items-center gap-2">
                        <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"/>
                        </svg>
                        Submitting...
                      </span>
                    ) : (
                      <><Send size={18} /> Submit Buying Inquiry</>
                    )}
                  </button>

                  <p className="text-center text-xs text-slate-400">
                    🔒 Your information is kept strictly confidential. No spam.
                  </p>
                </form>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
