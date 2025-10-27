import api from "./api.js";

/**
 * Permite obtener todos los trabajos de la api
 */
export const getAllJobs = async () => {
    const response = await api.get('/jobs/get-all-jobs')
    return response.data
}

/**
 * Permite obtener una lista de trabajos en base a la plataforma
 * a la cual pertenecen
 * @param platformName Nombre de la plataforma
 */
export const getJobsByPlatform = async (platformName) => {
    const response = await api.get(`/jobs/get-job-by-platform/${platformName}`)
    return response.data
}

/**
 * Permite obtener un trabajo en base a su identificador (id)
 * @param id identificador unico del trabajo
 */
export const getJobById = async (id) => {
    const response = await api.get(`/jobs/get-job-by-id/${id}`)
    return response.data
}

/**
 * Permite enviar la informacion de creacion de un nuevo
 * trabajo hacia la api
 * @param jobData array form-data con toda la informacion del trabajo a crear
 */
export const createJob = async (jobData) => {
    const response = await api.post('/jobs/create-job', jobData)
    return response.data
}

/**
 * Permite enviar la informacion de edicion de un trabajo a la api
 * @param id identificador unico del trabajo a editar
 * @param jobData informacion que se busca actualizar del trabajo (debe estar en formato JSON)
 */
export const editJob = async (id, jobData) => {
    const response = await api.patch(`/jobs/edit-job/${id}`, jobData)
    return response.data
}

export const deleteJob = async (id) => {
    const response = await api.delete(`/jobs/delete-job/${id}`)
    return response.data
}