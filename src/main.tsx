import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from "react-router-dom"

import './/styles/index.css'
import App from './App.tsx'
import Header from './components/Header.tsx'
import Footer from './components/Footer.tsx'

createRoot(document.getElementById('app')!).render(
  <StrictMode>
    <BrowserRouter>
      <Header />
      <App />
      <Footer />
    </BrowserRouter>
  </StrictMode>,
)
