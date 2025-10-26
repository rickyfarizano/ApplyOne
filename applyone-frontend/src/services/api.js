import axios from "axios"

const api = axios.create({
    baseURL: "http://127.0.0.1:8000",
    headers: {
        'Accept': 'application/json'
    }
})

api.interceptors.response.use(
    response => response,
    error => {
        console.log("Error al conectar con la api", error.message)
        return Promise.reject(error)
    }
)

export default api