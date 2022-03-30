import React, {useContext} from "react";
import { Route } from 'react-router-dom';
import { authContext } from '../../context/authContext';

function ProtectedRoute({ path, component: Component, ...rest }) {
    const {loggedIn} = useContext(authContext);

  return (
    <Route
      path={path}
      {...rest}
      render={(props) => {
        if (loggedIn) {
          return <Component {...props} />;
        } else {
          return <Redirect to="/login" />;
        }
      }}
    />
  );
}

export default ProtectedRoute;
