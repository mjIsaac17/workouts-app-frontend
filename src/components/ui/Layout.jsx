import React, { useState } from "react";
import { Navbar } from "./Navbar";
import { Sidebar } from "./Sidebar";

export const Layout = ({ user, children }) => {
  const [openSidebar, setOpenSidebar] = useState(false);
  const openCloseSidebar = (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setOpenSidebar(!openSidebar);
  };
  return (
    <div>
      <Navbar user={user} openCloseSidebar={openCloseSidebar} />
      {user.id && (
        <Sidebar
          openCloseSidebar={openCloseSidebar}
          openSidebar={openSidebar}
        />
      )}
      <div>{children}</div>
    </div>
  );
};
