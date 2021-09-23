import { fetchNoToken, fetchToken } from "../helpers/fetch";
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
        localStorage.setItem("token", body.token);
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

export const startRenewToken = () => {
  return async (dispatch) => {
    const resp = await fetchToken("user/renew");
    const body = await resp.json();
    if (resp.ok) {
      localStorage.setItem("token", body.token);
      dispatch(successLogin({ uid: body.uid, name: body.name }));
    } else dispatch(finishRenewToken());
  };
};

export const finishRenewToken = () => ({ type: types.finishRenewToken });

const clearUser = () => ({ type: types.clearUser });

export const logout = () => {
  return (dispatch) => {
    localStorage.clear();
    dispatch(clearUser());
    dispatch(clearMuscles());
    dispatch(clearExercises());
  };
};
