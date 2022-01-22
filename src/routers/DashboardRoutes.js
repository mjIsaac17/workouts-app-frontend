import { ArrowBack } from "@mui/icons-material";
import { Fab, Tooltip } from "@mui/material";
import { useSelector } from "react-redux";
import { Redirect, Route, Switch, useHistory } from "react-router-dom";
import AboutScreen from "../components/about/AboutScreen";
import { ExerciseList } from "../components/exercises/ExerciseList";
import { MusclesList } from "../components/muscles/MuscleList";
import UserScreen from "../components/users/UserScreen";

import { WorkoutExercisesList } from "../components/workouts/WorkoutExercisesList";
import { WorkoutsScreen } from "../components/workouts/WorkoutScreen";

export const DashboardRoutes = () => {
  const history = useHistory();
  const { user } = useSelector((state) => state.auth);

  return (
    <>
      <div>
        <Switch>
          <Route exact path="/exercises" component={ExerciseList} />
          <Route exact path="/muscles" component={MusclesList} />
          <Route exact path="/workouts" component={WorkoutsScreen} />
          <Route exact path="/about" component={AboutScreen} />
          <Route
            exact
            path="/workouts/:workoutName"
            component={WorkoutExercisesList}
          />
          {user.isAdmin && <Route exact path="/users" component={UserScreen} />}
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
