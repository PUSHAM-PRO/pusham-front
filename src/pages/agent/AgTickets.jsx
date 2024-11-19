import React, { useState, useEffect } from 'react';
import { FiCalendar, FiFileMinus, FiUser, FiEdit } from 'react-icons/fi';
import { PiSunLight } from 'react-icons/pi';
import { MdOutlinePeopleAlt } from 'react-icons/md';
import { Link, useNavigate } from 'react-router-dom';
import { apiGetTickets } from '../../services/auth';
import Swal from 'sweetalert2';

const AgTickets = () => {
    const [tickets, setTickets] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        fetchTickets();
    }, []);

    const fetchTickets = async () => {
        try {
            setIsLoading(true);
            const response = await apiGetTickets();
            setTickets(Array.isArray(response.data) ? response.data : 
                      Array.isArray(response.data.tickets) ? response.data.tickets : 
                      []);
            
        } catch (error) {
            console.error('Error fetching tickets:', error);
            
            if (error.message === "No token found. Please log in.") {
                Swal.fire({
                    icon: 'error',
                    title: 'Authentication Error',
                    text: 'Please log in to view tickets.',
                    confirmButtonText: 'OK'
                }).then(() => {
                    navigate('/login');
                });
                return;
            }

            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Failed to fetch tickets. Please try again later.',
                confirmButtonText: 'OK'
            });
        } finally {
            setIsLoading(false);
        }
    };

    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500"></div>
            </div>
        );
    }

    const ticketsArray = Array.isArray(tickets) ? tickets : [];

    return (
        <div className="p-6">
            {ticketsArray.length === 0 ? (
                <div className="text-center py-8">
                    <p className="text-gray-500">No tickets found</p>
                </div>
            ) : (
                <table className="w-full border border-gray-200 rounded-lg">
                    <thead className="bg-gray-100">
                        <tr>
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
                            <th className="py-2">
                                <span className="flex items-center space-x-2">
                                    <MdOutlinePeopleAlt className="text-green-500" />
                                    <span className="text-[#344054]">Department</span>
                                </span>
                            </th>
                            <th className="py-2">
                                <span className="flex items-center space-x-2">
                                    <FiUser className="text-green-500" />
                                    <span className="text-[#344054]">Assigned</span>
                                </span>
                            </th>
                            <th className="py-2">
                                <span className="flex items-center space-x-2">
                                    <PiSunLight className="text-green-500" />
                                    <span className="text-[#344054]">Status</span>
                                </span>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {ticketsArray.map((ticket) => (
                            <tr key={ticket._id || ticket.id} className="border-t border-gray-200">
                                <td className="px-4 py-2">
                                    {new Date(ticket.createdAt).toLocaleDateString()}
                                </td>
                                <td className="px-4 py-2">
                                    {(ticket._id || ticket.id)?.slice(-4) || 'N/A'}
                                </td>
                                <td className="px-4 py-2">
                                    <Link 
                                        to={`/ticket-details/${ticket._id || ticket.id}`} 
                                        className="flex items-center space-x-2"
                                    >
                                        <span>{ticket.department}</span>
                                        <FiEdit className="text-gray-500" />
                                    </Link>
                                </td>
                                <td className="px-4 py-2">
                                    {ticket.assignedTo || 'Not assigned'}
                                </td>
                                <td className="px-4 py-2">
                                    <span
                                        className={`px-2 py-1 rounded-full text-white ${
                                            ticket.status === 'in_progress' 
                                                ? 'bg-yellow-400' 
                                                : ticket.status === 'completed'
                                                ? 'bg-green-400'
                                                : 'bg-blue-400'
                                        }`}
                                    >
                                        {ticket.status === 'in_progress' 
                                            ? 'In Progress' 
                                            : ticket.status === 'completed'
                                            ? 'Completed'
                                            : 'Initialized'}
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
            
            <div className="mt-4 flex justify-between items-center">
                <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200">
                    Previous
                </button>
                <div className="flex gap-2">
                    <button className="px-4 py-2 bg-green-500 text-white rounded-md">1</button>
                    <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200">
                        2
                    </button>
                </div>
                <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200">
                    Next
                </button>
            </div>
        </div>
    );
};

export default AgTickets;
