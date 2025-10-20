import React, {useState} from 'react'
import { NavLink } from 'react-router-dom'

const NavBar = () => {
    const [openSubmenu, setOpenSubmenu] = useState(false)

    const toggleSubmenu = () => {
      setOpenSubmenu(prev => !prev)
    }

  return (
    <>
    <aside className="navbar">
        <div className="container">
            <nav className="menu">
                <ul className="link">
                    <li>
                        <span onClick={toggleSubmenu} style={{ cursor: 'pointer' }}>
                          Mis Postulaciones
                        </span>

                        {openSubmenu && (
                            <ul className="submenu_mis_postulaciones">
                                <li>
                                    <NavLink to="/mis-postulaciones/centro-de-postulaciones">
                                        Centro de postulaciones
                                    </NavLink>
                                </li>
                            </ul>
                        )}
                    </li>

                    <li>
                        <NavLink to="/mis-experiencias">Mis Experiencias</NavLink>
                    </li>
                </ul>
            </nav>
        </div>
    </aside>
    </>
  )
}

export default NavBar