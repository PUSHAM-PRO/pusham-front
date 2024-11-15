import { useRef, useState } from 'react';
import { FaUserCircle, FaSearch } from 'react-icons/fa';
import { FiBell } from "react-icons/fi";
import { useNavigate } from 'react-router-dom';

const Header = () => {
    const searchInputRef = useRef(null);

    const handleSearchIconClick = () => {
        if (searchInputRef.current) {
            searchInputRef.current.focus();
        }
    };

    const [notifications, setNotifications] = useState([]);
    const [user, setUser] = useState({
        isLoggedIn: true, // Change this based on your authentication logic
        Image: 'https://example.com/user-image.jpg', // Replace with actual user image URL
    });

    const navigate = useNavigate();

    const handleBellClick = () => {
        // Logic to fetch or display notifications
        alert('Show notifications');
    };

    const handleCreateClick = () => {
        navigate('/create');
    };

    return (
        <div className="bg-white">
            <header className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-6">
                <div>
                    <h1 className="text-2xl font-semibold">Welcome, Mireille</h1>
                    <p className="text-gray-600">Track and manage tickets for all your subscribers with one click.</p>
                </div>
                <div className="flex items-center space-x-4 mt-4 sm:mt-0">
                    {/* <button
                        onClick={() => navigate("/ticketcreation")}
                        className="px-4 py-2 bg-[#112228] text-white rounded-[5px] gap-2 left-[583px] w-[91px] h-11 text-lg text-center font-semibold mr-4">Create</button> */}

                    <div className="relative">
                        <FaSearch className="ml-2 absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-400" onClick={handleSearchIconClick} />
                        <input
                            type="text"
                            placeholder="To research"
                            className="pl-10 pr-4 py-2 bg-white rounded-md border border-gray-300 w-full sm:w-auto"
                        />
                    </div>
                    <div onClick={handleBellClick} className="cursor-pointer relative">
                        <FiBell className="text-gray-600 w-10 h-10 rounded-[6px] p-2.5" />
                        {notifications.length > 0 && (
                            <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full px-1">
                                {notifications.length}
                            </span>
                        )}
                    </div>
                    <div className="relative">
                        <FaUserCircle className="text-3xl text-[#FFFFFF] absolute w-10 h-10 rounded-[200px] border-[4px]" />
                        {user.isLoggedIn && (
                            <img
                                src={user.Image}
                                className="w-10 h-10 rounded-full"
                                style={{ zIndex: 10 }}
                            />
                        )}
                    </div>
                </div>
            </header>
        </div>
    )
}

export default Header;