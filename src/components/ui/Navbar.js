import React from "react";
import MenuIcon from "@material-ui/icons/Menu";

import { IconButton } from "@material-ui/core";

export const Navbar = ({ openCloseSidebar }) => {
  console.log("render nav");

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
            <li>Isaac</li>
            <li>Logout</li>
          </ul>
        </div>
      </div>
    </>
  );
};
