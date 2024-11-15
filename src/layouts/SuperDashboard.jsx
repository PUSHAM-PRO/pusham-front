import React from 'react'
import SuperSidebar from '../pages/superadmin/SuperSideBar'
import DashboardHeader from '../pages/superadmin/Header'
import { Outlet } from 'react-router-dom'

const SuperDashboard = () => {
  return (
    <div className='flex'>
      <SuperSidebar />
      <div>
      <DashboardHeader />
      <Outlet/>
      </div>
     
    </div>
  )
}

export default SuperDashboard
