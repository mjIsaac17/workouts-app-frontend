import { ArrowBack } from "@mui/icons-material";
import { Fab, Tooltip } from "@mui/material";
import React from "react";
import { Redirect, Route, Switch, useHistory } from "react-router-dom";
// import { AddExercise } from "../components/exercises/ModalAddExercise";
import { ExerciseList } from "../components/exercises/ExerciseList";
import { MusclesList } from "../components/muscles/MuscleList";

import { WorkoutExercisesList } from "../components/workouts/WorkoutExercisesList";
import { WorkoutsScreen } from "../components/workouts/WorkoutScreen";

export const DashboardRoutes = () => {
  const history = useHistory();
  return (
    <>
      <div>
        <Switch>
          <Route exact path="/exercises" component={ExerciseList} />
          <Route exact path="/muscles" component={MusclesList} />
          <Route exact path="/workouts" component={WorkoutsScreen} />
          <Route
            exact
            path="/workouts/:workoutName"
            component={WorkoutExercisesList}
          />
          <Redirect to="/muscles" />
        </Switch>
        <Tooltip title="Previous page">
          <Fab
            sx={{
              position: "fixed",
              bottom: (theme) => theme.spacing(2),
              left: (theme) => theme.spacing(2),
            }}
            color="secondary"
            aria-label="return"
            onClick={() => history.goBack()}
          >
            <ArrowBack />
          </Fab>
        </Tooltip>
      </div>
    </>
  );
};
