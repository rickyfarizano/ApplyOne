import React from 'react'

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
                    type="text" 
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