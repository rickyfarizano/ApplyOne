import './assets/styles/App.css'
import { Routes, Route } from 'react-router-dom'

function App() {

  return (
    <>
    <main>
      <div className="container">
        <Routes>
          <Route path='/mis-postulaciones/centro-de-postulaciones' Component={""} />
        </Routes>
      </div>
    </main>
    </>
  )
}

export default App
