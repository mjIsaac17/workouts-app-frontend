import { fetchToken, fetchTokenFormData } from "../helpers/fetch";
import { types } from "../types/types";
import { setModal } from "./modal.action";
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
        newExercise.imageName = newExercise.image.name;
        delete newExercise.image;
        dispatch(successAddExercise(newExercise));
        dispatch(setSnackbar("success", "Exercise added", true));
      } else {
        //Invalid data
        const body = await resp.json();
        dispatch(setSnackbar("error", body.error, true));
      }
      dispatch(setModal(false));
    } catch (error) {
      //Server error
      dispatch(failureAction(error.message));
      dispatch(setSnackbar("error", error.message, true));
      console.log(error);
    }
  };
};

export const setCurrentExercise = (exercise) => ({
  type: types.setCurrentExercise,
  payload: exercise,
});

const successUpdateExercise = (exercise) => ({
  type: types.successUpdateExercise,
  payload: exercise,
});

const successRemoveExercise = (exerciseIdToRemove) => ({
  type: types.successRemoveExercise,
  payload: exerciseIdToRemove,
});

export const startUpdatingExercise = (exercise, originalMuscleId) => {
  return async (dispatch) => {
    try {
      //Update current image name with the new name selected
      if (exercise.newImage) {
        exercise.originalImageName = exercise.imageName;
        exercise.imageName = exercise.newImage.name;
      }
      const resp = await fetchTokenFormData(
        `exercise/${exercise.id}`,
        exercise,
        "PUT"
      );
      if (resp.ok) {
        delete exercise.newImage;
        //Check if the muscle id of the updated exercise changed to remove it of the state
        if (exercise.muscleId === originalMuscleId)
          dispatch(successUpdateExercise(exercise));
        else dispatch(successRemoveExercise(exercise.id));

        dispatch(setSnackbar("success", "Exercise updated", true));
      } else {
        //Invalid data
        const body = await resp.json();
        dispatch(setSnackbar("error", body, true));
      }
      dispatch(setModal(false));
    } catch (error) {
      //Server error
      dispatch(failureAction(error.message));
      dispatch(setSnackbar("error", error.message, true));
      console.log(error);
    }
  };
};

export const startDeletingExercise = (exerciseId, imageName) => {
  return async (dispatch) => {
    try {
      //Update current image name with the new name selected
      const resp = await fetchToken(
        `exercise/${exerciseId}`,
        { imageName },
        "DELETE"
      );
      if (resp.ok) {
        dispatch(successRemoveExercise(exerciseId));
        dispatch(setSnackbar("success", "Exercise deleted", true));
      } else {
        //Invalid data
        const body = await resp.json();
        dispatch(setSnackbar("error", body.error, true));
      }
      dispatch(setModal(false));
    } catch (error) {
      //Server error
      dispatch(failureAction(error.message));
      dispatch(setSnackbar("error", error.message, true));
      console.log(error);
    }
  };
};

export const clearExercises = () => ({ type: types.clearExercises });
