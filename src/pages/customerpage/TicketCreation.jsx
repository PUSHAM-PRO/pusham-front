import React, { useState } from 'react';
import { FiUpload } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { apiAddTickets } from '../../services/auth';
import RootLayout from '../../layouts/RootLayout';

const TicketCreation = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    department: 'billing',
    location: '',
    problem: '',
    description: '',
    category: 'Billing',
    photo: null
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData(prev => ({
        ...prev,
        photo: file
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {

      if (!formData.department || !formData.location || !formData.problem || !formData.description || !formData.category) {
        Swal.fire({
          icon: 'error',
          title: 'Required Fields Empty',
          text: 'Please fill in all required fields.',
          confirmButtonText: 'OK',
        });
        return;
      }


      const ticketData = {
        department: formData.department,
        location: formData.location,
        problem: formData.problem,
        description: formData.description,
        category: formData.category,
        status: 'initialized',
        assignedTo: 'not assigned',
        photo: formData.photo ? formData.photo : 'default-image'
      };

      const response = await apiAddTickets(ticketData);

      Swal.fire({
        icon: 'success',
        title: 'Ticket Added!',
        text: 'Your ticket has been successfully added.',
        confirmButtonText: 'OK',
      }).then((result) => {
        if (result.isConfirmed) {
          navigate(-1);
        }
      });
    } catch (error) {
      console.error('Error adding ticket:', error);
      const errorMessage = error.response?.data?.message ||
        error.response?.data?.error ||
        'An error occurred while adding the ticket.';
      Swal.fire({
        icon: 'error',
        title: 'Failed to Add Ticket',
        text: errorMessage,
        confirmButtonText: 'OK',
      });
    }
  };

  return (
    <RootLayout>
      <div className="bg-white rounded-xl shadow p-8 mx-4  lg:mr-20  max-w-screen-xl">
        <h1 className="text-3xl font-bold text-gray-800 mt-8">Ticket creation</h1>

        <div className="w-full max-w-3xl bg-white shadow-md rounded-lg mt-8 p-6">
          <div className="mb-6">
            <h2 className="text-lg font-medium text-green-600 mb-1">Ticket information</h2>
            <div className="w-full h-1 bg-green-600 rounded-full"></div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* <div>
            <label className="block text-gray-700 font-medium mb-1">Department</label>
            <input
              type="text"
              name="department"
              value={formData.department}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md p-3 text-gray-700 focus:ring focus:ring-green-300"
            />

          </div> */}


            <div>
              <label className="block text-gray-700 font-medium mb-1">Location of customer</label>
              <input
                type="text"
                name='location'
                value={formData.location}
                onChange={handleChange}
                placeholder="Enter location"
                className="w-full border border-gray-300 rounded-md p-3 text-gray-700 focus:ring focus:ring-green-300"
              />
            </div>


            <div>
              <label className="block text-gray-700 font-medium mb-1">Type of problem</label>
              <input
                type="text"
                name='problem'
                value={formData.problem}
                onChange={handleChange}
                placeholder="Describe the problem"
                className="w-full border border-gray-300 rounded-md p-3 text-gray-700 focus:ring focus:ring-green-300"
              />
            </div>


            <div>
              <label className="block text-gray-700 font-medium mb-1">Description</label>
              <textarea
                name='description'
                value={formData.description}
                onChange={handleChange}
                placeholder="Provide a detailed description"
                rows="4"
                className="w-full border border-gray-300 rounded-md p-3 text-gray-700 focus:ring focus:ring-green-300"
              ></textarea>
            </div>
            {/* <div>
            <label className="block text-gray-700 font-medium mb-1 w-full">category</label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md p-3 text-gray-700 focus:ring focus:ring-green-300"
            >
              <option value="">Select Category</option>
              <option value="technical support">Technical Support</option>
              <option value="billing">Billing</option>
              <option value="account management">Account Management</option>
              <option value="sales enquiry">Sales Enquiry</option>
            </select>
          </div> */}

            <div className="p-6 flex flex-col justify-center ">
              <p className="text-gray-500 font-medium flex  justify-center">Add photo (Optional)</p>
              <div className="border border-dashed border-gray-300 rounded-md p-6 flex flex-col items-center">

                <div className="flex flex-col items-center mt-4">
                  <div className="w-12 h-12 flex items-center justify-center rounded-full bg-gray-100">
                    <FiUpload className="w-6 h-6 text-gray-400" /> {/* React Icon */}
                  </div>
                  <p className="text-sm text-gray-500 mt-2">Select a file or drag and drop here</p>
                  <input
                    type="file"
                    onChange={handleFileChange}
                    className="hidden"
                    id="photo-upload"
                    accept="image/*"
                  />
                  <label
                    htmlFor="photo-upload"
                    className="mt-4 px-4 py-2 bg-white text-black rounded-full border border-black text-sm cursor-pointer"
                  >
                    Select photo
                  </label>
                </div>
              </div>
            </div>

            <div className="flex justify-between items-center">
              <button type="button" className="py-1.5 px-4 text-gray 600 font-medium rounded-full border border-gray-300 hover:bg-gray-200">
                Add another ticket
              </button>
              <button type="submit" className="px-6 py-2 bg-green-500 text-white font-medium rounded-full hover:bg-green-600">
                Continue →
              </button>
            </div>
          </form>
        </div>
      </div>
    </RootLayout>
  );
};

export default TicketCreation;
