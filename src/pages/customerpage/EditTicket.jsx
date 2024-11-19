import React, { useState, useEffect } from 'react';
import { FaTimes } from 'react-icons/fa';
import { FiTruck, FiUserCheck } from "react-icons/fi";
import { MdOutlinePeopleAlt, MdLowPriority } from "react-icons/md";
import { GoPaperclip } from "react-icons/go";
import { PiSunLight } from "react-icons/pi";
import { useNavigate, useParams } from 'react-router-dom';
import { apiUpdateTicketPro, apiUpdateTicketComplete } from '../../services/auth';
import { apiClient } from '../../services/config';

const EditTicket = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    user: '',
    department: '',
    location: '',
    problem: '',
    description: '',
    photo: '',
    status: '',
    role: '',
    category: '',
    assignedTo: '',
  });

  const VALID_STATUSES = ['initialized', 'in_progress', 'completed'];

  useEffect(() => {
    async function fetchTicket() {
      try {
        const response = await apiClient.get(`/tickets/${id}`);
        const data = response.data;
        setFormData({
          user: data.user || '',
          department: data.department || '',
          location: data.location || '',
          problem: data.problem || '',
          description: data.description || '',
          photo: data.photo || '',
          status: data.status || 'initialized',
          role: data.role || '',
          category: data.category || '',
          assignedTo: data.assignedTo || '',
        });
      } catch (error) {
        console.error('Error fetching ticket:', error.response?.data || error.message);
      }
    }
    fetchTicket();
  }, [id]);

  const handleEdit = async () => {
    try {
      const updatedData = {
        ...formData
      };

      if (formData.status === 'in_progress') {
        await apiUpdateTicketPro(id, updatedData);
      } else if (formData.status === 'completed') {
        await apiUpdateTicketComplete(id, updatedData);
      }

      alert('Ticket updated successfully!');
      navigate(-1);
    } catch (error) {
      console.error('Error updating ticket:', error.response?.data || error.message);
      alert(`Failed to update ticket: ${error.response?.data || error.message}`);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleClose = () => {
    navigate(-1);
  };

  return (
    <div className="inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-lg p-6">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-xl font-semibold">Ticket Details</h2>
            <p className="text-sm text-gray-500">Fill in the details to update the ticket.</p>
          </div>
          <button onClick={handleClose}>
            <FaTimes className="text-gray-500 hover:text-red-500" />
          </button>
        </div>

        <form className="space-y-4">
          <div>
            <h3 className="text-lg font-medium text-gray-700 mb-4">General Information</h3>
            <div className="grid gap-4">
              <div className="flex justify-between">
                <div className="flex items-center space-x-2 text-gray-700">
                  <MdOutlinePeopleAlt />
                  <span className="block text-sm font-medium">Department</span>
                </div>
                <select
                  name="department"
                  value={formData.department}
                  onChange={handleChange}
                  className="w-[264px] h-10 border rounded-lg pl-4"
                >
                  <option value="Billing">Billing</option>
                  <option value="Facturation">Facturation</option>
                </select>
              </div>

              <div className="flex justify-between">
                <div className="flex items-center space-x-2 text-gray-700">
                  <PiSunLight />
                  <span className="block text-sm font-medium">Status</span>
                </div>
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  className="w-[264px] h-10 border rounded-lg pl-4"
                >
                  <option value="">Select Status</option>
                  <option value="in_progress">In Progress</option>
                  <option value="completed">Completed</option>
                </select>
              </div>

              <div className="flex justify-between">
                <div className="flex items-center space-x-2 text-gray-700">
                  <FiTruck />
                  <span className="block text-sm font-medium">Description</span>
                </div>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  className="border rounded-lg w-[264px] h-20 pl-4"
                  placeholder="Enter ticket description..."
                />
              </div>

              <div className="flex justify-between">
                <div className="flex items-center space-x-2 text-gray-700">
                  <GoPaperclip />
                  <span className="block text-sm font-medium">Problem</span>
                </div>
                <textarea
                  name="problem"
                  value={formData.problem}
                  onChange={handleChange}
                  className="border rounded-lg w-[264px] h-20 pl-4"
                  placeholder="Enter problem description..."
                />
              </div>

              <div className="flex justify-between">
                <div className="flex items-center space-x-2 text-gray-700">
                  <MdLowPriority />
                  <span className="block text-sm font-medium">Category</span>
                </div>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="w-[264px] h-10 border rounded-lg pl-4"
                >
                  <option value="">Select Category</option>
                  <option value="technical support">Technical Support</option>
                  <option value="billing">Billing</option>
                  <option value="account management">Account Management</option>
                  <option value="sales enquiry">Sales Enquiry</option>
                </select>
              </div>

              <div className="flex justify-between">
                <div className="flex items-center space-x-2 text-gray-700">
                  <FiUserCheck />
                  <span className="block text-sm font-medium">Assigned To</span>
                </div>
                <select
                  name="assignedTo"
                  value={formData.assignedTo}
                  onChange={handleChange}
                  className="w-[264px] h-10 border rounded-lg pl-4"
                >
                  <option value="">Select Agent</option>
                  <option value="not assigned">Not Assigned</option>
                  <option value="agent1">Agent 1</option>
                  <option value="agent2">Agent 2</option>
                </select>
              </div>
            </div>
          </div>

          <div className="flex justify-end space-x-4 mt-6">
            <button
              type="button"
              onClick={handleClose}
              className="px-4 bg-white hover:bg-red-500 rounded-full w-[290px] h-12 border font-semibold text-gray-700"
            >
              Close
            </button>
            <button
              type="button"
              onClick={handleEdit}
              className="px-4 bg-green-600 text-white rounded-full w-[290px] h-12 font-semibold"
            >
              Update Ticket
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditTicket;
