'use client';
import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import Link from 'next/link';
import toast from 'react-hot-toast';
import { Eye, EyeOff, ShieldCheck, Building2, ArrowRight } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

const schema = z.object({
  email:    z.string().email('Enter a valid email'),
  password: z.string().min(1, 'Password is required'),
});

export default function LoginPage() {
  const router      = useRouter();
  const params      = useSearchParams();
  const { login, user } = useAuth();
  const [showPass, setShowPass] = useState(false);
  const [loading,  setLoading]  = useState(false);
  const redirect = params.get('redirect') || null;

  useEffect(() => {
    if (user) router.replace(user.role === 'admin' ? '/admin' : '/dashboard');
  }, [user]);

  const { register, handleSubmit, setValue, formState: { errors } } = useForm({
    resolver: zodResolver(schema),
  });

  const fillDemo = (role) => {
    if (role === 'vendor') {
      setValue('email',    'vendor@bharatbridge.com');
      setValue('password', 'Demo@1234');
    } else {
      setValue('email',    'admin@bharatbridge.com');
      setValue('password', 'Admin@1234');
    }
  };

  const onSubmit = async ({ email, password }) => {
    setLoading(true);
    try {
      const u = await login(email, password);
      toast.success(`Welcome back, ${u.name}!`);
      const dest = redirect || (u.role === 'admin' ? '/admin' : '/dashboard');
      router.push(dest);
    } catch (err) {
      toast.error(err.response?.data?.message || 'Invalid email or password.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex">

      {/* ── Left panel (desktop) ── */}
      <div className="hidden lg:flex lg:w-1/2 bg-blue-gradient flex-col justify-between p-12 relative overflow-hidden">
        <div className="absolute inset-0 bg-dot-pattern opacity-10 pointer-events-none" />
        <div className="relative">
          <Link href="/" className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
              <span className="text-white font-black text-xl">B</span>
            </div>
            <span className="text-white font-heading font-black text-2xl">
              Bharat<span className="text-saffron-400">Bridge</span>
            </span>
          </Link>
        </div>

        <div className="relative">
          <h2 className="text-4xl font-heading font-black text-white mb-4 leading-tight">
            India's Premier<br />
            <span className="text-saffron-400">B2B Export</span><br />
            Marketplace
          </h2>
          <p className="text-blue-100 text-lg mb-8 leading-relaxed">
            Sign in to manage your vendor dashboard, track inquiries,
            and connect with global buyers.
          </p>

          <div className="space-y-3">
            {[
              { icon: <ShieldCheck size={18} />, text: 'KYC verified vendor portal' },
              { icon: <Building2 size={18} />,   text: 'Manage your product listings' },
              { icon: <ArrowRight size={18} />,  text: 'Track and respond to buyer inquiries' },
            ].map((item) => (
              <div key={item.text} className="flex items-center gap-3 text-blue-100">
                <div className="w-8 h-8 bg-white/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  {item.icon}
                </div>
                <span className="text-sm font-medium">{item.text}</span>
              </div>
            ))}
          </div>
        </div>

        <p className="text-blue-300 text-xs relative">
          © {new Date().getFullYear()} BharatBridge Technologies Pvt. Ltd.
        </p>
      </div>

      {/* ── Right panel — form ── */}
      <div className="flex-1 flex flex-col justify-center items-center px-6 py-12">
        <div className="w-full max-w-md">

          {/* Mobile logo */}
          <div className="lg:hidden flex justify-center mb-8">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-10 h-10 bg-blue-gradient rounded-xl flex items-center justify-center">
                <span className="text-white font-black text-xl">B</span>
              </div>
              <span className="font-heading font-black text-2xl text-slate-900">
                Bharat<span className="text-blue-700">Bridge</span>
              </span>
            </Link>
          </div>

          <h1 className="text-2xl font-heading font-bold text-slate-900 mb-1">
            Sign in to your account
          </h1>
          <p className="text-slate-500 text-sm mb-8">
            Vendor & Admin portal access
          </p>

          {/* Demo logins */}
          <div className="flex gap-2 mb-6">
            <button onClick={() => fillDemo('vendor')}
              className="flex-1 text-xs font-semibold py-2 px-3 bg-blue-50 border border-blue-200 text-blue-700 rounded-lg hover:bg-blue-100 transition-colors">
              🏪 Fill Vendor Demo
            </button>
            <button onClick={() => fillDemo('admin')}
              className="flex-1 text-xs font-semibold py-2 px-3 bg-red-50 border border-red-200 text-red-700 rounded-lg hover:bg-red-100 transition-colors">
              🛡️ Fill Admin Demo
            </button>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <div>
              <label className="bb-label">Email Address</label>
              <input
                {...register('email')}
                type="email"
                autoComplete="email"
                className={errors.email ? 'bb-input-error' : 'bb-input'}
                placeholder="you@company.com"
              />
              {errors.email && <p className="bb-error">{errors.email.message}</p>}
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="bb-label mb-0">Password</label>
                <Link href="/forgot-password" className="text-xs text-blue-600 hover:underline">
                  Forgot password?
                </Link>
              </div>
              <div className="relative">
                <input
                  {...register('password')}
                  type={showPass ? 'text' : 'password'}
                  autoComplete="current-password"
                  className={`${errors.password ? 'bb-input-error' : 'bb-input'} pr-11`}
                  placeholder="Your password"
                />
                <button type="button" onClick={() => setShowPass(!showPass)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600">
                  {showPass ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              {errors.password && <p className="bb-error">{errors.password.message}</p>}
            </div>

            <button type="submit" disabled={loading}
              className="bb-btn bb-btn-primary w-full justify-center py-3.5 text-base btn-shine">
              {loading ? (
                <span className="flex items-center gap-2">
                  <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"/>
                  </svg>
                  Signing in...
                </span>
              ) : (
                'Sign In →'
              )}
            </button>
          </form>

          <p className="text-center text-sm text-slate-500 mt-6">
            Don't have an account?{' '}
            <Link href="/vendors/register" className="text-blue-700 font-semibold hover:underline">
              Register as Vendor →
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
