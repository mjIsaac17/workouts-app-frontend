import { fetchNoToken, fetchToken, fetchTokenFormData } from "../helpers/fetch";
import { types } from "../types/types";
import { setModal } from "./modal.action";
import { setSnackbar } from "./snackbar.action";

const successGetMuscles = (muscles) => ({
  type: types.successGetMuscles,
  payload: muscles,
});

const failureGetMuscles = (error) => ({
  type: types.failureGetMuscles,
  payload: error,
});

const failureAction = (error) => ({
  types: types.failureAction,
  payload: error,
});

export const startGettingMuscles = () => {
  return async (dispatch) => {
    try {
      const resp = await fetchNoToken("muscle");
      const body = await resp.json();
      dispatch(successGetMuscles(body));
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
  console.log(muscle);
  return async (dispatch) => {
    try {
      const resp = await fetchTokenFormData("muscle", muscle);
      if (resp.ok) {
        const body = await resp.json();
        muscle.id = body.muscleId;
        muscle.imageName = muscle.image.name;
        delete muscle.image;
        dispatch(successAddMuscle(muscle));
        dispatch(setSnackbar("success", "Muscle added", true));
      } else {
        //Invalid data
        const body = await resp.json();
        dispatch(setSnackbar("error", body, true));
      }
      dispatch(setModal(false));
    } catch (error) {
      dispatch(failureAction(error.message));
      dispatch(setSnackbar("error", error.message, true));
      console.log(error);
    }
  };
};

export const clearMuscles = () => ({ type: types.clearMuscles });

export const setCurrentMuscle = (muscle) => ({
  type: types.setCurrentMuscle,
  payload: muscle,
});
