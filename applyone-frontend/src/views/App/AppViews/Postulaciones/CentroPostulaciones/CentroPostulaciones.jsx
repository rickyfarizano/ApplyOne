import React, { useEffect, useState } from 'react'
import styles from './centroPostulaciones.module.css'
import SortIcon from '../../../../../assets/icons/sort-icon.png'
import FiltersIcon from '../../../../../assets/icons/filters-icon.png'
import FiltroPlataformasPostulaciones from '../../../../../components/layout/FiltroPlataformasPostulaciones/FiltroPlataformasPostulaciones.jsx'
import JobsTable from '../../../../../components/layout/JobsTable/JobsTable.jsx'
import FormularioCreacionTrabajos from '../../../../../components/layout/FormularioCreacionTrabajos/FormularioCreacionTrabajos.jsx'
import { getJobsByPlatform } from '../../../../../services/jobsServices.js'
import { getAllJobStates } from '../../../../../services/jobStatesServices.js'

const CentroPostulaciones = () => {
  const [jobsUpdated, setJobsUpdated] = useState(false)
  const [allPlatforms, setAllPlatforms] = useState([])
  const [actualPlatform, setActualPlatform] = useState()
  const [jobs_x_platform, setJobs_x_platform] = useState([])
  const [jobStates, setJobStates] = useState([])


  useEffect(() => {
    if(!actualPlatform) return;
    // reinicio setJobsUpdated
    setJobsUpdated(false)
    const getJobsXplatform = async (actualPlatform) => {
      try {
        if(!allPlatforms.includes(actualPlatform)) {
          setJobs_x_platform([])
        }

        // utilizo el service para obtener trabajos por una plataforma concreta
        const request = await getJobsByPlatform(actualPlatform);
        console.log(request)
        setJobs_x_platform(request);
        // console.log(request)
      } catch (error) {
        console.error("Error al obtener los trabajos", error.message);
      }
    }
    getJobsXplatform(actualPlatform)
  }, [actualPlatform, allPlatforms, jobsUpdated])

  useEffect(() => {
    const getAllStates = async () => {
      try {
        // utilizo el service para obtener los estados de los trabajos
        const request = await getAllJobStates();
        setJobStates(request)
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
                <h1 className={styles.title}>Postulaciones</h1>
                <div className={styles.actions}>
                  <a className={styles.btn_add_job} href="#">Agregar postulación<i className="add_job_icon fa-solid fa-plus"></i></a>
                  <a className={styles.sort_by} href="#">Ordenar por <img src={SortIcon} alt="ordenar por" /></a>
                  <a className={styles.filters} href="#">Filtros <img src={FiltersIcon} alt="filtrar por" /></a>
                </div>
            </div>

          <div className={styles.container_jobs}>
            <FiltroPlataformasPostulaciones 
            setActualPlatform={setActualPlatform} 
            setAllPlatforms={setAllPlatforms} 
            actualPlatform={actualPlatform}
            />
            <JobsTable filtered_jobs={jobs_x_platform} />
          </div>

          {/* modal del formulario */}
          <div className="modal_formulario">
            <div className="modal_data">
              <div className="container_btn">
                <button className='close_modal'>X</button>
              </div>

              <FormularioCreacionTrabajos
              platform_states={jobStates}
              platforms={allPlatforms}
              setJobsUpdated={setJobsUpdated}
              />
            </div>
          </div>
        </div>
    </section>
    </>
  )
}

export default CentroPostulaciones