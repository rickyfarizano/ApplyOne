import React from 'react'
import BtnPlatforma from '../../ui/BtnPlataforma/BtnPlatforma.jsx'

import styles from './filtroPlataformasPostulaciones.module.css'

const FiltroPlataformasPostulaciones = ({
    setActualPlatform, 
    allPlatforms,
    actualPlatform,
}) => {
  return (
    <>
    <div className={styles.filtro_plataformas_postulaciones}>
        <div className={styles.container}>
            {
                allPlatforms.map((platform, index) => (
                    <BtnPlatforma
                    setActualPlatform={() => setActualPlatform(platform.platform_name)}
                    platform_name={platform.platform_name} 
                    actualPlatform={actualPlatform}
                    key={index} />
                ))
            }
        </div>
    </div>
    </>
  )
}

export default FiltroPlataformasPostulaciones