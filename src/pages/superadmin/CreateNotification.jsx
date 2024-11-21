import React, { useState } from 'react';
import { FiSend, FiAlertTriangle } from 'react-icons/fi';
import Swal from 'sweetalert2';

const CreateNotification = () => {
  const [formData, setFormData] = useState({
    recipientType: '',  // customers, departments, or agents
    notificationType: '', // emergency, scheduled, or general
    title: '',
    message: '',
    location: '',
    expiryDate: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Validate required fields
      const requiredFields = ['recipientType', 'notificationType', 'title', 'message'];
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

      // TODO: Add your API call here to send the notification
      console.log('Sending notification:', formData);

      Swal.fire({
        icon: 'success',
        title: 'Notification Sent!',
        text: 'Your notification has been sent successfully.',
        confirmButtonText: 'OK',
      });

      // Reset form
      setFormData({
        recipientType: '',
        notificationType: '',
        title: '',
        message: '',
        location: '',
        expiryDate: ''
      });

    } catch (error) {
      console.error('Error sending notification:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Failed to send notification. Please try again.',
        confirmButtonText: 'OK',
      });
    }
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-sm">
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-2">Create Notification</h2>
        <p className="text-gray-600">Send notifications to customers, departments, or agents</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Recipient Type Selection */}
        <div className="grid grid-cols-1 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Send To
            </label>
            <select
              name="recipientType"
              value={formData.recipientType}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md p-2 focus:ring-green-500 focus:border-green-500"
            >
              <option value="">Select recipient type</option>
              <option value="customers">All Customers</option>
              <option value="departments">All Departments</option>
              <option value="agents">All Agents</option>
            </select>
          </div>

          {/* Notification Type */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Notification Type
            </label>
            <select
              name="notificationType"
              value={formData.notificationType}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md p-2 focus:ring-green-500 focus:border-green-500"
            >
              <option value="">Select notification type</option>
              <option value="emergency">Emergency</option>
              <option value="scheduled">Scheduled</option>
              <option value="general">General</option>
            </select>
          </div>

          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Title
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Enter notification title"
              className="w-full border border-gray-300 rounded-md p-2 focus:ring-green-500 focus:border-green-500"
            />
          </div>

          {/* Message */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Message
            </label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Enter notification message"
              rows="4"
              className="w-full border border-gray-300 rounded-md p-2 focus:ring-green-500 focus:border-green-500"
            />
          </div>

          {/* Location */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Location (Optional)
            </label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              placeholder="Enter affected location"
              className="w-full border border-gray-300 rounded-md p-2 focus:ring-green-500 focus:border-green-500"
            />
          </div>

          {/* Expiry Date */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Expiry Date (Optional)
            </label>
            <input
              type="datetime-local"
              name="expiryDate"
              value={formData.expiryDate}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md p-2 focus:ring-green-500 focus:border-green-500"
            />
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-end">
          <button
            type="submit"
            className="flex items-center gap-2 bg-green-500 text-white px-6 py-2 rounded-full hover:bg-green-600 transition-colors"
          >
            <FiSend className="w-4 h-4" />
            Send Notification
          </button>
        </div>
      </form>

      {/* Preview Section */}
      {formData.title && formData.message && (
        <div className="mt-8 border-t pt-6">
          <h3 className="text-lg font-semibold mb-4">Preview</h3>
          <div className={`p-4 rounded-lg ${
            formData.notificationType === 'emergency' ? 'bg-red-50' :
            formData.notificationType === 'scheduled' ? 'bg-blue-50' :
            'bg-green-50'
          }`}>
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0">
                <FiAlertTriangle className={`w-5 h-5 ${
                  formData.notificationType === 'emergency' ? 'text-red-500' :
                  formData.notificationType === 'scheduled' ? 'text-blue-500' :
                  'text-green-500'
                }`} />
              </div>
              <div>
                <h4 className="font-semibold">{formData.title}</h4>
                {formData.location && (
                  <p className="text-sm text-gray-600 mt-1">Location: {formData.location}</p>
                )}
                <p className="text-sm mt-2">{formData.message}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CreateNotification; 