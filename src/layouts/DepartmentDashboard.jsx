import React, { useState, useEffect } from "react";
import { FaSearch, FaUserCircle, FaRegFileAlt } from "react-icons/fa";
import { IoShareSocialOutline } from "react-icons/io5";
import { HiOutlineTrash } from "react-icons/hi";
import { LuAlertCircle } from "react-icons/lu";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";
import RootLayout from "./RootLayout";
import TicketDetails from "../pages/departmentdashboardx/ticketDetails";
import { apiGetOneUserTicket, apiGeticketByUser, apiDeleteTicket } from '../services/auth';
import Swal from 'sweetalert2';

function DepartmentDashboard() {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showTicketDetails, setShowTicketDetails] = useState(false);
  const [tickets, setTickets] = useState([]);
  const [statistics, setStatistics] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    setLoading(true);
    try {
      // Fetch user's ticket statistics
      const statsResponse = await apiGetOneUserTicket();
      setStatistics(statsResponse.data);

      // Fetch user's tickets
      const ticketsResponse = await apiGeticketByUser();
      if (Array.isArray(ticketsResponse.data)) {
        setTickets(ticketsResponse.data);
      } else if (Array.isArray(ticketsResponse.data.tickets)) {
        setTickets(ticketsResponse.data.tickets);
      } else {
        console.error("Unexpected tickets data format:", ticketsResponse.data);
        setTickets([]);
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
      
      if (error.message === "No token found. Please log in.") {
        Swal.fire({
          icon: 'error',
          title: 'Authentication Error',
          text: 'Please log in to view your tickets.',
          confirmButtonText: 'OK'
        }).then(() => {
          navigate('/login');
        });
        return;
      }

      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Failed to fetch your ticket data. Please try again later.',
        confirmButtonText: 'OK'
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = () => {
    setShowModal(true);
  };

  const confirmDelete = () => {
    setShowModal(false);
    setShowSuccess(true);
  };

  const cancelDelete = () => {
    setShowModal(false);
  };

  const closeSuccess = () => {
    setShowSuccess(false);
  };

  const openTicketDetails = () => {
    setShowTicketDetails(true);
  };

  const closeTicketDetails = () => {
    setShowTicketDetails(false);
  };

  const handleDeleteTicket = async (id) => {
    try {
      const result = await Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      });

      if (result.isConfirmed) {
        await apiDeleteTicket(id);
        
        Swal.fire(
          'Deleted!',
          'Ticket has been deleted.',
          'success'
        );
        
        // Refresh the tickets list
        fetchUserData();
      }
    } catch (error) {
      console.error('Error deleting ticket:', error);
      
      if (error.message === "No token found. Please log in.") {
        Swal.fire({
          icon: 'error',
          title: 'Authentication Error',
          text: 'Please log in to delete tickets.',
          confirmButtonText: 'OK'
        }).then(() => {
          navigate('/login');
        });
        return;
      }

      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Failed to delete ticket. Please try again later.',
        confirmButtonText: 'OK'
      });
    }
  };

  if (loading) {
    return (
      <RootLayout>
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500"></div>
        </div>
      </RootLayout>
    );
  }

  return (
    <RootLayout>
      <div className="p-8 pt-2 bg-white">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-semibold">Billing Department</h1>
          <Link to="/create-ticket">
            <button className="bg-gray-700 text-white font-semibold py-2 px-4">
              Create
            </button>
          </Link>
          <div className="flex items-center space-x-4">
            <FaUserCircle className="text-3xl text-gray-600" />
            <div className="flex flex-col">
              <span className="font-medium">Mireille Eto</span>
              <span className="text-sm text-gray-500">mireille.et@gmail.com</span>
            </div>
          </div>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-2 gap-24 mb-6">
          <div className="p-4 rounded-lg flex flex-col items-start"
               style={{ backgroundColor: "#349D4F", border: "1px solid #349D4F" }}>
            <h3 className="text-lg font-medium text-white mb-3 mt-2">Total Tickets</h3>
            <div className="text-4xl font-bold mt-2 text-gray-200 mb-4">
              {statistics.totalTickets || 0}
            </div>
          </div>
          <div className="p-4 rounded-lg flex flex-col items-start"
               style={{ backgroundColor: "#349D4F", border: "1px solid #349D4F" }}>
            <h3 className="text-lg font-medium text-white mb-3 mt-2">Completed Tickets</h3>
            <div className="text-4xl font-bold mt-2 text-gray-200 mb-4">
              {statistics.completedTickets || 0}
            </div>
          </div>
        </div>

        {/* Search Bar */}
        <div className="relative mb-4 mt-4">
          <input
            type="text"
            placeholder="To research"
            className="p-1 px-14 pl-8 border border-gray-300 rounded-md"
          />
          <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        </div>

        <div className="mt-8 mb-10 ml-7 font-bold">
          <h2>Manguier</h2>
        </div>

        {/* Table */}
        <table className="w-full bg-white shadow-md text-gray-700">
          <thead>
            <tr className="border-b">
              <th className="p-4 text-left font-medium">Date</th>
              <th className="p-4 text-left font-medium">Code</th>
              <th className="p-4 text-left font-medium">Description</th>
              <th className="p-4 text-left font-medium">Assigned</th>
              <th className="p-4 text-left font-medium">Quick Actions</th>
            </tr>
          </thead>
          <tbody>
            {tickets.map((ticket) => (
              <tr key={ticket._id} className="border-b">
                <td className="p-4">{new Date(ticket.createdAt).toLocaleDateString()}</td>
                <td className="p-4">{ticket.ticketCode}</td>
                <td className="p-4">{ticket.description}</td>
                <td className="p-4 flex items-center">
                  <FaUserCircle className="text-3xl text-gray-600 mr-4" />
                  {ticket.assignedTo || 'Unassigned'}
                </td>
                <td className="p-4">
                  <div className="flex justify-start space-x-2">
                    {/* <button onClick={() => openTicketDetails(ticket._id)} className="p-2"> */}
                    <Link to={`/deptticketdetails/${ticket._id}`} className="p-2">
                      <FaRegFileAlt />
                    </Link>
                    {/* </button> */}
                    <Link to={`/share-ticket/${ticket._id}`} className="p-2">
                      <IoShareSocialOutline />
                    </Link>
                    <button onClick={() => handleDeleteTicket(ticket._id)} className="p-2">
                      <HiOutlineTrash />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Modals */}
        {showTicketDetails && (
          <div className="fixed inset-0 flex items-center bg-gray-300 bg-opacity-50">
            {/* <TicketDetails /> */}
            <button
              onClick={closeTicketDetails}
              className="absolute top-4 right-4 bg-white p-2 font-sans"
            >
              Close
            </button>
          </div>
        )}

        {showModal && (
          <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
            <div className="bg-white rounded-lg shadow-lg p-6 w-96">
              <div className="text-4xl text-red-500 mb-4 text-center">
                <LuAlertCircle />
              </div>
              <h2 className="text-xl font-semibold text-center">Confirm deletion</h2>
              <p className="text-gray-600 text-center mb-6">
                Are you sure you want to delete this ticket? This action is irreversible.
              </p>
              <div className="flex justify-between gap-4">
                <button onClick={cancelDelete} className="bg-white border hover:bg-gray-400 text-gray-800 py-2 font-semibold px-6 w-1/2 rounded-full">
                  Cancel
                </button>
                <button onClick={confirmDelete} className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-6 w-1/2 rounded-full">
                  Delete
                </button>
              </div>
            </div>
          </div>
        )}

        {showSuccess && (
          <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center p-24">
            <div className="bg-white rounded-lg shadow-lg p-6 w-96 border-2 border-purple-300">
              <div className="text-4xl text-green-500 mb-4 text-center">
                <IoMdCheckmarkCircleOutline />
              </div>
              <h2 className="text-xl font-semibold text-center">Successfully deleted</h2>
              <button onClick={closeSuccess} className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-6 rounded-full w-full">
                OK
              </button>
            </div>
          </div>
        )}
      </div>
    </RootLayout>
  );
}

export default DepartmentDashboard;
