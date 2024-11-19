import React, { createContext, useContext, useState } from "react";

// Create the AuthContext
export const AuthContext = createContext({
  username: null,
  token: null,
  isAuthenticated: false,
  login: () => {},
  logout: () => {},
});

const USERNAME_KEY = "username";
const TOKEN_KEY = "token";

// Helper function to safely parse JSON
const safeJSONParse = (item) => {
  try {
    return JSON.parse(item);
  } catch (error) {
    return item; // If it's not valid JSON, return the plain string
  }
};

// AuthProvider component
const AuthProvider = ({ children }) => {
  const [username, setUsername] = useState(() => {
    const storedUsername = localStorage.getItem(USERNAME_KEY);
    return storedUsername ? safeJSONParse(storedUsername) : null;
  });

  const [token, setToken] = useState(() => {
    const storedToken = localStorage.getItem(TOKEN_KEY);
    return storedToken ? safeJSONParse(storedToken) : null;
  });

  const [isAuthenticated, setIsAuthenticated] = useState(!!username && !!token);

  const login = (username, token) => {
    // Store the username and token in localStorage as strings
    localStorage.setItem(USERNAME_KEY, JSON.stringify(username));
    localStorage.setItem(TOKEN_KEY, JSON.stringify(token));

    setUsername(username);
    setToken(token);
    setIsAuthenticated(true);
  };

  const logout = () => {
    // Remove data from localStorage
    localStorage.removeItem(USERNAME_KEY);
    localStorage.removeItem(TOKEN_KEY);

    setUsername(null);
    setToken(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider
      value={{ username, token, isAuthenticated, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Hook to use AuthContext
export const useAuth = () => useContext(AuthContext);

export default AuthProvider;
