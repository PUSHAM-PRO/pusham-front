import React from 'react';
import profileImage from '../../assets/images/m-eto.png';
import { Link } from 'react-router-dom';
import Notification from '../../components/Notification';

const AgentCreateHeader = () => {
  return (
    <div className="flex items-center justify-between bg-white shadow-md px-6 py-4 w-full">
      <div className='flex items-center'>
        <div>
          <h2 className="text-2xl font-bold">Welcome, Mireille</h2>
          <p className="text-gray-500">Track and manage tickets for all your subscribers with one click.</p>
        </div>
      </div>

      <div className='flex items-center gap-4'>
        <Notification />
        <div className="w-10 h-10 rounded-full overflow-hidden">
          <img 
            src={profileImage} 
            alt="Profile" 
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default AgentCreateHeader;
