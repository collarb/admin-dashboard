import React, { useContext } from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import { authContext } from "../../context/authContext";
import Dashboard from '../dashboard/Dashboard';
import Incidents from '../incidents/Incidents';
import Login from '../account/Login';
import { Routes } from '../../util/routes';
import Reports from "../reports/Reports";
import Container from './Container';

function Router({ ...rest }) {
  const { loggedIn, loading } = useContext(authContext);
  console.log(loggedIn);

  return loading ? (
    <div>Loading...</div>
  ) : loggedIn ? (
    <Container>
      <Route exact path="/" component={Dashboard} />
      <Route exact path={Routes.Incidents.path} component={Incidents} />
      <Route exact path={Routes.reports.path} component={Reports} />
      <Redirect to="/" />
    </Container>
  ) : (
    <>
      <Route path="/login" component={Login} />
      <Redirect to="/login" />
    </>
  );
}

export default Router;
