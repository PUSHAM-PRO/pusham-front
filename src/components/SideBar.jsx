import React, { useRef, useState } from 'react';
import { FaSearch, FaChartBar, FaHistory, FaRegCheckCircle, FaCog, FaQuestionCircle, FaUserCircle, } from 'react-icons/fa';
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

    const handleLogout = () => {
        setAuthenticated(false);

    };
    return (
        <div
            className="text-white flex flex-col justify-between p-4 absolute w-[311px] h-[982px] border-r-[1px #5D696D] bg-[#112228]">
            <div className="space-y-6">
                <div className="flex items-center justify-center pr-5 pl-6 w-[311px] h-[72px]">
                    <img src={pushamLogo} alt="Logo" className="w-[72px] h-[72px] mr-56" />
                </div>

                <div className="relative w-311px] h-[44px] gap-1.5 items-center">
                    <FaSearch className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-400" onClick={handleSearchIconClick} />
                    <input
                        type="text"
                        placeholder="Search or Find"
                        className="bg-white text-black rounded-md w-[263px] h-11 pl-10 pr-4"
                        ref={searchInputRef}
                    />
                </div>
                <nav className="w-[311px] h-128px] px-4 gap-1">
                    <div className="flex flex-col gap-1">
                        <Link
                            to="#" className="flex items-center focus:bg-[#03A10B] rounded-[6px]"

                        >
                            <FaChartBar className=" w-6 h-6" /><p className="text-white hover:text-[#03A10B] text-sm font-bold tracking-wide w-[279px] h-[40px] py-2 px-3 gap-[105px]">Dashboard</p>

                        </Link>
                        <Link
                            to="#"
                            className="flex items-center focus:bg-[#03A10B] rounded-[6px]"

                        >
                            <FaRegCheckCircle className="w-6 h-6" /><p className="text-white hover:text-[#03A10B] text-sm font-bold tracking-wide w-[279px] h-[40px] py-2 px-3 gap-[105px]">Ticket Tracking</p>
                        </Link>
                        <Link
                            to="#"
                            className="flex items-center focus:bg-[#03A10B] rounded-[6px]"
                        >
                            <FaHistory className=" w-6 h-6" /><p className="text-white hover:text-[#03A10B] text-sm font-bold tracking-wide w-[279px] h-[40px] py-2 px-3 gap-[105px]">History & Archiving</p>
                        </Link>
                    </div>
                </nav>
            </div>

            <div className="w-[311px] h-[205px] top-[777px] px-4 pb-8 gap-6">
                <div className="w-[279px] h-[84px] gap-1">
                    <Link to="#" className="flex items-center rounded-[6px]" >
                        <FaCog className=" w-6 h-6" />
                        <p className=" text-white hover:text-[#03A10B] p-2 font-bold tracking-wide w-[279px] h-[40px] py-2 px-3 gap-[105px]">Settings</p>
                    </Link>
                    <Link to="#" className="flex items-center rounded-[6px]">
                        <FaQuestionCircle className=" w-6 h-6" /><p className=" text-white hover:text-[#03A10B] p-2 font-bold tracking-wide w-[279px] h-[40px] py-2 px-3 gap-[105px]">Help and Support</p>
                    </Link>
                </div>
                <div className="w-[279px] h-[1px] bg-[#E4E7EC]">
                    <hr />
                </div>

                <div className="flex border-gray-700 w-[279px] h-[40px] px-2 justify-between pt-12">
                    <FaUserCircle className="text-6xl w-10 h-10 rounded-[200px] border-[1px]" />
                    {isAuthenticated && (
                        <div className="flex gap-3">
                            <div>
                                <p className="text-sm font-bold">{user.name}</p>
                                <p className="text-sm text-white">{user.email}</p>
                            </div>
                            <Link to="/home" onClick={handleLogout} className="text-white w-9 h-9 rounded-lg p-2 gap-2 -top-2 -left-2">
                                <FiLogOut className="text-lg w-5 h-5" />
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default SideBar;
