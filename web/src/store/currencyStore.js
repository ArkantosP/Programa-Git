import { create } from 'zustand';

const EXCHANGE_RATE_USD_TO_COP = 4300;

export const useCurrencyStore = create((set, get) => ({
  currency: localStorage.getItem('currency') || 'USD',
  exchangeRate: EXCHANGE_RATE_USD_TO_COP,

  setCurrency: (currency) => {
    set({ currency });
    localStorage.setItem('currency', currency);
  },

  toggleCurrency: () => {
    const newCurrency = get().currency === 'USD' ? 'COP' : 'USD';
    get().setCurrency(newCurrency);
  },

  formatPrice: (priceInUSD) => {
    const { currency, exchangeRate } = get();
    
    if (currency === 'COP') {
      const priceInCOP = priceInUSD * exchangeRate;
      return {
        value: priceInCOP,
        formatted: `$${Math.round(priceInCOP).toLocaleString('es-CO')}`,
        symbol: '$',
        currency: 'COP'
      };
    }
    
    return {
      value: priceInUSD,
      formatted: `$${priceInUSD.toFixed(2)}`,
      symbol: '$',
      currency: 'USD'
    };
  },

  convertPrice: (priceInUSD) => {
    const { currency, exchangeRate } = get();
    return currency === 'COP' ? priceInUSD * exchangeRate : priceInUSD;
  }
}));
