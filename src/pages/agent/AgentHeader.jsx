import React from 'react';
import { Link } from 'react-router-dom';

const AgentHeader = () => {
  return (
    <header className="bg-white shadow px-6 py-4 flex items-center justify-between">
      {/* Left Section: Title */}
      <h1 className="text-2xl font-semibold">Billing Department</h1>

      {/* Middle Section: Create Button */}
      <div className="absolute left-1/2 transform -translate-x-1/2">
        <button className="px-4 py-2 bg-gray-900 text-white rounded-md hover:bg-gray-700">
          <Link to="/agentcreateticket">Create</Link>
        </button>
      </div>

      {/* Right Section: Profile */}
      <div className="flex items-center gap-2">
        <img
          src="https://via.placeholder.com/32"
          alt="Profile"
          className="w-8 h-8 rounded-full"
        />
        <p>Mireille Eto</p>
      </div>
    </header>
  );
};

export default AgentHeader;