import dotenv from "dotenv"
import { getUsers, sendJobs } from "./services/apiService.js"
import { scrapeComputrabajo } from "./scrapers/computrabajo.js"

dotenv.config()

const runScraping = async () => {
  console.log("Iniciando scraping de Computrabajo...")

  try {
    const users = await getUsers()

    for (const user of users) {
      if (user.platform.toLowerCase() !== "computrabajo") continue

      console.log(`Scrapeando trabajos para ${user.username}...`)
      const jobs = await scrapeComputrabajo(user)

      if (jobs.length > 0) {
        await sendJobs(user.id, jobs)
        console.log(`${jobs.length} trabajos enviados para ${user.username}`)
      } else {
        console.log(`No se encontraron trabajos para ${user.username}`)
      }
    }
  } catch (error) {
    console.error("Error en el scraping:", error.message)
  }
}

runScraping()
