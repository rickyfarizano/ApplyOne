import React, { useState } from 'react'
import HeaderApp from '../../../components/layout/HeaderApp/HeaderApp.jsx'
import NavBar from '../../../components/layout/NavBar/NavBar.jsx'
import LinkPlatformsForm from '../../../components/layout/LinkPlatformsForm/LinkPlatformsForm.jsx'
import { Outlet } from 'react-router-dom' 
const AppLayout = () => {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <>
        <main>
            <NavBar />
            <div className="container">
                <HeaderApp setIsOpen={setIsOpen} />
                <Outlet/>
            </div>
            <LinkPlatformsForm 
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            />
        </main>
    </>
  )
}

export default AppLayout