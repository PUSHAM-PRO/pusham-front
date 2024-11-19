import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import { apiGetTicket } from '../../services/auth';

const TicketDeta= () => {
  const [ticket, setTicket] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTicket = async () => {
      try {
        const data = await apiGetTicket(id);
        setTicket(data);
      } catch (error) {
        console.error('Error fetching ticket:', error);
      }
    };

    fetchTicket();
  }, [id]);

  if (!ticket) return <div>Loading...</div>;

  return (
    <div className="min-h-screen bg-gray-50 p-4 flex flex-col items-center">
      <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-6">
        <button 
          onClick={() => navigate(-1)} 
          className="text-blue-500 text-sm mb-4"
        >
          &larr; Return
        </button>
        <h1 className="text-lg font-semibold text-green-600 mb-4">Ticket details</h1>
        <div className="space-y-4">
          <div className="flex justify-between">
            <span className="font-semibold">Date creation:</span>
            <span>{new Date(ticket.createdAt).toLocaleDateString()}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-semibold">Current Status:</span>
            <span className={`text-${ticket.status === 'pending' ? 'yellow' : ticket.status === 'completed' ? 'green' : 'red'}-500`}>
              {ticket.status}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="font-semibold">Category:</span>
            <span>{ticket.category}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-semibold">Department:</span>
            <span>{ticket.department}</span>
          </div>
          <div>
            <span className="font-semibold block mb-1">Problem:</span>
            <p className="text-gray-700 text-sm">
              {ticket.problem}
            </p>
          </div>
          <div>
            <span className="font-semibold block mb-1">Description:</span>
            <p className="text-gray-700 text-sm">
              {ticket.description}
            </p>
          </div>
          <div>
            <span className="font-semibold block mb-1">Location:</span>
            <div className="flex items-center text-sm text-blue-500">
              <span className="material-icons mr-2">location_on</span>
              {ticket.location}
            </div>
          </div>
          {ticket.photo && (
            <div>
              <span className="font-semibold block mb-1">Photo:</span>
              <img 
                src={ticket.photo} 
                alt="Ticket" 
                className="w-full rounded-lg"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TicketDeta;
