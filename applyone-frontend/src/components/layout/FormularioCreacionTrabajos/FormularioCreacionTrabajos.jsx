import React from 'react'

const FormularioCreacionTrabajos = ({platform_states = [], platforms = []}) => {
  return (
    <form>
        <div className="grupo">
            <fieldset>
                <label htmlFor="job-name">Nombre del trabajo</label>
                <input type="text" name="job-name" id="job-name" placeholder='E.j: Desarrollador web' />
            </fieldset>

            <fieldset>
                <label htmlFor="company-name">Nombre de la empresa</label>
                <input type="text" name="company-name" id="comapny-name" placeholder='E.j: Google' />
            </fieldset>
        </div>

        <div className="grupo">
            <fieldset>
                <label htmlFor="salary">Ingrese el sueldo</label>
                <input type="number" name="salary" id="salary" placeholder='E.j: 800.000AR$' />
            </fieldset>

            <fieldset>
                <label htmlFor="location">Ingrese la ubicación</label>
                <input type="text" name="location" id="location" placeholder='E.j: Argentina, Buenos Aires' />
            </fieldset>
        </div>

        <div className="grupo">
            <fieldset>
                <label htmlFor="salary">Ingrese la dirección</label>
                <input type="text" name="direction" id="direction" placeholder='E.j: Luis Viale y Boyaca 1235' />
            </fieldset>

            <fieldset>
                <label htmlFor="work_modality_id">Seleccione la modalidad de la postulacion</label>
                <select name="work_modality_id" id="work_modality_id">
                    <option value="1">Presencial</option>
                    <option value="2">Hibrido</option>
                    <option value="3">Online</option>
                </select>
            </fieldset>
        </div>

        <div className="grupo">
            <fieldset>
                <label htmlFor="platform">Seleccione la plataforma a la que pertenece</label>
                <select name="platform_id" id="platform">
                    {
                        platforms.map(platform => (
                            <option key={platform.id} value={platform.id}>{platform.platform_name}</option>
                        ))
                    }
                </select>
            </fieldset>

            <fieldset>
                <label htmlFor="states">Seleccione el estado en el que se encuentra la postulacion</label>
                <select name="job_state_id" id="states">
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