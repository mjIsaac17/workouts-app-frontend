import { types } from "../types/types";

const initialState = {
  myWorkouts: [],
  loading: true,
  current: {
    workoutExercises: [],
  },
};
export const workoutReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.successGetMyWorkouts:
      return {
        ...state,
        loading: false,
        myWorkouts: action.payload,
      };

    case types.successGetWorkoutExercises:
      return {
        ...state,
        loading: false,
        current: { ...state.current, workoutExercises: action.payload },
      };

    case types.setCurrentWorkout:
      return {
        ...state,
        current: { ...action.payload },
      };

    case types.successAddWorkout:
      return {
        ...state,
        myWorkouts: [action.payload, ...state.myWorkouts],
      };

    case types.failureAction:
      return {
        ...state,
        loading: false,
      };

    default:
      return state;
  }
};
