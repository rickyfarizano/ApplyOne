import React from 'react'
import Joi from 'joi'

const schema = Joi.object({
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

const LinkPlatformsForm = () => {
  return (
    <div className="link_platform_modal">
        <button className="close_modal_btn">Cerrar modal</button>
        <div className="container">
            <div className="container_title">
                <h2 className="title">Vincular una nueva plataforma</h2>
            </div>

            <form className="link_platform_form">
                {/* 
                    ID DEL USUARIO. POR EL MOMENTO VA A AGREGARSE DE FORMA MANUAL
                    DESPUES SE VA A AGREGAR DE MANERA DINAMICA EN BASE AL USUARIO
                    LOGUEADO
                */}
                <input type="text" value="1" />

                <fieldset>
                    <label htmlFor="platform_name">Ingrese el nombre de la plataforma</label>
                    <input 
                    type="text" 
                    className='link_form_input' 
                    id='platform_name' 
                    name='platform_name' 
                    placeholder='E.j: Computrabajo' />
                </fieldset>

                <fieldset>
                    <label htmlFor="platform_link">Ingrese el link de la plataforma</label>
                    <input 
                    type="text" 
                    className='link_form_input' 
                    id='platform_link' 
                    name='platform_link' 
                    placeholder='E.j: http://ar.computrabajo.com' />
                </fieldset>

                <fieldset>
                    <label htmlFor="platform_username">Ingrese su nombre de usuario registrado en la plataforma</label>
                    <input 
                    type="text" 
                    className='link_form_input' 
                    id='platform_username' 
                    name='platform_username' 
                    placeholder='E.j: coreo@correo.com' />
                </fieldset>

                <fieldset>
                    <label htmlFor="platform_password">Ingrese su contraseña registrada en la plataforma</label>
                    <input 
                    type="password" 
                    className='link_form_input' 
                    id='platform_password' 
                    name='platform_password' 
                    placeholder='E.j: contraseña12345' />
                </fieldset>

                <button className='link_platform_button'>Vincular plataforma</button>
            </form>

        </div>
    </div>
  )
}

export default LinkPlatformsForm