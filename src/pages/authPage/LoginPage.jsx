import React from 'react';
import { useAuth } from '../../context/AuthContext';

const LoginPage = () => {
  // Default form values
  const defaultEmail = 'example@example.com';
  const defaultPassword = 'password123';
  const defaultRole = 'Customer';

  // Access login function from AuthProvider
  const { login } = useAuth();

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    
   
    
    console.log({ email: defaultEmail, password: defaultPassword, role: defaultRole });
    
    // Log in with selected role
    login(defaultRole);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4 sm:px-6 lg:px-8">
      <div
        className="w-full max-w-md p-6 space-y-6 rounded-lg shadow-lg"
        style={{ backgroundColor: 'rgb(17, 34, 40)' }}
      >
        <h2 className="text-2xl font-bold text-center text-white">Login</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email Field */}
          <div>
            <label className="block text-white text-sm font-medium mb-1">Email</label>
            <input
              type="email"
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2"
              placeholder="Enter your email"
              defaultValue={defaultEmail}
            />
          </div>

          {/* Password Field */}
          <div>
            <label className="block text-white text-sm font-medium mb-1">Password</label>
            <input
              type="password"
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2"
              placeholder="Enter your password"
              defaultValue={defaultPassword}
            />
          </div>

          {/* Role Selection Dropdown */}
          <div>
            <label className="block text-white text-sm font-medium mb-1">Role</label>
            <select
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2"
              defaultValue={defaultRole}
              onChange={(e) => defaultRole = e.target.value} // Updates the selected role
            >
              <option value="Customer">Customer</option>
              <option value="ENEO Department">ENEO Department</option>
              <option value="Agent">Agent</option>
              <option value="Super Administrator">Super Administrator</option>
            </select>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-2 text-white font-bold rounded-md hover:opacity-90 transition-opacity duration-150"
            style={{ backgroundColor: 'rgb(3, 161, 11)' }}
          >
            Log In
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
