import { ShieldCheck, Globe, Clock, Award } from 'lucide-react';

const STATS = [
  { icon: <ShieldCheck className="text-emerald-600" size={22} />, value: '500+',  label: 'KYC Verified Exporters',   bg: 'border-emerald-100 bg-emerald-50/50' },
  { icon: <Globe        className="text-blue-600"   size={22} />, value: '50+',   label: 'Countries Served',         bg: 'border-blue-100 bg-blue-50/50' },
  { icon: <Award        className="text-saffron-600" size={22} />, value: '10K+', label: 'Export Products Listed',    bg: 'border-saffron-100 bg-saffron-50/50' },
  { icon: <Clock        className="text-indigo-600" size={22} />, value: '24hrs', label: 'Average Response Time',     bg: 'border-indigo-100 bg-indigo-50/50' },
];

export default function TrustBar() {
  return (
    <section className="bg-white py-8 border-b border-slate-100">
      <div className="bb-container">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {STATS.map((s) => (
            <div key={s.label} className={`flex items-center gap-3 p-4 rounded-xl border ${s.bg}`}>
              <div className="flex-shrink-0">{s.icon}</div>
              <div>
                <div className="font-heading font-black text-2xl text-slate-900 leading-none">{s.value}</div>
                <div className="text-xs text-slate-500 mt-0.5 font-medium">{s.label}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
