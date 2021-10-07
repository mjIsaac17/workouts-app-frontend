import React from "react";
import { Link } from "react-router-dom";

export const SidebarItem = ({ title, icon, link }) => {
  return (
    <Link to={link}>
      <li
        id={window.location.pathname === link ? "active" : ""}
        className="row"
      >
        <div id="icon">{icon}</div>
        <div id="title">{title}</div>
      </li>
    </Link>
  );
};
