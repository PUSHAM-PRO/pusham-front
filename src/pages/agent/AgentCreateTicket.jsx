import React, { useState } from 'react';
import { LuUploadCloud } from 'react-icons/lu';
import { IoArrowForwardOutline } from 'react-icons/io5';
import AgentCreateHeader from './AgentCreateHeader';
import Swal from 'sweetalert2';
import { apiAddTickets } from '../../services/auth';
import { useNavigate } from 'react-router-dom';
import AgentSideBar from './AgentSidebar';

const AgentCreateTicket = () => {
  const [formData, setFormData] = useState({
    department: '',
    location: '',
    problem: '',
    description: '',
    photo: null,
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
      const requiredFields = ['department', 'location', 'problem', 'description'];
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

      setFormData({
        department: '',
        location: '',
        problem: '',
        description: '',
        photo: null,
      });

    } catch (error) {
      if (error.message === "No token found. Please log in.") {
        Swal.fire({
          icon: 'error',
          title: 'Authentication Error',
          text: 'Please log in to create a ticket.',
          confirmButtonText: 'OK'
        }).then(() => {
          navigate('/login');
        });
        return;
      }

      console.error('Error adding ticket:', error);
      Swal.fire({
        icon: 'error',
        title: 'Failed to Add Ticket',
        text: error.response?.data?.message || 
              'An error occurred while adding the ticket. Please try again.',
        confirmButtonText: 'OK',
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
    <div className="flex h-screen bg-gray-100">
      <AgentSideBar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <AgentCreateHeader />
        <div className="flex-1 overflow-y-auto p-8">
          <h2 className="text-2xl font-bold mb-4">Ticket Creation</h2>
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="mb-6">
              <p className="text-sm font-semibold text-green-600">Ticket Information</p>
              <div className="bg-green-500 h-1 w-full mt-1"></div>
            </div>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 gap-6 max-w-2xl">
                <div className="flex flex-col items-center">
                  <label className="text-gray-700 w-full mb-1 font-bold">Department</label>
                  <input
                    type="text"
                    name="department"
                    value={formData.department}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-md p-2"
                  />
                </div>
                <div className="flex flex-col items-center">
                  <label className="text-gray-700 w-full mb-1 font-bold">Location</label>
                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    placeholder="Enter location"
                    className="w-full border border-gray-300 rounded-md p-3 pl-4 focus:outline-none focus:ring-2 focus:ring-green-500 text-gray-800"
                  />
                </div>
                <div className="flex flex-col items-center">
                  <label className="text-gray-700 w-full mb-1 font-bold">Type of Problem</label>
                  <input
                    type="text"
                    name="problem"
                    value={formData.problem}
                    onChange={handleChange}
                    placeholder="Enter problem type"
                    className="w-full border border-gray-300 rounded-md p-3 pl-4 focus:outline-none focus:ring-2 focus:ring-green-500 text-gray-800"
                  />
                </div>
                <div className="flex flex-col items-center">
                  <label className="text-gray-700 w-full mb-1 font-bold">Description</label>
                  <input
                    type="text"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="Enter description"
                    className="w-full border border-gray-300 rounded-md p-3 pl-4 focus:outline-none focus:ring-2 focus:ring-green-500 text-gray-800"
                  />
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
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AgentCreateTicket;


