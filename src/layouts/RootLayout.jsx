import React from 'react';
import SideBar from '../components/SideBar';

const RootLayout = ({ children }) => {
    return (
        <div className="flex flex-col lg:flex-row min-h-screen">
            {/* Sidebar */}
            <SideBar />

            {/* Main Content */}
            <div className="flex-1 p-4 lg:p-8 bg-gray-100">
                {children}
            </div>
        </div>
    );
};

export default RootLayout;
