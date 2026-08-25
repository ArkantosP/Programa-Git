import { create } from 'zustand';

type Currency = 'COP' | 'USD';

interface CurrencyState {
  currency: Currency;
  exchangeRate: number;
  setCurrency: (currency: Currency) => void;
}

export const useCurrencyStore = create<CurrencyState>((set) => ({
  currency: 'COP',
  exchangeRate: 4300,
  setCurrency: (currency) => set({ currency }),
}));
