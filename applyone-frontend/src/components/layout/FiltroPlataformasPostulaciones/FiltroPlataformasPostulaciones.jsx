import React, { useEffect, useState } from 'react'
import BtnPlatforma from '../../ui/BtnPlataforma/BtnPlatforma.jsx'
import { getAllLinkedPlatforms } from '../../../services/platformsServices.js'
import styles from './filtroPlataformasPostulaciones.module.css'

const FiltroPlataformasPostulaciones = ({
    setActualPlatform, 
    setAllPlatforms, 
    actualPlatform
}) => {
    const [platforms, setPlatforms] = useState([])

    useEffect(() => {
        const getLinkedPlatforms = async () => {
            try {
                // llamo al servicio getAllPlatforms
                const request = await getAllLinkedPlatforms()
                // console.log(request);
                setPlatforms(request)
                setAllPlatforms(request);
                const firstPlatform = request[0]
                setActualPlatform(firstPlatform.platform_name)
                
            } catch (error) {
                console.error("Error al obtener las plataformas", error.message);
            }
        }
        getLinkedPlatforms()
    }, [])
  return (
    <>
    <div className={styles.filtro_plataformas_postulaciones}>
        <div className={styles.container}>
            {
                platforms.map(platform => (
                    <BtnPlatforma
                    setActualPlatform={() => setActualPlatform(platform.platform_name)}
                    platform_name={platform.platform_name} 
                    actualPlatform={actualPlatform}
                    key={platform.id} />
                ))
            }
        </div>
    </div>
    </>
  )
}

export default FiltroPlataformasPostulaciones