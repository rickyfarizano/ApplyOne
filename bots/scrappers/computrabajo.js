import puppeteer from "puppeteer"
import { puppeteerConfig } from "../config/puppeteerConfig.js"

export const scrapeComputrabajo = async (user) => {
  const browser = await puppeteer.launch(puppeteerConfig)
  const page = await browser.newPage()
  const jobs = []

  try {
    // Ir al login
    await page.goto("https://www.computrabajo.com.ar/Acceso", { waitUntil: "networkidle2" })

    // Login solo si el usuario pasó credenciales
    if (user.username && user.password) {
      await page.type("#Email", user.username, { delay: 50 })
      await page.type("#Password", user.password, { delay: 50 })
      await page.click("button[type=submit]")
      await page.waitForNavigation({ waitUntil: "networkidle2" })
    }

    // Ir al perfil de postulaciones
    await page.goto(user.profile_url, { waitUntil: "networkidle2" })
    await page.waitForSelector(".bRS.bClick") // selector típico de ofertas

    // Extraer trabajos
    const scrapedJobs = await page.evaluate(() => {
      const jobElements = document.querySelectorAll(".bRS.bClick")
      return Array.from(jobElements).map(el => ({
        title: el.querySelector("h2")?.innerText.trim() || "",
        company: el.querySelector(".it-emp")?.innerText.trim() || "",
        location: el.querySelector(".fs16")?.innerText.trim() || "",
        link: el.querySelector("a")?.href || "",
      }))
    })

    jobs.push(...scrapedJobs)
  } catch (err) {
    console.error("Error en el scraping de Computrabajo:", err.message)
  } finally {
    await browser.close()
  }

  return jobs
}
