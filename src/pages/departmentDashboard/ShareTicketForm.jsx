import React from "react";
import { FaRegFileAlt } from "react-icons/fa";
import { GoTag } from "react-icons/go";
import { MdMailOutline } from "react-icons/md";

function ShareTicketForm() {
  return (
    <div className="flex justify-center items-center min-h-screen bg-white">
      <div
        className="bg-white border p-5"
        style={{
          width: "640px",
          height: "420px",
          top: "6175px",
          left: "2810px",
          borderRadius: "12px",
        }}
      >
        {/* Title and Description */}
        <h2 className="text-lg font-semibold mb-2">Share this ticket with</h2>
        <p className="text-sm text-gray-500 mb-10">
          Please fill in the information below to send this ticket to an agent.
          Ensure all fields are correctly completed before submitting.
        </p>

        {/* Divider */}
        <hr className="border-t border-gray-300 mb-6" />

        {/* Form */}
        <form className="space-y-4">
          {/* Type of Request Field */}
          <div className="flex items-center">
            <GoTag className="text-gray-400 mr-2" />
            <label className="w-1/3 text-gray-700">Type of request</label>
            <input
              type="text"
              placeholder=""
              className="w-full border border-gray-300 rounded-md p-2 focus:outline-none"
            />
          </div>

          {/* Description Field */}
          <div className="flex items-center">
            <FaRegFileAlt className="text-gray-400 mr-2" />
            <label className="w-1/3 text-gray-700">Description</label>
            <input
              type="text"
              placeholder=""
              className="w-full border border-gray-300 rounded-md p-2 focus:outline-none h-14"
            />
          </div>

          {/* Email Field */}
          <div className="flex items-center">
            <MdMailOutline className="text-gray-400 mr-2" />
            <label className="w-1/3 text-gray-700">Mail</label>
            <input
              type="email"
              placeholder=""
              className="w-full border border-gray-300 rounded-md p-2 focus:outline-none"
            />
          </div>

          {/* Bottom Divider */}
          <hr className="border-t border-gray-300" />

          {/* Action Buttons */}
          <div className="flex justify-around mt-8">
            <button
              type="button"
              className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold py-2 px-10 rounded-full w-32"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-10 rounded-full w-32"
            >
              Send
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ShareTicketForm;
