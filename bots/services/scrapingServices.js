import dotenv from 'dotenv'
import axios from 'axios'

/**
 * Permite obtener los datos de las postulaciones de un usuario a partir de una
 * plataforma en concreto
 */
export const scrapPlatformService = async (userId, platformName) => {
    try {
        const apiResponse = await axios.get(`${process.env.API_URL}linked-platforms/get-platform-by-name/${userId}/${platformName}`)
        return apiResponse.data
    } catch (err) {
        console.error("Error al hacer scrapping de la plataforma", err.message)
    }
}