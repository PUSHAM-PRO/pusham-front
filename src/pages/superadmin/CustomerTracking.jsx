import React, { useEffect, useState } from 'react';
import { FaUserCircle } from 'react-icons/fa';
import { FiBell, FiCalendar, FiFileMinus, FiFileText, FiShare2, FiTrash2, FiUser } from 'react-icons/fi';
import { MdOutlinePeopleAlt } from 'react-icons/md';
import { TbRefreshAlert } from 'react-icons/tb';
import { PiSunLight } from 'react-icons/pi';
import { RiInformationLine } from 'react-icons/ri';
import Line from '../../assets/images/Line.png';
import { Link, useNavigate } from 'react-router-dom';
import { IoEllipse } from 'react-icons/io5';
import { apiGetOneUserTicket, apiGeticketByUser } from '../../services/auth';
import Swal from 'sweetalert2';

const CustomerTracking = () => {
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

  return (
    <div className="p-4 space-y-8">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
        <div className="p-6 bg-[#112228] text-white rounded-lg">
          <p>Total tickets</p>
          <h2 className="text-3xl font-semibold">{ticketStats.totalTickets}</h2>
          <div className="flex items-center gap-4 mt-4">
            <p className="text-green-500">+ 40% vs last month</p>
            <img src={Line} alt="chart" className="w-20 h-12" />
          </div>
        </div>
        <div className="p-6 bg-[#03A108] text-white rounded-lg">
          <p>Tickets in Progress</p>
          <h2 className="text-3xl font-semibold">{ticketStats.inProgressTickets}</h2>
          <div className="flex items-center gap-4 mt-4">
            <p className="text-green-100">+ 40% vs last month</p>
            <img src={Line} alt="chart" className="w-20 h-12" />
          </div>
        </div>
        <div className="p-6 bg-[#39D2C0] text-white rounded-lg">
          <p>Completed Tickets</p>
          <h2 className="text-3xl font-semibold">{ticketStats.completedTickets}</h2>
          <div className="flex items-center gap-4 mt-4">
            <p className="text-red-200">- 40% vs last month</p>
            <img src={Line} alt="chart" className="w-20 h-12" />
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
              <th className="py-2">
                <span className="flex items-center space-x-2">
                  <MdOutlinePeopleAlt className="text-green-500" />
                  <span className="text-[#344054]">Department</span>
                </span>
              </th>
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
          <tbody className="text-[#475467]">
            {tickets.map((ticket) => (
              <tr key={ticket._id || ticket.id} className="border-t hover:bg-gray-50">
                <td className="py-2">{ticket.createdAt || 'N/A'}</td>
                <td className="py-2">{ticket._id || ticket.id || 'N/A'}</td>
                <td className="py-2">{ticket.department || 'N/A'}</td>
                <td className="py-2">
                  <span className={`flex items-center px-4 gap-2 rounded-full w-[142px] h-8 ${
                    ticket.status === 'in_progress' ? 'bg-[#FFD70029] text-[#FFD700]' : 'bg-[#78E0D4] text-[#2C4229]'
                  }`}>
                    <IoEllipse />
                    {ticket.status || 'N/A'}
                  </span>
                </td>
                <td className="py-2 flex space-x-2 text-[#101828]">
                  <RiInformationLine 
                    className="cursor-pointer hover:text-green-500"
                    onClick={() => navigate(`/customer/tickets/${ticket._id || ticket.id}`)}
                  />
                  <FiShare2 />
                  <Link to={`/customer/edit-ticket/${ticket._id || ticket.id}`}>
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
    </div>
  );
};

export default CustomerTracking;