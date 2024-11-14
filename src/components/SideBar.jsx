import React, { useState } from 'react';
import { FaSearch, FaChartBar, FaHistory, FaRegCheckCircle, FaCog, FaQuestionCircle, FaBars } from 'react-icons/fa';
import { FiLogOut } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import pushamLogo from '../assets/images/pushamLogo.png';
import image from '../assets/images/m-eto.png';

const SideBar = () => {
    const [isAuthenticated, setAuthenticated] = useState(true);
    const [isSidebarOpen, setSidebarOpen] = useState(false);
    const [user, setUser] = useState({
        name: "Mireille Eto",
        email: "Mireille@gmail.com",
    });

    const handleLogout = () => {
        setAuthenticated(false);
    };

    // Function to close the sidebar
    const closeSidebar = () => {
        setSidebarOpen(false);
    };

    return (
        <div>
            {/* Toggle Button for Mobile View */}
            <button
                className="md:hidden p-4 text-white"
                onClick={() => setSidebarOpen(!isSidebarOpen)}
            >
                <FaBars className="text-3xl text-[#5D696D]" />
            </button>

            {/* Backdrop Overlay */}
            {isSidebarOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
                    onClick={closeSidebar}
                ></div>
            )}

            {/* Sidebar Container */}
            <div
                className={`text-white flex flex-col justify-between p-4 w-[311px] h-screen fixed top-0 left-0 border-r bg-[#112228] transition-all duration-300 ease-in-out z-50 ${isSidebarOpen ? 'block' : 'hidden'
                    } md:sticky md:block`}
            >
                {/* Logo Section */}
                <div className="space-y-6">
                    <div className="flex justify-start w-[311px] h-[72px]">
                        <img src={pushamLogo} alt="Logo" className="w-[72px] h-[72px]" />
                    </div>

                    {/* Search Bar */}
                    <div className="relative flex items-center">
                        <FaSearch className="absolute top-1/2 left-3 transform -translate-y-1/2 text-[#5D696D]" />
                        <input
                            type="text"
                            placeholder="Search or Find"
                            className="bg-white text-black rounded-md w-full pl-10 pr-4 py-2"
                        />
                    </div>

                    {/* Navigation Links */}
                    <nav className="space-y-4">
                        <Link to="/dashboard" className="flex items-center p-2 focus:bg-[#03A10B] rounded-lg w-[279px] h-[40px]">
                            <FaChartBar className="w-6 h-6" />
                            <p className="ml-4 hover:text-[#03A10B]">Dashboard</p>
                        </Link>
                        <Link to="/status-tracking" className="flex items-center p-2 focus:bg-[#03A10B] rounded-lg w-[279px] h-[40px]">
                            <FaRegCheckCircle className="w-6 h-6" />
                            <p className="ml-4 hover:text-[#03A10B]">Ticket Tracking</p>
                        </Link>
                        <Link to="#" className="flex items-center p-2 focus:bg-[#03A10B] rounded-lg w-[279px] h-[40px]">
                            <FaHistory className="w-6 h-6" />
                            <p className="ml-4 hover:text-[#03A10B]">History & Archiving</p>
                        </Link>
                    </nav>
                </div>

                {/* Footer Section */}
                <footer className="absolute bottom-0">
                    <Link to="#" className="flex items-center p-3 rounded-lg">
                        <FaCog className="w-6 h-6" />
                        <p className="ml-4 hover:text-[#03A10B]">Settings</p>
                    </Link>
                    <Link to="#" className="flex items-center p-3 rounded-lg">
                        <FaQuestionCircle className="w-6 h-6" />
                        <p className="ml-4 hover:text-[#03A10B]">Help and Support</p>
                    </Link>

                    <hr className="border-t border-[#5D696D] my-4" />

                    {/* User Profile */}
                    <div className="flex items-center p-4 rounded-lg text-white">
                        <img
                            src={image}
                            alt="User Avatar"
                            className="w-10 h-10 rounded-full object-cover"
                        />
                        <div className="ml-4 flex flex-col">
                            <p className="font-medium">{user.name}</p>
                            <p className="text-sm text-[#5D696D]">{user.email}</p>
                        </div>
                        <Link
                            to="/home"
                            className="ml-auto text-[#5D696D] hover:text-white text-lg"
                            onClick={handleLogout}
                        >
                            <FiLogOut />
                        </Link>
                    </div>
                </footer>
            </div>
        </div>
    );
};

export default SideBar;
