import React, { useState } from 'react';
import { FaUserCircle } from "react-icons/fa";
import { FiBell, FiUploadCloud } from "react-icons/fi";
import RootLayout from '../../layouts/RootLayout';
import profileImage from "../../assets/images/m-eto.png";

const CustomerFacing = () => {
    const [notifications, setNotifications] = useState([]);
    const [user, setUser] = useState({
        isLoggedIn: true,
    });

    const handleBellClick = () => {
        alert('Show notifications');
    };

    return (
        <RootLayout>
            <div className="bg-gray-100 pb-16 ">
                <header className="flex justify-between bg-white p-4 shadow  mb-8 max-w-screen-xl">
                    <div className="ml-4 lg:ml-12">
                        <h1 className="text-xl font-bold">Welcome, Mireille</h1>
                        <p className="text-gray-600 text-xs">
                            Follow and manage the tickets of all your subscribers with just one click.
                        </p>
                    </div>

                    <div className="flex items-center space-x-4">
                        <div onClick={handleBellClick} className="cursor-pointer relative">
                            <FiBell className="text-gray-600" />
                            {notifications.length > 0 && (
                                <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full px-1">
                                    {notifications.length}
                                </span>
                            )}
                        </div>
                        <div className="relative">
                            {user.isLoggedIn && (
                                <img
                                    src={profileImage}
                                    className="w-10 h-10 rounded-full border-4"
                                />
                            )}
                        </div>
                    </div>
                </header>
                
                <div>
                    <h2 className="text-2xl font-extrabold mb-6 ml-4">My Profile</h2>
                </div>

                {/* Profile Section */}
                <div className="bg-white rounded-xl shadow p-8 mx-4  lg:mr-20">
                    <div className="flex items-center mb-4">
                        <div className="flex flex-col items-center sm:flex-row sm:items-start">
                            {user.isLoggedIn && (
                                <img
                                    src={profileImage}
                                    className="h-32 w-32 rounded-full border-4"
                                />
                            )}
                            <div className="mt-4 sm:mt-0 sm:ml-4">
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
                                placeholder="No translation found..."
                                className="w-full max-w-[45rem] h-12 py-2 px-3 border rounded-md text-gray-700 text-sm"
                            />
                        </div>

                        <div>
                            <label className="block text-gray-700 text-xs">Email</label>
                            <input
                                type="email"
                                placeholder="Mireille@gmail.com"
                                className="w-full max-w-lg h-12 py-2 px-3 border rounded-md text-gray-700 text-sm"
                            />
                        </div>

                        <div>
                            <label className="block text-gray-700 text-xs">Phone number</label>
                            <input
                                type="tel"
                                placeholder="8 99 88 77 66"
                                className="w-full max-w-lg h-12 py-2 px-3 border rounded-md text-gray-700 text-sm"
                            />
                        </div>

                        {/* File Upload */}
                        <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-4">
                            {user.isLoggedIn && (
                                <img src={profileImage} className="w-10 h-10 rounded-full border-4" />
                            )}

                            <div className="border rounded-lg p-4 flex flex-col items-center w-[50rem]">
                                <label htmlFor="file-upload" className="cursor-pointer">
                                    <FiUploadCloud className="text-gray-500 w-10 h-10" />
                                </label>
                                <input
                                    id="file-upload"
                                    type="file"
                                    className="hidden "
                                    onChange={(e) => {
                                        const file = e.target.files[0];
                                        if (file) console.log('File uploaded:', file.name);
                                    }}
                                />
                                <p className="text-xs mt-2">
                                    <span className="text-green-600 font-bold cursor-pointer" onClick={() => alert('Download initiated')}>
                                        Click to download
                                    </span> or drag and drop.
                                </p>
                                <p className="text-xs text-gray-500">PNG or JPG (max. 800x400px)</p>
                            </div>
                        </div>

                        <div>
                            <label className="block text-gray-700 text-xs">Department</label>
                            <input
                                type="text"
                                placeholder="Banker"
                                className="w-full max-w-lg h-12 py-2 px-3 border rounded-md text-gray-700 text-sm"
                            />
                        </div>

                        <div>
                            <label className="block text-gray-700 text-xs">Country / Countries</label>
                            <input
                                type="text"
                                placeholder="Cameroon"
                                className="w-full max-w-lg h-12 py-2 px-3 border rounded-md text-gray-700 text-sm"
                            />
                        </div>

                        {/* Action Buttons */}
                        <div className="flex justify-end space-x-4 mt-6">
                            <button
                                type="button"
                                className="px-4 py-2 border rounded-full text-gray-700"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className="px-4 py-2 bg-green-600 text-white rounded-full"
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
