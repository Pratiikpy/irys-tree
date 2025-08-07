import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.tsx'
import './index.css'

// Providers
import { WalletProvider } from './contexts/WalletContext.tsx'
import { IrysProvider } from './contexts/IrysContext.tsx'
import { ThemeProvider } from './contexts/ThemeContext.tsx'
import { AnalyticsProvider } from './contexts/AnalyticsContext.tsx'
import { Toaster } from './components/ui/Toaster.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <WalletProvider>
        <IrysProvider>
          <ThemeProvider>
            <AnalyticsProvider>
              <App />
              <Toaster />
            </AnalyticsProvider>
          </ThemeProvider>
        </IrysProvider>
      </WalletProvider>
    </BrowserRouter>
  </React.StrictMode>,
) 