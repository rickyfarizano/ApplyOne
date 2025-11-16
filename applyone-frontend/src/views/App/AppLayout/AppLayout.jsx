import React from 'react'
import HeaderApp from '../../../components/layout/HeaderApp/HeaderApp.jsx'
import NavBar from '../../../components/layout/NavBar/NavBar.jsx'
import LinkPlatformsForm from '../../../components/layout/LinkPlatformsForm/LinkPlatformsForm.jsx'
import { Outlet } from 'react-router-dom' 
const AppLayout = () => {
  return (
    <>
        <main>
            <NavBar />
            <div className="container">
                <HeaderApp />
                <Outlet/>
            </div>
            <LinkPlatformsForm />
        </main>
    </>
  )
}

export default AppLayout