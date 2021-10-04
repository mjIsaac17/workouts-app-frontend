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
    <div className="container">
      <div className="login__screen">
        <form onSubmit={handleLogin}>
          <h1>Workouts App</h1>
          <div>
            <input
              className="login__input"
              placeholder="Email"
              type="email"
              name="email"
              id="txtEmail"
              value={body.email}
              onChange={handleChange}
            />
          </div>
          <div>
            <input
              autoComplete="off"
              className="login__input"
              placeholder="Password"
              type="password"
              name="password"
              id="txtPassword"
              value={body.password}
              onChange={handleChange}
            />
          </div>

          <button className="btn btn-secondary" type="submit">
            Login
          </button>
          <div>
            <Link to="/register">
              <button className="btn btn-secondary" type="button">
                Register
              </button>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};
