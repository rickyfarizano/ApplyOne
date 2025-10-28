import axios from "axios"

const api = axios.create({
    baseURL: "http://127.0.0.1:8000/api",
    headers: {
        'Accept': 'application/json',
    }
})

api.interceptors.request.use(
    (config) => {
        // Permite configurar los headers de las peticiones que se envian a la api
        // Cambia automaticamente a form-data o JSON en caso de que c/u sea necesario
        // al momento
        if(config.data instanceof FormData) {
            delete config.headers['Content-Type']
        } else {
            config.headers['Content-Type'] = 'application/json'
        }
        return config
    },
    (error) => Promise.reject(error)
)

api.interceptors.response.use(
    response => response,
    error => {
        if(error.response) {
            console.error("Error en la api", error.response.data)
        } else {    
            console.error("Error al conectar con la pi", error.message)
        }
        return Promise.reject(error)
    },
)

export default api