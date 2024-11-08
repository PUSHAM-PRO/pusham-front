
import React from 'react';
import { useParams } from 'react-router-dom';

const EditENEOAccountForm = () => {
  const { id } = useParams(); 

  return (
    <div className="p-8 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Edit ENEO Account (ID: {id})</h2>

      <form>
     
        <div className="mb-4">
          <label className="block text-gray-700">Name</label>
          <input type="text" className="w-full px-4 py-2 border rounded-md" placeholder="Enter name" />
        </div>
        <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default EditENEOAccountForm;
