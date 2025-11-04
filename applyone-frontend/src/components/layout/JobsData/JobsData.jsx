import React from 'react'
import styles from './jobsData.module.css'
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
    <tr id={job_id} className={styles.job_item}>
        <td className={styles.job_title_field}>{job_title}</td>
        <td className='company_name_field'>{company_name}</td>
        <td className='date_field'>{start_date}</td>
        <td className='state_field'>{job_state}</td>
        <td className='btns'>
            <NavLink>Editar</NavLink>
            <NavLink>Eliminar</NavLink>
        </td>
    </tr>
    </>
  )
}

export default JobsData