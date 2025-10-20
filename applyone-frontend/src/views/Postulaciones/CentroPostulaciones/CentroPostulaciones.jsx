import React, { useEffect, useState } from 'react'
import styles from './centroPostulaciones.module.css'
import FiltroPlataformasPostulaciones from '../../../components/layout/FiltroPlataformasPostulaciones/FiltroPlataformasPostulaciones.jsx'
import axios from 'axios'

const CentroPostulaciones = () => {
  const [actualPlatform, setActualPlatform] = useState()
  const [jobs_x_platform, setJobs_x_platform] = useState([])

  useEffect(() => {
    if(!actualPlatform) return;
    const getJobsXplatform = async (actualPlatform) => {
      try {
        const request = await axios.get(`http://127.0.0.1:8000/jobs/get-job-by-platform/${actualPlatform}`);
        setJobs_x_platform(request.data);
        // console.log(request.data)
      } catch (error) {
        console.error("Error al obtener los trabajos", error.message);
      }
    }
    getJobsXplatform(actualPlatform)
  }, [actualPlatform])
  return (
    <>
    <section className="centro-postulaciones">
        <div className="container">
            <div className="titulo-acciones">
                <h1 className="titulo">Postulaciones</h1>
                <a href="">Agregar postulacion</a>
            </div>

          <div className="container_jobs">
            <FiltroPlataformasPostulaciones setActualPlatform={setActualPlatform} />

          </div>
        </div>
    </section>
    </>
  )
}

export default CentroPostulaciones