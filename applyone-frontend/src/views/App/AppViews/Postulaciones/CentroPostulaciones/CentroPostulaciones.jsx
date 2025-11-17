import React, { useEffect, useState } from 'react'
import styles from './centroPostulaciones.module.css'
import SortIcon from '../../../../../assets/icons/sort-icon.png'
import FiltersIcon from '../../../../../assets/icons/filters-icon.png'
import FiltroPlataformasPostulaciones from '../../../../../components/layout/FiltroPlataformasPostulaciones/FiltroPlataformasPostulaciones.jsx'
import JobsTable from '../../../../../components/layout/JobsTable/JobsTable.jsx'
import ModalForms from '../../../../../components/layout/ModalForms/ModalForms.jsx'
import FormularioCreacionTrabajos from '../../../../../components/layout/FormularioCreacionTrabajos/FormularioCreacionTrabajos.jsx'
import { usePlatforms } from '../../../../../contexts/PlatformsContext.jsx'
import { useJobs } from '../../../../../contexts/JobsContext.jsx' 
import { useJobStates } from '../../../../../contexts/JobStatesContext.jsx'

const CentroPostulaciones = () => {
  const { allPlatforms, setAllPlatforms, actualPlatform, setActualPlatform } = usePlatforms()
  const { jobsXplatform, setJobsXplatform, fetchJobsByPlatform } = useJobs()
  const { jobStates, setJobStates } = useJobStates()

  const [modalState, setModalState] = useState(false)

  useEffect(() => {
    if(!actualPlatform) return;
    fetchJobsByPlatform(actualPlatform)
  }, [actualPlatform])
  return (
    <>
    <section className={styles.centro_postulaciones}>
        <div className={styles.container}>
            <div className={styles.titulo_acciones}>
                <h1 className={styles.title}>Postulaciones</h1>
                <div className={styles.actions}>
                  <a className={styles.btn_add_job} href="#" onClick={() => setModalState(true)}>Agregar postulación<i className="add_job_icon fa-solid fa-plus"></i></a>
                  <a className={styles.sort_by} href="#">Ordenar por <img src={SortIcon} alt="ordenar por" /></a>
                  <a className={styles.filters} href="#">Filtros <img src={FiltersIcon} alt="filtrar por" /></a>
                </div>
            </div>

          <div className={styles.container_jobs}>
            <FiltroPlataformasPostulaciones 
            setActualPlatform={setActualPlatform} 
            actualPlatform={actualPlatform}
            setAllPlatforms={setAllPlatforms}
            allPlatforms={allPlatforms}
            />
            <JobsTable filtered_jobs={jobsXplatform} />
          </div>

          {/* modal del formulario */}
          <ModalForms 
          titleForm="Agregar un nuevo trabajo"
          modalState={modalState}
          setModalState={setModalState}>
            <FormularioCreacionTrabajos
            platform_states={jobStates}
            platforms={allPlatforms}
            />
          </ModalForms>
        </div>
    </section>
    </>
  )
}

export default CentroPostulaciones