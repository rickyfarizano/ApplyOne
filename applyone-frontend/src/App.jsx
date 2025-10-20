import { Routes, Route } from "react-router-dom"
import CentroPostulaciones from './views/Postulaciones/CentroPostulaciones/CentroPostulaciones.jsx'

function App() {
  return (
    <>
      <main>
        <div className="container">
          <Routes>
            <Route path="/mis-postulaciones/centro-de-postulaciones" Component={<CentroPostulaciones/>} />
          </Routes>
        </div>
      </main>
    </>
  )
}

export default App
