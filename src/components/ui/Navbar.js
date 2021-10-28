import React from "react";
import { IconButton, Typography } from "@mui/material";
import { useDispatch } from "react-redux";
import { logout } from "../../actions/user.action";
import { Menu } from "@mui/icons-material";

export const Navbar = ({ user, openCloseSidebar }) => {
  const dispatch = useDispatch();

  console.log("render nav");

  const handleLogout = () => {
    dispatch(logout());
  };

  if (!user.id)
    return (
      <div className="navbar navbar--fixed">
        <Typography variant="h4" component="h2">
          WorkoutsApp
        </Typography>
      </div>
    );
  else
    return (
      <nav className="navbar navbar--fixed">
        <div className="navbar__content">
          <div>
            <IconButton onClick={openCloseSidebar}>
              <Menu fontSize="large" />
            </IconButton>
          </div>
          <div className="navbar--center">
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
