import React, { useState, useRef } from "react";
import { FaUserCircle } from "react-icons/fa";
import { FiChevronDown, FiSearch, FiBell } from "react-icons/fi";
import { IoArrowForwardOutline } from "react-icons/io5";
import { LuUploadCloud, LuEye } from "react-icons/lu";
import RootLayout from "../../layouts/RootLayout";
import { apiAddTickets } from "../../services/auth";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

function CreatingTicket() {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  const [formData, setFormData] = useState({
    department: '',
    location: '',
    problem: '',
    description: '',
    photo: null,
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleFileChange = (e) => {
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
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Validate required fields
      const requiredFields = ['department', 'location', 'problem', 'description'];
      const emptyFields = requiredFields.filter(field => !formData[field]);
      
      if (emptyFields.length > 0) {
        Swal.fire({
          icon: 'error',
          title: 'Required Fields Empty',
          text: `Please fill in the following fields: ${emptyFields.join(', ')}`,
          confirmButtonText: 'OK',
        });
        setIsLoading(false);
        return;
      }

      const ticketData = {
        ...formData,
        photo: formData.photo || 'https://savefiles.org/default-image?shareable_link=502'
      };

      await apiAddTickets(ticketData);

      Swal.fire({
        icon: 'success',
        title: 'Success!',
        text: 'Ticket has been created successfully.',
        confirmButtonText: 'OK'
      }).then(() => {
        navigate(-1); // Go back to previous page
      });

    } catch (error) {
      console.error('Error creating ticket:', error);
      
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

      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: error.response?.data?.message || 'Failed to create ticket. Please try again.',
        confirmButtonText: 'OK'
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <RootLayout>
      <div className="bo flex flex-col items-center p-6">
        <header className="absolute flex items-center justify-between p-8 bg-white mb-6 shadow-md" style={{
          width: "1000px", height: "90px", top: "30px", left: "321px"
        }}>
          <div>
            <h1 className="text-2xl font-semibold">Welcome, Mireille</h1>
            <p className="text-sm text-gray-500">
              Track and manage tickets from all your subscribers with one click.
            </p>
          </div>
          <button className="bg-gray-500 hover:bg-gray-300 text-white px-4 py-2 rounded">
            Create
          </button>

          <div className="relative w-1/3 mx-4 flex items-center">
            <FiSearch className="absolute left-3 text-gray-500" />
            <input
              type="text"
              placeholder="To research"
              className="border border-gray-300 rounded-md pl-10 p-2 w-full"
            />
          </div>
          
          <div className="flex items-center space-x-2 relative">
            <FiBell className="text-gray-500" />
            <FaUserCircle className="text-2xl" />
          </div>
        </header>

        <div className="bg-white shadow-lg p-8" style={{
          width: "1000px", height: "900px", top: "150px", left: "321px",
          position: "absolute"
        }}>
          <h2 className="text-2xl font-bold mb-4">Ticket creation</h2>

          <div className="mb-6">
            <p className="text-sm font-semibold text-green-600">Ticket Information</p>
            <div className="bg-green-500 h-1 w-full mt-1"></div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6 w-full max-w-md mx-auto">
            <div className="flex flex-col items-center">
              <label className="text-gray-700 w-full mb-1 font-bold">Department</label>
              <div className="relative w-full">
                <input
                  type="text"
                  name="department"
                  value={formData.department}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-md p-2"
                />
                <FiChevronDown className="absolute top-2.5 right-3 text-gray-500" />
              </div>
            </div>

            <div className="flex flex-col items-center">
              <label className="text-gray-700 w-full mb-1 font-bold">Location customer</label>
              <div className="relative w-full">
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-md p-2"
                />
                <LuEye className="absolute top-2.5 right-3 text-gray-500" />
              </div>
            </div>

            <div className="flex flex-col items-center">
              <label className="text-gray-700 w-full mb-1 font-bold">Type of problem</label>
              <div className="relative w-full">
                <input
                  type="text"
                  name="problem"
                  value={formData.problem}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-md p-2"
                />
                <LuEye className="absolute top-2.5 right-3 text-gray-500" />
              </div>
            </div>

            <div className="flex flex-col items-center">
              <label className="text-gray-700 w-full mb-1 font-bold">Description</label>
              <div className="relative w-full">
                <input
                  type="text"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-md p-2"
                />
                <LuEye className="absolute top-2.5 right-3 text-gray-500" />
              </div>
            </div>

            <div className="flex flex-col items-center mb-8">
              <label className="text-gray-700 w-full mb-1 font-bold">Add photo (Optional)</label>
              <div 
                className="border-dashed border-2 border-gray-300 rounded-lg p-4 text-center w-full max-w-md"
                onClick={() => fileInputRef.current?.click()}
              >
                <LuUploadCloud className="text-4xl text-gray-400 mx-auto mb-2" />
                <p className="text-gray-500 text-sm mb-2">Select a file or drag and drop here</p>
                <p className="text-gray-400 text-xs">PNG, JPG, GIF… Max file size: 10 MB</p>
                <button 
                  type="button"
                  className="bg-white mt-4 px-5 py-2 rounded-full font-bold border"
                  onClick={(e) => {
                    e.preventDefault();
                    fileInputRef.current?.click();
                  }}
                >
                  Select photo
                </button>
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  className="hidden"
                  accept="image/*"
                />
              </div>
            </div>

            <div className="flex justify-end space-x-4 mt-12">
              <button
                type="button"
                className="border border-gray-300 hover:bg-gray-200 rounded-full px-4 py-2 text-gray-700 flex items-center"
                onClick={() => setFormData({
                  department: '',
                  location: '',
                  problem: '',
                  description: '',
                  photo: null,
                })}
              >
                Add another ticket
              </button>
              <button
                type="submit"
                disabled={isLoading}
                className="bg-green-500 hover:bg-green-600 text-white rounded-full px-6 py-2 flex items-center"
              >
                {isLoading ? 'Creating...' : 'Continue'} <IoArrowForwardOutline className="ml-2" />
              </button>
            </div>
          </form>
        </div>
      </div>
    </RootLayout>
  );
}

export default CreatingTicket;
