import api from "./api.js";

/**
 * Solicita a la api todas las plataformas registradas en la DBB
 */
export const getAllLinkedPlatforms = async () => {
    const response = await api.get('/linked-platforms/get-all-linked-platforms')
    return response.data
}

/**
 * Solicita a la api devolver una plataforma registrada en base al id de un usuario
 * y al nombre de dicha plataforma
 * @param userId numero identificador unico del usuario
 * @param platformName nombre de la plataforma registrada que se quiere obtener
 */
export const getLinkedPlatformByName = async (userId, platformName) => {
    const response = axios.get(`/linked-platforms/get-platform-by-name/${userId}/${platformName}`)
    return response.data
}

/**
 * Permite enviar a la api datos de una nueva plataforma para que la cree
 * @param platformData datos de la plataforma a crear
 */
export const registerNewPlatform = async (platformData) => {
    const response = await api.post('/linked-platforms/register-platform', platformData)
    return response.data
}

/**
 * Permite enviar datos de una plataforma a la api para que la actualice
 * @param platformData datos de la plataforma a editar
 * @param id identificador unico de la plataforma
 */
export const updateLinkedPlatform = async (platformData, id) => {
    const response = await api.patch(`/linked-platforms/edit-platform/${id}`, platformData)
    return response.data
}

/**
 * Permite indicarle a la api que plataforma debe eliminarse
 * @param id identificador unico de la plataforma
 */
export const deleteLinkedPlatform = async (id) => {
    const response = await api.delete(`/linked-platforms/delete-platform/${id}`)
    return response.data
}