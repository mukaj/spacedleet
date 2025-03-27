import React, { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authData, setAuthData] = useState({
    isAuthenticated: false,
    userName: "",
  });

  const login = (name) => {
    setAuthData({ isAuthenticated: true, userName: name });
  };

  const logout = () => {
    setAuthData({ isAuthenticated: false, userName: "" });
  };

  return (
    <AuthContext.Provider value={{ authData, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
