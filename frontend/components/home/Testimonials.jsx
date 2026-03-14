const TESTIMONIALS = [
  {
    name:    'James Whitfield',
    company: 'NaturalOrigins Ltd, UK',
    flag:    '🇬🇧',
    text:    'BharatBridge connected us with three verified spice exporters within 24 hours of submitting our inquiry. The quality verification process gave us confidence to place a $50,000 first order.',
    rating:  5,
    avatar:  'JW',
    product: 'Indian Spices',
    color:   'bg-blue-50 border-blue-100',
  },
  {
    name:    'Fatima Al-Rashid',
    company: 'AlGulf Trading, UAE',
    flag:    '🇦🇪',
    text:    'We source Ayurvedic products for our wellness chain. BharatBridge made it incredibly simple — verified vendors, clear pricing, and excellent support throughout the import process.',
    rating:  5,
    avatar:  'FA',
    product: 'Ayurvedic Products',
    color:   'bg-emerald-50 border-emerald-100',
  },
  {
    name:    'Marcus Hoffmann',
    company: 'EuroTextile GmbH, Germany',
    flag:    '🇩🇪',
    text:    'Found a reliable cotton fabric supplier from Surat through BharatBridge. The vendor was GST and IEC verified. We have been importing consistently for 8 months now.',
    rating:  5,
    avatar:  'MH',
    product: 'Textiles & Fabrics',
    color:   'bg-purple-50 border-purple-100',
  },
];

export default function Testimonials() {
  return (
    <section className="bb-section bg-white">
      <div className="bb-container">
        <div className="text-center mb-12">
          <div className="bb-section-pill">⭐ Buyer Reviews</div>
          <h2 className="bb-section-title">Trusted by Global Buyers</h2>
          <p className="bb-section-sub max-w-xl mx-auto">
            Buyers from 50+ countries trust BharatBridge to find reliable Indian exporters.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TESTIMONIALS.map((t) => (
            <div key={t.name} className={`bb-card border-2 ${t.color} p-7`}>
              {/* Stars */}
              <div className="flex gap-1 mb-4">
                {Array.from({ length: t.rating }).map((_, i) => (
                  <span key={i} className="text-saffron-500 text-lg">★</span>
                ))}
              </div>

              <p className="text-slate-700 text-sm leading-relaxed mb-6 italic">
                "{t.text}"
              </p>

              <div className="flex items-center gap-3 pt-4 border-t border-slate-100">
                <div className="w-10 h-10 bg-blue-700 rounded-xl flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                  {t.avatar}
                </div>
                <div>
                  <div className="font-heading font-bold text-slate-900 text-sm flex items-center gap-1">
                    {t.flag} {t.name}
                  </div>
                  <div className="text-slate-400 text-xs">{t.company}</div>
                </div>
                <span className="ml-auto bb-badge bb-badge-export text-[10px]">
                  {t.product}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
