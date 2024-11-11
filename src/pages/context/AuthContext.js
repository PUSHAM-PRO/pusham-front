import React, { createContext, useContext, useState } from 'react';

// Create the AuthContext
const AuthContext = createContext();

// AuthProvider component to wrap around parts of your app that need access to auth state
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Function to log in a user with a given role
  const login = (role) => {
    // Simulate setting user data; in a real app, this could involve an API call
    const userData = { role, email: 'example@example.com' };
    setUser(userData);
    console.log('User logged in:', userData);
  };

  // Function to log out the user
  const logout = () => {
    setUser(null);
    console.log('User logged out');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the AuthContext
export const useAuth = () => {
  return useContext(AuthContext);
};
