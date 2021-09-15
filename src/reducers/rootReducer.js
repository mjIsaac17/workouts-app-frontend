import { combineReducers } from "redux";
import { muscleReducer } from "./muscleReducer";

export const rootReducer = combineReducers({
  muscles: muscleReducer,
});
