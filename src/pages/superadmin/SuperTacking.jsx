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
import { apiDashboard, apiDeleteTicket, apiGetTickets } from '../../services/auth';
import Swal from 'sweetalert2';


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

      const [currentPage, setCurrentPage] = useState(1);
      const [totalPages, setTotalPages] = useState(1);
      const [ticketsPerPage] = useState(10);

      useEffect(() => {
        const fetchTickets = async () => {
          try {
            setLoadingTickets(true);
            const response = await apiGetTickets();
            
            // Handle the tickets data
            let allTickets = [];
            if (Array.isArray(response.data)) {
              allTickets = response.data;
            } else if (response.data?.tickets && Array.isArray(response.data.tickets)) {
              allTickets = response.data.tickets;
            }

            // Calculate pagination
            const totalItems = allTickets.length;
            const calculatedTotalPages = Math.ceil(totalItems / ticketsPerPage);
            setTotalPages(calculatedTotalPages);

            // Get current page tickets
            const indexOfLastTicket = currentPage * ticketsPerPage;
            const indexOfFirstTicket = indexOfLastTicket - ticketsPerPage;
            const currentTickets = allTickets.slice(indexOfFirstTicket, indexOfLastTicket);
            
            setTickets(currentTickets);
          } catch (error) {
            console.error("Error fetching tickets:", error);
            Swal.fire({
              icon: 'error',
              title: 'Error',
              text: 'Failed to fetch tickets',
              confirmButtonText: 'OK'
            });
          } finally {
            setLoadingTickets(false);
          }
        };
        fetchTickets();
      }, [currentPage, ticketsPerPage]);

    const handlePreviousPage = () => {
      if (currentPage > 1) {
        setCurrentPage(prev => prev - 1);
      }
    };
  
    const handleNextPage = () => {
      if (currentPage < totalPages) {
        setCurrentPage(prev => prev + 1);
      }
    };
  
    const handlePageClick = (pageNumber) => {
      setCurrentPage(pageNumber);
    };

    // Generate page numbers for display
    const getPageNumbers = () => {
      const pageNumbers = [];
      const maxVisiblePages = 5; // Show max 5 page numbers at a time

      if (totalPages <= maxVisiblePages) {
        // If total pages is less than max visible, show all pages
        for (let i = 1; i <= totalPages; i++) {
          pageNumbers.push(i);
        }
      } else {
        // Show pages around current page
        let startPage = Math.max(1, currentPage - 2);
        let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

        // Adjust if we're near the end
        if (endPage - startPage < maxVisiblePages - 1) {
          startPage = Math.max(1, endPage - maxVisiblePages + 1);
        }

        // Add first page if not included
        if (startPage > 1) {
          pageNumbers.push(1);
          if (startPage > 2) pageNumbers.push('...');
        }

        // Add pages around current page
        for (let i = startPage; i <= endPage; i++) {
          pageNumbers.push(i);
        }

        // Add last page if not included
        if (endPage < totalPages) {
          if (endPage < totalPages - 1) pageNumbers.push('...');
          pageNumbers.push(totalPages);
        }
      }

      return pageNumbers;
    };

  const navigate = useNavigate();

  // const handleEditTicket = (event) => {
  //   event.preventDefault();
  //   navigate(`/edit-ticket/${ticketId}`);
  // };
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
        to="/deptSignin"
        className="px-4 py-2 bg-black text-white rounded-md w-full sm:w-auto">Add an account</Link>
      </div>

        {/* Ticket Management Table */}
        <div className="bg-white rounded-lg shadow p-4 overflow-x-auto">
                <h3 className="text-lg font-semibold mb-4">Ticket Management</h3>
                {loadingTickets ? (
                  <div className="text-center py-4">Loading tickets...</div>
                ) : tickets && tickets.length > 0 ? (
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
                        {tickets.map((ticket) => (
                            <tr key={ticket._id || ticket.id} className="border-t hover:bg-gray-50">
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
                                  
                                        <RiInformationLine 
                                            className="cursor-pointer hover:text-green-500"
                                            onClick={() => navigate(`/superAdmin/tickets/${ticket._id || ticket.id}`)}
                                        />
                                  
                                    <FiShare2 />
                                    <Link to={`/edit-ticket/${ticket._id || ticket.id}`}>
    <FiFileText />
</Link>
                                    <FiTrash2 
    className="cursor-pointer hover:text-red-500"
    onClick={() => handleDelete(ticket._id || ticket.id)}
/>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
              ) : (
                <div className="text-center py-4">No tickets found</div>
              )}
            </div>
  
       {tickets && tickets.length > 0 && (
         <div className="flex items-center justify-between mt-6">
      <button
        onClick={handlePreviousPage}
        disabled={currentPage === 1}
        className={`flex items-center px-4 py-2 rounded-lg ${
          currentPage === 1
            ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
            : 'bg-white border text-gray-700 hover:bg-gray-50'
        }`}
      >
        <span className="mr-2">←</span> Previous
      </button>

      <div className="flex items-center space-x-2">
        {getPageNumbers().map((number, index) => (
          <React.Fragment key={index}>
            {number === '...' ? (
              <span className="px-3 py-1">...</span>
            ) : (
              <button
                onClick={() => handlePageClick(number)}
                className={`px-3 py-1 rounded-md ${
                  currentPage === number
                    ? 'bg-green-500 text-white'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                {number}
              </button>
            )}
          </React.Fragment>
        ))}
      </div>
        <button
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
          className={`flex items-center px-4 py-2 rounded-lg ${
            currentPage === totalPages
              ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
              : 'bg-white border text-gray-700 hover:bg-gray-50'
          }`}
        >
          Next <span className="ml-2">→</span>
        </button>
      </div>
      )}
      </div>
  );
};

export default SuperTacking;
