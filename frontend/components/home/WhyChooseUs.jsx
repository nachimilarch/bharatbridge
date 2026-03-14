import { ShieldCheck, Globe, Zap, HeadphonesIcon, Award, TrendingUp } from 'lucide-react';

const REASONS = [
  {
    icon: <ShieldCheck size={28} className="text-emerald-600" />,
    title: 'KYC Verified Exporters',
    desc: 'Every vendor on BharatBridge undergoes strict KYC verification including IEC code, GST, and business registration checks.',
    color: 'bg-emerald-50 border-emerald-100',
    tag: 'Trust',
    tagColor: 'bb-badge-verified',
  },
  {
    icon: <Award size={28} className="text-blue-600" />,
    title: 'Export Quality Products',
    desc: 'Products listed meet international quality standards including ISO, FSSAI, BIS certifications for global markets.',
    color: 'bg-blue-50 border-blue-100',
    tag: 'Quality',
    tagColor: 'bb-badge-new',
  },
  {
    icon: <Globe size={28} className="text-indigo-600" />,
    title: 'Global Sourcing Network',
    desc: 'Connect with exporters from 28 Indian states covering all major export hubs — Surat, Ludhiana, Moradabad, Chennai.',
    color: 'bg-indigo-50 border-indigo-100',
    tag: 'Network',
    tagColor: 'bb-badge-export',
  },
  {
    icon: <Zap size={28} className="text-saffron-600" />,
    title: 'Fast Response Time',
    desc: 'Our dedicated trade facilitation team ensures all buyer inquiries are responded to within 24 business hours.',
    color: 'bg-saffron-50 border-saffron-100',
    tag: 'Speed',
    tagColor: 'bb-badge-featured',
  },
  {
    icon: <HeadphonesIcon size={28} className="text-purple-600" />,
    title: 'Dedicated Support',
    desc: 'Multilingual support team assists with trade documentation, shipping, and customs requirements end-to-end.',
    color: 'bg-purple-50 border-purple-100',
    tag: 'Support',
    tagColor: 'bb-badge-new',
  },
  {
    icon: <TrendingUp size={28} className="text-rose-600" />,
    title: 'Live Export Pricing',
    desc: 'Real-time currency conversion with live exchange rates for USD, EUR, GBP, AED, SGD and 15+ currencies.',
    color: 'bg-rose-50 border-rose-100',
    tag: 'Pricing',
    tagColor: 'bb-badge-hot',
  },
];

export default function WhyChooseUs() {
  return (
    <section className="bb-section bg-white">
      <div className="bb-container">
        <div className="text-center mb-14">
          <div className="bb-section-pill">✅ Why BharatBridge</div>
          <h2 className="bb-section-title">Built for Global B2B Trade</h2>
          <p className="bb-section-sub max-w-2xl mx-auto">
            Everything you need to confidently source from India — verified suppliers,
            quality assurance, and dedicated trade support.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {REASONS.map((r) => (
            <div key={r.title}
              className={`group p-6 rounded-2xl border-2 ${r.color} hover:shadow-md transition-all duration-300 hover:-translate-y-0.5`}>
              <div className="flex items-start justify-between mb-4">
                <div className={`w-14 h-14 rounded-2xl bg-white shadow-sm flex items-center justify-center border ${r.color}`}>
                  {r.icon}
                </div>
                <span className={`bb-badge ${r.tagColor}`}>{r.tag}</span>
              </div>
              <h3 className="font-heading font-bold text-slate-900 text-base mb-2 group-hover:text-blue-700 transition-colors">
                {r.title}
              </h3>
              <p className="text-slate-500 text-sm leading-relaxed">{r.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
