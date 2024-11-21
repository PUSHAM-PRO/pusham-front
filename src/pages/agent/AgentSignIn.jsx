import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import Swal from 'sweetalert2';
import { apiLogin } from '../../services/auth';
import { useNavigate } from 'react-router-dom';

const AgentSignIn = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData(e.target);
      const username = formData.get("username");
      const password = formData.get("password");

      const response = await apiLogin({ username, password, role: 'agent' });

      if (response.status === 200) {
        localStorage.setItem("token", response.data.accessToken);
        login('agent');

        // Show success message with SweetAlert2
        await Swal.fire({
          icon: 'success',
          title: 'Welcome, Agent!',
          text: 'Login successful. Redirecting to dashboard...',
          timer: 2000,
          timerProgressBar: true,
          showConfirmButton: false,
          backdrop: `
            rgba(0,0,123,0.4)
            url("/images/nyan-cat.gif")
            left top
            no-repeat
          `
        });

        navigate("/agent-dashboard");
      }
    } catch (error) {
      console.error(error);

      // Show error message with SweetAlert2
      await Swal.fire({
        icon: 'error',
        title: 'Login Failed',
        text: error.response?.data?.message || 'Invalid credentials. Please try again.',
        confirmButtonText: 'Try Again',
        confirmButtonColor: '#3B82F6',
        showClass: {
          popup: 'animate__animated animate__fadeInDown'
        },
        hideClass: {
          popup: 'animate__animated animate__fadeOutUp'
        }
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4 sm:px-6 lg:px-8">
      <div
        className="w-full max-w-md p-6 space-y-6 rounded-lg shadow-lg"
        style={{ backgroundColor: 'rgb(17, 34, 40)' }}
      >
        <h2 className="text-2xl font-bold text-center text-white">Agent Login</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Username Field */}
          <div>
            <label className="block text-white text-sm font-medium mb-1">Username</label>
            <input
              name="username"
              type="text"
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2"
              placeholder="Enter your username"
              required
            />
          </div>

          {/* Password Field */}
          <div>
            <label className="block text-white text-sm font-medium mb-1">Password</label>
            <input
              name="password"
              type="password"
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2"
              placeholder="Enter your password"
              required
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-2 text-white font-bold rounded-md hover:opacity-90 transition-opacity duration-150"
            style={{ backgroundColor: 'rgb(3, 161, 11)' }}
            disabled={loading}
          >
            {loading ? 'Logging In...' : 'Log In'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AgentSignIn; 