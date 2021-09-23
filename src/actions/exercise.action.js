import { fetchToken } from "../helpers/fetch";
import { types } from "../types/types";

const successGetExercises = (exercises) => ({
  type: types.successGetExercises,
  payload: exercises,
});

const failureGetExercises = (error) => ({
  type: types.failureGetExercises,
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

export const clearExercises = () => ({ type: types.clearExercises });
