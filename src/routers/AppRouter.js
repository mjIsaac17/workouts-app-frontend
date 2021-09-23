import React from "react";
import { useSelector } from "react-redux";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { LoginScreen } from "../components/login/LoginScreen";

import { DashboardRoutes } from "./DashboardRoutes";
import { PrivateRoute } from "./PrivateRoute";
import { PublicRoute } from "./PublicRoute";

export const AppRouter = () => {
  const { user } = useSelector((state) => state.user);
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
