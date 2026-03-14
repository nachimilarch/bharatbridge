const VARIANTS = {
  default:  'bg-slate-100 text-slate-700',
  navy:     'bg-[#1E3A5F] text-white',
  orange:   'bg-orange-100 text-orange-700',
  green:    'bg-green-100 text-green-700',
  red:      'bg-red-100 text-red-700',
  blue:     'bg-blue-100 text-blue-700',
  yellow:   'bg-yellow-100 text-yellow-700',
};

export default function Badge({ children, variant = 'default', className = '' }) {
  return (
    <span
      className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold ${VARIANTS[variant] || VARIANTS.default} ${className}`}
    >
      {children}
    </span>
  );
}
