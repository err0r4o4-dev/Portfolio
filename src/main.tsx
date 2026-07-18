import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from "react-router-dom"

import './/styles/index.css'
import App from './App.tsx'
import Header from './components/Header.tsx'
import Footer from './components/Footer.tsx'
import LanguageProvider from './LanguageProvider.tsx'

createRoot(document.getElementById('app')!).render(
  <StrictMode>
    <BrowserRouter>
      <LanguageProvider>
        <Header />
        <App />
        <Footer />
      </LanguageProvider>
    </BrowserRouter>
  </StrictMode>,
)
