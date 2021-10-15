import React from "react";
import { IconButton, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../actions/user.action";
import { Menu } from "@mui/icons-material";

export const Navbar = ({ openCloseSidebar }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  console.log("render nav");

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <>
      <div className="navbar navbar--fixed">
        <Typography variant="h4" component="h2">
          WorkoutsApp
        </Typography>
      </div>
      {/* <nav>
        <div className="nav">
          <div className="navIconMenu">
            <IconButton onClick={openCloseSidebar}>
              <Menu className="navIcon" fontSize="large" />
            </IconButton>
          </div>
          <div className="navTitle">
            <p>iWorkout</p>
          </div>
          <div className="navUser">
            <ul>
              <li>{user.name}</li>
              <li className="logout" onClick={handleLogout}>
                Logout
              </li>
            </ul>
          </div>
        </div>
      </nav> */}
    </>
  );
};
