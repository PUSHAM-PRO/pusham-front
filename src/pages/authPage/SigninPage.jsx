// pages/Signup.jsx

import React from 'react';
import { Link } from 'react-router-dom';

const Signup = () => (
  <div className="signup-page">
    <h1>Sign Up</h1>
    <p>Select your role to create an account:</p>
    <ul>
      <li><Link to="/signup/customer">Customer</Link></li>
      <li><Link to="/signup/agent">Agent</Link></li>
      {/* ENEO department signup link is removed */}
    </ul>
  </div>
);

export default Signup;
