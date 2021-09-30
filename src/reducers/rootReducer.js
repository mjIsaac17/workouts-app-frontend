import { combineReducers } from "redux";
import { muscleReducer } from "./muscleReducer";
import { exerciseReducer } from "./exerciseReducer";
import { userReducer } from "./userReducer";
import { snackbarReducer } from "./snackbarReducer";
import { modalReducer } from "./modalReducer";

export const rootReducer = combineReducers({
  muscles: muscleReducer,
  exercises: exerciseReducer,
  user: userReducer,
  snackbar: snackbarReducer,
  modal: modalReducer,
});
