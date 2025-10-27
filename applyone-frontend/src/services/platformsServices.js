import api from "./api";

/**
 * Solicita a la api todas las plataformas registradas en la DBB
 */
export const getAllPlatforms = async () => {
    const response = await api.get('/platforms/get-all-platforms')
    return response.data
}

/**
 * Permite enviar a la api datos de una nueva plataforma para que la cree
 * @param platformData datos de la plataforma a crear
 */
export const createPlatforms = async (platformData) => {
    const response = await api.post('/platforms/create-platforms', platformData)
    return response.data
}

/**
 * Permite enviar datos de una plataforma a la api para que la actualice
 * @param platformData datos de la plataforma a editar
 * @param id identificador unico de la plataforma
 */
export const editPlatforms = async (platformData, id) => {
    const response = await api.patch(`/platforms/edit-platforms/${id}`, platformData)
    return response.data
}

/**
 * Permite indicarle a la api que plataforma debe eliminarse
 * @param id identificador unico de la plataforma
 */
export const deletePlatforms = async (id) => {
    const response = await api.delete(`/platforms/delete-platforms/${id}`)
    return response.data
}