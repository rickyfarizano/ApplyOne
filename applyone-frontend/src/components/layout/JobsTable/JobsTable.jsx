import React from 'react'
import JobsData from '../JobsData/JobsData'

const JobsTable = ({filtered_jobs = []}) => {
  return (
    <>
    <table className="jobs">
        <thead>
            <tr>
                <th>Puesto</th>
                <th>Empresa</th>
                <th>Fecha de postulación</th>
                <th>Estado</th>
                <th>Acciones</th>
            </tr>
      </thead>
      <tbody>
        {
            filtered_jobs.length === 0 ? (
                <tr>
                    <td>No hay trabajos disponibles</td>
                </tr>
            ) : (
                filtered_jobs.map(job => (
                    <JobsData
                    job_id={job.id}
                    job_title={job.job_title}
                    company_name={job.company_name}
                    start_date={"00/00/00"}
                    job_state={job.job_state.state_name}
                    key={job.id}
                    />
                ))
            )
        }
      </tbody>
    </table>
    </>
  )
}

export default JobsTable