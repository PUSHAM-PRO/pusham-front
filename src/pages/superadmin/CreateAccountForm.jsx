// src/pages/admin/CreateENEOAccountForm.jsx
import React from 'react';

const CreateENEOAccountForm = () => {
  return (
    <div className="p-8 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Create ENEO Account</h2>
      <form>
        
        <div className="mb-4">
          <label className="block text-gray-700">Name</label>
          <input type="text" className="w-full px-4 py-2 border rounded-md" placeholder="Enter name" />
        </div>
        <button type="submit" className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700">
          Create Account
        </button>
      </form>
    </div>
  );
};

export default CreateENEOAccountForm;
