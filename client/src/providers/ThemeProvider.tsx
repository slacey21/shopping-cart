import React, { ReactNode } from "react";

type ColorTheme = "light" | "dark";

export interface ThemeContextType {
  theme: ColorTheme;
  toggleTheme: () => void;
}

export const ThemeContext = React.createContext<ThemeContextType>({
  theme: "light",
  toggleTheme: () => {throw new Error("No theme: ")},
});

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = React.useState<ColorTheme>('light');

  const toggleTheme = () => setTheme(prev => prev === "light" ? "dark" : "light");

  return (
    <ThemeContext value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext>
  )
}