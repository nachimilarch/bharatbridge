'use client';
import { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';

const schema = z.object({
  email:    z.string().email('Enter a valid email'),
  password: z.string().min(1, 'Password is required'),
});

const inputCls = 'w-full px-4 py-3 text-sm border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1E3A5F]/30 focus:border-[#1E3A5F] transition placeholder-slate-400';

function LoginForm() {
  const router = useRouter();
  const params = useSearchParams();
  const { login, user } = useAuth();
  const [showPass, setShowPass] = useState(false);
  const [loading,  setLoading]  = useState(false);
  const redirect = params.get('redirect') || null;

  useEffect(() => {
    if (user) router.replace(user.role === 'admin' ? '/admin' : '/dashboard');
  }, [user]);

  const { register, handleSubmit, setValue, formState: { errors } } = useForm({ resolver: zodResolver(schema) });

  const fillDemo = (role) => {
    if (role === 'vendor') { setValue('email', 'vendor@bharatbridge.com'); setValue('password', 'vendor123'); }
    else { setValue('email', 'admin@bharatbridge.com'); setValue('password', 'admin123'); }
  };

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      await login(data.email, data.password);
      router.replace(redirect || (user?.role === 'admin' ? '/admin' : '/dashboard'));
    } catch (err) {
      alert(err?.response?.data?.message || 'Invalid credentials. Please try again.');
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
            India&apos;s Premier<br />B2B Export<br />Marketplace
          </h2>
          <p className="text-blue-200 leading-relaxed">
            Connect with 500+ KYC-verified Indian exporters. Source premium products across 50+ categories.
          </p>
          <div className="mt-8 space-y-3">
            {[
              { emoji: '\u2705', text: '500+ Verified Exporters' },
              { emoji: '\uD83C\uDF10', text: '80+ Countries Served' },
              { emoji: '\uD83D\uDCB0', text: 'Multi-Currency Pricing' },
              { emoji: '\uD83D\uDD12', text: 'KYC Verified Vendors' },
            ].map((item) => (
              <div key={item.text} className="flex items-center gap-3 text-sm text-blue-100">
                <span>{item.emoji}</span> {item.text}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right form panel */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          {/* Mobile logo */}
          <div className="lg:hidden flex items-center gap-2 justify-center mb-8">
            <div className="w-8 h-8 rounded-lg bg-[#1E3A5F] flex items-center justify-center">
              <span className="font-black text-sm">B</span>
            </div>
            <span className="font-black text-xl text-[#1E3A5F]">Bharat<span className="text-orange-500">Bridge</span></span>
          </div>

          <h1 className="text-2xl font-black text-[#1E3A5F] mb-1">Welcome back</h1>
          <p className="text-slate-500 text-sm mb-8">Sign in to your BharatBridge account</p>

          {/* Demo login shortcuts */}
          <div className="flex gap-2 mb-6">
            <button onClick={() => fillDemo('vendor')} type="button"
              className="flex-1 flex items-center justify-center gap-2 bg-[#1E3A5F]/5 hover:bg-[#1E3A5F]/10 border border-[#1E3A5F]/20 text-[#1E3A5F] text-xs font-bold py-2.5 rounded-xl transition">
              Demo Vendor
            </button>
            <button onClick={() => fillDemo('admin')} type="button"
              className="flex-1 flex items-center justify-center gap-2 bg-orange-50 hover:bg-orange-100 border border-orange-200 text-orange-700 text-xs font-bold py-2.5 rounded-xl transition">
              Demo Admin
            </button>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1.5">Email Address</label>
              <input {...register('email')} type="email" placeholder="you@company.com" className={inputCls} />
              {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email.message}</p>}
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1.5">Password</label>
              <div className="relative">
                <input {...register('password')} type={showPass ? 'text' : 'password'} placeholder="Your password" className={`${inputCls} pr-11`} />
                <button type="button" onClick={() => setShowPass(!showPass)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition">
                  {showPass ? (
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" /></svg>
                  ) : (
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                  )}
                </button>
              </div>
              {errors.password && <p className="text-xs text-red-500 mt-1">{errors.password.message}</p>}
            </div>

            <button type="submit" disabled={loading}
              className="w-full py-3 bg-[#1E3A5F] hover:bg-[#162d4a] text-white font-bold rounded-xl transition text-sm flex items-center justify-center gap-2 disabled:opacity-60">
              {loading ? (
                <><svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"/></svg> Signing in...</>
              ) : (
                <>Sign In</>
              )}
            </button>
          </form>

          <p className="text-center text-sm text-slate-500 mt-6">
            Are you an exporter?{' '}
            <Link href="/vendor/register" className="text-[#1E3A5F] font-semibold hover:underline">Register as Vendor</Link>
          </p>
          <p className="text-center mt-4">
            <Link href="/" className="text-xs text-slate-400 hover:text-slate-600">← Back to Homepage</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><div className="animate-spin h-8 w-8 rounded-full border-4 border-[#1E3A5F] border-t-transparent" /></div>}>
      <LoginForm />
    </Suspense>
  );
}
