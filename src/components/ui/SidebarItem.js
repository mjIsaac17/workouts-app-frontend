import React from "react";

export const SidebarItem = ({ title, icon, link }) => {
  return (
    <li
      id={window.location.pathname === link ? "active" : ""}
      className="row"
      //onClick={() => (window.location.pathname = link)}
    >
      <div id="icon">{icon}</div>
      <div id="title">{title}</div>
    </li>
  );
};
