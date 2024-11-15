import React from 'react';
import { CiSearch,CiBellOn  } from 'react-icons/ci';
import profileImage from '../../assets/images/m-eto.png'; //profile image path
import { Link } from 'react-router-dom';

const DashboardHeader = () => {
  return (
    <div className="flex items-center justify-between bg-white shadow-md px-6 py-4" style={{ width: '1222px', height: '66px' }}>
  
      <div className='flex items-center '>
        <div><h2 className="text-2xl font-bold">Welcome, Mireille</h2>
        <p className="text-gray-500">Track and manage tickets for all your subscribers with one click.</p></div>
{/*         
        <button className="bg-gray-800 text-white font-semibold px-4 py-2 ml-8 rounded">Create</button> */}
      </div>

     
      <div className="flex items-center gap-4 ">
       
      <Link
  to="/superAdmin/superCreate"
  className="bg-gray-800 text-white font-semibold px-4 py-2 rounded mr-10"
>
  Create
</Link>
        
      
        <div className="relative">
          <input
            type="text"
            placeholder="To research"
            className="border border-gray-300 rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            style={{ width: '250px' }}
          />
          <CiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
        </div>
       
      </div>
      <div className='flex justify-end items-center gap-3'>
            
            <CiBellOn  className="text-2xl text-gray-600 " />
            <img src={profileImage} alt="Profile" className="w-10 h-10 rounded-full" />
            </div>
    </div>
  );
};

export default DashboardHeader;
