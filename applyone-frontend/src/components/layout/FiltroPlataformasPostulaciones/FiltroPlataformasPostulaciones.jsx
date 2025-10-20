import React, { useEffect, useState } from 'react'
import BtnPlatforma from '../../ui/BtnPlataforma/BtnPlatforma.jsx'
import styles from './filtroPlataformasPostulaciones.module.css'
import axios from 'axios'

const FiltroPlataformasPostulaciones = ({setActualPlatform, setAllPlatforms}) => {
    const [platforms, setPlatforms] = useState([])

    useEffect(() => {
        const getPlatforms = async () => {
            try {
                const request = await axios.get('http://127.0.0.1:8000/platforms/get-all-platforms')
                // console.log(request.data);
                setPlatforms(request.data)
                setAllPlatforms(request.data);
                const firstPlatform = request.data[0]
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