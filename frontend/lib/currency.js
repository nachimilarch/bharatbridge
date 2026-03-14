// Convert INR price to selected currency
export const convertPrice = (amountInr, rates, targetCurrency) => {
  if (targetCurrency === 'INR' || !rates[targetCurrency]) return amountInr;
  // rates[currency] = units of that currency per 1 INR
  return (amountInr * rates[targetCurrency]).toFixed(2);
};

export const formatPrice = (amount, currency) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
    maximumFractionDigits: 2
  }).format(amount);
};
