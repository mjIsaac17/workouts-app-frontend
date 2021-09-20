import React, { useContext } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { ExerciseList } from "../components/exercises/ExerciseList";

import { MusclesList } from "../components/muscles/MuscleList";

export const AppRouter = () => {
  //   const { user } = useContext(AuthContext);

  return (
    <Router>
      <div>
        <Switch>
          <Route exact path="/" component={MusclesList} />
          <Route path="/exercise" component={ExerciseList} />
        </Switch>
      </div>
    </Router>
  );
};
