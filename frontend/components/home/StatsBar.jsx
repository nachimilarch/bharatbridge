const STATS = [
  { value: '500+',  label: 'Verified Manufacturers', icon: '🏭' },
  { value: '50+',   label: 'Countries Served',        icon: '🌍' },
  { value: '10K+',  label: 'Inquiries Fulfilled',     icon: '💼' },
  { value: '8',     label: 'Product Categories',      icon: '📦' },
  { value: '100%',  label: 'KYC Verified Vendors',    icon: '✅' },
];

export default function StatsBar() {
  return (
    <div className="bg-orange-500">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {STATS.map((s) => (
            <div key={s.label} className="flex items-center gap-3 text-white">
              <span className="text-2xl">{s.icon}</span>
              <div>
                <div className="font-black text-xl leading-tight">{s.value}</div>
                <div className="text-orange-100 text-xs font-medium">{s.label}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
