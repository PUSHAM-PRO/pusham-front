import React, { useState } from 'react';
import backgroundImage from '../../assets/images/image3.png';
import { useNavigate } from 'react-router-dom';
import { apiSignup } from '../../services/auth';

const DepartmentSignUp = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    // nationality: 'cameroon',
    // location: 'accra',
    password: '',
    confirmPassword: '',
    department: '',
  });
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(true);
  const navigate = useNavigate();

  // Handle form data changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  // Handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    
    const { name, email, password, confirmPassword,department } = formData;

    // Validate form data
    if (!name || !email) {
      alert("Please make sure all fields are filled");
      setLoading(false);
      return;
    } else if (password !== confirmPassword) {
      alert("Passwords do not match. Try Again!");
      setLoading(false);
      return;
    }

    const payload = { name, email, password, department };
    console.log("Payload:", payload)

    try {
      const response = await apiSignup(payload);

      // Assuming the response contains an access token, save it to localStorage
      if (response.data?.accessToken) {
        localStorage.setItem("token", response.data.accessToken);
      }

      setLoading(false);
      navigate("/superAdmin");
    } catch (err) {
      console.log("Error:", err.response?.data || err);
      setLoading(false);
      alert("An error occurred. Please try again.");
    }
  };

  return (
    <div className="flex min-h-screen">
      <div className="w-full md:w-1/2 flex items-center justify-center p-8 bg-white">
        <div className="w-full max-w-md space-y-6">
          <h2 className="text-3xl font-bold text-center text-gray-800">Create account</h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-green-500"
                placeholder="Full Name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-green-500"
                placeholder="Email"
              />
            </div>
            {/* <div>
              <label className="block text-sm font-medium text-gray-700">Nationality</label>
              <input
                type="text"
                name="nationality"
                value={formData.nationality}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-green-500"
                placeholder="nationality"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Location</label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-green-500"
                placeholder="location"
              />
            </div> */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Department</label>
              <input
                type="text"
                name="department"
                value={formData.department}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-green-500"
                placeholder="Department"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-green-500"
                placeholder="Password"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Confirm Password</label>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-green-500"
                placeholder="Confirm Password"
              />
            </div>
            <div className="flex items-center">
              <input type="checkbox" className="h-4 w-4 text-green-500 rounded" />
              <span className="ml-2 text-sm text-gray-600">
                I accept the <a href="#" className="text-green-500 underline">terms and conditions</a>
              </span>
            </div>
            <div className="flex justify-between items-center">
              <button
                type="button"
                className="py-2 px-6 font-semibold text-gray-600 border rounded-md hover:bg-gray-100"
              >
                Return
              </button>
              <button
                type="submit"
                className="py-2 px-6 font-semibold text-white bg-green-500 rounded-md hover:bg-green-600"
                disabled={loading}
              >
                {loading ? 'Loading...' : 'Continue'}
              </button>
            </div>
            <p className="text-center text-sm text-gray-600">
              You already have an account? <a href="/signin" className="text-green-500 underline">Sign In</a>
            </p>
          </form>
          <p className="text-center text-xs text-gray-400">© Pusham 2024</p>
        </div>
      </div>
      <div
        className="hidden md:block md:w-1/2 bg-cover bg-center"
        style={{
          backgroundImage: `url(${backgroundImage})`,
        }}
      ></div>
    </div>
  );
};

export default DepartmentSignUp;
