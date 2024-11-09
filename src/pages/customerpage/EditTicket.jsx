import React, { useState } from 'react';
import { FaTimes } from 'react-icons/fa';
import { FiCalendar, FiUserCheck, FiTruck } from "react-icons/fi";
import { MdOutlinePeopleAlt, MdLowPriority } from "react-icons/md";
import { GoPaperclip } from "react-icons/go";
import { PiSunLight } from "react-icons/pi";

const EditTicket = () => {
  const [assignedAgent, setAssignedAgent] = useState('');
  const [department, setDepartment] = useState('');
  const [dateSubmission, setDateSubmission] = useState('');
  const [dateExecution, setDateExecution] = useState('');
  const [type, setType] = useState('');
  const [priority, setPriority] = useState('');
  const [status, setStatus] = useState('');
  const [description, setDescription] = useState('');

  const handleEdit = () => {
    alert('Ticket updated successfully!');
  };

  const handleClose = () => {
    alert('Modal closed');
  };

  return (
    <div className="inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-lg p-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-xl font-semibold">Ticket Details</h2>
            <p className="text-sm text-[#344054]">Explore and add the full details of the query for effective follow-up.</p>
          </div>

          <button onClick={handleClose}>
            <FaTimes className="text-gray-500 hover:text-red-500" />
          </button>
        </div>

        {/* Form Section */}
        <form className="space-y-4">
          {/* General Information */}
          <div>
            <h3 className="text-lg font-medium text-gray-700 mb-4">General Information</h3>
            <div className="grid gap-4">
              <div className="flex justify-between">
                <div className="flex items-center space-x-2 text-[#344054]">
                  <FiUserCheck />
                  <span className="block text-sm font-medium text-gray-700">Assigned Agent</span>
                </div>
                <select
                  value={assignedAgent}
                  onChange={(e) => setAssignedAgent(e.target.value)}
                  className="w-[264px] h-10 left-[328px] border rounded-lg pl-4"
                >
                  <option value=""> Agent</option>
                  <option value="Agent">Agent</option>
                </select>
              </div>

              <div className="flex justify-between">
                <div className="flex items-center space-x-2 text-[#344054]">
                  <MdOutlinePeopleAlt />
                  <span className="text-[#344054] block text-sm font-medium">Department</span>
                </div>
                <select
                  value={department}
                  onChange={(e) => setDepartment(e.target.value)}
                  className="w-[264px] h-10 left-[328px] border rounded-lg pl-4"
                >
                  <option value="Billing">Billing</option>
                  <option value="Facturation">Facturation</option>
                </select>
              </div>

              <div className="flex justify-between">
                <div className="flex items-center space-x-2 text-[#344054]">
                  <FiCalendar />
                  <span className="text-[#344054] block text-sm font-medium">Date Submission</span>
                </div>
                <input
                  type="text"
                  value={dateSubmission}
                  onChange={(e) => setDateSubmission(e.target.value)}
                  placeholder="DD/MM/YYYY"
                  className="w-[264px] h-10 left-[328px] border rounded-lg pl-4"
                  required
                />
              </div>

              <div className="flex justify-between">
                <div className="flex items-center space-x-2 text-[#344054]">
                  <FiCalendar />
                  <span className="text-[#344054] block text-sm font-medium">Date Execution</span>
                </div>
                <input
                  type="text"
                  value={dateExecution}
                  onChange={(e) => setDateExecution(e.target.value)}
                  placeholder="DD/MM/YYYY"
                  className="w-[264px] h-10 left-[328px] border rounded-lg pl-4 "
                  required
                />
              </div>
            </div>
          </div>
          <div className="py-4">
            <hr />
          </div>

          {/* Ticket Details */}
          <div>
            <h3 className="text-lg font-medium text-gray-700 mb-4">Ticket Details</h3>
            <div className="grid gap-4">
              <div className="flex justify-between">
                <div className="flex items-center space-x-2 text-[#344054]">
                  <GoPaperclip />
                  <span className="text-[#344054] block text-sm font-medium">Type</span>
                </div>
                <select
                  value={type}
                  onChange={(e) => setType(e.target.value)}
                  className="w-[264px] h-10 left-[328px] border rounded-lg pl-4"
                >
                  <option value="Error Payment">Error Payment</option>
                </select>
              </div>

              <div className="flex justify-between">
                <div className="flex items-center space-x-2 text-[#344054]">
                  <MdLowPriority />
                  <span className="text-[#344054] block text-sm font-medium">Priority</span>
                </div>

                <select
                  value={priority}
                  onChange={(e) => setPriority(e.target.value)}
                  className="w-[264px] h-10 left-[328px] border rounded-lg pl-4"
                >
                  <option value="Highest">Highest</option>
                  <option value="High">High</option>
                  <option value="Medium">Medium</option>
                  <option value="Low">Low</option>
                </select>
              </div>

              <div className="flex justify-between">
                <div className="flex items-center space-x-2 text-[#344054]">
                  <PiSunLight />
                  <span className="text-[#344054] block text-sm font-medium">Status</span>
                </div>
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  className="w-[264px] h-10 left-[328px] border rounded-lg pl-4"
                >
                  <option value="Delivered">Delivered</option>
                  <option value="Pending">Pending</option>
                  <option value="In Progress">In Progress</option>
                  <option value="On Hold">On Hold</option>
                </select>
              </div>

              <div className="flex justify-between">
                <div className="flex items-center space-x-2 text-[#344054]">
                  <FiTruck />
                  <span className="text-[#344054] block text-sm font-medium">Description</span>
                </div>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="border rounded-lg w-[264px] h-20 left-[328px] pl-4"
                placeholder="Enter ticket description..."
               />
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end space-x-4 mt-6">
            <button
              type="button"
              onClick={handleClose}
              className="px-4 gap-2 bg-[#FFFFFF] hover:bg-red-500 rounded-[32px] w-[290px] h-12 border font-semibold text-[#344054]"
            >
              Close
            </button>
            <button
              type="button"
              onClick={handleEdit}
              className="px-4 gap-2 bg-[#00B207] text-white rounded-[32px] w-[290px] h-12 font-semibold"
            >
              Edit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditTicket;
