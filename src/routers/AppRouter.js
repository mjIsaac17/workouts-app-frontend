import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { BrowserRouter as Router, Switch } from "react-router-dom";
import { finishRenewToken, startRenewToken } from "../actions/user.action";
import { LoginScreen } from "../components/login/LoginScreen";

import { DashboardRoutes } from "./DashboardRoutes";
import { PrivateRoute } from "./PrivateRoute";
import { PublicRoute } from "./PublicRoute";

export const AppRouter = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);

  //Renew the token when the page loads
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!!token) {
      dispatch(startRenewToken());
    } else {
      dispatch(finishRenewToken());
    }
  }, [dispatch]);
  return (
    <Router>
      <div>
        <Switch>
          <PublicRoute
            path="/login"
            isAuthenticated={!!user.name}
            component={LoginScreen}
          />
          <PrivateRoute
            path="/"
            isAuthenticated={!!user.name}
            component={DashboardRoutes}
          />
        </Switch>
      </div>
    </Router>
  );
};
