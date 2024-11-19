import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUserShield } from 'react-icons/fa';
import backgroundImage from '../../assets/images/ecg2.jpg';
import Modal from '../../components/Modal'; // Import the Modal component
import EneoDepartmentManagement from '../eneodepartment/EneoDepartmentManagement';
import { Link } from 'react-router-dom';

const HomePage = () => {
  const navigate = useNavigate();
  const [isAdminModalOpen, setIsAdminModalOpen] = useState(false); // State to control modal visibility

  // Function to handle navigation based on role
  const handleNavigate = (role) => {
    navigate(`/signup/${role.toLowerCase()}`);
  };

  return (
    <div
      className="relative flex items-center justify-center min-h-screen bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: `url(${backgroundImage})`,
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black opacity-70"></div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-lg p-8 space-y-6 text-center text-white rounded-lg">
        <h1 className="text-5xl font-bold">Welcome to  ENEO</h1>
        <p className="text-xl mb-8">
          Answer a few questions to direct you to the correct sign-up page.
        </p>

        {/* Step 1 */}
        <p className="text-2xl mt-4">Are you a customer looking for answers?</p>
        <Link
          to="/customer"
          className="w-full py-4 mt-4 text-lg font-bold text-white rounded-md hover:opacity-90 transition-opacity duration-150"
          style={{ backgroundColor: 'rgb(3, 161, 11)', display: 'block', textAlign: 'center' }}
        >
          Yes, I am a Customer
        </Link>
        <Link
          to="/deptLogin"
          className="w-full py-4 mt-4 text-lg font-bold text-white rounded-md hover:opacity-90 transition-opacity duration-150"
          style={{ backgroundColor: 'rgb(3, 161, 11)', display: 'block', textAlign: 'center' }}
        >
          No, I am an Agent
        </Link>
      </div>

      {/* Super Admin Shortcut Icon */}
      <div
        className="absolute bottom-4 left-4 flex items-center justify-center w-12 h-12 bg-white rounded-full cursor-pointer hover:bg-gray-200"
        onClick={() => setIsAdminModalOpen(true)} // Open the modal when clicked
      >
        <FaUserShield className="text-black text-2xl" />
      </div>

      {/* Modal for Super Admin ENEO Department Management */}
      {isAdminModalOpen && (
        <Modal onClose={() => setIsAdminModalOpen(false)}> {/* Close modal when onClose is triggered */}
          <EneoDepartmentManagement /> {/* ENEO Department Management component inside modal */}
        </Modal>
      )}
    </div>
  );
};

export default HomePage;
