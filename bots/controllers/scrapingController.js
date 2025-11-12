import { scrapPlatformService } from "../services/scrapingServices.js"

/**
 * Recibe las peticiones enviadas al scrapper.
 * Si hay algun error al procesar la peticion se 
 * informa dicho error, sino se sigue adelante
 */
export const scraperController = async (req, res) => {
    try {
        const {userId, platformName} = req.params
        const platform = await scrapPlatformService(userId, platformName)
        
        res.status(200).json({
            message: "plataforma obtenida con exito!",
            // platform_data: platform
        })
    }catch(err) {
        res.status(500).json({
            message: "Error realizar la peticion",
            details: err.message
        })
    }
}