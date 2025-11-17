import React, { useState } from 'react'
import ErrorMessage from '../../ui/ErrorMessage/ErrorMessage.jsx'
import { registerNewPlatform } from '../../../services/platformsServices.js'
import { usePlatforms } from '../../../contexts/PlatformsContext.jsx'
import Joi from 'joi'
import styles from './linkPlatformsForm.module.css'

const schema = Joi.object({
    user_id: "1",
    platform_name: Joi.string().min(3).required().messages({
        'string.base': 'El nombre de la paltaforma debe ser un texto',
        'string.min': 'El nombre de la plataforma debe tener como minimo 3 caracteres',
        'any.required': 'El nombre de la plataforma es obligatorio y no puede quedar vacio'
    }),
    platform_link: Joi.string().min(3).required().messages({
        'string.base': 'El link de la paltaforma debe ser un texto',
        'string.min': 'El link de la plataforma debe tener como minimo 3 caracteres',
        'any.required': 'El link de la plataforma es obligatorio y no puede quedar vacio'
    }),
    platform_username: Joi.string().min(3).required().messages({
        'string.base': 'El nombre de usuario de la paltaforma debe ser un texto',
        'string.min': 'El nombre de usuario de la plataforma debe tener como minimo 3 caracteres',
        'any.required': 'El nombre de la plataforma es obligatorio y no puede quedar vacio'
    }),
    platform_password: Joi.string().min(3).required().messages({
        'string.base': 'La contraseña de la paltaforma debe ser un texto',
        'string.min': 'La contraseña de la plataforma debe tener como minimo 3 caracteres',
        'any.required': 'La contraseña de la plataforma es obligatoria y no puede quedar vacia'
    }),
})

const LinkPlatformsForm = ({isOpen, setIsOpen}) => {
      const [formData, setFormData] = useState({
      user_id: "1",
      platform_name: "",
      platform_link: "",
      platform_username: "",
      platform_password: ""
    })

    const {allPlatforms, setAllPlatforms} = usePlatforms()

    const [errors, setErrors] = useState({})
    const [successMessage, setSuccessMessage] = useState("") 

    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }

    /**
     * Permite enviar el formulairo de creacion de trabajos
     */
    const submitForm = async (e) => {
        e.preventDefault()
        // error = objeto que contiene los errores en Joi
        // value = objeto que contiene los datos validados y sanitizados por Joi
        const {error,  value} = schema.validate(formData, {abortEarly: false})
        setSuccessMessage("")
    
        const newErrors = {}
        if(error) {
            error.details.forEach(detail => {
                newErrors[detail.path] = detail.message
            })
    
            setErrors(newErrors)
            console.log(`Errores de validacion: ${newErrors}`)
            return 
        }
    
        // limpio los errores viejos
        setErrors({})
        
        try {
            const data = new FormData()
            for(const key in value) {
                data.append(key, value[key])
            }
    
            const linked_platform = await registerNewPlatform(data)
    
            setFormData({
                user_id: "1",
                platform_name: "",
                platform_link: "",
                platform_username: "",
                platform_password: ""
            })

            setAllPlatforms(data => [...data, formData])
    
            // console.log(linked_platform)
            setSuccessMessage("Plataforma vinculada exitosamente")
        }catch(error) {
            console.error("error al intentar vincular la plataforma", error.message)
        }
    }

  return (
    <div className={ isOpen ? styles.open_link_platform_modal : styles.close_link_platform_modal }>
        <div className={styles.container_btn}>
            <button onClick={() => setIsOpen(false)} className={styles.close_modal_btn}><i className={`${styles.close_icon} fa-solid fa-xmark`}></i></button>
        </div>
        
        <div className={styles.container}>
            <div className={styles.container_title}>
                <h2 className={styles.title}>Vincular una nueva plataforma</h2>
            </div>

            <form className={styles.link_platform_form} onSubmit={submitForm}>
                {/* 
                    ID DEL USUARIO. POR EL MOMENTO VA A AGREGARSE DE FORMA MANUAL
                    DESPUES SE VA A AGREGAR DE MANERA DINAMICA EN BASE AL USUARIO
                    LOGUEADO
                */}
                <input type="text" name='user_id' value="1" onChange={handleChange} hidden />

                <fieldset className={styles.fieldset}>
                    <label className={styles.label} htmlFor="platform_name">Ingrese el nombre de la plataforma</label>
                    <input 
                    type="text" 
                    className={styles.link_form_input}
                    id='platform_name' 
                    name='platform_name' 
                    placeholder='E.j: Computrabajo'
                    value={formData.platform_name}
                    onChange={handleChange} />
                    {
                        errors.platform_name && (
                            <ErrorMessage errorText={errors.platform_name} />
                        )
                    }
                </fieldset>

                <fieldset className={styles.fieldset}>
                    <label className={styles.label} htmlFor="platform_link">Ingrese el link de la plataforma</label>
                    <input 
                    type="text" 
                    className={styles.link_form_input} 
                    id='platform_link' 
                    name='platform_link' 
                    placeholder='E.j: http://ar.computrabajo.com'
                    value={formData.platform_link}
                    onChange={handleChange} />
                    {
                        errors.platform_password && (
                            <ErrorMessage errorText={errors.platform_password} />
                        )
                    }
                </fieldset>

                <fieldset className={styles.fieldset}>
                    <label className={styles.label} htmlFor="platform_username">Ingrese su nombre de usuario registrado en la plataforma</label>
                    <input 
                    type="text" 
                    className={styles.link_form_input} 
                    id='platform_username' 
                    name='platform_username' 
                    placeholder='E.j: coreo@correo.com' 
                    value={formData.platform_username}
                    onChange={handleChange} />
                    {
                        errors.platform_username && (
                            <ErrorMessage errorText={errors.platform_username} />
                        )
                    }
                </fieldset>

                <fieldset className={styles.fieldset}>
                    <label className={styles.label} htmlFor="platform_password">Ingrese su contraseña registrada en la plataforma</label>
                    <input 
                    type="password" 
                    className={styles.link_form_input} 
                    id='platform_password' 
                    name='platform_password' 
                    placeholder='E.j: contraseña12345'
                    value={formData.platform_password}
                    onChange={handleChange} />
                    {
                        errors.platform_password && (
                            <ErrorMessage errorText={errors.platform_password} />
                        )
                    }
                </fieldset>

                <button className={styles.link_platform_button} type='submit'>Vincular plataforma</button>
            </form>
        </div>

    </div>
  )
}

export default LinkPlatformsForm