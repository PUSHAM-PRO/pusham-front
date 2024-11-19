import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
// import { getSingleTicket } from '../../services/api';
import { apiGetTicket } from '../../services/auth';

const TicketDetails = () => {
  const [ticket, setTicket] = useState(null);
  const [isVisible, setIsVisible] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();


    const fetchTicket = async () => {
      try {
        const response = await apiGetTicket(id);
        const fecthedTicket = response.data
        setTicket(fecthedTicket);
        console.log("Fetched Tickets",fecthedTicket)
      } catch (error) {
        console.error('Error fetching ticket:', error);
      }
    };
    useEffect(() => {
      setIsVisible(true);
      fetchTicket();
    }, [id]);

  if (!ticket) return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
    </div>
  );

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-end justify-end p-4">
      <div 
        className={`w-full max-w-md bg-white shadow-lg rounded-lg p-6 transform transition-all duration-300 ease-in-out
          ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'}`}
      >
        {ticket && (
          <div>
            <button 
              onClick={() => {
                setIsVisible(false);
                setTimeout(() => navigate(-1), 300);
              }} 
              className="text-blue-500 text-sm mb-4"
            >
              &larr; Return
            </button>
            <h1 className="text-lg font-semibold text-green-600 mb-4">
              Ticket details
            </h1>
            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="font-semibold">Date creation:</span>
                <span>
                  {new Date(ticket.createdAt).toLocaleDateString()}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold">Current Status:</span>
                <span
                  className={`text-${
                    ticket.status === "pending"
                      ? "yellow"
                      : ticket.status === "completed"
                      ? "green"
                      : "red"
                  }-500`}
                >
                  {ticket.status}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold">Date execution:</span>
                <span>{ticket.executionDate || "-"}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold">Department:</span>
                <span>{ticket.department}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold block mb-1">
                  Description:
                </span>
                <p className="text-gray-700 text-sm">
                  {ticket.description}
                </p>
              </div>
              <div>
                <span className="font-semibold block mb-1">
                  Coordonnée de l’agent:
                </span>
                <div className="flex items-center text-sm">
                  <span className="material-icons mr-2">phone</span>
                  {ticket.agentPhone || "+237 699 88 77 66"}
                </div>
              </div>
              <div>
                <span className="font-semibold block mb-1">Zone:</span>
                <div className="flex items-center text-sm">
                  {/* <span className="material-icons mr-2">location_on</span> */}
                  {ticket.location || "N/A"}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TicketDetails;
