import React, { useEffect, useState } from "react";
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
import { Sidebar } from "../components/ui/Sidebar";
import { Layout } from "../components/ui/Layout";

export const AppRouter = () => {
  const dispatch = useDispatch();
  const { user, checking, isLogged } = useSelector((state) => state.user);

  //Renew the token when the page loads
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!!token) {
      dispatch(startRenewToken());
    } else {
      dispatch(finishRenewToken());
    }
  }, [dispatch]);

  if (checking) {
    return <h5>Loading</h5>;
  } else {
    return (
      <Router>
        <Layout user={user}>
          <Switch>
            <PublicRoute
              exact
              path="/login"
              isAuthenticated={isLogged}
              component={LoginScreen}
            />
            <PublicRoute
              exact
              path="/register"
              isAuthenticated={isLogged}
              component={RegisterScreen}
            />
            <PrivateRoute
              path="/"
              isAuthenticated={isLogged}
              component={DashboardRoutes}
            />
          </Switch>
        </Layout>
      </Router>
    );
  }
};
