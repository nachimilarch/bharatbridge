'use client';
import Link from 'next/link';
import { MessageSquarePlus } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function FloatingInquiryButton() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 2000);
    return () => clearTimeout(timer);
  }, []);

  if (!visible) return null;

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-2">
      {/* Tooltip */}
      <div className="bg-slate-900 text-white text-xs font-semibold px-3 py-1.5 rounded-lg shadow-lg animate-fade-up">
        Got a sourcing need? 👋
      </div>

      {/* Button */}
      <Link href="/inquiry"
        className="flex items-center gap-2.5 bg-blue-700 hover:bg-blue-800 text-white font-bold text-sm px-5 py-3.5 rounded-2xl shadow-cta hover:shadow-xl transition-all duration-200 btn-shine active:scale-95">
        <MessageSquarePlus size={20} />
        Submit Inquiry
      </Link>
    </div>
  );
}
