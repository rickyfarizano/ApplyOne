import React, { useState } from 'react'
import { createJob } from '../../../services/jobsServices.js'
import joi from 'joi'

// 3. validar inputs del form
// TODO parsear el salario antes de que se pushee al form-data

const schema = {
    job_title: joi.string().min(5).required().messages({
        'any.required': 'El nombre del trabajo es obligatorio',
        'string.base': 'El titulo del trabajo debe ser un texto',
        'string.empty': 'El nombre del trabajo no puede quedar vacio',
        'string.min': 'El nombre debe tener como minimo 5 caracteres'
    }),
    company_name: joi.string().min(5).required().messages({
        'any.required': 'El nombre de la empresa es obligatorio',
        'string.base': 'El nombre de la empresa debe ser un texto',
        'string.empty': 'El nombre de la empresa no puede quedar vacio',
        'string.min': 'El nombre de la empresa tener como minimo 5 caracteres'
    }),
    salary: joi.number().messages({
        'number.base': 'El sueldo del trabajo debe ser un numero',
        'number.integer': 'El sueldo del trabajo debe ser un numero entero'
    }),
    location: joi.string().messages({
        'string.base': 'La ubicacion del trabajo debe ser un texto'
    }),
    direction: joi.string().messages({
        'string.base': 'La direccion del trabajo debe ser un texto'
    }),
    work_modality_id: joi.string().messages({
        'string.base': 'El id de la modalidad del trabajo debe ser un texto'
    }),
    job_board_id: "1",
    platform_id: joi.string().messages({
        'string.base': 'El id de la plataforma del trabajo debe ser un texto'
    }),
    job_state_id: joi.string().messages({
        'string.base': 'El estado del trabajo debe ser un texto'
    }),

}

const FormularioCreacionTrabajos = ({platform_states = [], platforms = [], setJobsUpdated}) => {
    const [formData, setFormData] = useState({
        job_title: "",
        company_name: "",
        salary: "",
        location: "",
        direction: "",
        work_modality_id: "",
        job_board_id: "1",
        platform_id: "",
        job_state_id: "",
    })

    /**
     * Almacena los valores ingresados en cada input en el momento en el que hay un cambio
     * en ese input en cuestion
     */
    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData((prev) => ({
            ...prev,
            [name]: value
        }))
    }

    const submitForm = async (e) => {
        e.preventDefault()
        try {
            const data = new FormData()
            for(const key in formData) {
                data.append(key, formData[key])
            }

            const response = await createJob(data)

            // Indico que los trabajos fueron actualizados
            setJobsUpdated(true)
            
            setFormData({
                job_title: "",
                company_name: "",
                salary: "",
                location: "",
                direction: "",
                work_modality_id: "",
                job_board_id: "1",
                platform_id: "",
                job_state_id: "",
            })

            // console.log("formulario enviado con éxito", response)
        }catch(err) {
            console.error("Error al enviar el formulario", err.message)
        }
    }


  return (
    <form onSubmit={submitForm}>
        <div className="grupo">
            <fieldset>
                <label htmlFor="job-title">Nombre del trabajo</label>
                <input 
                type="text" 
                name="job_title" 
                id="job-job-title" 
                placeholder='E.j: Desarrollador web'
                value={formData.job_title}
                onChange={handleChange}
                />
            </fieldset>

            <fieldset>
                <label htmlFor="company-name">Nombre de la empresa</label>
                <input 
                type="text" 
                name="company_name" 
                id="company-name" 
                placeholder='E.j: Google'
                value={formData.company_name}
                onChange={handleChange}
                />
            </fieldset>
        </div>

        <div className="grupo">
            <fieldset>
                <label htmlFor="salary">Ingrese el sueldo</label>
                <input 
                type="number" 
                name="salary" 
                id="salary" 
                placeholder='E.j: 800.000AR$'
                value={formData.salary}
                onChange={handleChange}
                />
            </fieldset>

            <fieldset>
                <label htmlFor="location">Ingrese la ubicación</label>
                <input 
                type="text" 
                name="location" 
                id="location" 
                placeholder='E.j: Argentina, Buenos Aires'
                value={formData.location}
                onChange={handleChange}
                />
            </fieldset>
        </div>

        <div className="grupo">
            <fieldset>
                <label htmlFor="salary">Ingrese la dirección</label>
                <input 
                type="text" 
                name="direction" 
                id="direction" 
                placeholder='E.j: Luis Viale y Boyaca 1235'
                value={formData.direction}
                onChange={handleChange}
                />
            </fieldset>

            <fieldset>
                <label htmlFor="work_modality_id">Seleccione la modalidad de la postulacion</label>
                <select 
                name="work_modality_id" 
                id="work_modality_id" 
                value={formData.work_modality_id} 
                onChange={handleChange}>
                    <option value="">Seleccione una opcion</option>
                    <option value="1">Presencial</option>
                    <option value="2">Hibrido</option>
                    <option value="3">Online</option>
                </select>
            </fieldset>
        </div>

        <div className="grupo">
            <fieldset>
                <label htmlFor="platform">Seleccione la plataforma a la que pertenece</label>
                <select 
                name="platform_id" 
                id="platform"
                value={FormData.platform_id}
                onChange={handleChange}
                >
                    <option value="">Seleccione una opcion</option>
                    {
                        platforms.map(platform => (
                            <option 
                            key={platform.id} 
                            value={platform.id}>
                            {platform.platform_name}
                            </option>
                        ))
                    }
                </select>
            </fieldset>

            <fieldset>
                <label htmlFor="states">Seleccione el estado en el que se encuentra la postulacion</label>
                <select 
                name="job_state_id" 
                id="states"
                value={formData.job_state_id}
                onChange={handleChange}
                >
                    <option value="">Seleccione una opcion</option>
                    {
                        platform_states.map(platform_state => (
                            <option key={platform_state.id} value={platform_state.id}>{platform_state.state_name}</option>
                        ))
                    }
                </select>
            </fieldset>
        </div>

        <button type='submit'>Agregar trabajo</button>
    </form>
  )
}

export default FormularioCreacionTrabajos