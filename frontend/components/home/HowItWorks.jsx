import { Search, Send, Handshake } from 'lucide-react';
import Link from 'next/link';

const STEPS = [
  {
    step: '01',
    icon: <Search size={28} className="text-blue-600" />,
    title: 'Browse Export Products',
    desc: 'Search 10,000+ export-quality Indian products across 20+ categories. Filter by country, price, and minimum order.',
    color: 'bg-blue-50 border-blue-100',
    badge: 'bg-blue-700',
  },
  {
    step: '02',
    icon: <Send size={28} className="text-saffron-600" />,
    title: 'Submit Your Inquiry',
    desc: 'Fill out a simple inquiry form with your requirements — product, quantity, destination country, and budget.',
    color: 'bg-saffron-50 border-saffron-100',
    badge: 'bg-saffron-500',
  },
  {
    step: '03',
    icon: <Handshake size={28} className="text-emerald-600" />,
    title: 'Connect with Exporter',
    desc: 'Our team verifies your inquiry and connects you with the most suitable KYC-verified Indian exporter within 24 hours.',
    color: 'bg-emerald-50 border-emerald-100',
    badge: 'bg-emerald-600',
  },
];

export default function HowItWorks() {
  return (
    <section className="bb-section bg-slate-50">
      <div className="bb-container">
        <div className="text-center mb-14">
          <div className="bb-section-pill">⚡ Simple Process</div>
          <h2 className="bb-section-title">How BharatBridge Works</h2>
          <p className="bb-section-sub max-w-xl mx-auto">
            Sourcing Indian export products has never been easier. Three simple steps to connect with verified exporters.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
          {/* Connector line */}
          <div className="hidden md:block absolute top-14 left-1/3 right-1/3 h-0.5 bg-gradient-to-r from-blue-200 via-saffron-200 to-emerald-200 -translate-y-1/2 z-0" />

          {STEPS.map((s, i) => (
            <div key={s.step} className={`bb-card border-2 ${s.color} p-8 text-center relative z-10`}>
              <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl ${s.badge} shadow-lg mb-5`}>
                <span className="text-white font-heading font-black text-xl">{i + 1}</span>
              </div>
              <div className="flex justify-center mb-4">
                <div className={`w-12 h-12 rounded-xl ${s.color} border-2 flex items-center justify-center`}>
                  {s.icon}
                </div>
              </div>
              <h3 className="font-heading font-bold text-slate-900 text-lg mb-3">{s.title}</h3>
              <p className="text-slate-500 text-sm leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>

        <div className="text-center mt-10">
          <Link href="/inquiry" className="bb-btn bb-btn-primary bb-btn-lg btn-shine">
            Submit Your First Inquiry →
          </Link>
        </div>
      </div>
    </section>
  );
}
