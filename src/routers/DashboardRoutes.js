import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
// import { AddExercise } from "../components/exercises/ModalAddExercise";
import { ExerciseList } from "../components/exercises/ExerciseList";
import { MusclesList } from "../components/muscles/MuscleList";

import { WorkoutExercisesList } from "../components/workouts/WorkoutExercisesList";
import { WorkoutsScreen } from "../components/workouts/WorkoutScreen";

export const DashboardRoutes = () => {
  return (
    <>
      <div>
        <Switch>
          <Route
            exact
            path="/exercises/:urlMuscleId?"
            component={ExerciseList}
          />
          <Route exact path="/muscles" component={MusclesList} />
          <Route exact path="/workouts" component={WorkoutsScreen} />
          <Route
            exact
            path="/workouts/:workoutName"
            component={WorkoutExercisesList}
          />
          <Redirect to="/muscles" />
        </Switch>
      </div>
    </>
  );
};
