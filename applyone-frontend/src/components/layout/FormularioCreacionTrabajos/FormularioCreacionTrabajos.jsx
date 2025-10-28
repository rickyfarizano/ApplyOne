import React, { useState } from 'react'

// 2. Crear form-data con los valores de los input
// 3. validar inputs del form
// 4. enviar form-data a la api

const FormularioCreacionTrabajos = ({platform_states = [], platforms = []}) => {
    const [formData, setFormData] = useState({
        job_name: "",
        company_name: "",
        salary: "",
        location: "",
        direction: "",
        work_modality_id: "",
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


  return (
    <form>
        <div className="grupo">
            <fieldset>
                <label htmlFor="job-name">Nombre del trabajo</label>
                <input 
                type="text" 
                name="job_name" 
                id="job-name" 
                placeholder='E.j: Desarrollador web'
                value={formData.job_name}
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