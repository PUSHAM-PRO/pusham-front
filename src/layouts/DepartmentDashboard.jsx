import React, { useState } from "react";
import { FaSearch, FaUserCircle, FaRegFileAlt, FaArrowRight, FaArrowLeft, FaArrowDown } from "react-icons/fa";
import { BiChevronLeft, BiChevronRight } from "react-icons/bi";
import { FaTrash } from "react-icons/fa";
import { IoShareSocialOutline } from "react-icons/io5";
import ShareTicketForm from "../pages/departmentDashboard/ShareTicketForm";
import { HiOutlineTrash } from "react-icons/hi";
import { LuAlertCircle } from "react-icons/lu";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { Link } from "react-router-dom";

function DepartmentDashboard() {
  const [showModal, setShowModal] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleDelete = () => {
    setShowModal(true);
  };

  const confirmDelete = () => {
    setShowModal(false);
    setShowSuccess(true);
    // Add your delete logic here
  };

  const cancelDelete = () => {
    setShowModal(false);
  };

  const closeSuccess = () => {
    setShowSuccess(false);
  };

  return (
    <div className="p-6 bg-white pl-72">
      {/* Header */}
      <div className="flex justify-between items-center mb-6 top-5 left-335 gap-20">
        <div className="flex items-center space-x-4">
          <h1 className="text-2xl font-semibold">Billing Department</h1>
          {/* Centered "Create" button */}
          <div className="relative">
            {/* <button className="bg-gray-700 text-white font-semibold py-2 px-3 shadow-md focus:outline-none  " style={{ right: "50%", transform: "translateX(50%)" }}>
              Create
            </button> */}
            <Link to="/ticketCreation">
              <button className="bg-gray-700 text-white font-semibold py-2 px-3 shadow-md focus:outline-none" style={{ right: "50%", transform: "translateX(50%)" }}>
                Create
              </button>
            </Link>
          </div>
        </div>
        <div className="flex items-center">

          <div className="flex items-center space-x-4 mr-4">
            <FaUserCircle className="text-3xl text gray-600" /></div>
          <div className="flex flex-col">

            <span className="font-medium">Mireille Eto</span>
            <span className="text-sm text-gray-500">mireille.et@gmail.com</span>
          </div>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-2 gap-24 mb-6">
        {[1, 2].map((item) => (
          <div
            key={item}
            className="p-4 rounded-lg flex flex-col items-start"
            style={{ backgroundColor: "#349D4F", border: "1px solid #349D4F" }}
          >
            <h3 className="text-lg font-medium text-white mb-3 mt-2">Ticket by zone</h3>
            <div className="text-4xl font-bold mt-2 text-gray-200 mb-4">02</div>
            <div className="flex items-center mt-1">
              <p className="text-sm flex items-center">
                <FaArrowDown className="mr-1 text-red-500" />
                <span className="text-red-500">40%</span>
                <span className="ml-1 text-white">vs last month</span>
              </p>
            </div>
          </div>

          
        ))}
      </div>

      {/* Search Bar */}
      <div className="relative mb-4 mt-4">
        <input
          type="text"
          placeholder="To research"
          className="p-1 px-14 pl-8 border border-gray-300 rounded-md"
        />
        {/* Search Icon */}
        <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
      </div>


      <div className="mt-8 mb-10 ml-7 font-bold">
        <h2> Manguier</h2>
      </div>

      {/* Table */}
      <table className="w-full bg-white shadow-md text-gray-700">
        <thead>
          <tr className="border-b">
            <th className="p-4 text-left font-medium">Date</th>
            <th className="p-4 text-left font-medium">Code</th>
            <th className="p-4 text-left font-medium">Description</th>
            <th className="p-4 text-left font-medium">Assigned</th>
            <th className="p-4 text-left font-medium">Quick Actions</th>
          </tr>
        </thead>
        <tbody>
          {[1, 2, 3, 4, 5].map((item) => (
            <tr key={item} className="border-b">
              <td className="p-4">14/10/24</td>
              <td className="p-4">00{item}</td>
              <td className="p-4">Fix my billing issue</td>
              <td className="p-4 flex items-center">
                <div className="flex items-center space-x-4 mr-4">
                  <FaUserCircle className="text-3xl text gray-600" /></div>
                Agent Y
              </td>
              <td className="p-4">
                {/* Quick Action Icons (using Font Awesome or Heroicons) */}
                <div className="flex justify-start space-x-2">
                  <button className="p-2"><FaRegFileAlt /></button>
                  <Link to="/shareTicketForm" className="p-2">
                    <IoShareSocialOutline />
                  </Link>
                  <button
                    onClick={handleDelete}
                    className="p-2"><HiOutlineTrash /></button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal */}
{showModal && (
  <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
    <div className="bg-white rounded-lg shadow-lg p-6 w-96">
      <div className="flex justify-center items-center mb-4">
        <div className="text-4xl text-red-500 mb-4">
          <LuAlertCircle />
        </div>
      </div>
      <div className="text-center mb-4">
        <h2 className="text-xl font-semibold">Confirm deletion</h2>
      </div>
      <p className="text-gray-600 text-center mb-6">
        Are you sure you want to delete this ticket? This action is irreversible, and the ticket will be permanently removed from the system.
      </p>
      <div className="flex justify-between gap-4">
        <button
          onClick={cancelDelete}
          className="bg-white border hover:bg-gray-400 text-gray-800  py-2 font-semibold px-6 w-1/2 rounded-full"
        >
          Cancel
        </button>
        <button
          onClick={confirmDelete}
          className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-6 w-1/2 rounded-full"
        >
          Delete
        </button>
      </div>
    </div>
  </div>
)}


      {/* Success Modal */}
{showSuccess && (
  <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center p-24">
    <div className="bg-white rounded-lg shadow-lg p-6 w-96 border-2 border-purple-300">
      <div className="flex flex-col items-center mb-4">
        <div className="text-4xl text-green-500 mb-4">
          <IoMdCheckmarkCircleOutline />
        </div>
        <h2 className="text-xl font-semibold">Successfully deleted</h2>
      </div>
      <p className="text-gray-600 text-center mb-6">
        Your deletion has been completed successfully.
      </p>
      <button
        onClick={closeSuccess}
        className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-6 rounded-full w-full"
      >
        OK
      </button>
    </div>
  </div>
)}



      {/* Pagination */}
      <div className="flex justify-between items-center mt-10 p-4">
        {/* Previous Button */}
        <button className="flex items-center px-3 py-1.5 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100 space-x-4">
          <FaArrowLeft />
          <span>Previous</span>
        </button>

        <div className="flex space-x-2">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
            <button
              key={num}
              className={`p-2 rounded-md ${num === 1 ? "bg-green-300 text-white" : "text-gray-500"}`}
            >
              {num}
            </button>
          ))}
        </div>

        {/* Next Button */}
        <button className="flex items-center px-3 py-1.5 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100 space-x-4">
          <span>Next</span>
          <FaArrowRight />
        </button>
      </div>

    </div>


  );
}

export default DepartmentDashboard;
