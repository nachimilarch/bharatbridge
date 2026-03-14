import InquiryForm from '@/components/inquiry/InquiryForm';
import { Suspense } from 'react';

export const metadata = {
  title: 'Submit Sourcing Inquiry | BharatBridge',
  description: 'Post a buying request and get quotes from verified Indian exporters within 24 hours.',
};

const TRUST_ITEMS = [
  { icon: '⚡', label: 'Response within 24 hours' },
  { icon: '🔒', label: 'Your data is secure' },
  { icon: '✅', label: 'KYC verified exporters only' },
  { icon: '🌐', label: '80+ countries supported' },
];

export default function InquiryPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <div className="bg-[#1E3A5F] text-white">
        <div className="max-w-3xl mx-auto px-6 py-14 text-center">
          <p className="text-orange-400 text-xs font-bold uppercase tracking-widest mb-3">Free & No Commitment</p>
          <h1 className="text-4xl font-black mb-4">Post a Buying Request</h1>
          <p className="text-blue-200 text-base max-w-xl mx-auto">
            Tell us what you need. We'll connect you with the right KYC-verified Indian exporter within 24 hours.
          </p>
        </div>
      </div>

      {/* Trust bar */}
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-4xl mx-auto px-6 py-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            {TRUST_ITEMS.map((t) => (
              <div key={t.label} className="flex items-center justify-center gap-2 text-xs font-semibold text-slate-600">
                <span className="text-base">{t.icon}</span>
                <span>{t.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main */}
      <div className="max-w-5xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-8">
              <h2 className="text-xl font-bold text-[#1E3A5F] mb-6">Your Sourcing Requirements</h2>
              <Suspense fallback={<div className="animate-pulse h-96 bg-slate-100 rounded-xl" />}>
                <InquiryForm />
              </Suspense>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-5">
            <div className="bg-gradient-to-br from-[#1E3A5F] to-[#16304F] rounded-2xl p-6 text-white">
              <h3 className="font-bold text-lg mb-3">🇮🇳 Why Source from India?</h3>
              <ul className="space-y-2 text-sm text-blue-100">
                {[
                  'World-class quality at competitive prices',
                  'Massive capacity for bulk orders',
                  'Wide range of export categories',
                  'Established logistics infrastructure',
                  'English-speaking business community',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <span className="text-orange-400 mt-0.5">•</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-white rounded-2xl border border-slate-200 p-5">
              <h3 className="font-bold text-[#1E3A5F] mb-3">What happens next?</h3>
              <ol className="space-y-3">
                {[
                  'We review your inquiry',
                  'We match you with 2-3 verified exporters',
                  'Exporters contact you directly',
                  'You negotiate and close the deal',
                ].map((step, i) => (
                  <li key={step} className="flex items-start gap-3 text-sm text-slate-600">
                    <span className="w-6 h-6 rounded-full bg-[#1E3A5F] text-white text-xs font-bold flex items-center justify-center flex-shrink-0 mt-0.5">{i + 1}</span>
                    {step}
                  </li>
                ))}
              </ol>
            </div>

            <div className="text-center p-4 bg-orange-50 border border-orange-100 rounded-2xl">
              <p className="text-sm text-orange-800 font-semibold mb-1">Need help?</p>
              <p className="text-xs text-orange-700">Email us at <a href="mailto:hello@bharatbridge.com" className="underline">hello@bharatbridge.com</a></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
