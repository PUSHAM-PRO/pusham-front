// src/components/ENEOAccountManagement.jsx

import React from 'react';
import { Plus, Edit, Trash } from 'lucide-react'; // Lucide icons
import { useNavigate } from 'react-router-dom';

const ENEOAccountManagement = () => {
  const navigate = useNavigate();

  // Sample data for ENEO accounts
  const accounts = [
    { id: 1, name: 'John Doe', email: 'johndoe@eneo.com', department: 'Power Distribution' },
    { id: 2, name: 'Jane Smith', email: 'janesmith@eneo.com', department: 'Customer Support' },
    // Add more sample accounts here if needed
  ];

  const handleAddAccount = () => {
    // Navigate to form page for adding new account
    navigate('/admin/create-eneo-account');
  };

  const handleEditAccount = (id) => {
    // Navigate to edit page for the selected account
    navigate(`/admin/edit-eneo-account/${id}`);
  };

  const handleDeleteAccount = (id) => {
    // Placeholder function for deleting an account
    alert(`Account with ID ${id} deleted.`);
  };

  return (
    <div className="p-8 bg-white rounded-lg shadow-md">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-800">ENEO Department Account Management</h2>
        <button
          onClick={handleAddAccount}
          className="flex items-center px-4 py-2 text-white bg-green-600 rounded hover:bg-green-700"
        >
          <Plus className="w-5 h-5 mr-2" />
          Add Account
        </button>
      </div>

      {/* Account List Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left table-auto">
          <thead>
            <tr>
              <th className="px-4 py-2 text-gray-600">Name</th>
              <th className="px-4 py-2 text-gray-600">Email</th>
              <th className="px-4 py-2 text-gray-600">Department</th>
              <th className="px-4 py-2 text-gray-600">Actions</th>
            </tr>
          </thead>
          <tbody>
            {accounts.map((account) => (
              <tr key={account.id} className="border-t border-gray-200">
                <td className="px-4 py-3 text-gray-800">{account.name}</td>
                <td className="px-4 py-3 text-gray-800">{account.email}</td>
                <td className="px-4 py-3 text-gray-800">{account.department}</td>
                <td className="px-4 py-3">
                  <div className="flex items-center space-x-4">
                    <button
                      onClick={() => handleEditAccount(account.id)}
                      className="text-blue-600 hover:text-blue-800"
                    >
                      <Edit className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => handleDeleteAccount(account.id)}
                      className="text-red-600 hover:text-red-800"
                    >
                      <Trash className="w-5 h-5" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ENEOAccountManagement;
