import React, { createContext, useState, useEffect } from "react";
import { deleteAuthToken, getAuthToken } from "../util/storage";

export const authContext = createContext();

function AuthContextProvider({ children }) {
  const [loading, setLoading] = useState(true);
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    if (getAuthToken()) setLoggedIn(true);
    setLoading(false);
  }, []);

  const logout = () => {
    deleteAuthToken();
    setLoggedIn(false);
  };

  return (
    <authContext.Provider value={{ loggedIn, loading, logout, setLoggedIn }}>
      {children}
    </authContext.Provider>
  );
}

export default AuthContextProvider;
