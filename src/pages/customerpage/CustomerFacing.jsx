import React, { useState } from 'react';
import { FaUserCircle } from "react-icons/fa";
import { FiBell, FiUploadCloud } from "react-icons/fi";
import RootLayout from '../../layouts/RootLayout';
import profileImage from "../../assets/images/m-eto.png"


// 
const CustomerFacing = () => {
    const [notifications, setNotifications] = useState([]);
    const [user, setUser] = useState({
        isLoggedIn: true, // Change this based on your authentication logic
        imageUrl: 'https://example.com/user-image.jpg', // Replace with actual user image URL
    });

    const handleBellClick = () => {
        // Logic to fetch or display notifications
        alert('Show notifications');
    };

    return (
        <RootLayout>
            <div className="bg-gray-100 pb-16 pl-20">
                <header className="flex justify-between bg-white p-4 shadow ml-48 mb-8">
                    <div className="ml-12">
                        <h1 className="text-xl font-bold">Welcome, Mireille</h1>
                        <p className="text-gray-600 text-xs">
                            Follow and manage the tickets of all your subscribers with just one click.
                        </p>
                    </div>

                    <div className="flex items-center space-x-4 mr-4">
                        <div onClick={handleBellClick} className="cursor-pointer relative">
                            <FiBell className="text-gray-600" />
                            {notifications.length > 0 && (
                                <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full px-1">
                                    {notifications.length}
                                </span>
                            )}
                        </div>
                        <div className="relative">
                            {/* <FaUserCircle className="text-3xl text-gray-600 absolute" /> */}
                            {user.isLoggedIn && (
                                <img
                                    src={profileImage}
                                    className="w-10 h-10 rounded-[200px] border-[4px]"
                                />
                            )}
                        </div>
                    </div>
                </header>
                <div>
                    <h2 className="text-2xl font-extrabold mb-6 ml-64">My Profile</h2>
                </div>

                {/* Profile Section */}
                <div className="bg-white rounded-xl shadow p-8 ml-64 mr-20" style={{
                    width: "fixed(1,105px)",
                    height: "hug(1,003px)",
                    top: "208px",
                    left: "357px",
                    gap: "24px",
                }}>
                    <div className="flex items-center mb-4">
                        <div className="flex">
                            {/* <FaUserCircle className="text-9xl text-gray-600" /> */}
                            {user.isLoggedIn && (
                                <img
                                    src={profileImage}
                                    // src={user.imageUrl}
                                    className="h-[160px] w-[160px] rounded-[200px] border-[4px]"
                                />
                            )}
                            <div className="ml-4 mt-16">
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
                                className="w-[667px] h-[48px] py-[11px] px-3 gap-1 border rounded-md text-[#344054] text-sm"
                                
                            />
                        </div>

                        <div>
                            <label className="block text-gray-700 text-xs">Email</label>
                            <input
                                type="email"
                                placeholder="Mireille@gmail.com"
                                className="w-[512px] h-[48px] py-[11px] px-3 gap-1 border rounded-md text-[#344054] text-sm"
                                />
                        </div>

                        <div>
                            <label className="block text-gray-700 text-xs">Phone number</label>
                            <input
                                type="tel"
                                placeholder="8 99 88 77 66"
                                className="w-[512px] h-[48px] py-[11px] px-3 gap-1 border rounded-md text-[#344054] text-sm"
                                />
                        </div>

                        <div className="flex ">

                            <div className="relative">
                                {/* <FaUserCircle className="text-6xl text-gray-600 absolute mr-4 -mt-2" /> */}
                                {user.isLoggedIn && (
                                    <img
                                        src={profileImage}
                                        className="w-10 h-10 rounded-[200px] border-[4px]"
                                    />
                                )}
                            </div>

                            <div className="border rounded-lg p-4 px-60 flex flex-col items-center ml-8">
                                <div className="bg-gray-100 p-2 rounded-full cursor-pointer">
                                    <label htmlFor="file-upload" className="cursor-pointer">
                                        <FiUploadCloud className="text-[#344054] w-10 h-10 top-2.5 left-2.5 rounded-[28px] border-[6px] bg-gray-200" />
                                    </label>
                                    <input
                                        id="file-upload"
                                        type="file"
                                        className="hidden w-[973px] h-[126px] gap-4"
                                        onChange={(e) => {
                                            const file = e.target.files[0];
                                            if (file) {
                                                // Handle file upload logic here
                                                console.log('File uploaded:', file.name);
                                            }
                                        }}
                                    />
                                </div>
                                <div className="flex flex-col">
                                    <p className="text-xs">
                                        <span
                                            className="text-[#03A10B] font-bold hover:text-orange-300 cursor-pointer"
                                            onClick={() => {
                                                // Handle file download logic here
                                                alert('Download initiated');
                                            }}
                                        >
                                            Click to download
                                        </span>
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
                                className="w-[512px] h-[48px] py-[11px] px-3 gap-1 border rounded-md text-[#344054] text-sm"
                                />
                        </div>

                        <div>
                            <label className="block text-gray-700 text-xs">Country / Countries</label>
                            <input
                                type="text"
                                placeholder="Cameroon"
                                className="w-[512px] h-[48px] py-[11px] px-3 gap-1 border rounded-md text-[#344054] text-sm"
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