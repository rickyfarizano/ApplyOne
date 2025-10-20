import React, { useEffect, useState } from 'react'
import BtnPlatforma from '../../ui/BtnPlataforma/BtnPlatforma.jsx'
import styles from './filtroPlataformasPostulaciones.module.css'
import axios from 'axios'

const FiltroPlataformasPostulaciones = () => {
    const [platforms, setPlatforms] = useState([])

    useEffect(() => {
        const getPlatforms = async () => {
            try {
                const request = await axios.get('http://127.0.0.1:8000/platforms/get-all-platforms')
                console.log(request.data);
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
            {
                platforms.map(platform => (
                    <BtnPlatforma 
                    platform_name={platform.platform_name} 
                    key={platform.id} />
                ))
            }
        </div>
    </div>
    </>
  )
}

export default FiltroPlataformasPostulaciones