import { createRoot } from 'react-dom/client'
import './assets/index.css'
import App from './App.tsx';
import { ThemeProvider } from './providers/ThemeProvider.tsx';
import React from "react";

createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </React.StrictMode>
);
