import React from "react";
import { FaUserCircle  } from "react-icons/fa";
import { MdOutlinePlace } from "react-icons/md";
import { FiImage, FiChevronDown, FiSearch, FiBell } from "react-icons/fi";
import { IoArrowForwardOutline } from "react-icons/io5";
import { LuUploadCloud } from "react-icons/lu";
import { LuEye } from "react-icons/lu";

function CreatingTicket() {
  return (
    <div className=" bg-white flex flex-col items-center p-6">
      <header
        style={{
          width: "1000px",
          height: "90px",
          top: "30px",
          left: "321px",
          gap: "0px",
          opacity: "1",
        }}
        className="absolute flex items-center justify-between p-8 bg-white  mb-6 shadow-md"
      >
        <div>
          <h1 className="text-2xl font-semibold">Welcome, Mireille</h1>
          <p className="text-sm text-gray-500">
            Track and manage tickets from all your subscribers with one click.
          </p>
        </div>
        <button className="bg-gray-500 hover:bg-gray-300 text-white px-4 py-2">
          Create
        </button>

      
        <div className="relative w-1/3 mx-4 flex items-center">
          {/* Search Icon positioned on the left */}
          <FiSearch className="absolute left-3 text-gray-500" />
          <input
            type="text"
            placeholder="To research"
            className="border border-gray-300 rounded-md pl-10 p-2 w-full"
          />
        </div>
        
        
        <div className="flex items-center space-x-2 relative">
          <FiBell className="text-gray-500" />
          <FaUserCircle  className="text-2xl" />
        </div>
      </header>

<div
        style={{
          width: "1000px",
          height: "930px",
          top: "150px",
          left: "321px",
          gap: "0px",
          opacity: "1",
          position: "absolute",
        }}
        className="bg-white shadow-lg p-8"
      >
        <h2 className="text-2xl font-bold mb-4">Ticket creation</h2>

      
        <div className="mb-6">
          <p className="text-sm font-semibold text-green-600">Ticket Information</p>
          <div className="bg-green-500 h-1 w-full mt-1"></div>
        </div>

        
        <form className="space-y-6 w-full max-w-md mx-auto">
        
          <div className="flex flex-col items-center">
            <label className="text-gray-700 w-full mb-1 font-bold">Date</label>
            <div className="relative w-full">
              <input
                type="text"
                placeholder=""
                className="w-full border border-gray-300 rounded-md p-2"
              />
              <FiChevronDown className="absolute top-2.5 right-3 text-gray-500" />
            </div>
          </div>

          
          <div className="flex flex-col items-center">
            <label className="text-gray-700 w-full mb-1 font-bold">Department</label>
            <div className="relative w-full">
              <input
                type="text"
                placeholder=""
                className="w-full border border-gray-300 rounded-md p-2"
              />
              <FiChevronDown className="absolute top-2.5 right-3 text-gray-500" />
            </div>
          </div>

        
          <div className="flex flex-col items-center">
            <label className="text-gray-700 w-full mb-1 font-bold">Location customer</label>
            <div className="relative w-full">
              <input
                type="text"
                placeholder="Placeholder"
                className="w-full border border-gray-300 rounded-md p-2"
              />
              <LuEye className="absolute top-2.5 right-3 text-gray-500" />
            </div>
          </div>

          
          <div className="flex flex-col items-center">
            <label className="text-gray-700 w-full mb-1 font-bold">Type of problem</label>
            <div className="relative w-full">
              <input
                type="text"
                placeholder="Placeholder"
                className="w-full border border-gray-300 rounded-md p-2"
              />
              <LuEye className="absolute top-2.5 right-3 text-gray-500" />
            </div>
          </div>

          <div className="flex flex-col items-center">
            <label className="text-gray-700 w-full mb-1 font-bold">Description</label>
            <div className="relative w-full">
              <input
                type="text"
                placeholder="Placeholder"
                className="w-full border border-gray-300 rounded-md p-2"
              />
              <LuEye className="absolute top-2.5 right-3 text-gray-500" />
            </div>
          </div>

          
          <div className="flex flex-col items-center mb-8">
            <label className="text-gray-700 w-full mb-1 font-bold">Add photo (Optional)</label>
            <div className="border-dashed border-2 border-gray-300 rounded-lg p-4 text-center w-full max-w-md">
              <LuUploadCloud className="text-4xl text-gray-400 mx-auto mb-2" />
              <p className="text-gray-500 text-sm mb-2">Select a file or drag and drop here</p>
              <p className="text-gray-400 text-xs">PNG, JPG, GIF… Max file size: 10 MB</p>
              <button className="bg-white mt-4 px-5 py-2 rounded-full font-bold border">Select photo</button>
            </div>
          </div>

          
        </form>

        
        <div className="flex justify-end space-x-4 mt-12">
            <button
              type="button"
              className="border border-gray-300  hover:bg-gray-200 rounded-full px-4 py-2 text-gray-700 flex items-center"
            >
              Add another ticket
            </button>
            <button
              type="submit"
              className="bg-green-500 hover:bg-green-600 text-white rounded-full px-6 py-2 flex items-center"
            >
              Continue <IoArrowForwardOutline className="ml-2" />
            </button>
          </div>
      </div>
    </div>
  );
}

export default CreatingTicket;
