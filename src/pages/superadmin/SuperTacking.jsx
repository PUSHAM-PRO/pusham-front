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
import { apiDashboard, apiGetTickets } from '../../services/auth';


const SuperTacking = () => {
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
            const response = await apiDashboard();
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
            const response = await apiGetTickets();
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
      if (currentPage < totalPages) {
        setCurrentPage(currentPage + 1);
      }
    };
  

  const navigate = useNavigate();

  const handleEditTicket = (event) => {
    event.preventDefault();
    navigate('/edit');
  };

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

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 mb-10 justify-end">
       
<Link
  to="/createDepartment"
  className="px-4 py-2 bg-black text-white rounded-md w-full sm:w-auto text-center"
>
  Create a department
</Link>
        <Link
        to="/deptSignin "
        className="px-4 py-2 bg-black text-white rounded-md w-full sm:w-auto">Add an account</Link>
      </div>

        {/* Ticket Management Table */}
        <div className="bg-white rounded-lg shadow p-4 overflow-x-auto">
                <h3 className="text-lg font-semibold mb-4">Ticket Management</h3>
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
  <th className="py-2">
    <span className="flex items-center space-x-2">
      <TbRefreshAlert className="text-green-500" />
      <span className="text-[#344054]">Quick Actions</span>
    </span>
  </th>
</tr>

                    </thead>
                    <tbody className="text-[#475467]">
                        {tickets.map((ticket, index) => (
                            <tr key={index} className="border-t hover:bg-gray-50">
                                <td className="py-2">{ticket.createdAt || 'N/A'}</td>
                                <td className="py-2">{ticket.id || 'N/A'}</td>
                                <td className="py-2">{ticket.department || 'N/A'}</td>
                                <td className="py-2 flex items-center">
                                    <FaUserCircle className="text-3xl text-[#FFFFFF] w-10 h-10 rounded-full border-[4px]" /> {ticket.user || 'Not assigned'}
                                </td>
                                <td className="py-2">
                                    <span className={`flex items-center px-4 gap-2 rounded-full w-[142px] h-8 ${
                                        ticket.status === 'In progress' ? 'bg-[#FFD70029] text-[#FFD700]' : 'bg-[#78E0D4] text-[#2C4229]'
                                    }`}>
                                        <IoEllipse />
                                        {ticket.status || 'N/A'}
                                    </span>
                                </td>
                                <td className="py-2 flex space-x-2 text-[#101828]">
                                  
                                        <RiInformationLine />
                                  
                                    <FiShare2 />
                                    <Link to="/edit" onClick={handleEditTicket}>
                                    <FiFileText /></Link>
                                    
                                    <FiTrash2 />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
  
       <div className="flex items-center justify-between mt-6">
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
              className={`px-3 py-1 rounded-md ${
                currentPage === page
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
        disabled={currentPage === 1}
        className="flex items-center px-4 py-2 bg-white border rounded-lg text-gray-700 hover:bg-gray-200 disabled:opacity-50"
      >
        <span className="mr-2">←</span> next
      </button>
      </div>
      </div>
  );
};

export default SuperTacking;