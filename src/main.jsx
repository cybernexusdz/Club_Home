import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import {BrowserRouter} from 'react-router-dom'
import App from './App.jsx'
import './index.css'
import {  ThemeContextProvider } from './Context/ThemeContext.jsx'
import { GenderContextProvider } from './Context/GenderContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
    <ThemeContextProvider>
    <GenderContextProvider>
    <App />
    </GenderContextProvider>
    </ThemeContextProvider>
    </BrowserRouter>
  </StrictMode>,
)
