import React from 'react'
import SideBar from '../pages/customerpage/SideBar';
import { Outlet } from 'react-router-dom';

const RootLayout = () => {
  return (
    <div>
        <SideBar />
        <Outlet />
    
       
    </div>
  );
};

export default RootLayout;