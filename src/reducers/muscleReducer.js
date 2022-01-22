import { types } from "../types/types";

const initialState = {
  muscleList: [],
  loading: true,
  current: { id: 0, name: "All" },
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
        current: action.payload ? action.payload : initialState.current,
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
    case types.successUpdateMuscle:
      const updatedMuscle = action.payload;
      return {
        ...state,
        muscleList: state.muscleList.map((muscle) =>
          muscle.id !== updatedMuscle.id ? muscle : updatedMuscle
        ),
      };

    case types.clearMuscles:
      return initialState;
    default:
      return state;
  }
};
