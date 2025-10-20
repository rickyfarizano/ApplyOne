import React from 'react'

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
        {/* {
            filtered_jobs.length === 0 ? (
                <tr>
                    <td>No hay trabajos disponibles</td>
                </tr>
            ) : (

            )
        } */}
      </tbody>
    </table>
    </>
  )
}

export default JobsTable