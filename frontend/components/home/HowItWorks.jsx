const STEPS = [
  { step: '01', icon: '🔍', title: 'Browse Product Categories',
    desc: 'Explore curated high-quality Made-in-India products — Rice, Spices, Furniture, Chemicals, Millets & more.' },
  { step: '02', icon: '📝', title: 'Submit a Bulk Inquiry',
    desc: 'Tell us your sourcing requirement. Submit one inquiry form and get competitive quotes from verified manufacturers.' },
  { step: '03', icon: '💬', title: 'Receive Quotes & Negotiate',
    desc: 'Get multiple supplier quotes instantly. Negotiate directly for the best factory-direct prices — no middlemen.' },
  { step: '04', icon: '🔒', title: 'Secure Payments & Shipping',
    desc: 'We handle secure payments, international shipping, and customs clearance so you can focus on your business.' },
  { step: '05', icon: '📦', title: 'Receive Your Products',
    desc: 'Get your premium Indian products delivered anywhere in the world — quickly and completely hassle-free.' },
];

export default function HowItWorks() {
  return (
    <section className="py-24" style={{ background: 'linear-gradient(135deg, #0a0f2e, #0d1a4e)' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="text-orange-400 font-semibold uppercase tracking-[0.2em] text-xs">Simple Process</span>
          <h2 className="text-4xl font-black text-white mt-2">How BharatBridge Works</h2>
          <p className="text-blue-200 mt-3 max-w-xl mx-auto">
            From discovery to doorstep — we manage your entire global sourcing journey.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 relative">
          {/* Connector line */}
          <div className="hidden lg:block absolute top-12 left-[10%] right-[10%] h-0.5 bg-orange-500/20 z-0" />

          {STEPS.map((s, i) => (
            <div key={i} className="relative z-10 flex flex-col items-center text-center group">
              {/* Icon circle */}
              <div className="w-24 h-24 rounded-2xl bg-white/5 border border-white/10 flex flex-col items-center justify-center mb-4 group-hover:bg-orange-500/20 group-hover:border-orange-500/50 transition-all duration-300 shadow-lg">
                <span className="text-3xl mb-1">{s.icon}</span>
                <span className="text-orange-400 text-xs font-black">STEP {s.step}</span>
              </div>
              {/* Card */}
              <div className="bg-white/5 border border-white/10 rounded-2xl p-4 hover:bg-white/10 hover:border-orange-500/30 transition-all duration-300">
                <h3 className="text-white font-bold text-sm mb-2">{s.title}</h3>
                <p className="text-blue-300 text-xs leading-relaxed">{s.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
