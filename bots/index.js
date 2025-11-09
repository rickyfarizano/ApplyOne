import dotenv from "dotenv"
import express from 'express'
dotenv.config()

const app = express();
app.use(express.json())



// PASOS PARA HACER EL SCRAPING:
// 1. Obtener la plataforma que se quiere scrappear y extraer sus credenciales y url haciendo una peticion a la api de backend
// 2. pasarle al scrapper los recursos y credenciales obtenidos de esa plataforma
// 3. utilizar esos recursos con puppeteer para que pueda ingresar a la plataforma en cuestion con las credenciales




app.listen(process.env.PORT, () => console.log("scrapper running on: http://127.0.0.1:6000"))