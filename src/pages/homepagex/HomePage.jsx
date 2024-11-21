import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { FaUserShield, FaUser, FaBuilding, FaUserTie } from 'react-icons/fa';
import backgroundImage from '../../assets/images/ecg2.jpg';
import Modal from '../../components/Modal';
import EneoDepartmentManagement from '../eneodepartment/EneoDepartmentManagement';

const HomePage = () => {
  const navigate = useNavigate();
  const [isAdminModalOpen, setIsAdminModalOpen] = useState(false);

  const roles = [
    {
      title: "Customer",
      icon: <FaUser className="text-4xl mb-4" />,
      description: "Get support and answers to your questions",
      path: "/customer",
      color: "rgb(3, 161, 11)"
    },
    {
      title: "Department Agent",
      icon: <FaBuilding className="text-4xl mb-4" />,
      description: "Access department-specific tools",
      path: "/department-signin",
      color: "#2563eb"
    },
    {
      title: "Super Admin",
      icon: <FaUserShield className="text-4xl mb-4" />,
      description: "System administration and oversight",
      path: "/deptLogin",
      color: "#dc2626"
    },
    {
      title: "Agent",
      icon: <FaUserTie className="text-4xl mb-4" />,
      description: "Manage users and system settings",
      path: "/agent-signin",
      color: "#7c3aed"
    }
  ];

  return (
    <div
      className="relative min-h-screen bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: `url(${backgroundImage})`,
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black opacity-70"></div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 py-16">
        <div className="text-center text-white mb-16">
          <h1 className="text-5xl font-bold mb-6">Welcome to ENEO</h1>
          <p className="text-xl">Select your role to get started</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
          {roles.map((role) => (
            <Link
              key={role.title}
              to={role.path}
              className="transform transition-all duration-300 hover:scale-105"
            >
              <div
                className="bg-white bg-opacity-10 backdrop-blur-lg rounded-xl p-6 text-white border border-white border-opacity-20 hover:bg-opacity-20"
                style={{ minHeight: '280px' }}
              >
                <div className="flex flex-col items-center justify-center h-full text-center">
                  <div
                    className="rounded-full p-4 mb-4"
                    style={{ backgroundColor: role.color }}
                  >
                    {role.icon}
                  </div>
                  <h3 className="text-2xl font-bold mb-3">{role.title}</h3>
                  <p className="text-sm opacity-80">{role.description}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>

     
        <div
          className="absolute bottom-4 left-4 flex items-center justify-center w-12 h-12 bg-white rounded-full cursor-pointer hover:bg-gray-200 transition-colors duration-300"
          onClick={() => setIsAdminModalOpen(true)}
        >
          <FaUserShield className="text-black text-2xl" />
        </div>

        {/* Modal */}
        {isAdminModalOpen && (
          <Modal onClose={() => setIsAdminModalOpen(false)}>
            <EneoDepartmentManagement />
          </Modal>
        )}
      </div>
    </div>
  );
};

export default HomePage;
