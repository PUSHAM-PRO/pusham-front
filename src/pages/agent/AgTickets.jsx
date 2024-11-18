import React from 'react'
import { FiCalendar, FiFileMinus, FiUser, FiEdit } from 'react-icons/fi';
import { PiSunLight } from 'react-icons/pi';
import { MdOutlinePeopleAlt } from 'react-icons/md';
import { Link } from 'react-router-dom';

const AgTickets = () => {
    const tickets = [
        { date: '14/10/24', code: '0001', department: 'Billing department', assigned: 'Agent X', status: 'In progress' },
        { date: '15/10/24', code: '0003', department: 'Billing department', assigned: 'Not assigned', status: 'On hold' },
        // Add more tickets as needed
    ];

    return (
        <div className="p-6">
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
                    {tickets.map((ticket, index) => (
                        <tr key={index} className="border-t border-gray-200">
                            <td className="px-4 py-2">{ticket.date}</td>
                            <td className="px-4 py-2">{ticket.code}</td>
                            <td className="px-4 py-2">
                                <Link to={`/ticket-details/${ticket.code}`} className="flex items-center space-x-2">
                                    <span>{ticket.department}</span>
                                    <FiEdit className="text-gray-500" />
                                </Link>
                            </td>
                            <td className="px-4 py-2">{ticket.assigned}</td>
                            <td className="px-4 py-2">
                                <span
                                    className={`px-2 py-1 rounded-full text-white ${ticket.status === 'In progress' ? 'bg-yellow-400' : 'bg-blue-400'
                                        }`}
                                >
                                    {ticket.status}
                                </span>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className="mt-4 flex justify-between items-center">
                <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200">Previous</button>
                <div className="flex gap-2">
                    <button className="px-4 py-2 bg-green-500 text-white rounded-md">1</button>
                    <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200">2</button>
                </div>
                <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200">Next</button>
            </div>
        </div>
    );
};
export default AgTickets;
