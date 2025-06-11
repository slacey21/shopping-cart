import React, { ReactNode } from "react";

type Currency = "usd" | "eur";

export interface CurrencyContextType {
  currency: Currency;
  toggleCurrency: () => void;
}

export const CurrencyContext = React.createContext<CurrencyContextType>({
  currency: "usd",
  toggleCurrency: () => {throw new Error("No currency")},
});

export function CurrencyProvider({ children }: { children: ReactNode }) {
  const [currency, setCurrency] = React.useState<Currency>('usd');

  const toggleCurrency = () => setCurrency(prev => prev === "usd" ? "eur" : "usd");

  return (
    <CurrencyContext value={{ currency, toggleCurrency }}>
      {children}
    </CurrencyContext>
  )
}