import React from 'react'
import NavBar from '../../../components/layout/NavBar/NavBar.jsx'
import { Outlet } from 'react-router-dom' 
const AppLayout = () => {
  return (
    <>
        <main>
            <NavBar />
            <div className="container">
                <Outlet/>
            </div>
        </main>
    </>
  )
}

export default AppLayout