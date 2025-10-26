import React, { useEffect, useState } from 'react'
import styles from './centroPostulaciones.module.css'
import FiltroPlataformasPostulaciones from '../../../components/layout/FiltroPlataformasPostulaciones/FiltroPlataformasPostulaciones.jsx'
import JobsTable from '../../../components/layout/JobsTable/JobsTable.jsx'
import FormularioCreacionTrabajos from '../../../components/layout/FormularioCreacionTrabajos/FormularioCreacionTrabajos.jsx'
import axios from 'axios'

const CentroPostulaciones = () => {
  const [allPlatforms, setAllPlatforms] = useState([])
  const [actualPlatform, setActualPlatform] = useState()
  const [jobs_x_platform, setJobs_x_platform] = useState([])
  const [jobStates, setJobStates] = useState([])


  useEffect(() => {
    if(!actualPlatform) return;
    const getJobsXplatform = async (actualPlatform) => {
      try {
        if(!allPlatforms.includes(actualPlatform)) {
          setJobs_x_platform([])
        }
        const request = await axios.get(`http://127.0.0.1:8000/jobs/get-job-by-platform/${actualPlatform}`);
        setJobs_x_platform(request.data);
        // console.log(request.data)
      } catch (error) {
        console.error("Error al obtener los trabajos", error.message);
      }
    }
    getJobsXplatform(actualPlatform)
  }, [actualPlatform])

  useEffect(() => {
    const getAllStates = async () => {
      try {
        const request = await axios.get('http://127.0.0.1:8000/job-states/get-all-states');
        setJobStates(request.data)
      } catch (error) {
        console.error("Error al obtener los trabajos", error.message);
      }
    }

    getAllStates();
  }, [])
  return (
    <>
    <section className={styles.centro_postulaciones}>
        <div className={styles.container}>
            <div className={styles.titulo_acciones}>
                <h1 className="titulo">Postulaciones</h1>
                <a href="">Agregar postulacion</a>
            </div>

          <div className="container_jobs">
            <FiltroPlataformasPostulaciones setActualPlatform={setActualPlatform} setAllPlatforms={setAllPlatforms} />
            <JobsTable filtered_jobs={jobs_x_platform} />
          </div>

          {/* modal del formulario */}
          {/* <div className="modal_formulario">
            <div className="modal_data">
              <div className="container_btn">
                <button className='close_modal'>X</button>
              </div>

              <FormularioCreacionTrabajos
              platform_states={jobStates}
              platforms={allPlatforms}
              />
            </div>
          </div> */}
        </div>
    </section>
    </>
  )
}

export default CentroPostulaciones