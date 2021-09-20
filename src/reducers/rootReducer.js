import { combineReducers } from "redux";
import { muscleReducer } from "./muscleReducer";
import { exerciseReducer } from "./exerciseReducer";

export const rootReducer = combineReducers({
  muscles: muscleReducer,
  exercises: exerciseReducer,
});
