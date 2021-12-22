import { combineReducers } from "redux";
import { muscleReducer } from "./muscleReducer";
import { exerciseReducer } from "./exerciseReducer";
import { userReducer } from "./userReducer";
import { snackbarReducer } from "./snackbarReducer";
import { modalReducer } from "./modalReducer";
import { workoutReducer } from "./workoutReducer";
import { authReducer } from "./authReducer";

export const rootReducer = combineReducers({
  auth: authReducer,
  muscles: muscleReducer,
  exercises: exerciseReducer,
  user: userReducer,
  snackbar: snackbarReducer,
  modal: modalReducer,
  workouts: workoutReducer,
});
