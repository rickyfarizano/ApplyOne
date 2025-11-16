import React from 'react'
import styles from './headerApp.module.css'

const HeaderApp = () => {
  return (
    <>
    <header className={styles.header_app}>
        <div className={styles.container}>
            <button className={styles.link_platform}>Vincular una plataforma <i className={`${styles.link_icon} fa-solid fa-link`}></i></button>
            <a className={styles.btn_close_session} href="#"><i className="close_session_icon fa-solid fa-arrow-right-from-bracket"></i></a>
        </div>
    </header>
    </>
  )
}

export default HeaderApp