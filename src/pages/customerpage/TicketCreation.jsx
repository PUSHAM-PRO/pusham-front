import React, { useState } from 'react';

const TicketCreation = () => {
  const [formData, setFormData] = useState({
    date: '',
    department: '',
    locationCustomer: '',
    problemType: '',
    description: '',
    photo: null,
  });

  const [selectedPhoto, setSelectedPhoto] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    setSelectedPhoto(file);
    setFormData((prevData) => ({ ...prevData, photo: file }));
  };

  return (
    <div className="max-w-3xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-8">Ticket creation</h1>
      <div className="flex items-center justify-between border-b-8 border-green-500 pb-2 mb-8">
        <p className="text-green-500 text-lg font-semibold">Ticket Information</p>
      </div>

      <form className="space-y-6">
        {/* Date */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
          <input
            name="date"
            className="w-full px-4 py-2 border border-gray-300 rounded-md"
            onChange={handleInputChange}
            value={formData.date}
          />
        </div>

        {/* Department */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Department</label>
          <input
            name="department"
            className="w-full px-4 py-2 border border-gray-300 rounded-md"
            onChange={handleInputChange}
            value={formData.department}
          />
        </div>

        {/* Location Customer */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Location customer</label>
          <input
            type="text"
            name="locationCustomer"
            placeholder="Placeholder"
            className="w-full px-4 py-2 border border-gray-300 rounded-md"
            onChange={handleInputChange}
            value={formData.locationCustomer}
          />
        </div>

        {/* Type of Problem */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Type of problem</label>
          <input
            type="text"
            name="problemType"
            placeholder="Placeholder"
            className="w-full px-4 py-2 border border-gray-300 rounded-md"
            onChange={handleInputChange}
            value={formData.problemType}
          />
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
          <input
            type="text"
            name="description"
            placeholder="Placeholder"
            className="w-full px-4 py-2 border border-gray-300 rounded-md"
            onChange={handleInputChange}
            value={formData.description}
          />
        </div>

        {/* Add Photo */}
<div className="mb-4">
  <label className="block text-gray-600 font-medium text-center mb-2" htmlFor="photo">
    Add photo (Optional)
  </label>

  <label
    htmlFor="dropzone-file"
    className="flex flex-col justify-center items-center w-2/4 h-52 bg-gray-50 rounded-lg border-2 border-gray-300 border-dashed cursor-pointer hover:bg-gray-100 mx-auto"
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
          className="mb-3 w-10 h-10 text-gray-400"
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
        <p className="mb-2 text-sm text-gray-500">
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
        <div className="flex justify-between mt-8">
          <button
            type="button"
            className="py-2 px-4 rounded-full text-gray-600 bg-gray-100 border border-gray-300 hover:bg-gray-200"
          >
            Add another ticket
          </button>
          <button
            type="submit"
            className="py-2 px-6 rounded-full text-white bg-green-500 hover:bg-green-600"
          >
            Continue
          </button>
        </div>
      </form>
    </div>
  );
};

export default TicketCreation;
