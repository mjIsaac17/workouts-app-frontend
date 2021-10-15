import React from "react";

import { CustomSnackbar } from "./components/ui/Snackbar";
import { AppRouter } from "./routers/AppRouter";
import { Provider } from "react-redux";
import { store } from "./store";
import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";
const theme = createTheme({
  palette: {
    primary: { main: "#27C265", contrastText: "#fff" },
    secondary: { main: "#FF9525", contrastText: "#fff" },
  },
});

export const WorkoutsApp = () => {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <CustomSnackbar />
        <AppRouter />
      </ThemeProvider>
    </Provider>
  );
};
