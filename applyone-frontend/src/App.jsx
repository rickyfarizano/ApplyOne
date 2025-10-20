import './assets/styles/App.css'
import { Routes, Route } from 'react-router-dom'
import CentroPostulaciones from './views/Postulaciones/CentroPostulaciones/CentroPostulaciones'

function App() {

  return (
    <>
    <main>
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
