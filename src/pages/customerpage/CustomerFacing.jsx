import React from 'react'
import { FaUserCircle } from "react-icons/fa";
import { FiBell, FiUploadCloud } from "react-icons/fi";
import RootLayout from '../../layouts/RootLayout';

const CustomerFacing = () => {
    return (
        <RootLayout>
            <div className="bg-gray-100 pb-16 pl-20">
                <header className="flex justify-between bg-white p-4 shadow ml-56 mb-8">
                    <div className="ml-12">
                        <h1 className="text-xl font-bold">Welcome, Mireille</h1>
                        <p className="text-gray-600 text-xs">
                            Follow and manage the tickets of all your subscribers with just one click.
                        </p>
                    </div>

                    <div className="flex items-center space-x-4 mr-4">
                        <FiBell className="text-gray-600" />
                        <FaUserCircle className="text-3xl text-gray-600" />
                    </div>
                </header>
                <div>
                    <h2 className="text-2xl font-extrabold mb-6 ml-64">My Profile</h2>
                </div>

                {/* Profile Section */}
                <div className="max-w-3xl mx-auto bg-white rounded-lg shadow p-8 ml-64">

                    <div className="flex items-center mb-4">
                        <div className="flex">
                            <FaUserCircle className="text-9xl text-gray-600" />
                            <div className="ml-4 mt-8">
                                <h3 className="text-xl font-semibold">Mireille Eto</h3>
                                <p className="text-gray-500">mireilleeto@gmail.com</p>
                            </div>

                        </div>
                    </div>

                    {/* Profile Form */}
                    <form className="space-y-6">
                        <div>
                            <label className="block text-gray-700 text-xs">Full Name</label>
                            <input
                                placeholder="No translation found. Mireille Eto is likely a name and does not have a direct translation in English. It may have origins in a different language."
                                className="w-4/5 p-4 border rounded-lg text-gray-700 text-sm"
                                rows="2"
                            />
                        </div>

                        <div>
                            <label className="block text-gray-700 text-xs">Email</label>
                            <input
                                type="email"
                                placeholder="Mireille@gmail.com"
                                className="w-2/3 p-3 border rounded-lg text-gray-700 mt-1"
                            />
                        </div>

                        <div>
                            <label className="block text-gray-700 text-xs">Phone number</label>
                            <input
                                type="tel"
                                placeholder="8 99 88 77 66"
                                className="w-2/3 p-3 border rounded-lg text-gray-700 mt-1"
                            />
                        </div>

                        <div className="flex ">
                            <FaUserCircle className="text-6xl text-gray-600 mr-4 -mt-2" />
                            <div className="border rounded-lg p-4 px-60 flex flex-col items-center">
                                <div className="bg-gray-100 p-2 rounded-full">
                                    <FiUploadCloud className="text-gray-500 text-2xl rounded-3xl bg-gray-200" />
                                </div>
                                <div className="flex flex-col">
                                    <p className="text-xs">
                                        <span className="text-[#03A10B] font-bold hover:text-orange-300">Click to download</span>
                                        <span className="text-gray-500"> or drag and drop.</span>
                                    </p>
                                    <p className="text-xs text-gray-500 text-center">
                                        PNG or JPG (max. 800x400px)
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div>
                            <label className="block text-gray-700 text-xs">Department</label>
                            <input
                                type="text"
                                placeholder="Banker"
                                className="w-2/3 p-3 border rounded-lg text-gray-700 mt-1"
                            />
                        </div>

                        <div>
                            <label className="block text-gray-700 text-xs">Country / Countries</label>
                            <input
                                type="text"
                                placeholder="Cameroon"
                                className="w-2/3 p-3 border rounded-lg text-gray-700 mt-1"
                            />
                        </div>
                        <hr />

                        {/* Action Buttons */}
                        <div className="flex justify-end space-x-4 mt-6">
                            <button
                                type="button"
                                className="px-4 py-2 rounded-full border text-gray-700"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className="px-4 py-2 bg-[#03A10B] text-white rounded-full"
                            >
                                Save
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </RootLayout>
    );
};

export default CustomerFacing;