import { fetchNoToken } from "../helpers/fetch";
import { types } from "../types/types";

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
      const resp = await fetchNoToken("muscle");
      const body = await resp.json();
      dispatch(successGetMuscles(body));
    } catch (error) {
      dispatch(failureGetMuscles(error.message));
      console.log(error);
    }
  };
};

export const setCurrentMuscle = (muscle) => ({
  type: types.setCurrentMuscle,
  payload: muscle,
});
