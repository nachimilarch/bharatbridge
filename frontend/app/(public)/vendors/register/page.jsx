'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import Link from 'next/link';
import toast from 'react-hot-toast';
import api from '@/lib/api';

const schema = z.object({
  name: z.string().min(2, 'Full name required'),
  email: z.string().email('Valid email required'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  confirmPassword: z.string(),
}).refine((d) => d.password === d.confirmPassword, {
  message: "Passwords don't match",
  path: ['confirmPassword'],
});

export default function VendorRegisterPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

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
      toast.error(err.response?.data?.message || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-heading font-bold text-gray-900">
            Join <span className="text-brand-500">BharatBridge</span>
          </h1>
          <p className="text-gray-500 mt-2">Register as an Indian exporter and reach global buyers</p>
        </div>

        <div className="card p-8">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label className="form-label">Full Name *</label>
              <input {...register('name')} className={errors.name ? 'form-input-error' : 'form-input'} placeholder="Rajesh Kumar" />
              {errors.name && <p className="form-error">{errors.name.message}</p>}
            </div>
            <div>
              <label className="form-label">Email Address *</label>
              <input {...register('email')} type="email" className={errors.email ? 'form-input-error' : 'form-input'} placeholder="rajesh@company.com" />
              {errors.email && <p className="form-error">{errors.email.message}</p>}
            </div>
            <div>
              <label className="form-label">Password *</label>
              <input {...register('password')} type="password" className={errors.password ? 'form-input-error' : 'form-input'} placeholder="Min 8 characters" />
              {errors.password && <p className="form-error">{errors.password.message}</p>}
            </div>
            <div>
              <label className="form-label">Confirm Password *</label>
              <input {...register('confirmPassword')} type="password" className={errors.confirmPassword ? 'form-input-error' : 'form-input'} placeholder="Repeat password" />
              {errors.confirmPassword && <p className="form-error">{errors.confirmPassword.message}</p>}
            </div>

            <button type="submit" disabled={loading} className="btn btn-primary w-full mt-2">
              {loading ? 'Creating Account...' : 'Create Vendor Account'}
            </button>
          </form>

          <p className="text-center text-sm text-gray-500 mt-4">
            Already have an account?{' '}
            <Link href="/login" className="text-brand-600 font-medium hover:underline">Sign in</Link>
          </p>
        </div>

        <div className="mt-6 grid grid-cols-3 gap-3 text-center text-xs text-gray-500">
          {['✅ Free to join', '🔒 KYC verified', '🌍 Global reach'].map((t) => (
            <div key={t} className="bg-white rounded-lg p-2 border border-gray-100">{t}</div>
          ))}
        </div>
      </div>
    </div>
  );
}
