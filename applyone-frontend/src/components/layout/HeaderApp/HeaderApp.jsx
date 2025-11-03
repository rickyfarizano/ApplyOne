import React from 'react'
import styles from './headerApp.module.css'

const HeaderApp = () => {
  return (
    <>
    <header className={styles.header_app}>
        <div className={styles.container}>
            <a className={styles.btn_close_session} href="#"><i className="close_session_icon fa-solid fa-arrow-right-from-bracket"></i></a>
        </div>
    </header>
    </>
  )
}

export default HeaderApp