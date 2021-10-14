import { Email, Lock } from "@mui/icons-material";
import { Button, InputAdornment, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { startLogin } from "../../actions/user.action";

export const LoginScreen = () => {
  const dispatch = useDispatch();
  const [body, setBody] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    setBody({
      ...body,
      [e.target.name]: e.target.value,
    });
  };
  const handleLogin = (e) => {
    e.preventDefault();
    dispatch(startLogin(body));
  };

  return (
    <>
      <div className="navbar navbar--fixed">
        <Typography variant="h4" component="h2">
          WorkoutsApp
        </Typography>
      </div>

      <div className="flex-container center">
        <div className="login-box">
          <div className="login-box__header">
            <Typography variant="h4">Sign in</Typography>
            <Typography variant="h6" color="textSecondary">
              Welcome back!
            </Typography>
          </div>
          <div className="login-box__body">
            <form style={{ display: "grid" }} onSubmit={handleLogin}>
              <div className="spacing-y-1">
                <TextField
                  id="txtLoginEmail"
                  fullWidth
                  label="Email"
                  name="email"
                  onChange={handleChange}
                  placeholder="Email"
                  type="email"
                  value={body.email}
                  variant="outlined"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Email />
                      </InputAdornment>
                    ),
                  }}
                />
                <TextField
                  fullWidth
                  id="txtLoginPassword"
                  label="Password"
                  name="password"
                  onChange={handleChange}
                  placeholder="Password"
                  type="password"
                  value={body.password}
                  variant="outlined"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Lock />
                      </InputAdornment>
                    ),
                  }}
                />
              </div>
              <div className="login-box__buttonArea">
                <Button variant="contained" size="large" type="submit">
                  Log in
                </Button>
                <Link to="/register">
                  <Button
                    fullWidth
                    variant="contained"
                    size="large"
                    color="secondary"
                  >
                    Register
                  </Button>
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};
