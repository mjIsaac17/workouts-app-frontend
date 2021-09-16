import { types } from "../types/types";

const initialState = {
  muscleList: [],
  loading: true,
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

    default:
      return state;
  }
};
