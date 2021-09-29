import { types } from "../types/types";

const initialState = {
  exerciseList: [],
  loading: true,
};

export const exerciseReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.successGetExercises:
      return {
        ...state,
        loading: false,
        exerciseList: action.payload,
      };

    case types.failureGetExercises:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case types.failureAction:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case types.clearExercises:
      return initialState;

    case types.successAddExercise:
      return {
        ...state,
        exerciseList: [action.payload, ...state.exerciseList],
      };
    default:
      return state;
  }
};
