import React from 'react'
import { FaSearch } from 'react-icons/fa';

const AgentSubheader = () => {
  return (
    <div className="bg-white border-b border-gray-200 p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="relative">
          <FaSearch className="ml-2 absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="To research"
            className="pl-10 pr-4 py-2 bg-white rounded-md border border-gray-300 w-full sm:w-auto"
          />
        </div>
        <div className="flex gap-4">
          <select className="px-4 py-2 border border-gray-300 rounded-md">
            <option>Type</option>
          </select>
          <select className="px-4 py-2 border border-gray-300 rounded-md">
            <option>Status</option>
          </select>
          <select className="px-4 py-2 border border-gray-300 rounded-md">
            <option>Assigned</option>
          </select>
        </div>
      </div>
      <p className="text-gray-500">06 issues</p>
    </div>
  );
};
export default AgentSubheader;
