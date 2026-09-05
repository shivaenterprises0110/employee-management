import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import "leaflet/dist/leaflet.css";
import Home from './pages/LandingPage.jsx'
import Routes from './routes.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes />
    </BrowserRouter>
  </StrictMode>,
)
