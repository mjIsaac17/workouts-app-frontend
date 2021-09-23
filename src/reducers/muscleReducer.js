import { types } from "../types/types";

const initialState = {
  muscleList: [],
  loading: true,
  current: null,
};

export const muscleReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.successGetMuscles:
      return {
        ...state,
        loading: false,
        muscleList: action.payload,
      };

    case types.failureGetMuscles:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case types.setCurrentMuscle:
      return {
        ...state,
        current: action.payload,
      };

    case types.clearMuscles:
      return initialState;
    default:
      return state;
  }
};
