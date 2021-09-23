import React, { useState } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import { ExerciseList } from "../components/exercises/ExerciseList";
import { MusclesList } from "../components/muscles/MuscleList";

import { Navbar } from "../components/ui/Navbar";
import { Sidebar } from "../components/ui/Sidebar";

export const DashboardRoutes = () => {
  const [openSidebar, setOpenSidebar] = useState(false);

  const openCloseSidebar = () => {
    setOpenSidebar(!openSidebar);
  };
  return (
    // <>
    //   <Navbar />
    //   <div className="container mt-2">
    //     <Switch>
    //       <Route exact path="/marvel" component={MarvelScreen} />
    //       <Route exact path="/hero/:heroeId" component={HeroScreen} />
    //       <Route exact path="/dc" component={DcScreen} />
    //       <Route exact path="/search" component={SearchScreen} />
    //       <Redirect to="/marvel" />
    //     </Switch>
    //   </div>
    // </>
    <>
      <Sidebar openCloseSidebar={openCloseSidebar} openSidebar={openSidebar} />
      <div className={`${openSidebar ? "background-inactive" : ""}`}>
        <Navbar openCloseSidebar={openCloseSidebar} />
        <Switch>
          <Route exact path="/muscles" component={MusclesList} />
          <Route path="/exercise" component={ExerciseList} />

          <Redirect to="/muscles" />
        </Switch>
      </div>
    </>
  );
};
