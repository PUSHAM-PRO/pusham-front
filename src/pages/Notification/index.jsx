import React, { useState, useEffect } from 'react';
import { FiBell, FiX, FiMapPin, FiCalendar, FiAlertTriangle } from 'react-icons/fi';

const Notification = () => {
  // Sample notifications to demonstrate functionality
  const sampleNotifications = [
    { type: 'emergency', title: 'Power Outage in Downtown', location: 'Downtown District', message: 'Scheduled maintenance will cause power outage from 10 AM to 4 PM.', date: '2024-10-31' },
    { type: 'scheduled', title: 'Routine System Maintenance', location: 'Uptown Area', message: 'Brief power outage expected during system maintenance from 2 PM to 3 PM.', date: '2024-11-01' },
    { type: 'general', title: 'Energy Saving Tips', location: 'All Areas', message: 'Check out our latest energy-saving tips to reduce your monthly bill.', date: '2024-11-02' },
    { type: 'general', title: 'Service Update', location: 'All Areas', message: 'Our customer service center has extended hours on weekends.', date: '2024-11-03' },
  ];

  const [powerOutageNotifications, setPowerOutageNotifications] = useState([]);
  const [generalNotifications, setGeneralNotifications] = useState([]);
  const [notificationCount, setNotificationCount] = useState(0);

  useEffect(() => {
    // Filter notifications and calculate count
    const outageNotifications = sampleNotifications.filter(notification => notification.type === 'emergency' || notification.type === 'scheduled');
    const generalNotifs = sampleNotifications.filter(notification => notification.type === 'general');

    setPowerOutageNotifications(outageNotifications);
    setGeneralNotifications(generalNotifs);
    setNotificationCount(outageNotifications.length + generalNotifs.length);
  }, []);

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

  const removeNotification = (index, isOutage) => {
    if (isOutage) {
      setPowerOutageNotifications(powerOutageNotifications.filter((_, i) => i !== index));
      setNotificationCount(notificationCount - 1);
    } else {
      setGeneralNotifications(generalNotifications.filter((_, i) => i !== index));
      setNotificationCount(notificationCount - 1);
    }
  };

  return (
    <div className="relative flex p-8 bg-white rounded-lg shadow-lg max-w-2xl mx-auto">
      {/* Bell icon with notification count */}
      <div className="absolute top-4 right-4 flex items-center">
        <FiBell className="w-8 h-8 text-gray-600" />
        {notificationCount > 0 && (
          <span className="ml-2 bg-red-500 text-white text-xs font-bold rounded-full h-6 w-6 flex items-center justify-center">
            {notificationCount}
          </span>
        )}
      </div>

      <div className="flex-shrink-0">
        <img src="/src/assets/images/selective-focus-electricians-are-fixing-power-transmission-line-electricity-pole 1@2x.png" alt="Notification background" className="rounded-lg object-cover h-full w-72" />
      </div>

      <div className="flex flex-col w-full ml-6">
        <h2 className="text-2xl font-semibold">Power Outage Notifications</h2>
        <div className="mt-4 space-y-4 overflow-y-auto max-h-[300px]">
          {powerOutageNotifications.map((notification, index) => (
            <div key={index} className={`flex items-start space-x-3 p-4 rounded-lg ${getNotificationStyle(notification.type)}`}>
              <div className="flex-shrink-0">{getNotificationIcon(notification.type)}</div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-semibold">{notification.title}</h3>
                  <button onClick={() => removeNotification(index, true)} className="text-gray-400 hover:text-gray-600">
                    <FiX className="w-4 h-4" />
                  </button>
                </div>
                <p className="text-xs text-gray-500 mt-1"><FiMapPin className="w-4 h-4 mr-1" />{notification.location}</p>
                <p className="text-sm text-gray-600 mt-1">{notification.message}</p>
                <p className="text-xs text-gray-400 mt-2">{notification.date}</p>
              </div>
            </div>
          ))}
        </div>

        <h2 className="text-2xl font-semibold mt-8">General Notifications</h2>
        <div className="mt-4 space-y-4 overflow-y-auto max-h-[300px]">
          {generalNotifications.map((notification, index) => (
            <div key={index} className={`flex items-start space-x-3 p-4 rounded-lg ${getNotificationStyle(notification.type)}`}>
              <div className="flex-shrink-0">{getNotificationIcon(notification.type)}</div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-semibold">{notification.title}</h3>
                  <button onClick={() => removeNotification(index, false)} className="text-gray-400 hover:text-gray-600">
                    <FiX className="w-4 h-4" />
                  </button>
                </div>
                <p className="text-xs text-gray-500 mt-1"><FiMapPin className="w-4 h-4 mr-1" />{notification.location}</p>
                <p className="text-sm text-gray-600 mt-1">{notification.message}</p>
                <p className="text-xs text-gray-400 mt-2">{notification.date}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Notification;
