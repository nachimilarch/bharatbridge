'use client';
import { useEffect }   from 'react';
import { useRouter }   from 'next/navigation';
import { useAuth }     from '@/context/AuthContext';
import DashboardShell  from '@/components/dashboard/DashboardShell';

export default function AdminLayout({ children }) {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user)               router.replace('/login?redirect=/admin');
    if (!loading && user?.role !== 'admin' && user?.role !== 'ADMIN')
      router.replace('/dashboard');
  }, [user, loading, router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-900">
        <div className="flex flex-col items-center gap-4">
          <div className="w-10 h-10 bg-red-500 rounded-xl flex items-center justify-center">
            <span className="text-white font-black text-xl">B</span>
          </div>
          <div className="flex gap-1.5">
            {[0,1,2].map((i) => (
              <div key={i} className="w-2 h-2 bg-red-400 rounded-full animate-bounce"
                style={{ animationDelay: `${i * 0.15}s` }} />
            ))}
          </div>
          <p className="text-slate-400 text-sm">Loading admin panel...</p>
        </div>
      </div>
    );
  }

  if (!user || (user.role !== 'admin' && user.role !== 'ADMIN')) {
    return <div className="min-h-screen bg-slate-900" />;
  }

  return <DashboardShell role="admin">{children}</DashboardShell>;
}
