'use client';
import { useParams, useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function EditProductRedirect() {
  const { id } = useParams();
  const router = useRouter();

  useEffect(() => {
    if (id) router.replace(`/dashboard/products/${id}`);
  }, [id]);

  return (
    <div className="flex items-center justify-center py-24">
      <div className="flex flex-col items-center gap-4">
        <div className="w-10 h-10 bg-[#1E3A5F] rounded-xl flex items-center justify-center">
          <span className="text-white font-black text-lg">B</span>
        </div>
        <div className="flex gap-1.5">
          {[0, 1, 2].map((i) => (
            <div key={i} className="w-2 h-2 bg-orange-500 rounded-full animate-bounce"
              style={{ animationDelay: `${i * 0.15}s` }} />
          ))}
        </div>
      </div>
    </div>
  );
}
