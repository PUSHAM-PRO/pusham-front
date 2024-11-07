import React from "react";
import { MdArrowBack, MdPhone, MdLocationOn } from "react-icons/md";

function TicketDetails() {
  return (
    <div
      className="absolute bg-white shadow-lg p-6"
      style={{
        width: "473px",
        height: "568px",
        top: "413px",
        left: "1034px",
        borderRadius: "8px 0px 0px 8px",
        opacity: 1,
      }}
    >
      {/* Header */}
      <div className="flex items-center text-green-600 mb-4">
        <MdArrowBack className="mr-2" />
        <span className="text-lg font-semibold">Ticket details</span>
      </div>

      {/* Ticket Details */}
      <div className="space-y-6 text-sm text-gray-700">
        {/* Date Creation */}
        <div className="flex justify-between">
          <span className="font-medium">Date creation :</span>
          <span>26/09/2024</span>
        </div>

        {/* Current Status */}
        <div className="flex justify-between">
          <span className="font-medium">Current Status :</span>
          <span className="text-orange-500 font-semibold">On hold</span>
        </div>

        {/* Date Execution */}
        <div className="flex justify-between">
          <span className="font-medium">Date execution :</span>
        </div>

        <hr />

        {/* Department */}
        <div className="flex justify-between">
          <span className="font-medium">Department :</span>
          <span>Billing department</span>
        </div>

        {/* Description */}
        <div>
          <span className="font-medium">Description :</span>
          <p className="mt-2 text-gray-600">
            Good evening everyone, I'm trying to pay my bill online without success. I
            haven't understood anything for two days...
          </p>
        </div>

        {/* Agent Contact */}
        <div className="flex items-start mt-4">
          <span className="font-medium mr-2">Coordonnée de l'agent :</span>
          <div className="flex items-center">
            <MdPhone className="text-green-500 mr-2" />
            <span>+237 699 88 77 66</span>
          </div>
        </div>

        <hr />

        {/* Zone */}
        <div className="flex items-start mt-4">
          <span className="font-medium mr-2">Zone :</span>
          <div className="flex items-center">
            <MdLocationOn className="text-green-500 mr-2" />
            <span>2MXV+MGR, Douala, Cameroon</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TicketDetails;
