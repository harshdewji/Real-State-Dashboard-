/**
 * EstateEase Currency Formatter for Indian Rupees (₹)
 */

const CURRENCY = import.meta.env?.VITE_CURRENCY_SYMBOL || '₹';

export const formatPriceInRupees = (amount, isRent = false, compact = true) => {
  if (amount === undefined || amount === null || isNaN(amount)) return `${CURRENCY}0`;

  const num = Number(amount);

  if (isRent) {
    if (compact && num >= 100000) {
      const lakhs = (num / 100000).toFixed(1).replace(/\.0$/, '');
      return `${CURRENCY}${lakhs}L/mo`;
    }
    return `${CURRENCY}${num.toLocaleString('en-IN')}/mo`;
  }

  // Buy properties: format in Crores or Lakhs
  if (compact) {
    if (num >= 10000000) {
      const cr = (num / 10000000).toFixed(2).replace(/\.00$/, '').replace(/(\.[0-9])0$/, '$1');
      return `${CURRENCY}${cr} Cr`;
    }
    if (num >= 100000) {
      const lakh = (num / 100000).toFixed(2).replace(/\.00$/, '').replace(/(\.[0-9])0$/, '$1');
      return `${CURRENCY}${lakh} Lakh`;
    }
  }

  return `${CURRENCY}${num.toLocaleString('en-IN')}`;
};

export const formatFullRupees = (amount, isRent = false) => {
  if (!amount && amount !== 0) return `${CURRENCY}0`;
  const num = Number(amount);
  return `${CURRENCY}${num.toLocaleString('en-IN')}${isRent ? '/mo' : ''}`;
};

