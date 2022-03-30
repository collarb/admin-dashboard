import React, { useContext } from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import { authContext } from "../../context/authContext";
import Dashboard from '../dashboard/Dashboard';
import Login from '../account/Login';

function Router({ ...rest }) {
  const { loggedIn, loading } = useContext(authContext);
  console.log(loggedIn);

  return loading ? (
    <div>Loading...</div>
  ) : loggedIn ? (
    <>
      <Route exact path="/" component={Dashboard} />
      <Redirect to="/" />
    </>
  ) : (
    <>
      <Route path="/login" component={Login} />
      <Redirect to="/login" />
    </>
  );
}

export default Router;
