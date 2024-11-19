import React, { useState } from 'react';
import { IoArrowBackOutline } from 'react-icons/io5';
import { FiEdit } from 'react-icons/fi';
import { Link, useParams } from 'react-router-dom';
import EscalateModal from '../../components/modals/EscalateModal';
// import EscalateModal from './components/modals/EscalateModal';

const AgentTicketDetails = () => {
  const { id } = useParams();
  const [isEscalateModalOpen, setEscalateModalOpen] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const handleEscalate = async (escalateData) => {
    try {
      // Add your API call here
      console.log('Escalating ticket:', escalateData);
      setShowSuccessModal(true);
    } catch (error) {
      console.error('Error escalating ticket:', error);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link to="/agentd" className="flex items-center gap-2">
            <IoArrowBackOutline className="text-xl" />
            <span>Retour</span>
          </Link>
          <span className="text-gray-500">{id}</span>
        </div>
        <div className="flex gap-4">
          <button className="px-4 py-2 border border-green-500 text-green-500 rounded-full">
            Associate a team
          </button>
          <button 
            onClick={() => setEscalateModalOpen(true)}
            className="px-4 py-2 bg-green-500 text-white rounded-full"
          >
            Escalated
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
            <p>Good evening everyone, I'm trying to say my bill online without success I haven't understand anything for two days...</p>
          </div>
          <div className="border rounded-lg p-2 mb-4">
            {/* Image placeholder */}
            <img src="/path-to-image.jpg" alt="Bill" className="w-full" />
          </div>
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
              <p>Mboppi</p>
            </div>
            <div>
              <p className="text-gray-500 mb-1">Assigned</p>
              <div className="flex items-center gap-2">
                <img src="/avatar.jpg" alt="" className="w-8 h-8 rounded-full" />
                <span>Mireille Eto</span>
              </div>
            </div>
            <div>
              <p className="text-gray-500 mb-1">Type of request</p>
              <p>Payment error</p>
            </div>
            <div>
              <p className="text-gray-500 mb-1">Priority</p>
              <p className="text-red-500">⚡ Highest</p>
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
            <p className="mb-4">Your ticket has been scaled.</p>
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