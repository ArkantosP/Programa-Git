import { useMemo } from 'react';
import { useCurrencyStore } from '../store/currencyStore';

/**
 * Custom hook for currency formatting and conversion
 */
export const useCurrency = () => {
  const { currency, formatPrice, convertPrice, toggleCurrency } = useCurrencyStore();

  const format = (priceInUSD) => {
    return formatPrice(priceInUSD);
  };

  const convert = (priceInUSD) => {
    return convertPrice(priceInUSD);
  };

  return {
    currency,
    format,
    convert,
    toggleCurrency
  };
};

/**
 * Hook to format a single price
 */
export const useFormattedPrice = (priceInUSD) => {
  const { formatPrice } = useCurrencyStore();
  const currency = useCurrencyStore((state) => state.currency);
  
  const formatted = useMemo(() => {
    return formatPrice(priceInUSD);
  }, [priceInUSD, currency, formatPrice]);

  return formatted;
};
