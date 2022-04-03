import React from "react";
import { Toaster } from "react-hot-toast";
import AuthContextProvider from "./context/authContext";
import { BrowserRouter, Switch } from "react-router-dom";
import Router from "./components/core/Router";
import UserContextProvider from "./context/userContext";
import "./App.css";

function App() {
  return (
    <AuthContextProvider>
      <UserContextProvider>
        <BrowserRouter>
          <Switch>
            <Router />
          </Switch>
        </BrowserRouter>
        <Toaster />
      </UserContextProvider>
    </AuthContextProvider>
  );
}

export default App;
