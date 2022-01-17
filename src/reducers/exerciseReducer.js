import { types } from "../types/types";

const initialState = {
  exerciseList: [],
  loading: true,
  current: null,
};

export const exerciseReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.successGetExercises:
      return {
        ...state,
        loading: false,
        exerciseList: action.payload,
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

    case types.setCurrentExercise:
      return {
        ...state,
        current: action.payload,
      };

    case types.successUpdateExercise:
      const updatedExercise = action.payload;
      return {
        ...state,
        exerciseList: state.exerciseList.map((exercise) =>
          exercise.id !== updatedExercise.id ? exercise : updatedExercise
        ),
      };

    case types.successRemoveExercise:
      const exerciseIdToRemove = action.payload;
      return {
        ...state,
        exerciseList: state.exerciseList.filter(
          (exercise) => exercise.id !== exerciseIdToRemove
        ),
      };
    default:
      return state;
  }
};
