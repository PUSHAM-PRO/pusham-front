import React, { useState } from 'react';
import { apiCreateDepartment } from '../../services/auth';

export default function CreateDepartmentForm() {
  const [departmentName, setDepartmentName] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async () => {
    try {
      setIsLoading(true);
      await apiCreateDepartment({
        category: departmentName 
      });
      // Reset form and show success (you might want to add a toast notification here)
      setDepartmentName('');
    } catch (error) {
      console.error('Failed to create department:', error);
      // Handle error (you might want to add error notification here)
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white rounded-lg shadow-lg p-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Create department</h2>
        <button className="text-gray-500 hover:text-gray-700">&times;</button>
      </div>
      <p className="text-gray-600 mt-2">Please enter the name of the department you want to create.</p>
      
      <div className="mt-4">
        <label htmlFor="departmentName" className="block font-medium text-gray-700">
          Department
        </label>
        <input
          type="text"
          id="departmentName"
          value={departmentName}
          onChange={(e) => setDepartmentName(e.target.value)}
          placeholder="Name of department"
          className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
        />
      </div>
      
      <div className="flex mt-6 space-x-4">
        <button 
          className="px-4 py-2 w-64 border border-gray-300 text-gray-700 rounded-full hover:bg-gray-100"
          onClick={() => setDepartmentName('')}
        >
          Cancel
        </button>
        <button 
          className="px-4 py-2 w-36 bg-green-500 text-white rounded-full hover:bg-green-600 disabled:bg-green-300"
          onClick={handleSubmit}
          disabled={!departmentName.trim() || isLoading}
        >
          {isLoading ? 'Creating...' : 'Create'}
        </button>
      </div>
    </div>
  );
}
