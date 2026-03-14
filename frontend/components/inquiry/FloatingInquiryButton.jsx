'use client';
import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function FloatingInquiryButton() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 2000);
    return () => clearTimeout(timer);
  }, []);

  if (!visible) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-2">
      {/* Tooltip */}
      <div className="bg-[#1E3A5F] text-white text-xs font-semibold px-3 py-1.5 rounded-lg shadow-lg animate-fadeIn whitespace-nowrap">
        Got a sourcing need? 👋
      </div>

      {/* Button */}
      <Link
        href="/inquiry"
        className="flex items-center gap-2.5 bg-orange-500 hover:bg-orange-600 text-white font-bold text-sm px-5 py-3 rounded-full shadow-xl hover:shadow-2xl transition-all duration-200 hover:-translate-y-0.5"
      >
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-3 3v-3z" />
        </svg>
        Submit Inquiry
      </Link>
    </div>
  );
}
