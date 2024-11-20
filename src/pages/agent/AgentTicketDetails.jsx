import React, { useState, useEffect } from 'react';
import { IoArrowBackOutline } from 'react-icons/io5';
import { FiEdit } from 'react-icons/fi';
import { Link, useParams, useNavigate } from 'react-router-dom';
import EscalateModal from '../../components/modals/EscalateModal';
import { apiGetTicket } from '../../services/auth';
import Swal from 'sweetalert2';

const AgentTicketDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isEscalateModalOpen, setEscalateModalOpen] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [ticket, setTicket] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchTicketDetails();
  }, [id]);

  const fetchTicketDetails = async () => {
    try {
      setIsLoading(true);
      const response = await apiGetTicket(id);
      setTicket(response.data);
    } catch (error) {
      console.error('Error fetching ticket:', error);
      
      if (error.message === "No token found. Please log in.") {
        Swal.fire({
          icon: 'error',
          title: 'Authentication Error',
          text: 'Please log in to view ticket details.',
          confirmButtonText: 'OK'
        }).then(() => {
          navigate('/login');
        });
        return;
      }

      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Failed to fetch ticket details. Please try again later.',
        confirmButtonText: 'OK'
      }).then(() => {
        navigate('/agent'); // Navigate back to tickets list
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleEscalate = async (escalateData) => {
    try {
      // Add your API call here
      console.log('Escalating ticket:', escalateData);
      setShowSuccessModal(true);
    } catch (error) {
      console.error('Error escalating ticket:', error);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500"></div>
      </div>
    );
  }

  if (!ticket) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">Ticket not found</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link to="/agent" className="flex items-center gap-2">
            <IoArrowBackOutline className="text-xl" />
            <span>Back</span>
          </Link>
          <span className="text-gray-500">Ticket #{id.slice(-4)}</span>
        </div>
        <div className="flex gap-4">
          <button className="px-4 py-2 border border-green-500 text-green-500 rounded-full">
            Associate a team
          </button>
          <button 
            onClick={() => setEscalateModalOpen(true)}
            className="px-4 py-2 bg-green-500 text-white rounded-full"
          >
            Escalate
          </button>
        </div>
      </div>

      {/* Content Grid */}
      <div className="grid grid-cols-3 gap-6">
        {/* Description Section */}
        <div className="col-span-2 bg-white rounded-lg p-6">
          <div className="flex justify-between mb-4">
            <h3 className="font-semibold">Description</h3>
            <button className="text-green-500">Hide details</button>
          </div>
          <div className="bg-gray-100 rounded-lg p-4 mb-4">
            <p>{ticket.description}</p>
          </div>
          {ticket.photo && (
            <div className="border rounded-lg p-2 mb-4">
              <img src={ticket.photo} alt="Ticket attachment" className="w-full" />
            </div>
          )}
          <div className="mt-6 flex gap-4">
            <input
              type="text"
              placeholder="Add a note"
              className="flex-1 border rounded-full px-4 py-2"
            />
            <button className="px-6 py-2 bg-green-500 text-white rounded-full">
              Reply to the customer
            </button>
          </div>
        </div>

        {/* Details Section */}
        <div className="bg-white rounded-lg p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-semibold">Details</h3>
            <FiEdit className="cursor-pointer" />
          </div>
          <div className="space-y-4">
            <div>
              <p className="text-gray-500 mb-1">Location</p>
              <p>{ticket.location}</p>
            </div>
            <div>
              <p className="text-gray-500 mb-1">Assigned</p>
              <div className="flex items-center gap-2">
                <span>{ticket.assignedTo || 'Not assigned'}</span>
              </div>
            </div>
            <div>
              <p className="text-gray-500 mb-1">Department</p>
              <p>{ticket.department}</p>
            </div>
            <div>
              <p className="text-gray-500 mb-1">Problem Type</p>
              <p>{ticket.problem}</p>
            </div>
            <div>
              <p className="text-gray-500 mb-1">Status</p>
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
            </div>
          </div>
        </div>
      </div>

      <EscalateModal
        isOpen={isEscalateModalOpen}
        onClose={() => setEscalateModalOpen(false)}
        ticketCode={id}
        onEscalate={handleEscalate}
      />

      {/* Success Modal */}
      {showSuccessModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 text-center">
            <div className="mb-4">
              <svg className="mx-auto h-12 w-12 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <p className="mb-4">Your ticket has been escalated.</p>
            <button
              onClick={() => setShowSuccessModal(false)}
              className="px-4 py-2 bg-green-500 text-white rounded-full"
            >
              OK
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AgentTicketDetails;