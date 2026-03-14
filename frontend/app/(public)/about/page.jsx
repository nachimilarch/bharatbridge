import Link from 'next/link';

export const metadata = {
  title: 'About BharatBridge | India\'s B2B Export Marketplace',
  description: 'Learn how BharatBridge connects verified Indian exporters with global buyers.',
};

const STATS = [
  { number: '500+', label: 'Verified Exporters' },
  { number: '50+', label: 'Product Categories' },
  { number: '80+', label: 'Countries Served' },
  { number: '10K+', label: 'Inquiries Processed' },
];

const HOW_IT_WORKS = [
  {
    step: '01',
    title: 'Browse Products',
    desc: 'Search through thousands of Made-in-India products across 50+ categories from verified exporters.',
  },
  {
    step: '02',
    title: 'Submit an Inquiry',
    desc: 'Found something interesting? Submit a sourcing inquiry with your quantity and requirements.',
  },
  {
    step: '03',
    title: 'Get Connected',
    desc: 'Our team verifies the request and connects you directly with the right Indian exporter.',
  },
  {
    step: '04',
    title: 'Close the Deal',
    desc: 'Negotiate directly, finalize pricing, and start importing Made-in-India goods.',
  },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      {/* Hero */}
      <div className="bg-[#1E3A5F] text-white">
        <div className="max-w-5xl mx-auto px-6 py-20 text-center">
          <p className="text-orange-400 text-xs font-bold uppercase tracking-widest mb-3">🇮🇳 India's B2B Export Platform</p>
          <h1 className="text-4xl md:text-5xl font-black mb-6">About BharatBridge</h1>
          <p className="text-blue-200 text-lg max-w-2xl mx-auto leading-relaxed">
            BharatBridge is India's premier B2B export marketplace, connecting KYC-verified Indian
            manufacturers and exporters with international buyers across 80+ countries.
          </p>
          <div className="flex flex-wrap justify-center gap-4 mt-10">
            <Link href="/products" className="bg-orange-500 hover:bg-orange-600 text-white font-bold px-6 py-3 rounded-xl transition">
              Browse Products
            </Link>
            <Link href="/inquiry" className="bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold px-6 py-3 rounded-xl transition">
              Post Inquiry
            </Link>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-5xl mx-auto px-6 py-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {STATS.map((s) => (
              <div key={s.label}>
                <div className="text-3xl font-black text-[#1E3A5F] mb-1">{s.number}</div>
                <div className="text-sm text-slate-500 font-medium">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Mission */}
      <div className="max-w-4xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <p className="text-orange-500 text-xs font-bold uppercase tracking-widest mb-3">Our Mission</p>
            <h2 className="text-3xl font-black text-[#1E3A5F] mb-4">Bridging India to the World</h2>
            <p className="text-slate-600 leading-relaxed mb-4">
              India is the world's 5th largest economy, yet many of its finest manufacturers struggle
              to reach global buyers. BharatBridge solves this by providing a trusted, verified
              digital marketplace for B2B export trade.
            </p>
            <p className="text-slate-600 leading-relaxed">
              Every vendor on our platform is KYC-verified with valid IEC codes. Every product listing
              is reviewed before publishing. Buyers get the confidence they need to source from India.
            </p>
          </div>
          <div className="bg-gradient-to-br from-[#1E3A5F] to-[#16304F] rounded-2xl p-8 text-white">
            <h3 className="font-bold text-lg mb-4">Why BharatBridge?</h3>
            <ul className="space-y-3">
              {[
                'All vendors are KYC verified with valid IEC codes',
                'Products across 50+ major export categories',
                'Multi-currency pricing with live exchange rates',
                'Dedicated support for inquiry-to-deal conversion',
                'Secure B2B lead generation — no direct payments',
              ].map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm text-blue-100">
                  <svg className="w-5 h-5 text-orange-400 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/></svg>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* How it works */}
      <div id="how-it-works" className="bg-white border-t border-b border-slate-200">
        <div className="max-w-5xl mx-auto px-6 py-16">
          <div className="text-center mb-12">
            <p className="text-orange-500 text-xs font-bold uppercase tracking-widest mb-3">Simple Process</p>
            <h2 className="text-3xl font-black text-[#1E3A5F]">How It Works</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {HOW_IT_WORKS.map((step) => (
              <div key={step.step} className="text-center">
                <div className="w-14 h-14 rounded-2xl bg-[#1E3A5F] text-white font-black text-xl flex items-center justify-center mx-auto mb-4">
                  {step.step}
                </div>
                <h3 className="font-bold text-[#1E3A5F] mb-2">{step.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="max-w-3xl mx-auto px-6 py-16 text-center">
        <h2 className="text-3xl font-black text-[#1E3A5F] mb-4">Ready to Source from India?</h2>
        <p className="text-slate-500 mb-8">Join thousands of global buyers who trust BharatBridge for their sourcing needs.</p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link href="/products" className="bg-[#1E3A5F] hover:bg-[#16304F] text-white font-bold px-8 py-3.5 rounded-xl transition">
            Browse Products
          </Link>
          <Link href="/contact" className="border-2 border-[#1E3A5F] text-[#1E3A5F] hover:bg-[#1E3A5F] hover:text-white font-bold px-8 py-3.5 rounded-xl transition">
            Contact Us
          </Link>
        </div>
      </div>
    </div>
  );
}
