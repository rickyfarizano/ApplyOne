import React from 'react'
import HeaderApp from '../../../components/layout/HeaderApp/HeaderApp.jsx'
import NavBar from '../../../components/layout/NavBar/NavBar.jsx'
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
        </main>
    </>
  )
}

export default AppLayout