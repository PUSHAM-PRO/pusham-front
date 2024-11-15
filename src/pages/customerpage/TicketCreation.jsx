import React, { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import RootLayout from '../../layouts/RootLayout';


const TicketCreation = () => {
  const [formData, setFormData] = useState({
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

    if (!formData.location || !formData.problem || !formData.description) {
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
      const submitData = new FormData();
      submitData.append('date', formData.date);
      submitData.append('department', formData.department);
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

      await Swal.fire({
        title: 'Success!',
        text: 'Ticket created successfully',
        icon: 'success',
        confirmButtonColor: '#22c55e'
      });

      setFormData({
        location: '',
        problem: '',
        description: '',
        photo: null
      });
      setSelectedPhoto(null);

    } catch (error) {
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
      location: '',
      problem: '',
      description: '',
      photo: null
    });
    setSelectedPhoto(null);
  };

  return (
    <RootLayout>
      <div className="bg-white rounded-xl shadow p-8 mx-4  lg:mr-20  max-w-screen-xl">
     
      <h2 className="text-2xl font-bold mb-6">Ticket creation</h2>
      <form onSubmit={handleSubmit}>
        <div className="border-b-8 border-green-500 mb-6 rounded-lg">
          <span className="text-green-500 font-medium">Ticket Information</span>
        </div>

        <div className="space-y-4">
          {/* Location of Customer */}
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
        </div>

        <div className="flex justify-end items-center gap-4 mt-6">
          <button
            type="button"
            onClick={handleAddAnother}
            className="py-2 px-4 text-gray 600 font-medium rounded-full border border-gray-300 hover:bg-gray-200"
          >
            Add another ticket
          </button>
          <button
            type="submit"
            className="bg-green-500 text-white px-6 py-2 rounded-full flex items-center gap-2"
            disabled={isSubmitting}
          >
            Continue
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </div>
      </form>
    </div>
   </RootLayout>
  );
};

export default TicketCreation;