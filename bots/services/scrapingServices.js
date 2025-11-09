import dotenv from 'dotenv'
import axios from 'axios'
import puppeteer from 'puppeteer'
import { puppeteerConfig } from '../config/puppeteerConfig.js'

export const scrapPlatformService = async (userId, platformName) => {
  try {
    // Obtener datos de la plataforma y contraseña
    const platformData = await axios.get(`${process.env.API_URL}linked-platforms/get-platform-by-name/${userId}/${platformName}`)
    const platformPasswd = await axios.get(`${process.env.API_URL}linked-platforms/get-password/${userId}/${platformName}`)

    if (!platformData.data) throw new Error("No se encontraron datos para la plataforma especificada")

    const { platform_link, platform_username } = platformData.data.platform
    const { platform_password } = platformPasswd.data

    console.log("Contraseña desencriptada:", platform_password)

    // Lanzar navegador
    const browser = await puppeteer.launch(puppeteerConfig)
    const page = await browser.newPage()
    await page.goto(platform_link, { waitUntil: "networkidle2" })

    // Iniciar sesión
    await page.waitForSelector(".b_primary", { visible: true, timeout: 15000 })
    await page.click(".b_primary")
    await page.waitForSelector(".b_primary_inv", { visible: true })
    await page.click(".b_primary_inv")

    await page.waitForSelector(".it-email", { visible: true })
    await page.type(".it-email", platform_username, { delay: 50 })

    await page.waitForSelector("#continueWithMailButton", { visible: true, timeout: 15000 })
    await page.click("#continueWithMailButton")

    await page.waitForSelector(".cm-12", { visible: true, timeout: 15000 })
    await page.type(".cm-12", platform_password, { delay: 50 })
    await page.click("#btnSubmitPass")

    await page.waitForNavigation({ waitUntil: "networkidle2", timeout: 20000 })
    console.log("✅ Sesión iniciada correctamente")

    // Ir a "Mis postulaciones"
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

    // Esperar hasta que aparezcan las .box (espera flexible si carga por AJAX)
    await page.waitForFunction(() => {
      const boxes = document.querySelectorAll('.box')
      return boxes.length > 0
    }, { timeout: 30000 })

    console.log("✅ Boxes detectadas, comenzando extracción...")

    const allBoxes = []
    let pageNum = 1

    while (true) {
      // Esperar a que se rendericen los boxes visibles
      await page.waitForSelector('.box', { visible: true })

      const boxesData = await page.evaluate(() => {
        const boxes = Array.from(document.querySelectorAll('.box'))
        return boxes.map(box => {
          const title = box.querySelector('h1')?.innerText.trim() || null
          const company = box.querySelector('p.fs16.fc_base.mt5.dIB_m')?.innerText.trim() || null
          const location = Array.from(box.querySelectorAll('p.fs16.fc_base.dIB_m'))?.[0]?.innerText.trim() || null
          const status = box.querySelector('p.fc_link.fs16.fwB.dIB_m')?.innerText.trim() || null
          const date = box.querySelector('p.fc_aux.fs13.dIB_m')?.innerText.trim() || null

          return { title, company, location, status, date }
        })
      })

      console.log(`📄 Página ${pageNum} → ${boxesData.length} resultados`)
      allBoxes.push(...boxesData)

      // Intentar ir a la siguiente página si existe
      const hasNext = await page.evaluate(() => {
        const nextBtn = document.querySelector('.pagination .next:not(.disabled), a[rel="next"]')
        if (nextBtn) {
          nextBtn.scrollIntoView({ behavior: 'smooth', block: 'center' })
          nextBtn.click()
          return true
        }
        return false
      })

      if (!hasNext) break

      pageNum++
      // Esperar que carguen nuevas boxes (detectando cambio de contenido)
      await page.waitForFunction((prevCount) => {
        return document.querySelectorAll('.box').length !== prevCount
      }, {}, allBoxes.length).catch(() => {})
      await page.waitForTimeout(2000)
    }

    console.log(`✅ Scraping finalizado: ${allBoxes.length} postulaciones encontradas.`)
    await browser.close()

    return allBoxes

  } catch (err) {
    console.error("❌ Error al hacer scrapping de la plataforma:", err.message)
    return []
  }
}
