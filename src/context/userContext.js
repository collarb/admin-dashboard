import React, { createContext, useContext, useEffect } from "react";
import useGetUser from "../hooks/account/useGetUser";
import { authContext } from "./authContext";

export const userContext = createContext();

function UserContextProvider({ children }) {
  const { user, getUser } = useGetUser();
  const { loggedIn } = useContext(authContext);

  useEffect(() => {
    if (loggedIn) getUser();
  }, [loggedIn]);

  return (
    <userContext.Provider value={{ user }}>{children}</userContext.Provider>
  );
}

export default UserContextProvider;
