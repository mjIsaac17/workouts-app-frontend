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

    case types.successAddMuscle:
      return {
        ...state,
        muscleList: [...state.muscleList, action.payload],
      };

    case types.successRemoveMuscle:
      const deletedMuscleId = action.payload;
      return {
        ...state,
        muscleList: state.muscleList.filter(
          (muscle) => muscle.id !== deletedMuscleId
        ),
      };

    case types.clearMuscles:
      return initialState;
    default:
      return state;
  }
};
