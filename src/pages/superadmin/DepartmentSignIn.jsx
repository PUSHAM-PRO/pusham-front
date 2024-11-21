import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const DepartmentSignIn = () => {
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials({ 
      ...credentials, 
      [e.target.name]: e.target.value 
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Replace with real authentication logic
    if (credentials.username === 'department' && credentials.password === 'password') {
      // Save authentication state as needed
      navigate('/department-dashboard');
    } else {
      alert('Invalid credentials');
    }
  };

  return (
    <div className='flex items-center justify-center h-screen bg-gray-100'>
      <form onSubmit={handleSubmit} className='bg-white p-8 w-96 rounded shadow-md'>
        <h2 className='text-2xl mb-4 text-center text-blue-500'>Department Sign In</h2>
        <div className='mb-4'>
          <label className='block mb-1'>Username</label>
          <input 
            type='text' 
            name='username' 
            value={credentials.username} 
            onChange={handleChange}
            className='w-full px-3 py-2 border rounded'
            required 
          />
        </div>
        <div className='mb-4'>
          <label className='block mb-1'>Password</label>
          <input 
            type='password' 
            name='password' 
            value={credentials.password} 
            onChange={handleChange}
            className='w-full px-3 py-2 border rounded'
            required 
          />
        </div>
        <button type='submit' className='w-full bg-blue-500 text-white py-2 rounded'>
          Sign In
        </button>
      </form>
    </div>
  );
};

export default DepartmentSignIn; 