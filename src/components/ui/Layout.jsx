import React, { useState } from "react";
import { Navbar } from "./Navbar";
import { Sidebar } from "./Sidebar";

export const Layout = ({ user, children }) => {
  const [openSidebar, setOpenSidebar] = useState(false);
  const openCloseSidebar = () => {
    setOpenSidebar(!openSidebar);
  };
  return (
    <div className={`${openSidebar ? "background-inactive" : ""}`}>
      <Navbar user={user} openCloseSidebar={openCloseSidebar} />
      {user.uid && (
        <Sidebar
          openCloseSidebar={openCloseSidebar}
          openSidebar={openSidebar}
        />
      )}
      <div>{children}</div>
    </div>
  );
};
