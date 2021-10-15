import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { BrowserRouter as Router, Switch } from "react-router-dom";

import { finishRenewToken, startRenewToken } from "../actions/user.action";

import { LoginScreen } from "../components/login-register/LoginScreen";
import { RegisterScreen } from "../components/login-register/RegisterScreen";
import { Navbar } from "../components/ui/Navbar";
import { DashboardRoutes } from "./DashboardRoutes";
import { PrivateRoute } from "./PrivateRoute";
import { PublicRoute } from "./PublicRoute";

export const AppRouter = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  //Renew the token when the page loads
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!!token) {
      dispatch(startRenewToken());
    } else {
      dispatch(finishRenewToken());
    }
  }, [dispatch]);

  if (user.checking) {
    return <h5>Loading</h5>;
  } else {
    return (
      <Router>
        <div>
          <Navbar />
          <Switch>
            <PublicRoute
              exact
              path="/login"
              isAuthenticated={user.isLogged}
              component={LoginScreen}
            />
            <PublicRoute
              exact
              path="/register"
              isAuthenticated={user.isLogged}
              component={RegisterScreen}
            />
            <PrivateRoute
              path="/"
              isAuthenticated={user.isLogged}
              component={DashboardRoutes}
            />
          </Switch>
        </div>
      </Router>
    );
  }
};
