import axios from 'axios'
import puppeteer from 'puppeteer'
import FormData from 'form-data'
import { puppeteerConfig } from '../config/puppeteerConfig.js'

export const scrapPlatformService = async (userId, platformName) => {
  try {
    // =====================================
    // Obtener datos de la plataforma
    // =====================================
    const platformData = await axios.get(`${process.env.API_URL}linked-platforms/get-platform-by-name/${userId}/${platformName}`)
    const platformPasswd = await axios.get(`${process.env.API_URL}linked-platforms/get-password/${userId}/${platformName}`)

    if (!platformData.data) throw new Error("No se encontraron datos para la plataforma especificada")

    const { platform_link, platform_username } = platformData.data.platform
    const { platform_password } = platformPasswd.data

    console.log("🔐 Contraseña desencriptada:", platform_password)

    // =====================================
    // Iniciar Puppeteer y loguearse
    // =====================================
    const browser = await puppeteer.launch(puppeteerConfig)
    const page = await browser.newPage()
    await page.goto(platform_link, { waitUntil: "networkidle2" })

    // Flujo de login
    await page.waitForSelector(".b_primary", { visible: true, timeout: 15000 })
    await page.click(".b_primary")
    await page.waitForSelector(".b_primary_inv", { visible: true })
    await page.click(".b_primary_inv")

    await page.waitForSelector(".it-email", { visible: true })
    await page.type(".it-email", platform_username, { delay: 50 })

    await page.waitForSelector("#continueWithMailButton", { visible: true })
    await page.click("#continueWithMailButton")

    await page.waitForSelector(".cm-12", { visible: true })
    await page.type(".cm-12", platform_password, { delay: 50 })
    await page.click("#btnSubmitPass")

    await page.waitForNavigation({ waitUntil: "networkidle2", timeout: 20000 })
    console.log("✅ Sesión iniciada correctamente")

    // =====================================
    // Ir a "Mis postulaciones"
    // =====================================
    await page.waitForFunction(() => {
      const elements = document.querySelectorAll('span.link .txt_link')
      return Array.from(elements).some(el => el.innerText.trim() === 'Mis postulaciones')
    })

    await page.evaluate(() => {
      const links = Array.from(document.querySelectorAll('span.link'))
      const target = links.find(el => el.querySelector('.txt_link')?.innerText.trim() === 'Mis postulaciones')
      if (target) target.click()
    })

    console.log("🕒 Esperando que se carguen las postulaciones...")

    // =====================================
    // Esperar que las .box estén listas
    // =====================================
    await page.waitForFunction(() => document.querySelectorAll('.box').length > 0, { timeout: 30000 })
    console.log("✅ Boxes detectadas, comenzando extracción...")

    // =====================================
    // Extraer información de cada .box
    // =====================================
    const postulaciones = await page.evaluate(() => {
      const results = []
      const boxes = document.querySelectorAll('.box.dFlex.hover')

      boxes.forEach(box => {
        // ---------------------------
        // EXTRACCIÓN DE INFORMACIÓN
        // ---------------------------

        const job_title = box.querySelector('h1.fs18.fwB.mAll0')?.innerText?.trim() || null
        const company_name = box.querySelector('p.fs16.fc_base.mt5.dIB_m')?.innerText?.trim() || null
        const location = box.querySelector('p.fs16.fc_base.dIB_m')?.innerText?.trim() || null

        // Modalidad del trabajo
        let work_modality_id = 1 // valor por defecto: presencial
        let job_board_id = 1 // board por defecto
        const platform_id = 1 // plataforma Computrabajo

        // Estado de la postulación
        let job_state = box.querySelector('.fc_link.fs16.fwB.dIB_m')?.innerText?.trim() || null
        let job_state_id = null

        switch (job_state) {
          case "Postulado":
            job_state_id = 1
            break
          case "CV Visto":
            job_state_id = 2
            break
          case "En proceso":
            job_state_id = 3
            break
          case "Finalista":
            job_state_id = 4
            break
        }

        const lowerTitle = (job_title || '').toLowerCase()

        if (lowerTitle.includes('remoto') || lowerTitle.includes('home office')) {
          work_modality_id = 3 // online
        } else if (lowerTitle.includes('híbrido')) {
          work_modality_id = 2 // híbrido
        }

        // ------------------------------------
        // CONSTRUCCIÓN DEL OBJETO FINAL
        // ------------------------------------
        results.push({
          job_title: job_title || null,
          company_name: company_name || null,
          location: location || null,
          work_modality_id: work_modality_id || 1,
          job_board_id: job_board_id,
          platform_id: platform_id,
          job_state_id: job_state_id || null
        })
      })

      return results
    })

    // =====================================
    // Mostrar resultado final
    // =====================================
    console.log("📦 Postulaciones obtenidas:")
    console.log(JSON.stringify(postulaciones, null, 2))

    // =====================================
    // Registrar postulaciones en la BDD
    // =====================================
    console.log("🗂️ Enviando postulaciones al servidor...")

    for (const job of postulaciones) {
      try {
        const formData = new FormData()
        formData.append('job_title', job.job_title)
        formData.append('company_name', job.company_name)
        formData.append('location', job.location)
        formData.append('work_modality_id', job.work_modality_id)
        formData.append('job_board_id', job.job_board_id)
        formData.append('platform_id', job.platform_id)
        formData.append('job_state_id', job.job_state_id)

        const response = await axios.post(
          `${process.env.API_URL}jobs/create-job`,
          formData,
          { headers: formData.getHeaders() }
        )

        console.log(`== Job registrado correctamente: ${job.job_title}`)
      } catch (error) {
        console.error(`❌ Error al registrar ${job.job_title}:`, error.message)
      }
    }

    console.log("🎯 Proceso finalizado correctamente.")
    await browser.close()

  } catch (err) {
    console.error("❌ Error al hacer scrapping de la plataforma:", err.message)
    return []
  }
}
