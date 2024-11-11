import React, { useRef, useState } from 'react';
import {
    FaSearch, FaChartBar, FaHistory, FaRegCheckCircle,
    FaCog, FaQuestionCircle, FaUserCircle, FaBars
} from 'react-icons/fa';
import pushamLogo from '../assets/images/pushamLogo.png';
import { FiLogOut } from 'react-icons/fi';
import { Link } from 'react-router-dom';

const SideBar = () => {
    const searchInputRef = useRef(null);

    const handleSearchIconClick = () => {
        if (searchInputRef.current) {
            searchInputRef.current.focus();
        }
    };

    const [isAuthenticated, setAuthenticated] = useState(true);
    const [user, setUser] = useState({
        name: "Mireille Eto",
        email: "Mireille.dot@example.com"
    });
    const [isSidebarOpen, setSidebarOpen] = useState(false); 

    const handleLogout = () => {
        setAuthenticated(false);
    };

    return (
        <div className="flex">
           
            <button
                className="md:hidden p-4 text-white"
                onClick={() => setSidebarOpen(!isSidebarOpen)} 
            >
                <FaBars className="text-3xl" />
            </button>

          
            <div
                className={`text-white flex flex-col justify-between p-4 w-64 h-screen border-r bg-[#112228] transition-all duration-300 ease-in-out ${
                    isSidebarOpen ? 'block' : 'hidden' 
                } md:block`}
            >
                <div className="space-y-8">
                    <div className="flex items-center justify-center p-4">
                        <img src={pushamLogo} alt="Logo" className="w-16 h-16" />
                    </div>

                    <div className="relative flex items-center">
                        <FaSearch className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search or Find"
                            className="bg-white text-black rounded-md w-full pl-10 pr-4 py-2"
                            ref={searchInputRef}
                        />
                    </div>

                    <nav className="space-y-4">
                        <Link to="#" className="flex items-center p-3 hover:bg-[#03A10B] rounded-lg">
                            <FaChartBar className="w-6 h-6" />
                            <p className="ml-4">Dashboard</p>
                        </Link>
                        <Link to="#" className="flex items-center p-3 hover:bg-[#03A10B] rounded-lg">
                            <FaRegCheckCircle className="w-6 h-6" />
                            <p className="ml-4">Ticket Tracking</p>
                        </Link>
                        <Link to="#" className="flex items-center p-3 hover:bg-[#03A10B] rounded-lg">
                            <FaHistory className="w-6 h-6" />
                            <p className="ml-4">History & Archiving</p>
                        </Link>
                    </nav>
                </div>

                <div className="mt-[30%] space-y-3">
                    <Link to="#" className="flex items-center p-3 hover:bg-[#03A10B] rounded-lg">
                        <FaCog className="w-6 h-6" />
                        <p className="ml-4">Settings</p>
                    </Link>
                    <Link to="#" className="flex items-center p-3 hover:bg-[#03A10B] rounded-lg">
                        <FaQuestionCircle className="w-6 h-6" />
                        <p className="ml-4">Help and Support</p>
                    </Link>
                </div>

                <hr className="border-t border-gray-600 my-4" />

                <div className="flex items-center p-4">
                    <FaUserCircle className="text-3xl" />
                    {isAuthenticated && (
                        <div className="ml-4">
                            <p>{user.name}</p>
                            <p>{user.email}</p>
                        </div>
                    )}
                    <Link to="/home" onClick={handleLogout} className="ml-auto text-white">
                        <FiLogOut />
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default SideBar;
