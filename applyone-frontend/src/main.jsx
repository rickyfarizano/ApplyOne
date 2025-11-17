import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { PlatformsProvider } from './contexts/PlatformsContext.jsx'
import { JobsProvider } from './contexts/JobsContext.jsx'
import './assets/styles/index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <PlatformsProvider>
        <JobsProvider>
          <App />
        </JobsProvider>
      </PlatformsProvider>
    </BrowserRouter>
  </StrictMode>,
)
