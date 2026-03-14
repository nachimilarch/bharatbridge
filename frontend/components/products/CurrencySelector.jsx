'use client';
import { useCurrency } from '@/context/CurrencyContext';

const CURRENCIES = [
  { code: 'USD', symbol: '$', flag: '🇺🇸', label: 'USD' },
  { code: 'EUR', symbol: '€', flag: '🇪🇺', label: 'EUR' },
  { code: 'GBP', symbol: '£', flag: '🇬🇧', label: 'GBP' },
  { code: 'AED', symbol: 'د.إ', flag: '🇦🇪', label: 'AED' },
  { code: 'INR', symbol: '₹', flag: '🇮🇳', label: 'INR' },
  { code: 'SGD', symbol: 'S$', flag: '🇸🇬', label: 'SGD' },
  { code: 'AUD', symbol: 'A$', flag: '🇦🇺', label: 'AUD' },
];

export default function CurrencySelector({ className = '' }) {
  const { currency, setCurrency } = useCurrency();
  const current = CURRENCIES.find((c) => c.code === currency) || CURRENCIES[0];

  return (
    <div className={`relative inline-flex items-center ${className}`}>
      <span className="absolute left-2.5 text-sm pointer-events-none">{current.flag}</span>
      <select
        value={currency}
        onChange={(e) => setCurrency(e.target.value)}
        className="pl-8 pr-6 py-1.5 text-xs font-semibold bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1E3A5F]/30 focus:border-[#1E3A5F] appearance-none cursor-pointer text-slate-700 hover:border-slate-300 transition"
      >
        {CURRENCIES.map((c) => (
          <option key={c.code} value={c.code}>
            {c.flag} {c.label}
          </option>
        ))}
      </select>
      <svg className="absolute right-2 w-3 h-3 text-slate-400 pointer-events-none" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
      </svg>
    </div>
  );
}
