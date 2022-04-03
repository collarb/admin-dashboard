import React, { createContext, useState, useEffect } from "react";
import { deleteAuthToken, getAuthToken } from "../util/storage";
// import useGetUser from '../hooks/account/useGetUser';

export const authContext = createContext();

function AuthContextProvider({ children }) {
  const [loading, setLoading] = useState(true);
  const [loggedIn, setLoggedIn] = useState(false);

  // const { user, getUser } = useGetUser();

  useEffect(() => {
    if (getAuthToken()) setLoggedIn(true);
    setLoading(false);
  }, []);

  // useEffect(() => {
  //   if(loggedIn) getUser();

  // }, [loggedIn]);

  const logout = () => {
    deleteAuthToken();
    setLoggedIn(false);
  };

  return (
    <authContext.Provider value={{ loggedIn, loading, user: {}, logout, setLoggedIn }}>
      {children}
    </authContext.Provider>
  );
}

export default AuthContextProvider;
