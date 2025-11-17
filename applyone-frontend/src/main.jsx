import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { PlatformsProvider } from './contexts/PlatformsContext.jsx'
import { JobStatesProvider } from './contexts/JobStatesContext.jsx'
import { JobsProvider } from './contexts/JobsContext.jsx'
import './assets/styles/index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <PlatformsProvider>
        <JobsProvider>
          <JobStatesProvider>
            <App />
          </JobStatesProvider>
        </JobsProvider>
      </PlatformsProvider>
    </BrowserRouter>
  </StrictMode>,
)
