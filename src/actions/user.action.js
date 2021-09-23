import { fetchNoToken } from "../helpers/fetch";
import { types } from "../types/types";
import { clearExercises } from "./exercise.action";
import { clearMuscles } from "./muscles.action";
import { setSnackbar } from "./snackbar.action";

const successLogin = (user) => ({
  type: types.successLogin,
  payload: user,
});

// const failureLogin = (error) => ({
//   type: types.failureLogin,
//   payload: error,
// });

export const startLogin = (userData) => {
  return async (dispatch) => {
    try {
      const resp = await fetchNoToken("user", userData, "POST");
      const body = await resp.json();

      if (!resp.ok) {
        // dispatch(failureLogin(body.error));
        dispatch(setSnackbar("error", body.error, true));
      } else {
        dispatch(successLogin(body));
        dispatch(setSnackbar("error", "", false));
      }
    } catch (error) {
      //   dispatch(failureLogin(error.message));
      dispatch(setSnackbar("error", error.message, false));

      console.log("error", error);
    }
  };
};

const clearUser = () => ({ type: types.clearUser });

export const logout = () => {
  return (dispatch) => {
    dispatch(clearUser());
    dispatch(clearMuscles());
    dispatch(clearExercises());
  };
};
