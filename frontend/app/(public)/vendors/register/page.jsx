'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import Link from 'next/link';
import toast from 'react-hot-toast';
import api from '@/lib/api';
import { Eye, EyeOff, ShieldCheck, Globe, Package, TrendingUp } from 'lucide-react';

const schema = z.object({
  name:            z.string().min(2, 'Full name required'),
  email:           z.string().email('Valid email required'),
  password:        z.string().min(8, 'Password must be at least 8 characters'),
  confirmPassword: z.string(),
}).refine((d) => d.password === d.confirmPassword, {
  message: "Passwords don't match",
  path: ['confirmPassword'],
});

const inputCls = 'w-full px-4 py-3 text-sm border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1E3A5F]/30 focus:border-[#1E3A5F] transition placeholder-slate-400';

const BENEFITS = [
  { icon: <Globe size={18} />,      text: 'Reach buyers in 80+ countries' },
  { icon: <Package size={18} />,    text: 'List unlimited products for free' },
  { icon: <ShieldCheck size={18} />, text: 'KYC-verified trusted platform' },
  { icon: <TrendingUp size={18} />, text: 'Grow your export business' },
];

export default function VendorRegisterPage() {
  const router              = useRouter();
  const [loading, setLoading] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      await api.post('/auth/register', { name: data.name, email: data.email, password: data.password, role: 'vendor' });
      toast.success('Account created! Please log in and complete your vendor profile.');
      router.push('/login');
    } catch (err) {
      toast.error(err?.response?.data?.message || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex">

      {/* Left panel */}
      <div className="hidden lg:flex flex-col justify-between bg-[#1E3A5F] text-white w-2/5 p-12">
        <div>
          <Link href="/" className="flex items-center gap-3 mb-16">
            <div className="w-10 h-10 rounded-xl bg-orange-500 flex items-center justify-center">
              <span className="font-black text-xl">B</span>
            </div>
            <div>
              <div className="font-black text-xl">Bharat<span className="text-orange-400">Bridge</span></div>
              <div className="text-[10px] text-slate-400 uppercase tracking-widest">B2B Export Platform</div>
            </div>
          </Link>
          <h2 className="text-4xl font-black leading-tight mb-4">
            Start Exporting<br />to the World<br />Today
          </h2>
          <p className="text-blue-200 leading-relaxed mb-10">
            Join 500+ verified Indian exporters already growing their business on BharatBridge.
          </p>
          <div className="space-y-4">
            {BENEFITS.map((b) => (
              <div key={b.text} className="flex items-center gap-3 text-sm text-blue-100">
                <span className="text-orange-400">{b.icon}</span>
                <span>{b.text}</span>
              </div>
            ))}
          </div>
        </div>
        <p className="text-slate-400 text-xs">
          Already a vendor? <Link href="/login" className="text-orange-400 hover:text-orange-300 font-semibold">Sign in here</Link>
        </p>
      </div>

      {/* Right form panel */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-md">

          {/* Mobile logo */}
          <Link href="/" className="flex lg:hidden items-center gap-2 justify-center mb-8">
            <div className="w-8 h-8 rounded-lg bg-[#1E3A5F] flex items-center justify-center">
              <span className="text-white font-black text-sm">B</span>
            </div>
            <span className="font-black text-xl text-[#1E3A5F]">Bharat<span className="text-orange-500">Bridge</span></span>
          </Link>

          <h1 className="text-2xl font-black text-[#1E3A5F] mb-1">Create vendor account</h1>
          <p className="text-slate-500 text-sm mb-8">Register as an Indian exporter and reach global buyers</p>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

            {/* Full Name */}
            <div>
              <label className="block text-xs font-bold text-slate-600 mb-1.5">Full Name *</label>
              <input
                {...register('name')}
                type="text"
                placeholder="Rajesh Kumar"
                className={inputCls}
              />
              {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
            </div>

            {/* Email */}
            <div>
              <label className="block text-xs font-bold text-slate-600 mb-1.5">Email Address *</label>
              <input
                {...register('email')}
                type="email"
                placeholder="rajesh@company.com"
                className={inputCls}
              />
              {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
            </div>

            {/* Password */}
            <div>
              <label className="block text-xs font-bold text-slate-600 mb-1.5">Password *</label>
              <div className="relative">
                <input
                  {...register('password')}
                  type={showPass ? 'text' : 'password'}
                  placeholder="Min. 8 characters"
                  className={`${inputCls} pr-11`}
                />
                <button type="button" onClick={() => setShowPass(!showPass)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition">
                  {showPass ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>}
            </div>

            {/* Confirm Password */}
            <div>
              <label className="block text-xs font-bold text-slate-600 mb-1.5">Confirm Password *</label>
              <div className="relative">
                <input
                  {...register('confirmPassword')}
                  type={showConfirm ? 'text' : 'password'}
                  placeholder="Re-enter password"
                  className={`${inputCls} pr-11`}
                />
                <button type="button" onClick={() => setShowConfirm(!showConfirm)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition">
                  {showConfirm ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              {errors.confirmPassword && <p className="text-red-500 text-xs mt-1">{errors.confirmPassword.message}</p>}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#1E3A5F] hover:bg-[#16304F] disabled:opacity-60 text-white font-bold py-3.5 rounded-xl transition flex items-center justify-center gap-2"
            >
              {loading ? (
                <><svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/></svg>Creating account...</>
              ) : (
                <>Create Vendor Account</>
              )}
            </button>
          </form>

          <div className="mt-6 text-center space-y-3">
            <p className="text-sm text-slate-500">
              Already have an account?{' '}
              <Link href="/login" className="text-[#1E3A5F] font-bold hover:text-orange-500 transition">Sign in</Link>
            </p>
            <p className="text-sm text-slate-500">
              <Link href="/" className="text-slate-400 hover:text-slate-600 transition">← Back to Homepage</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
