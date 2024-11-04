import React, { useState, useEffect } from 'react';
import { FiBell, FiX, FiMapPin, FiCalendar, FiAlertTriangle } from 'react-icons/fi';

const Notification = () => {
  const [notifications, setNotifications] = useState([]);
  const [location, setLocation] = useState(null);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setLocation({ latitude, longitude });
      },
      (error) => console.error("Location access denied:", error)
    );
  }, []);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await fetch(
          `/api/notifications?lat=${location?.latitude}&lon=${location?.longitude}`
        );
        const data = await response.json();
        setNotifications(data);
      } catch (error) {
        console.error('Error fetching notifications:', error);
      }
    };

    if (location) {
      fetchNotifications();
    }
  }, [location]);

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

  const getNotificationStyle = (type) => {
    switch (type) {
      case 'emergency':
        return 'bg-red-50';
      case 'scheduled':
        return 'bg-blue-50';
      default:
        return 'bg-green-50';
    }
  };

  const removeNotification = (index) => {
    setNotifications(notifications.filter((_, i) => i !== index));
  };

  return (
    <div className="relative flex p-8 bg-white rounded-lg shadow-lg max-w-2xl mx-auto">
      <button
        onClick={() => setNotifications([])}
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

        <div className="mt-4 space-y-4 overflow-y-auto max-h-[600px]">
          {notifications.map((notification, index) => (
            <div
              key={index}
              className={`flex items-start space-x-3 p-4 rounded-lg ${getNotificationStyle(notification.type)}`}
            >
              <div className="flex-shrink-0">
                {getNotificationIcon(notification.type)}
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-semibold">{notification.title}</h3>
                  <button
                    onClick={() => removeNotification(index)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <FiX className="w-4 h-4" />
                  </button>
                </div>
                <div className="flex items-center text-xs text-gray-500 mt-1">
                  <FiMapPin className="w-4 h-4 mr-1" />
                  {notification.location}
                </div>
                <p className="text-sm text-gray-600 mt-1">
                  {notification.message}
                </p>
                <p className="text-xs text-gray-400 mt-2">
                  {notification.date}
                </p>
              </div>
            </div>
          ))}
        </div>

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
