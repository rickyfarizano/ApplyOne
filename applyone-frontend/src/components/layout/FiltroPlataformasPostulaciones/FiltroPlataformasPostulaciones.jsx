import React, { useEffect, useState } from 'react'
import BtnPlatforma from '../../ui/BtnPlataforma/BtnPlatforma.jsx'
import { getAllPlatforms } from '../../../services/platformsServices.js'
import styles from './filtroPlataformasPostulaciones.module.css'

const FiltroPlataformasPostulaciones = ({setActualPlatform, setAllPlatforms}) => {
    const [platforms, setPlatforms] = useState([])

    useEffect(() => {
        const getPlatforms = async () => {
            try {
                // llamo al servicio getAllPlatforms
                const request = await getAllPlatforms()
                // console.log(request.data);
                setPlatforms(request)
                setAllPlatforms(request);
                const firstPlatform = request[0]
                setActualPlatform(firstPlatform.platform_name)
                
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
                    setActualPlatform={() => setActualPlatform(platform.platform_name)}
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