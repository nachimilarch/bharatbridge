const REASONS = [
  { icon: '✅', title: 'KYC Verified Manufacturers',
    desc: 'Every vendor undergoes strict KYC verification including IEC code, GST and business registration.' },
  { icon: '🏆', title: 'Export Quality Products',
    desc: 'Products meet international standards including ISO, FSSAI and BIS certifications for global markets.' },
  { icon: '🌍', title: 'Global Sourcing Network',
    desc: 'Connect with manufacturers from 28 Indian states covering all major export hubs across India.' },
  { icon: '⚡', title: '24-Hour Response Time',
    desc: 'Our trade facilitation team responds to all buyer inquiries within 24 business hours.' },
  { icon: '🛥️', title: 'Shipping & Customs Handled',
    desc: 'We manage international shipping, freight forwarding and complete customs clearance for you.' },
  { icon: '💰', title: 'Best Factory-Direct Prices',
    desc: 'No middlemen. Connect directly with manufacturers and negotiate the best bulk order pricing.' },
];

export default function WhyChooseUs() {
  return (
    <section className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="text-orange-500 font-semibold uppercase tracking-[0.2em] text-xs">Why BharatBridge</span>
          <h2 className="text-4xl font-black text-gray-900 mt-2">The Smartest Way to Source from India</h2>
          <p className="text-gray-500 text-lg mt-3 max-w-2xl mx-auto">
            Join 10,000+ global buyers who trust BharatBridge for reliable, verified Indian manufacturing sourcing.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {REASONS.map((r, i) => (
            <div key={i} className="bg-white rounded-2xl p-7 border border-gray-100 hover:shadow-xl hover:-translate-y-1 hover:border-orange-100 transition-all duration-300 group">
              <div className="w-14 h-14 rounded-2xl bg-orange-50 border border-orange-100 flex items-center justify-center text-2xl mb-5 group-hover:bg-orange-500 group-hover:scale-110 transition-all duration-300">
                {r.icon}
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">{r.title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed">{r.desc}</p>
            </div>
          ))}
        </div>

        {/* Trust logos strip */}
        <div className="mt-16 text-center">
          <p className="text-gray-400 text-sm uppercase tracking-widest mb-6">Trusted by buyers from</p>
          <div className="flex flex-wrap justify-center gap-8 items-center">
            {['🇺🇸 USA', '🇬🇧 UK', '🇦🇪 UAE', '🇩🇪 Germany', '🇦🇺 Australia', '🇨🇦 Canada', '🇯🇵 Japan'].map(c => (
              <span key={c} className="text-gray-500 font-medium text-sm bg-white border border-gray-200 rounded-full px-5 py-2 shadow-sm">{c}</span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
