import React from 'react'
import { NavLink } from 'react-router-dom' 

const JobsData = ({
    job_id,
    job_title,
    company_name,
    start_date,
    job_state
}) => {
  return (
    <>
    <tr id={job_id}>
        <td>{job_title}</td>
        <td>{company_name}</td>
        <td>{start_date}</td>
        <td>{job_state}</td>
        <td className='btns'>
            <NavLink>Editar</NavLink>
            <NavLink>Eliminar</NavLink>
        </td>
    </tr>
    </>
  )
}

export default JobsData