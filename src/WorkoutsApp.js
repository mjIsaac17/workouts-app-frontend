import React, { useState } from "react";
// import { HomeScreen } from "./components/HomeScreen";
import { MusclesList } from "./components/muscles/MuscleList";
import { Navbar } from "./components/ui/Navbar";
import { Sidebar } from "./components/ui/Sidebar";
import { AppRouter } from "./routers/AppRouter";

export const WorkoutsApp = () => {
  const [openSidebar, setOpenSidebar] = useState(false);

  const openCloseSidebar = () => {
    setOpenSidebar(!openSidebar);
  };

  return (
    <div className="WorkoutsApp">
      <Sidebar openCloseSidebar={openCloseSidebar} openSidebar={openSidebar} />
      <div className={`${openSidebar ? "background-inactive" : ""}`}>
        <Navbar openCloseSidebar={openCloseSidebar} />
        {/* <HomeScreen /> */}
        <div className="container">
          <AppRouter />
        </div>
      </div>
    </div>
  );
};
