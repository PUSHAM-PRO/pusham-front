import React from 'react';
import SideBar from '../components/SideBar';

const RootLayout = ({ children }) => {
    return (
        <div className="flex flex-col lg:flex-row min-h-screen">
           
            <SideBar />

            
            <div className="flex-1 p-4  bg-gray-100">
                {children}
            </div>
        </div>
    );
};

export default RootLayout;
