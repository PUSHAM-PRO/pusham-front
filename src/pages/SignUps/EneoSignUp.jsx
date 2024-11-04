import React, { useState } from 'react';
import backgroundImage from '../../assets/images/image3.png'; // Ensure the path is correct


const EneoSignUp = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    department: '',
    nationality: '',
    password: '',
    confirmPassword: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    // Handle form submission logic here
    console.log('ENEO Department Signup Data:', formData);
  };

  return (
    <div className="flex min-h-screen">
      {/* Left side: Sign Up Form */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-8 bg-white">
        <div className="w-full max-w-md space-y-6">
          

          {/* Title */}
          <h2 className="text-3xl font-bold text-center text-gray-800">Create account</h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Name Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Name</label>
              <input
                type="text"
                name="name"
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-green-500"
                placeholder="Full Name"
                value={formData.name}
                onChange={handleChange}
              />
            </div>

            {/* Email Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                name="email"
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-green-500"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
              />
            </div>

            {/* Department Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Department</label>
              <input
                type="text"
                name="department"
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-green-500"
                placeholder="Department"
                value={formData.department}
                onChange={handleChange}
              />
            </div>

            {/* Nationality Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Nationality</label>
              <input
                type="text"
                name="Nationality"
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-green-500"
                placeholder="nationality"
                value={formData.nationality}
                onChange={handleChange}
              />
            </div>

            {/* Password Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Password</label>
              <input
                type="password"
                name="password"
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-green-500"
                placeholder="password"
                value={formData.password}
                onChange={handleChange}
              />
            </div>

            {/* Confirm Password Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Confirm your password</label>
              <input
                type="password"
                name="confirmPassword"
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-green-500"
                placeholder="Confirm Password"
                value={formData.confirmPassword}
                onChange={handleChange}
              />
            </div>

            {/* Terms and Conditions Checkbox */}
            <div className="flex items-center">
              <input type="checkbox" className="h-4 w-4 text-green-500 rounded" />
              <span className="ml-2 text-sm text-gray-600">
                I accept the <a href="#" className="text-green-500 underline">terms and conditions</a>
              </span>
            </div>

            {/* Buttons */}
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
              >
                Continue
              </button>
            </div>

            {/* Sign In Link */}
            <p className="text-center text-sm text-gray-600">
              You already have an account? <a href="/signin" className="text-green-500 underline">Sign In</a>
            </p>
          </form>

          {/* Footer */}
          <p className="text-center text-xs text-gray-400">© Pusham 2024</p>
        </div>
      </div>

      {/* Right side: Background Image */}
      <div
        className="hidden md:block md:w-1/2 bg-cover bg-center"
        style={{
          backgroundImage: `url(${backgroundImage})`,
        }}
      ></div>
    </div>
  );
};

export default EneoSignUp;
