import React from "react";
import toast, { Toaster } from 'react-hot-toast';
import AuthContextProvider from "./context/authContext";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Login from "./components/account/Login";
import Router from './components/core/Router';

function App() {
  return (
    <AuthContextProvider>
      <BrowserRouter>
        <Switch>
          <Router />
        </Switch>
      </BrowserRouter>
      <Toaster />
    </AuthContextProvider>
  );
}

export default App;
