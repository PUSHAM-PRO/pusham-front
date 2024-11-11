import React, { useState } from 'react';

const TenderSubmissionForm = () => {
  // Default form values
  const defaultTitle = 'Sample Tender Title';
  const defaultDescription = 'Enter a detailed description of the tender';
  const defaultSubmissionDate = '2024-12-01';
  const defaultDeadline = '2024-12-31';
  const defaultContactInfo = 'contact@example.com';

  const [attachment, setAttachment] = useState(null); // Track file attachment
  const [errors, setErrors] = useState({});

  // Handle file upload change
  const handleFileChange = (e) => {
    setAttachment(e.target.files[0]);
  };

  // Validate required fields
  const validateForm = () => {
    const newErrors = {};
    if (!defaultTitle) newErrors.title = 'Title is required';
    if (!defaultDescription) newErrors.description = 'Description is required';
    if (!defaultSubmissionDate) newErrors.submissionDate = 'Submission Date is required';
    if (!defaultDeadline) newErrors.deadline = 'Deadline is required';
    if (!defaultContactInfo) newErrors.contactInfo = 'Contact Information is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const formData = {
      title: defaultTitle,
      description: defaultDescription,
      submissionDate: defaultSubmissionDate,
      deadline: defaultDeadline,
      attachment,
      contactInfo: defaultContactInfo,
    };

    // Display form data in the console (simulating API submission)
    console.log(formData);

    // Clear file attachment after submission
    setAttachment(null);
    setErrors({});
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-lg p-6 space-y-6 bg-white rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-center text-gray-800">Tender Submission Form</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          
          {/* Tender Title */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Tender Title</label>
            <input
              type="text"
              name="title"
              defaultValue={defaultTitle}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2"
              placeholder="Enter tender title"
              required
            />
            {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title}</p>}
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Description</label>
            <textarea
              name="description"
              defaultValue={defaultDescription}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2"
              placeholder="Enter tender description"
              required
            />
            {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description}</p>}
          </div>

          {/* Submission Date */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Submission Date</label>
            <input
              type="date"
              name="submissionDate"
              defaultValue={defaultSubmissionDate}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2"
              required
            />
            {errors.submissionDate && <p className="text-red-500 text-sm mt-1">{errors.submissionDate}</p>}
          </div>

          {/* Deadline */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Deadline</label>
            <input
              type="date"
              name="deadline"
              defaultValue={defaultDeadline}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2"
              required
            />
            {errors.deadline && <p className="text-red-500 text-sm mt-1">{errors.deadline}</p>}
          </div>

          {/* Attachment */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Attachment</label>
            <input
              type="file"
              name="attachment"
              onChange={handleFileChange}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2"
            />
          </div>

          {/* Contact Information */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Contact Information</label>
            <input
              type="text"
              name="contactInfo"
              defaultValue={defaultContactInfo}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2"
              placeholder="Enter contact information"
              required
            />
            {errors.contactInfo && <p className="text-red-500 text-sm mt-1">{errors.contactInfo}</p>}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-2 text-white font-bold rounded-md hover:opacity-90 transition-opacity duration-150"
            style={{ backgroundColor: 'rgb(3, 161, 11)' }}
          >
            Submit Tender
          </button>
        </form>
      </div>
    </div>
  );
};

export default TenderSubmissionForm;
