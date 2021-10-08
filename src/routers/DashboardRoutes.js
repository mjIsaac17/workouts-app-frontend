import React, { useState } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
// import { AddExercise } from "../components/exercises/ModalAddExercise";
import { ExerciseList } from "../components/exercises/ExerciseList";
import { MusclesList } from "../components/muscles/MuscleList";

import { Navbar } from "../components/ui/Navbar";
import { Sidebar } from "../components/ui/Sidebar";
import { WorkoutsScreen } from "../components/workouts/WorkoutScreen";

export const DashboardRoutes = () => {
  const [openSidebar, setOpenSidebar] = useState(false);

  const openCloseSidebar = () => {
    setOpenSidebar(!openSidebar);
  };

  return (
    <>
      <Sidebar openCloseSidebar={openCloseSidebar} openSidebar={openSidebar} />
      <div className={`${openSidebar ? "background-inactive" : ""}`}>
        <Navbar openCloseSidebar={openCloseSidebar} />
        <Switch>
          <Route
            exact
            path="/exercises/:urlMuscleId?"
            component={ExerciseList}
          />
          <Route exact path="/muscles" component={MusclesList} />
          <Route exact path="/workouts" component={WorkoutsScreen} />
          <Redirect to="/muscles" />
        </Switch>
      </div>
    </>
  );
};
