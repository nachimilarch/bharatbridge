'use client';
import { createContext, useContext, useState, useEffect } from 'react';
import api from '@/lib/api';

const CurrencyContext = createContext(null);

const SUPPORTED_CURRENCIES = [
  { code: 'USD', symbol: '$', name: 'US Dollar', flag: '🇺🇸' },
  { code: 'EUR', symbol: '€', name: 'Euro', flag: '🇪🇺' },
  { code: 'GBP', symbol: '£', name: 'British Pound', flag: '🇬🇧' },
  { code: 'AED', symbol: 'د.إ', name: 'UAE Dirham', flag: '🇦🇪' },
  { code: 'AUD', symbol: 'A$', name: 'Australian Dollar', flag: '🇦🇺' },
  { code: 'CAD', symbol: 'C$', name: 'Canadian Dollar', flag: '🇨🇦' },
  { code: 'SGD', symbol: 'S$', name: 'Singapore Dollar', flag: '🇸🇬' },
  { code: 'JPY', symbol: '¥', name: 'Japanese Yen', flag: '🇯🇵' },
  { code: 'INR', symbol: '₹', name: 'Indian Rupee', flag: '🇮🇳' },
];

export const CurrencyProvider = ({ children }) => {
  const [currency, setCurrencyState] = useState(
    process.env.NEXT_PUBLIC_DEFAULT_CURRENCY || 'USD'
  );
  const [rates, setRates] = useState({});
  const [ratesLoading, setRatesLoading] = useState(true);

  useEffect(() => {
    const saved = typeof window !== 'undefined' ? localStorage.getItem('bb_currency') : null;
    if (saved) setCurrencyState(saved);
  }, []);

  useEffect(() => {
    api.get('/currency/rates')
      .then(({ data }) => setRates(data.data.rates || {}))
      .catch(() => console.warn('Currency rates unavailable'))
      .finally(() => setRatesLoading(false));
  }, []);

  const setCurrency = (code) => {
    setCurrencyState(code);
    if (typeof window !== 'undefined') localStorage.setItem('bb_currency', code);
  };

  const convert = (amountInr) => {
    if (!amountInr) return null;
    if (currency === 'INR') return parseFloat(amountInr);
    const rate = rates[currency];
    if (!rate) return parseFloat(amountInr);
    return parseFloat(amountInr) * rate;
  };

  const format = (amountInr) => {
    const converted = convert(amountInr);
    if (converted === null) return '—';
    try {
      return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency,
        maximumFractionDigits: currency === 'JPY' ? 0 : 2,
      }).format(converted);
    } catch {
      const sym = SUPPORTED_CURRENCIES.find((c) => c.code === currency)?.symbol || currency;
      return `${sym}${converted.toFixed(2)}`;
    }
  };

  return (
    <CurrencyContext.Provider value={{ currency, setCurrency, rates, ratesLoading, convert, format, SUPPORTED_CURRENCIES }}>
      {children}
    </CurrencyContext.Provider>
  );
};

export const useCurrency = () => {
  const ctx = useContext(CurrencyContext);
  if (!ctx) throw new Error('useCurrency must be used inside CurrencyProvider');
  return ctx;
};
