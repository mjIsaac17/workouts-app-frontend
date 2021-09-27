import React from "react";

import { CustomSnackbar } from "./components/ui/Snackbar";
import { AppRouter } from "./routers/AppRouter";
import { Provider } from "react-redux";
import { store } from "./store";

export const WorkoutsApp = () => {
  return (
    <Provider store={store}>
      <CustomSnackbar />
      <AppRouter />
    </Provider>
  );
};
