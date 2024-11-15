import React from 'react';
import { FaCog, FaLifeRing, FaClipboardList, FaSearch } from 'react-icons/fa';
import { CiLogin } from "react-icons/ci";
import { MdOutlineMoreTime } from "react-icons/md";
import image from "../../assets/images/pushamLogo.png"
import image1 from '../../assets/images/m-eto.png'

const  SuperSidebar = () => {
  return (
    <div
      className="w-[311px] h-[982px] bg-[#112228] border-r border-[#5D696D] flex flex-col justify-between text-white"
      style={{ paddingTop: '20px', paddingLeft: '10px' }}
    >
      
      <div>
      
       
        
        <div className="flex  mb-8">
          <img src={image} alt="Pusham Logo" className="w-16 h-16" /> 
        </div>
     

       
        <div className="flex items-center bg-white rounded-lg px-3 py-2 mb-6">
          <FaSearch className="text-gray-400 mr-2" />
          <input
            type="text"
            placeholder="Search"
            className="bg-transparent outline-none text-white placeholder-gray-400"
          />
        </div>

      
        <div className="flex flex-col space-y-4">
          <button className="flex items-center gap-2 px-4 py-3 bg-green-500 rounded-lg text-white">
            <FaClipboardList />
            Control Panel
          </button>
          <button className="flex items-center gap-2 px-4 py-3 text-white hover:bg-gray-700 rounded-lg">
            <FaCog />
            Ticket Tracking
          </button>
          <button className="flex items-center gap-2 px-4 py-3 text-white hover:bg-gray-700 rounded-lg">
            <MdOutlineMoreTime />
            History & Archiving
          </button>
        </div>
      </div>

      <div className="flex flex-col gap-4 mb-8">
        <button className="flex items-center gap-2 px-4 py-3 text-white hover:bg-gray-700 rounded-lg">
          <FaCog />
          Settings
        </button>
        <button className="flex items-center gap-2 px-4 py-3 text-white hover:bg-gray-700 rounded-lg">
          <FaLifeRing />
          Help and Support
        </button>
        
     
        <hr className="border-t border-white my-4" />

        <div className="flex items-center gap-2 px-4 py-3 mt-1 w-full rounded-lg">
          <img
            src={image1}
            alt="Profile"
            className="w-10 h-10 rounded-full"
          />
          <div>
            <p>Mireille Eto</p>
            <p className="text-gray-400 text-sm">Mireille dot e at gmail dot com</p>
          </div>
          <a href="/" className="ml-auto text-gray-400 hover:text-white"><CiLogin className="text-2xl text-white"  /></a>
        </div>
      </div>
    
    </div>
   
  );
};

export default SuperSidebar;
