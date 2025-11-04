import React from 'react'
import styles from './jobsData.module.css'
import { NavLink } from 'react-router-dom' 
import EditIcon from '../../../assets/icons/edit-icon.png'
import DeleteIcon from '../../../assets/icons/delete-icon.png'

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
        <td className={styles.btns}>
            <NavLink className={styles.btn_edit}><img src={EditIcon} alt="Editar" /></NavLink>
            <NavLink className={styles.btn_delete}><img src={DeleteIcon} alt="Eliminar" /></NavLink>
        </td>
    </tr>
    </>
  )
}

export default JobsData