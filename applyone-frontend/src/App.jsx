import './assets/styles/App.css'
import { Routes, Route } from 'react-router-dom'
import AppLayout from './views/App/AppLayout/AppLayout.jsx'
import CentroPostulaciones from './views/App/AppViews/Postulaciones/CentroPostulaciones/CentroPostulaciones.jsx'

function App() {
  return (
    <>
    <Routes>
      {/* Rutas LandingPage */}
      <Route path='/'/>

      {/* Rutas App */}
      <Route element={<AppLayout/>}>
        <Route path='/app/mis-postulaciones/centro-postulaciones' element={<CentroPostulaciones/>} />
      </Route>
    </Routes>
    </>
  )
}

export default App
