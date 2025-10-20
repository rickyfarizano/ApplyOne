import './assets/styles/App.css'
import { Routes, Route } from 'react-router-dom'
import CentroPostulaciones from './views/Postulaciones/CentroPostulaciones/CentroPostulaciones.jsx'
import NavBar from './components/layout/NavBar/NavBar.jsx'

function App() {

  return (
    <>
    <main>
      <NavBar />
      <div className="container">
        <Routes>
          <Route path='/mis-postulaciones/centro-de-postulaciones' element={<CentroPostulaciones />} />
        </Routes>
      </div>
    </main>
    </>
  )
}

export default App
