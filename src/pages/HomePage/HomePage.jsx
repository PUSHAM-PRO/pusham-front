import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUserShield } from 'react-icons/fa'; // Import an icon for Super Administrator
import backgroundImage from '../../assets/images/ecg2.jpg';

const HomePage = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);

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
        <h1 className="text-5xl font-bold">Welcome to Our Platform</h1>
        <p className="text-xl mb-8">
          Answer a few questions to direct you to the correct sign-up page.
        </p>

        {step === 1 && (
          <>
            <p className="text-2xl mt-4">Are you a customer looking for answers?</p>
            <button
              onClick={() => handleNavigate('Customer')}
              className="w-full py-4 mt-4 text-lg font-bold text-white rounded-md hover:opacity-90 transition-opacity duration-150"
              style={{ backgroundColor: 'rgb(3, 161, 11)' }}
            >
              Yes, I am a Customer
            </button>
            <button
              onClick={() => setStep(2)}
              className="w-full py-4 mt-4 text-lg font-bold text-white rounded-md hover:opacity-90 transition-opacity duration-150"
              style={{ backgroundColor: 'rgb(3, 161, 11)' }}
            >
              No
            </button>
          </>
        )}

        {step === 2 && (
          <>
            <p className="text-2xl mt-4">Are you a member of the ENEO department?</p>
            <button
              onClick={() => handleNavigate('ENEO Department')}
              className="w-full py-4 mt-4 text-lg font-bold text-white rounded-md hover:opacity-90 transition-opacity duration-150"
              style={{ backgroundColor: 'rgb(3, 161, 11)' }}
            >
              Yes, I am with ENEO Department
            </button>
            <button
              onClick={() => setStep(3)}
              className="w-full py-4 mt-4 text-lg font-bold text-white rounded-md hover:opacity-90 transition-opacity duration-150"
              style={{ backgroundColor: 'rgb(3, 161, 11)' }}
            >
              No
            </button>
          </>
        )}

        {step === 3 && (
          <>
            <p className="text-2xl mt-4">Are you a Super Administrator?</p>
            <button
              onClick={() => handleNavigate('Super Administrator')}
              className="w-full py-4 mt-4 text-lg font-bold text-white rounded-md hover:opacity-90 transition-opacity duration-150"
              style={{ backgroundColor: 'rgb(3, 161, 11)' }}
            >
              Yes, I am a Super Administrator
            </button>
            <button
              onClick={() => setStep(4)}
              className="w-full py-4 mt-4 text-lg font-bold text-white rounded-md hover:opacity-90 transition-opacity duration-150"
              style={{ backgroundColor: 'rgb(3, 161, 11)' }}
            >
              No
            </button>
          </>
        )}

        {step === 4 && (
          <>
            <p className="text-2xl mt-4">Are you an Agent looking to assist customers?</p>
            <button
              onClick={() => handleNavigate('Agent')}
              className="w-full py-4 mt-4 text-lg font-bold text-white rounded-md hover:opacity-90 transition-opacity duration-150"
              style={{ backgroundColor: 'rgb(3, 161, 11)' }}
            >
              Yes, I am an Agent
            </button>
            <button
              onClick={() => alert("Role not recognized. Please contact support.")}
              className="w-full py-4 mt-4 text-lg font-bold text-white rounded-md hover:opacity-90 transition-opacity duration-150"
              style={{ backgroundColor: 'rgb(3, 161, 11)' }}
            >
              None of the above
            </button>
          </>
        )}
      </div>

      {/* Super Admin Shortcut Icon */}
      <div
        className="absolute bottom-4 left-4 flex items-center justify-center w-12 h-12 bg-white rounded-full cursor-pointer hover:bg-gray-200"
        onClick={() => handleNavigate('Super Administrator')}
      >
        <FaUserShield className="text-black text-2xl" />
      </div>
    </div>
  );
};

export default HomePage;
