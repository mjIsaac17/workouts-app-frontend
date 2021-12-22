import React, { useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { Link } from "react-router-dom";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { useDispatch } from "react-redux";
import { startRegister } from "../../actions/auth.action";

export const RegisterScreen = () => {
  const errorsInitialState = {
    name: "",
    lastname: "",
    email: "",
    password: "",
  };
  const dispatch = useDispatch();
  const [errors, setErrors] = useState(errorsInitialState);

  const formValid = (data) => {
    const formErrors = { ...errorsInitialState };
    let isValid = true;
    if (!data.name) {
      formErrors.name = "Invalid name";
      isValid = false;
    }

    if (!data.lastname) {
      formErrors.lastname = "Invalid last name";
      isValid = false;
    }

    if (!data.email) {
      formErrors.email = "Invalid email";
      isValid = false;
    }

    if (!data.password) {
      formErrors.password = "Invalid password";
      isValid = false;
    } else if (data.password !== data.confirmPassword) {
      formErrors.password = "The passwords are not the same";
      isValid = false;
    }
    setErrors(formErrors);
    return isValid;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    const registerData = {
      name: data.get("name"),
      lastname: data.get("lastname"),
      email: data.get("email"),
      password: data.get("password"),
      confirmPassword: data.get("confirmPassword"),
    };

    if (formValid(registerData)) {
      delete registerData.confirmPassword;
      dispatch(startRegister(registerData));
    }
  };

  return (
    <div className="flex-container center">
      <div className="login-box">
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  name="name"
                  required
                  fullWidth
                  label="First Name"
                  helperText={errors.name}
                  error={!!errors.name}
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  label="Last Name"
                  name="lastname"
                  helperText={errors.lastname}
                  error={!!errors.lastname}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  label="Email Address"
                  type="email"
                  name="email"
                  helperText={errors.email}
                  error={!!errors.email}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  helperText={errors.password}
                  error={!!errors.password}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  name="confirmPassword"
                  label="Confirm password"
                  type="password"
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link to="/login">Already have an account? Sign in</Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </div>
    </div>
  );
};
