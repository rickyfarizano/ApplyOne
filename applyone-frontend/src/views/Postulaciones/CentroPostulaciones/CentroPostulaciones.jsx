import React from 'react'
import styles from './centroPostulaciones.module.css'
import FiltroPlataformasPostulaciones from '../../../components/layout/FiltroPlataformasPostulaciones/FiltroPlataformasPostulaciones.jsx'

const CentroPostulaciones = () => {
  return (
    <>
    <section className="centro-postulaciones">
        <div className="container">
            <div className="titulo-acciones">
                <h1 className="titulo">Postulaciones</h1>
                <a href="">Agregar postulacion</a>
            </div>

        <FiltroPlataformasPostulaciones />
        </div>
    </section>
    </>
  )
}

export default CentroPostulaciones