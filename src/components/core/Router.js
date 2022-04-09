import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import { authContext } from "../../context/authContext";
import Dashboard from '../dashboard/Dashboard';
import Incidents from '../incidents/Incidents';
import Login from '../account/Login';
import { Routes } from '../../util/routes';
import Reports from "../reports/Reports";
import ReportDetailPage from "../reports/ReportDetailPage";
import IncidentDetailPage from "../incidents/IncidentDetailPage";
import Container from './Container';
import Notifications from '../notifications/Notifications';
import ModalContextProvider from "../../context/ModalContext";
import Loader from "../core/Loader";
import Users from "../users/Users";


function Router() {
  const { loggedIn, loading } = useContext(authContext);
  
  return loading ? (
    <Loader/>
  ) : loggedIn ? (
    <ModalContextProvider>
      <Container>
        <Route exact path="/" component={Dashboard} />
        <Route exact path={Routes.Incidents.path} component={Incidents} />
        <Route path={Routes.IncidentDetail.path} component={IncidentDetailPage} />
        <Route exact path={Routes.reports.path} component={Reports} />
        <Route path={Routes.reportDetail.path} component={ReportDetailPage} />
        <Route exact path={Routes.Notifications.path} component={Notifications} />
        <Route exact path={Routes.Users.path} component={Users} />
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
