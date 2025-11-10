import dotenv from 'dotenv'
import axios from 'axios'
import puppeteer from 'puppeteer'
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

        // Título del trabajo
        const job_title = box.querySelector('h1.fs18.fwB.mAll0')?.innerText?.trim() || null

        // Nombre de la empresa
        const company_name = box.querySelector('p.fs16.fc_base.mt5.dIB_m')?.innerText?.trim() || null

        // Ubicación
        const location = box.querySelector('p.fs16.fc_base.dIB_m')?.innerText?.trim() || null

        // Descripción breve o estado ("Postulado", "En proceso", etc.)
        const job_description = box.querySelector('p.fc_link.fs16.fwB.dIB_m')?.innerText?.trim() || null

        // Información auxiliar (usamos este campo como salary provisional)
        const salary = box.querySelector('p.fc_aux.fs13.dIB_m')?.innerText?.trim() || null

        // Link a la oferta (data-shortcut-see-offer)
        const direction = box.querySelector('[data-shortcut-see-offer]')?.getAttribute('data-shortcut-see-offer') || null

        // Nombre de la plataforma (fijo)
        const platform_name = 'Computrabajo'

        // Modalidad del trabajo
        let work_modality_id = 1 // valor por defecto: presencial
        const lowerTitle = (job_title || '').toLowerCase()
        const lowerDesc = (job_description || '').toLowerCase()

        if (lowerTitle.includes('remoto') || lowerDesc.includes('remoto') || lowerTitle.includes('home office')) {
          work_modality_id = 3 // online
        } else if (lowerTitle.includes('híbrido') || lowerDesc.includes('híbrido')) {
          work_modality_id = 2 // híbrido
        }

        // ------------------------------------
        // CONSTRUCCIÓN DEL OBJETO FINAL
        // ------------------------------------
        results.push({
          job_title: job_title || null,
          company_name: company_name || null,
          job_description: job_description || null,
          salary: salary || null,
          location: location || null,
          direction: direction || null,
          work_modality_id: work_modality_id || 1,
          platform_name: platform_name || 'Computrabajo'
        })
      })

      return results
    })

    // =====================================
    // 6️⃣ Mostrar resultado final
    // =====================================
    console.log("📦 Postulaciones obtenidas:")
    console.log(JSON.stringify(postulaciones, null, 2))

    // await browser.close()
    return postulaciones

  } catch (err) {
    console.error("❌ Error al hacer scrapping de la plataforma:", err.message)
    return []
  }
}
