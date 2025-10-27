import api from "./api.js";

/**
 * Solicita a la api todos los estados registrados de los trabajos
 */
export const getAllJobStates = async () => {
    const response = await api.get('/job-states/get-all-states')
    return response.data
}

/**
 * Permite enviar a la api informacion de un nuevo estado de trabajo para crear
 * @param {Object} stateData informacion del estado a crear
 */
export const createJobState = async (stateData) => {
    const response = await api.post('/job-states/create-job-state', stateData)
    return response.data
}

/**
 * Permite enviar a la api informacion de un estado que se busca reemplazar por la actual
 * @param {Object} stateData informacion del estado a editar
 * @param {Number} id identificador unico del estado
 */
export const editJobState = async (stateData, id) => {
    const response = await api.put(`/job-states/edit-job-state/${id}`, stateData)
    return response.data
}

/**
 * Permite indicar a la api un estado que se desea eliminar
 * @param {Number} id identificador unico del estado
 */
export const deleteJObState = async (id) => {
    const response = await api.delete(`/job-states/delete-job-state/${id}`)
    return response.data
}