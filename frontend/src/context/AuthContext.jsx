import { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('authToken')); // Initialize token from localStorage

  const login = (userData, token) => {
    console.log("login function call before set user statement");
    setUser(userData);
    console.log("login function call");
    console.log(token);
    console.log('token being saved', token);

    localStorage.setItem('authToken', token); // Store token in localStorage
    setToken(token); // Save token in state as well
    console.log('statement after store in local storage');
  };

  const logout = () => {
    setUser(null);
    setToken(null); // Clear token state on logout
    console.log("logout function call");

    localStorage.removeItem('authToken'); // Remove token from localStorage
  };

  const getToken = () => {
    console.log("get token function call");
    return token || localStorage.getItem('authToken'); // Return token from state or localStorage if not in state
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, getToken }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
