import React, { useState } from 'react';
import { FaUserCircle  } from "react-icons/fa";
import { FiSearch, FiBell } from "react-icons/fi";
import axios from 'axios';
import Swal from 'sweetalert2';
import RootLayout from '../../layouts/RootLayout';

const TicketCreation = () => {
  const [formData, setFormData] = useState({
    date: '',
    location: '',
    problem: '',
    description: '',
    photo: null,
  });

  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    setSelectedPhoto(file);
    setFormData((prevData) => ({ ...prevData, photo: file }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Basic form validation
    if (!formData.date || !formData.location || !formData.problem || !formData.description) {
      Swal.fire({
        title: 'Error!',
        text: 'Please fill in all required fields',
        icon: 'error',
        confirmButtonColor: '#22c55e'
      });
      return;
    }

    setIsSubmitting(true);

    try {
      // Create FormData object for file upload
      const submitData = new FormData();
      submitData.append('date', formData.date);
      submitData.append('location', formData.location);
      submitData.append('problem', formData.problem);
      submitData.append('description', formData.description);
      if (formData.photo) {
        submitData.append('photo', formData.photo);
      }

      const response = await axios.post('/tickets', submitData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      // Show success message
      await Swal.fire({
        title: 'Success!',
        text: 'Ticket created successfully',
        icon: 'success',
        confirmButtonColor: '#22c55e'
      });

      // Reset form
      setFormData({
        date: '',
        location: '',
        problem: '',
        description: '',
        photo: null
      });
      setSelectedPhoto(null);

    } catch (error) {
      // Show error message
      Swal.fire({
        title: 'Error!',
        text: error.response?.data?.message || 'Failed to create ticket. Please try again.',
        icon: 'error',
        confirmButtonColor: '#22c55e'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleAddAnother = () => {
    setFormData({
      date: '',
      location: '',
      problem: '',
      description: '',
      photo: null
    });
    setSelectedPhoto(null);
  };

  return (
    <RootLayout>
    <div className="max-w-3xl mx-auto p-4 sm:p-8">

    <header
        style={{
          width: "1000px",
          height: "90px",
          top: "30px",
          left: "321px",
          gap: "0px",
          opacity: "1",
        }}
        className="absolute flex items-center justify-between p-8 bg-white  mb-6 shadow-md"
      >
        <div>
          <h1 className="text-2xl font-semibold">Welcome, Mireille</h1>
          <p className="text-sm text-gray-500">
            Track and manage tickets from all your subscribers with one click.
          </p>
        </div>
        <button className="bg-gray-500 hover:bg-gray-300 text-white px-4 py-2">
          Create
        </button>

      
        <div className="relative w-1/3 mx-4 flex items-center">
          {/* Search Icon positioned on the left */}
          <FiSearch className="absolute left-3 text-gray-500" />
          <input
            type="text"
            placeholder="To research"
            className="border border-gray-300 rounded-md pl-10 p-2 w-full"
          />
        </div>
        
        
        <div className="flex items-center space-x-2 relative">
          <FiBell className="text-gray-500" />
          <FaUserCircle  className="text-2xl" />
        </div>
      </header>

      <h1 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8">Ticket creation</h1>
      <div className="flex items-center justify-between border-b-4 sm:border-b-8 border-green-500 pb-1 sm:pb-2 mb-6 sm:mb-8">
        <p className="text-green-500 text-base sm:text-lg font-semibold">Ticket Information</p>
      </div>

      <form className="space-y-4 sm:space-y-6" onSubmit={handleSubmit}>
        {/* Date */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
          <input
            type="date"
            name="date"
            className="w-full px-3 sm:px-4 py-2 border border-gray-300 rounded-md"
            onChange={handleInputChange}
            value={formData.date}
            required
          />
        </div>

        {/* Location Customer */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Location of Customer</label>
          <input
            type="text"
            name="location"
            placeholder="Enter location"
            className="w-full px-3 sm:px-4 py-2 border border-gray-300 rounded-md"
            onChange={handleInputChange}
            value={formData.location}
            required
          />
        </div>

        {/* Type of Problem */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Type of problem</label>
          <input
            type="text"
            name="problem"
            placeholder="Enter problem type"
            className="w-full px-3 sm:px-4 py-2 border border-gray-300 rounded-md"
            onChange={handleInputChange}
            value={formData.problem}
            required
          />
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
          <textarea
            name="description"
            placeholder="Enter description"
            className="w-full px-3 sm:px-4 py-2 border border-gray-300 rounded-md"
            onChange={handleInputChange}
            value={formData.description}
            required
            rows={4}
          />
        </div>

        {/* Add Photo */}
        <div className="mb-4">
          <label className="block text-gray-600 font-medium text-center mb-2" htmlFor="photo">
            Add photo (Optional)
          </label>
          <label
            htmlFor="dropzone-file"
            className="flex flex-col justify-center items-center w-full sm:w-2/4 h-40 sm:h-52 bg-gray-50 rounded-lg border-2 border-gray-300 border-dashed cursor-pointer hover:bg-gray-100 mx-auto"
          >
            {formData.photo ? (
              <img
                src={URL.createObjectURL(formData.photo)}
                alt="Selected"
                className="max-w-full max-h-full object-contain"
              />
            ) : (
              <div className="flex flex-col justify-center items-center pt-5 pb-6">
                <svg
                  aria-hidden="true"
                  className="mb-3 w-8 sm:w-10 h-8 sm:h-10 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                  ></path>
                </svg>
                <p className="mb-2 text-xs sm:text-sm text-gray-500">
                  <span className="font-semibold">Select a file or drag and drop here</span>
                </p>
                <p className="text-xs text-gray-500">In PNG, JPG, JPEG ..., the file size does not exceed 10 MB</p>
              </div>
            )}
            <input
              id="dropzone-file"
              type="file"
              className="hidden"
              accept="image/*"
              onChange={handlePhotoChange}
            />
          </label>
        </div>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row justify-between gap-4 sm:gap-0 mt-8">
          <button
            type="button"
            onClick={handleAddAnother}
            className="py-2 px-4 rounded-full text-gray-600 bg-gray-100 border border-gray-300 hover:bg-gray-200"
            disabled={isSubmitting}
          >
            Add another ticket
          </button>
          <button
            type="submit"
            className="py-2 px-6 rounded-full text-white bg-green-500 hover:bg-green-600 disabled:bg-green-300"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Submitting...' : 'Continue'}
          </button>
        </div>
      </form>
    </div>
    </RootLayout>
  );
};

export default TicketCreation;