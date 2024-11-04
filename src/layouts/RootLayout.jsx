import React from 'react'
import SideBar from '../components/SideBar';

const RootLayout = ({ children }) => {
    return (
        <div>
            <SideBar />
            <div>{children}</div>
        </div>
    )
}

export default RootLayout;