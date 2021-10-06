import React from "react";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import { setSnackbar } from "../../actions/snackbar.action";
import { useDispatch, useSelector } from "react-redux";

export const CustomSnackbar = () => {
  const snackbar = useSelector((state) => state.snackbar);
  const dispatch = useDispatch();

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    dispatch(setSnackbar(snackbar.type, snackbar.message, false));
  };

  return (
    <Snackbar
      open={snackbar.open}
      autoHideDuration={3000}
      onClose={handleClose}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
    >
      <Alert
        onClose={handleClose}
        severity={snackbar.type}
        elevation={6}
        variant="filled"
      >
        {snackbar.message}
      </Alert>
    </Snackbar>
  );
};
