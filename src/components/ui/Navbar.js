import React from "react";
import MenuIcon from "@material-ui/icons/Menu";

import { IconButton } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../actions/user.action";

export const Navbar = ({ openCloseSidebar }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const userName = `${user.name} ${user.lastname}`;
  console.log("render nav");

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <>
      <div className="nav">
        <div className="navIconMenu">
          <IconButton onClick={openCloseSidebar}>
            <MenuIcon className="navIcon" fontSize="large" />
          </IconButton>
        </div>
        <div className="navTitle">
          <p>iWorkout</p>
        </div>
        <div className="navUser">
          <ul>
            <li>{userName}</li>
            <li className="logout" onClick={handleLogout}>
              Logout
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};
