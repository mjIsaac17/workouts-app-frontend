import React, { useState } from "react";
import { HomeScreen } from "./components/ui/HomeScreen";
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
        <HomeScreen />
      </div>
      {/* <h1>sadsa</h1>
      <h1>sadsa</h1>
      <h1>sadsa</h1>
      <h1>sadsa</h1>
      <h1>sadsa</h1>
      <h1>sadsa</h1>
      <h1>sadsa</h1>
      <h1>sadsa</h1>
      <h1>sadsa</h1>
      <h1>sadsa</h1>
      <h1>sadsa</h1>
      <h1>sadsa</h1>
      <h1>sadsa</h1>
      <h1>sadsa</h1>
      <h1>sadsa</h1>
      <h1>sadsa</h1>
      <h1>sadsa</h1>
      <h1>sadsa</h1>
      <h1>sadsa</h1>
      <h1>sadsa</h1>
      <h1>sadsa</h1> */}
    </div>
  );
};
