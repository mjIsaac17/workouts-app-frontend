import React, { useState } from "react";
import { HomeScreen } from "./components/HomeScreen";
import { MusclesList } from "./components/muscles/MusclesList";
import { Navbar } from "./components/ui/Navbar";
import { Sidebar } from "./components/ui/Sidebar";

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
        <MusclesList />
      </div>
    </div>
  );
};
