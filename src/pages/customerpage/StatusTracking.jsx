import React, { useEffect, useRef, useState } from 'react';
import { FaSearch, FaUserCircle } from 'react-icons/fa';
import { FiBell, FiCalendar, FiFileMinus, FiFileText, FiShare2, FiTrash2, FiUser } from 'react-icons/fi';
import { MdOutlinePeopleAlt } from 'react-icons/md';
import { TbRefreshAlert } from 'react-icons/tb';
import { PiSunLight } from 'react-icons/pi';
import { RiInformationLine } from 'react-icons/ri';
import Line from '../../assets/images/Line.png';
import { Link, useNavigate } from 'react-router-dom';
import { IoEllipse } from 'react-icons/io5';
import { apiDeleteTicket, apiGetOneUserTicket, apiGeticketByUser } from '../../services/auth';
import Swal from 'sweetalert2';
import RootLayout from '../../layouts/RootLayout';

const StatusTracking = () => {
    const [loadingTickets, setLoadingTickets] = useState(true);
    const [tickets, setTickets] = useState([]);
    const [ticketStats, setTicketStats] = useState({
        totalTickets: 0,
        inProgressTickets: 0,
        completedTickets: 0,
    });

    useEffect(() => {
        const fetchTicketStats = async () => {
            try {
                const response = await apiGetOneUserTicket();
                setTicketStats(response.data);
            } catch (error) {
                console.error("Error fetching ticket stats:", error);
            }
        };

        fetchTicketStats();
    }, []);

    useEffect(() => {
        const fetchTickets = async () => {
            try {
                const response = await apiGeticketByUser();
                setTickets(response.data);
            } catch (error) {
                console.error("Error fetching tickets:", error);
            } finally {
                setLoadingTickets(false);
            }
        };
        fetchTickets();
    }, []);

    const [currentPage, setCurrentPage] = useState(1);
    const totalPages = 10;

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

    const handleTicketDetails = (event) => {
        event.preventDefault();
        navigate('/custtickdetails');
    };

    const handleDelete = async (id) => {
        // First Swal - Confirmation
        Swal.fire({
            icon: 'warning',
            title: '<h3 class="text-lg font-bold text-black">Confirm your delete</h3>',
            html: '<p class="text-sm text-gray-600">Are you sure you want to delete this ticket? This action is irreversible, and the ticket will be permanently removed from the system.</p>',
            iconColor: '#F87171',
            showCancelButton: true,
            confirmButtonText: 'Delete',
            cancelButtonText: 'Cancel',
            customClass: {
                popup: 'rounded-lg p-6',
                confirmButton: 'bg-red-500 text-white font-medium rounded-full px-6 py-2 text-sm hover:bg-red-600',
                cancelButton: 'bg-gray-200 text-gray-700 font-medium rounded-full px-6 py-2 text-sm hover:bg-gray-300',
            },
            background: '#ffffff',
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const response = await apiDeleteTicket(id);
                    console.log("Ticket deleted:", response.data);

                    // Second Swal - Success message
                    Swal.fire({
                        icon: 'success',
                        title: '<h3 class="text-black font-bold text-lg">Successful</h3>',
                        text: 'Your deletion has been successfully completed.',
                        iconColor: '#22c55e',
                        confirmButtonText: 'OK',
                        customClass: {
                            popup: 'rounded-lg p-6 shadow-md',
                            confirmButton: 'bg-green-500 text-white font-medium rounded-full px-6 py-2 text-sm hover:bg-green-600',
                        },
                        background: '#ffffff',
                    }).then((result) => {
                        if (result.isConfirmed) {
                            window.location.reload();
                        }
                    });
                } catch (error) {
                    // Error Swal
                    Swal.fire({
                        icon: 'error',
                        title: '<h3 class="text-black font-bold text-lg">Error</h3>',
                        text: 'Failed to delete ticket.',
                        iconColor: '#EF4444',
                        confirmButtonText: 'OK',
                        customClass: {
                            popup: 'rounded-lg p-6 shadow-md',
                            confirmButton: 'bg-red-500 text-white font-medium rounded-full px-6 py-2 text-sm hover:bg-red-600',
                        },
                        background: '#ffffff',
                    });
                    console.error("Error deleting ticket:", error.response?.data || error.message);
                }
            }
        });
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
                            <Link>
                                <FiBell className="text-gray-600 w-10 h-10 rounded-[6px] p-2.5" />
                            </Link>
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
                <div className="flex justify-center gap-12 mb-6 items-center">
                    <div className="p-6 bg-[#112228] text-white rounded-lg">
                        <p>Total tickets</p>
                        <h2 className="text-3xl font-semibold">{ticketStats.totalTickets}</h2>
                        <div className="flex gap-4">
                            <p className="text-green-500 mt-8">+ 40% vs last month</p>
                            <img src={Line} alt="chart" className="w-[96px] h-[48px]" />
                        </div>
                    </div>
                    <div className="p-6 bg-[#39D2C0] text-white rounded-lg">
                        <p>Completed Tickets</p>
                        <h2 className="text-3xl font-semibold">{ticketStats.completedTickets}</h2>
                        <div className="flex gap-4">
                            <p className="text-red-200 mt-8">- 40% vs last month</p>
                            <img src={Line} alt="chart" className="w-[96px] h-[48px]" />
                        </div>
                    </div>
                </div>

                {/* Ticket Management Table */}
                <div className="bg-white rounded-lg shadow p-4 overflow-x-auto">
                    <h3 className="text-lg font-semibold mb-4">My Tickets</h3>
                    <table className="w-full min-w-[600px] text-left">
                        <thead>
                            <tr className="border-b">
                                <th className="py-2">
                                    <span className="flex items-center space-x-2">
                                        <FiCalendar className="text-green-500" />
                                        <span className="text-[#344054]">Date</span>
                                    </span>
                                </th>
                                <th className="py-2">
                                    <span className="flex items-center space-x-2">
                                        <FiFileMinus className="text-green-500" />
                                        <span className="text-[#344054]">Code</span>
                                    </span>
                                </th>
                                {/* <th className="py-2">
                                    <span className="flex items-center space-x-2">
                                        <MdOutlinePeopleAlt className="text-green-500" />
                                        <span className="text-[#344054]">Department</span>
                                    </span>
                                </th>
                                <th className="py-2">
                                    <div className="flex items-center space-x-2">
                                        <FiUser className="text-green-500" />
                                        <span className="text-[#344054]">Assigned</span>
                                    </div>
                                </th> */}
                                <th className="py-2">
                                    <span className="flex items-center space-x-2">
                                        <PiSunLight className="text-green-500" />
                                        <span className="text-[#344054]">Status</span>
                                    </span>
                                </th>
                                <th className="py-2">
                                    <span className="flex items-center space-x-2">
                                        <TbRefreshAlert className="text-green-500" />
                                        <span className="text-[#344054]">Quick Actions</span>
                                    </span>
                                </th>
                            </tr>
                        </thead>
                        <tbody className="text-[#475467] py-4 pr-6 pl-[11px]">
                            {Array.isArray(tickets) && tickets.map((ticket, index) => (

                                <tr key={ticket._id || ticket.id} className="border-t hover:bg-gray-50">
                                    <td className="py-2">{ticket.createdAt || 'N/A'}</td>
                                    <td className="py-2">{ticket._id || ticket.id || 'N/A'}</td>
                                    {/* <td className="py-2">{ticket.department || 'N/A'}</td> */}
                                    <td className="py-2">
                                        <span className={`flex items-center px-4 gap-2 rounded-full w-[142px] h-8 ${ticket.status === 'in_progress' ? 'bg-[#FFD70029] text-[#FFD700]' : 'bg-[#78E0D4] text-[#2C4229]'
                                            }`}>
                                            <IoEllipse />
                                            {ticket.status || 'N/A'}
                                        </span>
                                    </td>
                                    <td className="py-2 flex space-x-2 text-[#101828]">
                                        <RiInformationLine
                                            className="cursor-pointer hover:text-green-500"
                                            onClick={() => navigate(`/custtickdetails/${ticket._id || ticket.id}`)}
                                        />
                                        <Link to={`/edit/${ticket._id || ticket.id}`}>
                                            <FiFileText />
                                        </Link>
                                        {ticket.status !== 'completed' && (
                                            <FiTrash2
                                                className="cursor-pointer hover:text-red-500"
                                                onClick={() => handleDelete(ticket._id || ticket.id)}
                                            />
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                <div className="flex justify-between mt-6">
                    <button
                        onClick={handlePreviousPage}
                        disabled={currentPage === 1}
                        className="flex items-center px-4 py-2 bg-white border rounded-lg text-gray-700 hover:bg-gray-200 disabled:opacity-50"
                    >
                        <span className="mr-2">←</span> Previous
                    </button>

                    <div className="flex items-center space-x-2">
                        {Array.from({ length: totalPages }, (_, index) => {
                            const page = index + 1;
                            return (
                                <button
                                    key={page}
                                    onClick={() => setCurrentPage(page)}
                                    className={`px-3 py-1 rounded-md ${currentPage === page
                                        ? 'bg-green-500 text-white'
                                        : 'text-gray-700 hover:text-green-500'
                                        }`}
                                >
                                    {page}
                                </button>
                            );
                        })}
                    </div>
                    <button
                        onClick={handleNextPage}
                        disabled={currentPage === totalPages}
                        className="flex items-center px-4 py-2 bg-white border rounded-lg text-gray-700 hover:bg-gray-200 disabled:opacity-50"
                    >
                        Next <span className="ml-2">→</span>
                    </button>
                </div>
            </div>
        </RootLayout>
    );
};

export default StatusTracking;