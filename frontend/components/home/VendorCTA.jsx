import Link from 'next/link';
import { ArrowRight, CheckCircle } from 'lucide-react';

const PERKS = [
  'Free vendor registration — no setup fees',
  'Access to 10,000+ global buyers monthly',
  'Dedicated account manager post KYC',
  'Product listings with SEO optimization',
  'Multi-currency pricing display',
  'Inquiry management dashboard',
];

export default function VendorCTA() {
  return (
    <section className="bb-section bg-blue-gradient relative overflow-hidden">
      {/* Decorative circles */}
      <div className="absolute -top-20 -right-20 w-72 h-72 bg-white/5 rounded-full pointer-events-none" />
      <div className="absolute -bottom-10 -left-10 w-52 h-52 bg-white/5 rounded-full pointer-events-none" />
      <div className="absolute top-1/2 right-1/4 w-32 h-32 bg-saffron-500/10 rounded-full pointer-events-none" />

      <div className="bb-container relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

          {/* Left */}
          <div>
            <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 text-blue-100 text-xs font-bold px-4 py-2 rounded-full mb-6">
              🇮🇳 For Indian Exporters
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-black text-white mb-5 leading-tight">
              Are You an Indian
              <span className="block text-saffron-400">Exporter?</span>
            </h2>
            <p className="text-blue-100 text-lg leading-relaxed mb-8">
              Join BharatBridge and reach verified global buyers actively looking
              for Indian export products. Register free and start receiving inquiries
              within 48 hours of KYC approval.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/vendors/register"
                className="bb-btn bb-btn-saffron bb-btn-lg btn-shine">
                Register as Vendor Free <ArrowRight size={20} />
              </Link>
              <Link href="/about"
                className="bb-btn bb-btn-white bb-btn-lg">
                Learn More
              </Link>
            </div>
          </div>

          {/* Right — perks card */}
          <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-3xl p-8">
            <h3 className="font-heading font-bold text-white text-xl mb-6">
              What You Get — Free Forever
            </h3>
            <ul className="space-y-3">
              {PERKS.map((perk) => (
                <li key={perk} className="flex items-start gap-3">
                  <CheckCircle className="text-emerald-400 flex-shrink-0 mt-0.5" size={18} />
                  <span className="text-blue-100 text-sm">{perk}</span>
                </li>
              ))}
            </ul>

            <div className="mt-8 pt-6 border-t border-white/20 grid grid-cols-3 gap-4 text-center">
              {[['500+', 'Active Vendors'], ['10K+', 'Buyer Inquiries/mo'], ['48hrs', 'KYC Approval']].map(([v, l]) => (
                <div key={l}>
                  <div className="font-heading font-black text-2xl text-saffron-400">{v}</div>
                  <div className="text-blue-200 text-xs mt-1">{l}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
