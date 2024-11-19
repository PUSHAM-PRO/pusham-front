import React, { useState } from 'react';
import { FiChevronDown } from 'react-icons/fi';
import { LuUploadCloud } from 'react-icons/lu';
import { IoArrowForwardOutline } from 'react-icons/io5';

import Swal from 'sweetalert2';
import { apiAddTickets } from '../../services/auth';
import { useNavigate } from 'react-router-dom';

const AddTicket = () => {
  const [formData, setFormData] = useState({
    department: '',
    location: '',
    problem: '',
    description: '',
    photo: 'https://savefiles.org/default-image?shareable_link=502',
    category: '',
    assignedTo: 'not assigned'
  });
  const navigate = useNavigate();

  const fileInputRef = React.useRef(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, photo: reader.result });
      };
      reader.readAsDataURL(file); 
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const requiredFields = ['problem', 'description'];
      const emptyFields = requiredFields.filter(field => !formData[field]);
      
      if (emptyFields.length > 0) {
        Swal.fire({
          icon: 'error',
          title: 'Required Fields Empty',
          text: `Please fill in the following fields: ${emptyFields.join(', ')}`,
          confirmButtonText: 'OK',
        });
        return;
      }

      const ticketData = {
        ...formData,
        photo: formData.photo || 'https://savefiles.org/default-image?shareable_link=502'
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
      Swal.fire({
        icon: 'error',
        title: 'Failed to Add Ticket',
        text: error.response?.data?.message || 'An error occurred while adding the ticket.',
        confirmButtonText: 'Try Again',
      });
    }
  };

  const handleImageFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 10 * 1024 * 1024) {
          Swal.fire({
            icon: 'error',
            title: 'File Too Large',
            text: 'Please select an image under 10MB',
            confirmButtonText: 'OK',
          });
          return;
        }
        const imageUrl = `https://savefiles.org/${file.name}?shareable_link=502`;
        setFormData(prev => ({ ...prev, photo: imageUrl }));
      }
    }



      
  
  

  return (
    <div className="mt-11  flex flex-col items-center">
      <h2 className="text-2xl font-bold mb-4">Ticket Creation</h2>
      <div className="px-10 w-[60%]">
        <div className="mb-6">
          <p className="text-sm font-semibold text-green-600">Ticket Information</p>
          <div className="bg-green-500 h-1 w-full mt-1"></div>
        </div>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="flex flex-col">
          <label className="text-gray-700 mb-1">Department</label>
          <input
            type="text"
            name="department"
            value={formData.department}
            onChange={handleChange}
            className="border rounded-md p-2"
          />
        </div>
        <div className="flex flex-col">
          <label className="text-gray-700 mb-1">Location</label>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            className="border rounded-md p-2"
          />
        </div>
        <div className="flex flex-col">
          <label className="text-gray-700 mb-1">
            Problem <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="problem"
            value={formData.problem}
            onChange={handleChange}
            required
            className="border rounded-md p-2"
          />
        </div>
        <div className="flex flex-col">
          <label className="text-gray-700 mb-1">
            Description <span className="text-red-500">*</span>
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
            className="border rounded-md p-2"
          />
        </div>
        <div className="flex flex-col">
          <label className="text-gray-700 mb-1">Category</label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="border rounded-md p-2"
          >
            <option value="">Select Category</option>
            <option value="technical support">Technical Support</option>
            <option value="billing">Billing</option>
            <option value="account management">Account Management</option>
            <option value="sales enquiry">Sales Enquiry</option>
          </select>
        </div>
        <div className="flex flex-col items-center mb-8">
          <label className="text-gray-700 w-full mb-1 font-bold">Add photo (Optional)</label>
          <div
            className="border-dashed border-2 border-gray-300 rounded-lg p-4 text-center w-full max-w-md"
            onClick={() => fileInputRef.current.click()}
          >
            <LuUploadCloud className="text-4xl text-gray-400 mx-auto mb-2" />
            <p className="text-gray-500 text-sm mb-2">Select a file or drag and drop here</p>
            <p className="text-gray-400 text-xs">PNG, JPG, GIF… Max file size: 10 MB</p>
            <button
              className="bg-white mt-4 px-5 py-2 rounded-full font-bold border"
              onClick={(e) => {
                e.preventDefault();
                fileInputRef.current.click();
              }}
            >
              Select photo
            </button>
            <input
              type="file"
              ref={fileInputRef}
              className="hidden"
              onChange={handleFileChange}
            />
          </div>
        </div>
        <div className="flex justify-end space-x-4 mt-12">
            <button
              type="button"
              className="border border-gray-300 hover:bg-gray-200 rounded-full px-4 py-2 text-gray-700 flex items-center"
              onClick={() => setFormData({ ...formData, photo: null })}
            >
              Add another ticket
            </button>
            <button
              type="submit"
              className="bg-green-500 hover:bg-green-600 text-white rounded-full px-6 py-2 flex items-center"
            >
              Continue <IoArrowForwardOutline className="ml-2" />
            </button>
          </div>
      </form>
    </div>
    </div>
  );
};


export default AddTicket;


