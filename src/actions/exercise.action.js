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
      const body = await resp.json();
      if (resp.ok) {
        newExercise.id = body.exerciseId;
        newExercise.imageName = body.imageName;
        newExercise.imageUrl = body.imageUrl;
        delete newExercise.image;
        dispatch(successAddExercise(newExercise));
        dispatch(setSnackbar("success", "Exercise added", true));
      } else {
        //Invalid data
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

export const startUpdatingExercise = (exercise, selectedMuscleName) => {
  return async (dispatch) => {
    try {
      //Update current image name with the new name selected
      const resp = await fetchTokenFormData(
        `exercise/${exercise.id}`,
        exercise,
        "PUT"
      );
      const body = await resp.json();
      if (resp.ok) {
        delete exercise.newImage;
        delete exercise.updateMuscles;

        // Check if the updated exercise still contains the selected muscle to know if it should be removed from the state
        if (
          selectedMuscleName === "All" ||
          exercise.muscleNames.includes(selectedMuscleName)
        ) {
          exercise.imageName = body.imageName;
          exercise.imageUrl = body.imageUrl;
          dispatch(successUpdateExercise(exercise));
        } else dispatch(successRemoveExercise(exercise.id));

        dispatch(setSnackbar("success", "Exercise updated", true));
      } else {
        //Invalid data
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

export const startDeletingExercise = (exerciseId, imageUrl) => {
  return async (dispatch) => {
    try {
      //Update current image name with the new name selected
      const resp = await fetchToken(
        `exercise/${exerciseId}`,
        { imageUrl },
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
