import { createContext } from 'react';

const createLanguageContext = <Language>(language?: Language) =>
  createContext<Language | undefined>(language);

const createLanguageSetterContext = <Language>(value: {
  setLanguage?: (newLanguage?: Language) => void;
  toggleLanguage?: () => void;
}) =>
  createContext<
    | {
        setLanguage?: (newLanguage?: Language) => void;
        toggleLanguage?: () => void;
      }
    | undefined
  >(value);

const formatCurrency = (
  format?: {
    locale?: string | string[];
    currency?: string;
    minimumFractionDigits?: number;
    maximumFractionDigits?: number;
  },
  price?: number
) => {
  if (price == undefined) return undefined;
  if (format?.locale == undefined) return price;
  const formatter = new Intl.NumberFormat(format.locale, {
    style: 'currency',
    currency: format.currency,
    // These options are needed to round to whole numbers if that's what you want.
    minimumFractionDigits: format.minimumFractionDigits, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
    maximumFractionDigits: format.maximumFractionDigits, // (causes 2500.99 to be printed as $2,501)
  });
  return formatter.format(price);
};

export { createLanguageContext, createLanguageSetterContext, formatCurrency };
