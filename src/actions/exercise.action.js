import { fetchToken, fetchTokenFormData } from "../helpers/fetch";
import { types } from "../types/types";
import { setSnackbar } from "./snackbar.action";

const successGetExercises = (exercises) => ({
  type: types.successGetExercises,
  payload: exercises,
});

const failureGetExercises = (error) => ({
  type: types.failureGetExercises,
  payload: error,
});

const failureAction = (error) => ({
  types: types.failureAction,
  payload: error,
});

export const startGettingExercises = (id) => {
  return async (dispatch) => {
    try {
      const resp = await fetchToken(`exercise/${id}`);
      const body = await resp.json();
      console.log(body);
      dispatch(successGetExercises(body));
    } catch (error) {
      dispatch(failureGetExercises(error.message));
      console.log(error);
    }
  };
};

const successAddExercise = (newExercise) => ({
  type: types.successAddExercise,
  payload: newExercise,
});

export const startAddingExercise = (newExercise) => {
  return async (dispatch) => {
    try {
      const resp = await fetchTokenFormData("exercise", newExercise);
      if (resp.ok) {
        newExercise.image_name = newExercise.image.name;
        delete newExercise.image;
        dispatch(successAddExercise(newExercise));
        dispatch(setSnackbar("success", "Exercise added", true));
      } else {
        //Invalid data
        const body = await resp.json();
        dispatch(setSnackbar("error", body.error, true));
      }
    } catch (error) {
      //Server error
      dispatch(failureAction(error.message));
      dispatch(setSnackbar("error", error.message, true));
      console.log(error);
    }
  };
};

export const clearExercises = () => ({ type: types.clearExercises });
