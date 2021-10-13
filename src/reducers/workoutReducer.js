import { types } from "../types/types";

const initialState = {
  myWorkouts: [],
  loading: true,
  currentWorkout: {},
  currentWorkoutExercises: [],
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
        currentWorkoutExercises: action.payload,
      };

    case types.setCurrentWorkout:
      return {
        ...state,
        currentWorkout: { ...action.payload },
      };

    case types.successAddWorkout:
      return {
        ...state,
        myWorkouts: [action.payload, ...state.myWorkouts],
      };

    case types.successUpdateWorkout:
      const updatedWorkout = action.payload;
      return {
        ...state,
        myWorkouts: [
          ...state.myWorkouts.map((w) =>
            w.id !== updatedWorkout.id ? w : updatedWorkout
          ),
        ],
      };

    case types.successRemoveWorkout:
      const deletedWorkoutId = action.payload;
      return {
        ...state,
        myWorkouts: [
          ...state.myWorkouts.filter((w) => w.id !== deletedWorkoutId),
        ],
      };
    case types.failureAction:
      return {
        ...state,
        loading: false,
      };

    case types.setLoading:
      return {
        ...state,
        loading: action.payload,
      };

    default:
      return state;
  }
};
