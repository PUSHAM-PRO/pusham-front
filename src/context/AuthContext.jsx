
import React, { createContext, useState, useContext } from 'react';


const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authState, setAuthState] = useState({
    isAuthenticated: false,
    userRole: null,  
  });

  // Function to handle login 
  const login = (role) => {
    setAuthState({ isAuthenticated: true, userRole: role });
  };

  // Function to handle logout
  const logout = () => {
    setAuthState({ isAuthenticated: false, userRole: null });
  };

  return (
    <AuthContext.Provider value={{ authState, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};


export const useAuth = () => useContext(AuthContext);
