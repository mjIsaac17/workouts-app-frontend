import React from "react";
import { IconButton } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
// import { SidebarData } from "./SidebarData";
// import { SidebarItem } from "./SidebarItem";

export const Sidebar = ({ openCloseSidebar, openSidebar }) => {
  console.log("render sidebar");
  return (
    <nav className={openSidebar ? "sidebar active" : "sidebar"}>
      <IconButton className="sidebar__closeIcon" onClick={openCloseSidebar}>
        <CloseIcon fontSize="large" style={{ color: "white" }} />
      </IconButton>
      {/* <ul className="sidebarList">
          {SidebarData.map((data, key) => (
            <SidebarItem key={`${data.title}-${key}`} {...data}></SidebarItem>
          ))}
        </ul> */}
    </nav>
  );
};
