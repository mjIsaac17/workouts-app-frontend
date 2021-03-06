import React from "react";
import { IconButton, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../actions/auth.action";
import { Menu } from "@mui/icons-material";

export const Navbar = ({ openCloseSidebar }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  // console.log("render nav");

  const handleLogout = () => {
    dispatch(logout());
  };
  if (!user.id)
    return (
      <div className="navbar" style={{ position: "fixed", padding: "0 1rem" }}>
        <Typography variant="h4" component="h2">
          WorkoutsApp
        </Typography>
      </div>
    );
  else
    return (
      <nav className="navbar navbar--fixed">
        <div className="navbar__icon">
          <IconButton onClick={openCloseSidebar}>
            <Menu fontSize="large" />
          </IconButton>
        </div>
        <div className="navbar__content">
          <div className="navbar__logo">
            <Typography variant="h4" component="h2">
              WorkoutsApp
            </Typography>
          </div>
          <div className="navbar__user">
            <ul>
              <li>{user.name}</li>
              <li className="logout m-x--1" onClick={handleLogout}>
                Logout
              </li>
            </ul>
          </div>
        </div>
      </nav>
    );
};
