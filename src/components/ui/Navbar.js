import React from "react";
import MenuIcon from "@material-ui/icons/Menu";

import { IconButton } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import { SidebarData } from "./SidebarData";
import { SidebarItem } from "./SidebarItem";
import { useState } from "react";

export const Navbar = () => {
  const [sidebarToggle, setSidebarToggle] = useState(false);

  console.log("render nav");

  const showSidebar = () => {
    setSidebarToggle(!sidebarToggle);
    const divWorkoutsApp = document.querySelector(".WorkoutsApp");
    if (!sidebarToggle) {
      divWorkoutsApp.classList.add("background-inactive");
    } else {
      divWorkoutsApp.classList.remove("background-inactive");
    }
  };

  const hideSidebarIfActive = () => {
    if (sidebarToggle) {
      setSidebarToggle(!sidebarToggle);
      document
        .querySelector(".WorkoutsApp")
        .classList.remove("background-inactive");
    }
  };

  return (
    <>
      <nav className={sidebarToggle ? "sidebar active" : "sidebar"}>
        <IconButton className="sidebar__closeIcon" onClick={showSidebar}>
          <CloseIcon fontSize="large" style={{ color: "white" }} />
        </IconButton>
        {/* <ul className="sidebarList">
          {SidebarData.map((data, key) => (
            <SidebarItem key={`${data.title}-${key}`} {...data}></SidebarItem>
          ))}
        </ul> */}
      </nav>
      {/* ${sidebarToggle && "background-inactive"} */}
      <div onClick={hideSidebarIfActive}>
        <div className={`nav`}>
          <div className="navIconMenu">
            <IconButton onClick={showSidebar}>
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
      </div>
    </>
  );
};
