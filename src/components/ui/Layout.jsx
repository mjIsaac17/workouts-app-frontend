import { useState } from "react";
import { useSelector } from "react-redux";
import { Navbar } from "./Navbar";
import { Sidebar } from "./Sidebar";

export const Layout = ({ children }) => {
  const [openSidebar, setOpenSidebar] = useState(false);
  const { user } = useSelector((state) => state.auth);

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
      <Navbar openCloseSidebar={openCloseSidebar} />
      {user.id && (
        <Sidebar
          openCloseSidebar={openCloseSidebar}
          openSidebar={openSidebar}
        />
      )}
      <div className="container">{children}</div>
    </div>
  );
};
