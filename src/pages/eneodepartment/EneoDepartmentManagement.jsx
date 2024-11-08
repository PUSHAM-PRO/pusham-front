
import React, { useState, useEffect } from 'react';
import { Plus, Pencil, Trash } from 'lucide-react';
import Modal from '../../components/Modal';

const EneoDepartmentManagement = () => {
  const [accounts, setAccounts] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [currentAccount, setCurrentAccount] = useState(null);
  const [formData, setFormData] = useState({
    departmentName: '',
    email: '',
    contactNumber: ''
  });
  const [responseMessage, setResponseMessage] = useState(null);

  // Fetch ENEO accounts from the backend
  useEffect(() => {
    const fetchAccounts = async () => {
      try {
        const response = await fetch('/api/eneo-accounts');
        const data = await response.json();
        setAccounts(data);
      } catch (error) {
        console.error('Failed to fetch accounts:', error);
      }
    };
    fetchAccounts();
  }, []);

  // Handle form input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  // Open modal for adding or editing accounts
  const openModal = (account = null) => {
    setCurrentAccount(account);
    setFormData(account || { departmentName: '', email: '', contactNumber: '' });
    setShowModal(true);
  };

  // Close modal
  const closeModal = () => {
    setShowModal(false);
    setCurrentAccount(null);
    setResponseMessage(null);
  };

  // Submit form data to the backend (add or update account)
  const handleSubmit = async (e) => {
    e.preventDefault();

    const url = currentAccount
      ? `/api/eneo-accounts/${currentAccount.id}`
      : '/api/eneo-accounts';
    const method = currentAccount ? 'PUT' : 'POST';

    try {
      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setResponseMessage(currentAccount ? 'Department updated!' : 'Department added!');
        const updatedAccounts = await (await fetch('/api/eneo-accounts')).json();
        setAccounts(updatedAccounts);
        closeModal();
      } else {
        setResponseMessage('Error saving department. Please try again.');
      }
    } catch (error) {
      console.error('Error:', error);
      setResponseMessage('Failed to connect to the server.');
    }
  };

  // Delete account
  const deleteAccount = async (id) => {
    await fetch(`/api/eneo-accounts/${id}`, { method: 'DELETE' });
    setAccounts(accounts.filter((account) => account.id !== id));
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold mb-4">ENEO Department Management</h1>
      <button
        className="flex items-center px-4 py-2 text-white bg-green-500 rounded-md hover:bg-green-600"
        onClick={() => openModal()}
      >
        <Plus className="mr-2" />
        Add New Account
      </button>
      <div className="mt-6">
        <table className="min-w-full bg-white rounded-lg shadow overflow-hidden">
          <thead>
            <tr>
              <th className="p-3 text-left">Department Name</th>
              <th className="p-3 text-left">Email</th>
              <th className="p-3 text-left">Contact Number</th>
              <th className="p-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {accounts.map((account) => (
              <tr key={account.id}>
                <td className="p-3">{account.departmentName}</td>
                <td className="p-3">{account.email}</td>
                <td className="p-3">{account.contactNumber}</td>
                <td className="p-3 flex justify-center space-x-2">
                  <button onClick={() => openModal(account)}>
                    <Pencil className="text-blue-500" />
                  </button>
                  <button onClick={() => deleteAccount(account.id)}>
                    <Trash className="text-red-500" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal for Add/Edit */}
      {showModal && (
        <Modal onClose={closeModal}>
          <form onSubmit={handleSubmit} className="p-6">
            <h2 className="text-xl font-bold mb-4">
              {currentAccount ? 'Edit Account' : 'Add New Account'}
            </h2>
            <div className="mb-4">
              <label className="block mb-1">Department Name</label>
              <input
                type="text"
                name="departmentName"
                value={formData.departmentName}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block mb-1">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block mb-1">Contact Number</label>
              <input
                type="tel"
                name="contactNumber"
                value={formData.contactNumber}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                required
              />
            </div>
            <div className="flex justify-end space-x-3">
              <button
                type="button"
                onClick={closeModal}
                className="px-4 py-2 bg-gray-200 rounded-md"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 text-white bg-green-500 rounded-md"
              >
                Save
              </button>
            </div>
          </form>
          {responseMessage && (
            <p className="mt-4 text-center text-sm text-gray-600">
              {responseMessage}
            </p>
          )}
        </Modal>
      )}
    </div>
  );
};

export default EneoDepartmentManagement;
