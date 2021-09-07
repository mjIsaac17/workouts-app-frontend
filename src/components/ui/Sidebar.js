import React from "react";
import "../../styles/sidebar.css";
import { SidebarData } from "./SidebarData";
import { SidebarItem } from "./SidebarItem";

export const Sidebar = () => {
  return (
    <div className="sidebar">
      <ul className="sidebarList">
        {SidebarData.map((data, key) => (
          <SidebarItem key={`${data.title}-${key}`} {...data}></SidebarItem>
        ))}
      </ul>
    </div>
  );
};
