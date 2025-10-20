import React, { useEffect, useState } from 'react'
import styles from './filtroPlataformasPostulaciones.module.css'
import axios from 'axios'

const FiltroPlataformasPostulaciones = () => {
    const [platforms, setPlatforms] = useState([])

    useEffect(() => {
        const getPlatforms = async () => {
            try {
                const request = await axios.get('http://127.0.0.1:8000/platforms/get-all-platforms')
                setPlatforms(request.data)
                
            } catch (error) {
                console.error("Error al obtener las plataformas", error.message);
            }
        }
        getPlatforms()
    }, [])
  return (
    <>
    <div className="filtro-plataformas-postulaciones">
        <div className="container">

        </div>
    </div>
    </>
  )
}

export default FiltroPlataformasPostulaciones