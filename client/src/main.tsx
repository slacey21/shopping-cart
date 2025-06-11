import { createRoot } from 'react-dom/client'
import './assets/index.css'
import App from './App.tsx';
import { ThemeProvider } from './providers/ThemeProvider.tsx';
import { CurrencyProvider } from './providers/CurrencyProvider.tsx';
import React from "react";

createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider>
      <CurrencyProvider>
        <App />
      </CurrencyProvider>
    </ThemeProvider>
  </React.StrictMode>
);
