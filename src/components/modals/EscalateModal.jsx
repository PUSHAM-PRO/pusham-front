import React, { useState } from 'react';
import { IoArrowBackOutline } from 'react-icons/io5';

const EscalateModal = ({ isOpen, onClose, ticketCode, onEscalate }) => {
  const [formData, setFormData] = useState({
    code: ticketCode || '',
    department: '',
    description: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await onEscalate(formData);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-[400px]">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Escalate the ticket</h2>
          <button onClick={onClose} className="text-gray-500">&times;</button>
        </div>
        
        <p className="text-sm text-gray-600 mb-4">
          This ticket is currently not being processed. Please enter the name of the department you would like to call it to for it to be picked up.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Code Ticket</label>
            <input
              type="text"
              value={formData.code}
              disabled
              className="w-full p-2 border rounded-md bg-gray-50"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Department</label>
            <input
              type="text"
              value={formData.department}
              onChange={(e) => setFormData({...formData, department: e.target.value})}
              placeholder="Name of department"
              className="w-full p-2 border rounded-md"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Description</label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
              className="w-full p-2 border rounded-md h-24"
            />
          </div>

          <div className="flex justify-end gap-3 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-600 border rounded-full"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-green-500 text-white rounded-full"
            >
              Continue
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EscalateModal; 