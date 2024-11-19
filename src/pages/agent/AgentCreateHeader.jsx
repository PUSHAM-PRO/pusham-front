import React from 'react';
import { CiBellOn } from 'react-icons/ci';
import profileImage from '../../assets/images/m-eto.png';
import { Link } from 'react-router-dom';

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

        
        <div className="relative cursor-pointer">
          <CiBellOn className="text-2xl text-gray-600" />
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
            0
          </span>
        </div>
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
