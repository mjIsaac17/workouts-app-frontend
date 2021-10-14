import React from "react";

import { CustomSnackbar } from "./components/ui/Snackbar";
import { AppRouter } from "./routers/AppRouter";
import { Provider } from "react-redux";
import { store } from "./store";
import { CssBaseline } from "@mui/material";

export const WorkoutsApp = () => {
  return (
    <Provider store={store}>
      <CssBaseline />
      <CustomSnackbar />
      <AppRouter />
    </Provider>
  );
};
