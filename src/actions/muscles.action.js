import { fetchNoToken, fetchToken, fetchTokenFormData } from "../helpers/fetch";
import { types } from "../types/types";
import { setModal } from "./modal.action";
import { setSnackbar } from "./snackbar.action";

const muscleEndpoint = "muscle";

const successGetMuscles = (muscles) => ({
  type: types.successGetMuscles,
  payload: muscles,
});

const failureGetMuscles = (error) => ({
  type: types.failureGetMuscles,
  payload: error,
});

export const startGettingMuscles = () => {
  return async (dispatch) => {
    try {
      const resp = await fetchNoToken(muscleEndpoint);
      const body = await resp.json();
      if (resp.ok) dispatch(successGetMuscles(body));
      else dispatch(failureGetMuscles(body.error));
    } catch (error) {
      dispatch(failureGetMuscles(error.message));
      console.log(error);
    }
  };
};

const successAddMuscle = (muscle) => ({
  type: types.successAddMuscle,
  payload: muscle,
});

export const startAddingMuscle = (muscle) => {
  return async (dispatch) => {
    try {
      // muscle.imageName = renameImage(muscle.image.name);
      const resp = await fetchTokenFormData(muscleEndpoint, muscle);
      const body = await resp.json();
      if (resp.ok) {
        muscle.id = body.muscleId;
        muscle.imageUrl = body.imageUrl;
        muscle.imageName = body.imageName;
        delete muscle.image;
        dispatch(successAddMuscle(muscle));
        dispatch(setSnackbar("success", "Muscle added", true));
      } else {
        dispatch(setSnackbar("error", body.error, true));
      }
      dispatch(setModal(false));
    } catch (error) {
      dispatch(setSnackbar("error", error.message, true));
      console.log(error);
    }
  };
};

const successUpdateMuscle = (muscle) => ({
  type: types.successUpdateMuscle,
  payload: muscle,
});

export const startUpdatingMuscle = (muscle) => {
  return async (dispatch) => {
    try {
      const resp = await fetchTokenFormData(
        `${muscleEndpoint}/${muscle.id}`,
        muscle,
        "PUT"
      );
      const body = await resp.json();
      if (resp.ok) {
        if (muscle.newImage) {
          muscle.imageUrl = body.imageUrl;
          muscle.imageName = body.imageName;
          delete muscle.newImage;
        }
        dispatch(successUpdateMuscle(muscle));
        dispatch(setSnackbar("success", "Muscle updated", true));
        dispatch(setModal(false));
      } else {
        dispatch(setSnackbar("error", body.error, true));
      }
    } catch (error) {
      console.log(error);
      dispatch(setSnackbar("error", error.message, true));
    }
  };
};

const successRemoveMuscle = (muscleId) => ({
  type: types.successRemoveMuscle,
  payload: muscleId,
});

export const startDeletingMuscle = (muscleId, imageUrl, deleteExercises) => {
  return async (dispatch) => {
    try {
      const resp = await fetchToken(
        `${muscleEndpoint}/${muscleId}`,
        { imageUrl, deleteExercises },
        "DELETE"
      );
      if (resp.ok) {
        dispatch(successRemoveMuscle(muscleId));
        dispatch(setModal(false));
        dispatch(setSnackbar("success", "Muscle deleted", true));
        dispatch(setCurrentMuscle(null));
      } else {
        const { error } = await resp.json();
        dispatch(setSnackbar("error", error, true));
      }
    } catch (error) {
      console.log(error);
      dispatch(setSnackbar("error", error.message, true));
    }
  };
};

export const clearMuscles = () => ({ type: types.clearMuscles });

export const setCurrentMuscle = (muscle) => ({
  type: types.setCurrentMuscle,
  payload: muscle,
});
