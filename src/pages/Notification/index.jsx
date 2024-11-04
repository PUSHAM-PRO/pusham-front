import React, { useState, useEffect } from 'react';
import { FiBell, FiX, FiMapPin, FiCalendar, FiAlertTriangle } from 'react-icons/fi';

const Notification = () => {
  // State to store notifications fetched from the API
  const [notifications, setNotifications] = useState([]);

  // State to store user's location (latitude and longitude)
  const [location, setLocation] = useState(null);

  // useEffect to get user's location on component mount
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        // If location access is granted, set location state with latitude and longitude
        const { latitude, longitude } = position.coords;
        setLocation({ latitude, longitude });
      },
      (error) => console.error("Location access denied:", error) // Error if location access is denied
    );
  }, []);

  // useEffect to fetch notifications when location is available
  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        // Fetch notifications from API endpoint with location parameters
        const response = await fetch(
          `/api/notifications?lat=${location?.latitude}&lon=${location?.longitude}`
        );
        // Parse response data to JSON and set it in notifications state
        const data = await response.json();
        setNotifications(data);
      } catch (error) {
        console.error('Error fetching notifications:', error);
      }
    };

    // Fetch notifications only if location data is available
    if (location) {
      fetchNotifications();
    }
  }, [location]);

  // Function to determine the appropriate icon based on notification type
  const getNotificationIcon = (type) => {
    switch (type) {
      case 'emergency':
        return <FiAlertTriangle className="w-6 h-6 text-red-500" />; 
      case 'scheduled':
        return <FiCalendar className="w-6 h-6 text-blue-500" />; 
      default:
        return <FiBell className="w-6 h-6 text-green-500" />;
    }
  };

  // Function to set background color based on notification type
  const getNotificationStyle = (type) => {
    switch (type) {
      case 'emergency':
        return 'bg-red-50'; // Style for emergency notification
      case 'scheduled':
        return 'bg-blue-50'; // Style for scheduled notification
      default:
        return 'bg-green-50'; // Default style
    }
  };

  // Function to remove a notification from the list
  const removeNotification = (index) => {
    // Filter out the notification at the given index
    setNotifications(notifications.filter((_, i) => i !== index));
  };

  return (
    <div className="relative flex p-8 bg-white rounded-lg shadow-lg max-w-2xl mx-auto">
      {/* Button to clear all notifications */}
      <button
        onClick={() => setNotifications([])} // Clears all notifications
        className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
      >
        <FiX className="w-6 h-6" />
      </button>

      
      <div className="flex-shrink-0">
        <img
          src="/src/assets/images/selective-focus-electricians-are-fixing-power-transmission-line-electricity-pole 1@2x.png"
          alt="Notification background"
          className="rounded-lg object-cover h-full w-72"
        />
      </div>

      <div className="flex flex-col w-full ml-6">
       
        <div className="flex items-center justify-between mb-6 mt-6">
          <h2 className="text-2xl font-semibold">Notifications</h2>
          <FiBell className="w-6 h-6 text-green-500" />
        </div>

        {/* Notification list, scrollable if it overflows */}
        <div className="mt-4 space-y-4 overflow-y-auto max-h-[600px]">
          {/* Map through notifications and render each */}
          {notifications.map((notification, index) => (
            <div
              key={index} // Unique key for each notification item
              className={`flex items-start space-x-3 p-4 rounded-lg ${getNotificationStyle(notification.type)}`}
            >
              {/* Display appropriate icon for notification type */}
              <div className="flex-shrink-0">
                {getNotificationIcon(notification.type)}
              </div>
              <div className="flex-1">
                {/* Header section with title and close button */}
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-semibold">{notification.title}</h3>
                  <button
                    onClick={() => removeNotification(index)} // Remove notification on click
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <FiX className="w-4 h-4" />
                  </button>
                </div>
                {/* Display notification location */}
                <div className="flex items-center text-xs text-gray-500 mt-1">
                  <FiMapPin className="w-4 h-4 mr-1" />
                  {notification.location}
                </div>
                {/* Display notification message */}
                <p className="text-sm text-gray-600 mt-1">
                  {notification.message}
                </p>
                {/* Display notification date */}
                <p className="text-xs text-gray-400 mt-2">
                  {notification.date}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Message if no notifications are available */}
        {notifications.length === 0 && (
          <div className="text-center text-gray-500 py-8">
            No power outage notifications at this time
          </div>
        )}
      </div>
    </div>
  );
};

export default Notification;
