import React from "react";
import { IconButton } from "@mui/material";

import { SidebarData } from "./SidebarData";
import { SidebarItem } from "./SidebarItem";
import { Close } from "@mui/icons-material";

export const Sidebar = ({ openCloseSidebar, openSidebar }) => {
  console.log("render sidebar");
  return (
    <nav className={openSidebar ? "sidebar active" : "sidebar"}>
      <IconButton className="sidebar__closeIcon" onClick={openCloseSidebar}>
        <Close fontSize="large" style={{ color: "white" }} />
      </IconButton>
      <ul className="sidebarList">
        {SidebarData.map((data, key) => (
          <SidebarItem key={`${data.title}-${key}`} {...data}></SidebarItem>
        ))}
      </ul>
    </nav>
  );
};
