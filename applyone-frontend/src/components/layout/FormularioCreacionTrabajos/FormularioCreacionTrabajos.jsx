import React, { useState } from 'react'
import { createJob } from '../../../services/jobsServices.js'
import Joi from 'joi'

const schema = Joi.object({
    job_title: Joi.string().min(5).required().messages({
        'any.required': 'El nombre del trabajo es obligatorio',
        'string.base': 'El titulo del trabajo debe ser un texto',
        'string.empty': 'El nombre del trabajo no puede quedar vacio',
        'string.min': 'El nombre debe tener como minimo 5 caracteres'
    }),
    company_name: Joi.string().min(5).required().messages({
        'any.required': 'El nombre de la empresa es obligatorio',
        'string.base': 'El nombre de la empresa debe ser un texto',
        'string.empty': 'El nombre de la empresa no puede quedar vacio',
        'string.min': 'El nombre de la empresa tener como minimo 5 caracteres'
    }),
    location: Joi.string().optional().allow('').messages({
        'string.base': 'La ubicacion del trabajo debe ser un texto',
    }),
    work_modality_id: Joi.string().required().messages({
        'any.required': 'la modalidad del trabajo es obligatoria',
        'string.base': 'El id de la modalidad del trabajo debe ser un texto',
        'string.empty': 'La modalidad no puede quedar vacia'
    }),
    job_board_id: "1",
    linked_platform_id: Joi.string().required().messages({
        'any.required': 'La seleccion del tablero es obligatorio',
        'string.base': 'El id de la plataforma del trabajo debe ser un texto',
        'string.empty': 'La plataforma es obligatoria'
        
    }),
    job_state_id: Joi.string().required().messages({
        'any.required': 'El estado del trabajo es olbigatorio',
        'string.base': 'El estado del trabajo debe ser un texto',
        'string.empty': 'El estado del trabajo es obligatorio'
    }),
    user_id: Joi.string().required().messages({
        'any.required': 'el id del usuario es obligatorio',
        'string.base': 'El id del ususario debe ser un texto',
        'string.empty': 'El usuario no puede quedar vacio'
    })
})

const FormularioCreacionTrabajos = ({platform_states = [], platforms = [], setJobsUpdated}) => {
    const [formData, setFormData] = useState({
        job_title: "",
        company_name: "",
        location: "",
        work_modality_id: "",
        job_board_id: "1",
        linked_platform_id: "",
        job_state_id: "",
        user_id: "1"
    })

    const [errors, setErrors] = useState({})
    const [successMessage, setSuccessMessage] = useState("") 

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

    /**
     * Permite enviar el formulairo de creacion de trabajos
     */
    const submitForm = async (e) => {
        e.preventDefault()
        // error = objeto que contiene los errores en Joi
        // value = objeto que contiene los datos validados y sanitizados por Joi
        const {error,  value} = schema.validate(formData, {abortEarly: false})
        setSuccessMessage("")

        const newErrors = {}
        if(error) {
            error.details.forEach(detail => {
                newErrors[detail.path] = detail.message
            })

            setErrors(newErrors)
            console.log(`Errores de validacion: ${newErrors}`)
            return 
        }

        // limpio los errores viejos
        setErrors({})
        
        try {
            const formData = new FormData()
            for(const key in value) {
                formData.append(key, value[key])
            }

            const job = await createJob(formData)

            setJobsUpdated(true)

            setFormData({
                job_title: "",
                company_name: "",
                location: "",
                work_modality_id: "",
                job_board_id: "1",
                linked_platform_id: "",
                job_state_id: "",
            })

            // console.log(job)
            setSuccessMessage("Trabajo agregado exitosamente")
        }catch(error) {
            console.error("error al enviar intentar crear un trabajo", error.message)
        }
    }


  return (
    <form className="add_jobs_form"onSubmit={submitForm}>
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

            <fieldset>
                <label htmlFor="job_board">Seleccione el tablero al que pertenece la postulación</label>
                {/* POR AHORA VA A SER UN INPUT NORMAL, DESPUES SE VA A REEMPLAZAR POR UN SELECT CUANDO ESTEN CREADOS LOS ENDPOINTS DE OBTENCIO DE TABLEROS REGISTRADOS */}
                <input 
                type="text" 
                id='job_board' 
                name='job_board_id' 
                placeholder='E.j: Entrevista concretada'  />
            </fieldset>
        </div>

        <div className="grupo">
            <fieldset>
                <label htmlFor="linked_platform_id">Seleccione la plataforma a la que pertenece la postulación</label>
                <select 
                name="linked_platform_id" 
                id="linked_platform_id"
                value={formData.linked_platform_id}
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
                <label htmlFor="states">Seleccione el estado en el que se encuentra la postulación</label>
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
        {/* 
        POR EL MOMENTO VA A QUEDAR ASI, DESPUES SE VA A TENER QUE AGREGAR
        EL ID DE FORMA DINAMICA EN BASE AL USUARIO QUE SE ENCUENTRE LOGGUEADO
        Y AUTENTICADO
        */}
        <input type="text" name='user_id' value="1" hidden />

        <button type='submit'>Agregar trabajo</button>
    </form>
  )
}

export default FormularioCreacionTrabajos