import React, { useState } from 'react';
import { CiBellOn } from 'react-icons/ci';
import { FiBell, FiX, FiMapPin, FiCalendar, FiAlertTriangle } from 'react-icons/fi';
import { Link } from 'react-router-dom';

const Notification = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [notifications] = useState([
    {
      id: 1,
      type: 'emergency',
      title: 'Power Outage in Downtown',
      location: 'Downtown District',
      message: 'Scheduled maintenance will cause power outage from 10 AM to 4 PM.',
      date: '2024-10-31',
      isRead: false
    },
    {
      id: 2,
      type: 'scheduled',
      title: 'Routine System Maintenance',
      location: 'Uptown Area',
      message: 'Brief power outage expected during system maintenance.',
      date: '2024-11-01',
      isRead: false
    }
  ]);

  const getNotificationIcon = (type) => {
    switch (type) {
      case 'emergency':
        return <FiAlertTriangle className="w-5 h-5 text-red-500" />;
      case 'scheduled':
        return <FiCalendar className="w-5 h-5 text-blue-500" />;
      default:
        return <FiBell className="w-5 h-5 text-green-500" />;
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

  return (
    <div className="relative">
      {/* Bell Icon with notification count */}
      <div 
        className="relative cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        <CiBellOn className="text-2xl text-gray-600" />
        {notifications.filter(n => !n.isRead).length > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
            {notifications.filter(n => !n.isRead).length}
          </span>
        )}
      </div>

      {/* Dropdown menu */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-96 bg-white rounded-lg shadow-lg z-50">
          <div className="p-4 border-b">
            <div className="flex justify-between items-center">
              <h3 className="font-semibold">Notifications</h3>
              <button 
                className="text-sm text-green-500 hover:text-green-600"
                onClick={() => {/* Add mark all as read functionality */}}
              >
                Mark all as read
              </button>
            </div>
          </div>
          
          <div className="max-h-96 overflow-y-auto">
            {notifications.length === 0 ? (
              <div className="p-4 text-center text-gray-500">
                No notifications
              </div>
            ) : (
              notifications.map(notification => (
                <div 
                  key={notification.id}
                  className={`p-4 border-b hover:bg-gray-50 cursor-pointer ${
                    !notification.isRead ? getNotificationStyle(notification.type) : ''
                  }`}
                >
                  <div className="flex items-start space-x-3">
                    <div className="flex-shrink-0">
                      {getNotificationIcon(notification.type)}
                    </div>
                    <div className="flex-1">
                      <h4 className="text-sm font-semibold">{notification.title}</h4>
                      <p className="text-xs text-gray-500 flex items-center mt-1">
                        <FiMapPin className="w-4 h-4 mr-1" /> {notification.location}
                      </p>
                      <p className="text-sm text-gray-600 mt-1">{notification.message}</p>
                      <p className="text-xs text-gray-400 mt-2">{notification.date}</p>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
          
          <div className="p-4 text-center border-t">
            <Link 
              to="/notifications"
              className="text-sm text-green-500 hover:text-green-600"
              onClick={() => setIsOpen(false)}
            >
              View all notifications
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default Notification; 