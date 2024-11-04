import React from 'react';
import { FaSearch, FaChartBar, FaHistory, FaRegCheckCircle, FaCog, FaQuestionCircle, FaUserCircle,} from 'react-icons/fa';
import pushamLogo from '../../assets/images/pushamLogo.png';
import { FiLogOut } from 'react-icons/fi';
import { Link } from 'react-router-dom';

const SideBar = () => {
    return (
        <div
            className="text-white flex flex-col justify-between p-4"
            style={{
                width: '311px',
                height: '982px',
                backgroundColor: '#112228',
                borderRight: '1px solid #5D696D',
            }}
        >
            <div className="space-y-6">
                <div className="flex items-center justify-center pr-5 pl-6">
                    <img src={pushamLogo} alt="Logo" className="w-[311px] h-[72px] mr-56" />
                </div>

                <div className="relative">
                    <FaSearch className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Search or Find"
                        className="bg-white text-black rounded-md w-full h-11 pl-10 pr-4"
                    />
                </div>
                <nav>
                    <div className="flex flex-col gap-1">
                        <Link
                            to="dashboard" className="flex focus:bg-[#03A10B] rounded-[6px]"
                            style={{ padding: '8px 12px' }}
                        >
                            <FaChartBar className="mr-2 w-4 h-4" /><p className="flex items-center text-white hover:text-[#03A10B] text-sm font-bold tracking-wide">Dashboard</p>
                             
                        </Link>
                        <Link
                            to="#"
                            className="flex focus:bg-[#03A10B] rounded-[6px]"
                            style={{ padding: '8px 12px' }}
                        >
                            <FaRegCheckCircle className="mr-2 w-4 h-4" /><p className="flex items-center text-white hover:text-[#03A10B] text-sm font-bold tracking-wide">Ticket Tracking</p> 
                        </Link>
                        <Link
                            to="#"
                            className="flex focus:bg-[#03A10B] rounded-[6px]"
                            style={{ padding: '8px 12px' }}
                        >
                            <FaHistory className="mr-2 w-4 h-4" /><p className="flex items-center text-white hover:text-[#03A10B] text-sm font-bold tracking-wide">History & Archiving</p>  
                        </Link>
                    </div>
                </nav>
            </div>

            <div className="space-y-6">
                <div className="space-y-3">
                    <Link to="#" className="flex items-center" >
                        <FaCog className="mr-2" />
                        <p className=" text-white hover:text-[#03A10B] p-2 font-bold tracking-wide">Settings</p> 
                    </Link>
                    <Link to="#" className="flex items-center">
                        <FaQuestionCircle className="mr-2" /><p className=" text-white hover:text-[#03A10B] p-2 font-bold tracking-wide">Help and Support</p> 
                    </Link>
                </div>

                <div className="flex items-center space-x-2 p-2 border-t border-gray-700">
                    <FaUserCircle className="text-6xl" />
                    <div className="flex justify-between w-full items-center">
                        <div>
                            <p className="text-sm font-bold">Mireille Eto</p>
                            <p className="text-sm text-white">Mireille.dot@example.com</p>
                        </div>
                        <Link to="#" className="text-white">
                            <FiLogOut className="text-lg" />
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SideBar;
