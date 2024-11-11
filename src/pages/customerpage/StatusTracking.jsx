import React, { useState, useRef } from 'react';
import { FaUserCircle, FaSearch, FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import { FiBell, FiCalendar, FiFileMinus, FiFileText, FiShare2, FiTrash2, FiUser } from "react-icons/fi";
import { MdOutlinePeopleAlt } from "react-icons/md";
import { TbRefreshAlert } from "react-icons/tb";
import { PiSunLight } from "react-icons/pi";
import { useNavigate } from 'react-router-dom';
import RootLayout from '../../layouts/RootLayout';
import { RiInformationLine } from "react-icons/ri";
import Line from "../../assets/images/Line.png";
import { Link } from 'react-router-dom';
import { IoEllipse } from "react-icons/io5";

const StatusTracking = () => {
    const [currentPage, setCurrentPage] = useState(1);

    const handlePreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const handleNextPage = () => {
        setCurrentPage(currentPage + 1);
    };

    const searchInputRef = useRef(null);

    const handleSearchIconClick = () => {
        if (searchInputRef.current) {
            searchInputRef.current.focus();
        }
    };

    const [notifications, setNotifications] = useState([]);
    const [user, setUser] = useState({
        isLoggedIn: true, // Change this based on your authentication logic
        Image: 'https://example.com/user-image.jpg', // Replace with actual user image URL
    });

    const navigate = useNavigate();

    const handleEditTicket = (event) => {
        event.preventDefault();
        navigate('/edit');
    };

    const handleBellClick = () => {
        // Logic to fetch or display notifications
        alert('Show notifications');
    };

    const handleCreateClick = () => {
        navigate('/create');
    };

    return (
        <RootLayout>
            <div className="bg-white p-6">
                {/* Header Section */}
                <header className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-6">
                    <div>
                        <h1 className="text-2xl font-semibold">Welcome, Mireille</h1>
                        <p className="text-gray-600">Track and manage tickets for all your subscribers with one click.</p>
                    </div>
                    <div className="flex items-center space-x-4 mt-4 sm:mt-0">
                        <button
                            onClick={() => navigate("/ticketcreation")}
                            className="px-4 py-2 bg-[#112228] text-white rounded-[5px] gap-2 left-[583px] w-[91px] h-11 text-lg text-center font-semibold mr-4">Create</button>

                        <div className="relative">
                            <FaSearch className="ml-2 absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-400" onClick={handleSearchIconClick} />
                            <input
                                type="text"
                                placeholder="To research"
                                className="pl-10 pr-4 py-2 bg-white rounded-md border border-gray-300 w-full sm:w-auto"
                            />
                        </div>
                        <div onClick={handleBellClick} className="cursor-pointer relative">
                            <FiBell className="text-gray-600 w-10 h-10 rounded-[6px] p-2.5" />
                            {notifications.length > 0 && (
                                <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full px-1">
                                    {notifications.length}
                                </span>
                            )}
                        </div>
                        <div className="relative">
                            <FaUserCircle className="text-3xl text-[#FFFFFF] absolute w-10 h-10 rounded-[200px] border-[4px]" />
                            {user.isLoggedIn && (
                                <img
                                    src={user.Image}
                                    className="w-10 h-10 rounded-full"
                                    style={{ zIndex: 10 }}
                                />
                            )}
                        </div>
                    </div>
                </header>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
                    <div className="p-6 bg-[#112228] text-white rounded-lg">
                        <p>Total tickets</p>
                        <h2 className="text-3xl font-semibold">1023</h2>
                        <div className="flex gap-4">
                            <p className="text-green-500 mt-8">+ 40% vs last month</p>
                            <img src={Line} alt="chart" className="w-[96px] h-[48px]" />
                        </div>
                    </div>
                    <div className="p-6 bg-[#03A108] text-white rounded-lg">
                        <p>Tickets processed within 24 hours</p>
                        <h2 className="text-3xl font-semibold">709</h2>
                        <div className="flex gap-4">
                            <p className="text-green-100 mt-8">+ 40% vs last month</p>
                            <img src={Line} alt="chart" className="w-[96px] h-[48px]" />
                        </div>
                    </div>
                    <div className="p-6 bg-[#39D2C0] text-white rounded-lg">
                        <p>Pending Tickets</p>
                        <h2 className="text-3xl font-semibold">25</h2>
                        <div className="flex gap-4">
                            <p className="text-red-200 mt-8">- 40% vs last month</p>
                            <img src={Line} alt="chart" className="w-[96px] h-[48px]" />
                        </div>
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 mb-10 justify-end">
    <button className="px-4 py-2 bg-black text-white rounded-md w-full sm:w-auto">Create a department</button>
    <button className="px-4 py-2 bg-black text-white rounded-md w-full sm:w-auto">Add an account</button>
</div>


                {/* Ticket Management Table */}
                <div className="bg-white rounded-lg shadow p-4">
                    <h3 className="text-lg font-semibold mb-4">Ticket Management</h3>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead>
                                <tr className="border-b">
                                    <th className="py-2">
                                        <div className="flex items-center space-x-2">
                                            <FiCalendar className="text-green-500" />
                                            <span className="text-[#344054]">Date</span>
                                        </div>
                                    </th>
                                    <th className="py-2">
                                        <div className="flex items-center space-x-2">
                                            <FiFileMinus className="text-green-500" />
                                            <span className="text-[#344054]">Code</span>
                                        </div>
                                    </th>
                                    <th className="py-2">
                                        <div className="flex items-center space-x-2">
                                            <MdOutlinePeopleAlt className="text-green-500" />
                                            <span className="text-[#344054]">Department</span>
                                        </div>
                                    </th>
                                    <th className="py-2">
                                        <div className="flex items-center space-x-2">
                                            <FiUser className="text-green-500" />
                                            <span className="text-[#344054]">Assigned</span>
                                        </div>
                                    </th>
                                    <th className="py-2">
                                        <div className="flex items-center space-x-2">
                                            <PiSunLight className="text-green-500" />
                                            <span className="text-[#344054]">Status</span>
                                        </div>
                                    </th>
                                    <th className="py-2">
                                        <div className="flex items-center space-x-2">
                                            <TbRefreshAlert className="text-green-500" />
                                            <span className="text-[#344054]">Quick Actions</span>
                                        </div>
                                    </th>
                                </tr>
                            </thead>
                           <tbody className="text-[#475467] py-4 pr-6 pl-[11px]">
                            {/* Table Rows */}
                            {[
                                { date: '14/10/24', code: '0001', department: 'Billing department', assigned: 'Agent x', status: 'In progress' },
                                { date: '15/10/24', code: '0003', department: 'Billing department', assigned: 'Not assigned', status: 'On hold' },
                                { date: '14/10/24', code: '0001', department: 'Billing department', assigned: 'Agent x', status: 'In progress' },
                                { date: '15/10/24', code: '0003', department: 'Billing department', assigned: 'Not assigned', status: 'On hold' },
                                { date: '14/10/24', code: '0001', department: 'Billing department', assigned: 'Agent x', status: 'In progress' },
                            ].map((ticket, index) => (
                                <tr key={index} className="border-t w-[1209px] h-[74px] top-11 hover:bg-gray-50">
                                    <td className="py-2">{ticket.date}</td>
                                    <td className="py-2">{ticket.code}</td>
                                    <td className="py-2">{ticket.department}</td>
                                    <td className="py-2 flex items-center">
                                        <FaUserCircle className="text-3xl text-[#FFFFFF] w-10 h-10 rounded-[200px] border-[4px]" /> {ticket.assigned}
                                    </td>
                                    <td className="py-2">
                                        <span
                                            className={` flex items-center px-4 gap-2 rounded-[64px] w-[142px] h-8  ${ticket.status === 'In progress' ? 'bg-[#FFD70029] text-[#FFD700]' : 'bg-[#78E0D4] text-[#2C4229]'
                                             }`}
                                        >
                                            <IoEllipse />
                                            {ticket.status}
                                        </span>
                                    </td>
                                    <td className="py-2 flex space-x-2 text-[#101828]">
                                        <Link to="/edit" onClick={handleEditTicket} >
                                            <RiInformationLine />
                                        </Link>
                                       
                                        <FiShare2 />
                                        <FiFileText />
                                        <FiTrash2 />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                        </table>
                    </div>
                </div>

                {/* Pagination */}
                <div className="flex justify-between mt-6">
                    <button onClick={handlePreviousPage} disabled={currentPage === 1} className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md">Previous</button>
                    <button onClick={handleNextPage} className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md">Next</button>
                </div>
            </div>
        </RootLayout>
    );
};

export default StatusTracking;
