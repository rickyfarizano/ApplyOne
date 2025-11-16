import React, { useState } from 'react'
import styles from './modalForms.module.css'

const ModalForms = ({children, titleForm, modalState, setModalState}) => {
  return (
    <>
    <div className={modalState ? styles.open_modal : styles.close_modal}>
      <div className={styles.container_modal}>

        <div className={styles.container_btn_title}>
          <div className={styles.container_btn}>
            <button className={styles.close_modal_btn} onClick={() => setModalState(false)}><i className={`${styles.close_icon} fa-solid fa-xmark`}></i></button>
          </div>
          <div className={styles.container_title}>
            <h2 className={styles.title}>{titleForm}</h2>
          </div>
        </div>

        {children}
      </div>
    </div>
    </>
  )
}

export default ModalForms