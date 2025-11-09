import dotenv from 'dotenv'
import axios from 'axios'
import puppeteer from 'puppeteer'
import { puppeteerConfig } from '../config/puppeteerConfig.js'

/**
 * Permite obtener los datos de las postulaciones de un usuario a partir de una
 * plataforma en concreto
 */
export const scrapPlatformService = async (userId, platformName) => {
    try {
        const platformData = await axios.get(`${process.env.API_URL}linked-platforms/get-platform-by-name/${userId}/${platformName}`)
        // return platformData.data

        if(!platformData.data) {
            throw new Error("No se encontraron datos para la plataforma especificada")
        }
        
        const {platform_link, platform_username, platform_password} = platformData.data
        const browser = await puppeteer.launch(puppeteerConfig)
        const page = await browser.newPage()
        await page.goto(platform_link, {waitUntil: "networkidle2"})
        await page.type("#Email", platform_username)
        await page.click("#continueWithMailButton")
        await page.type("#password", platform_password)
        await page.click("#btnSubmitPass")

        await page.waitForNavigation({ waitUntil: "networkidle2" })
        console.log("Inicio de sesión exitoso!")

    } catch (err) {
        console.error("Error al hacer scrapping de la plataforma", err.message)
    }
}