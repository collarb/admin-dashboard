import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import { authContext } from "../../context/authContext";
import Dashboard from '../dashboard/Dashboard';
import Incidents from '../incidents/Incidents';
import Login from '../account/Login';
import { Routes } from '../../util/routes';
import Reports from "../reports/Reports";
import Container from './Container';
import ModalContextProvider from "../../context/ModalContext";

function Router() {
  const { loggedIn, loading } = useContext(authContext);
  console.log(loggedIn);

  return loading ? (
    <div>Loading...</div>
  ) : loggedIn ? (
    <ModalContextProvider>
      <Container>
      <Route exact path="/" component={Dashboard} />
      <Route exact path={Routes.Incidents.path} component={Incidents} />
      <Route exact path={Routes.reports.path} component={Reports} />
      <Redirect to="/" />
    </Container>
    </ModalContextProvider>
  ) : (
    <>
      <Route path="/login" component={Login} />
      <Redirect to="/login" />
    </>
  );
}

export default Router;
