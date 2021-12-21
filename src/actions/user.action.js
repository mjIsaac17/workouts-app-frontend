import { fetchNoToken, fetchToken } from "../helpers/fetch";
import { adminData } from "../types/adminData";
import { types } from "../types/types";
import { clearExercises } from "./exercise.action";
import { clearMuscles } from "./muscles.action";
import { setSnackbar } from "./snackbar.action";

const successLogin = (user) => ({
  type: types.successLogin,
  payload: user,
});

const successGetUsers = (users) => ({
  type: types.successGetUsers,
  payload: users,
});

const setChecking = (checking) => ({
  type: types.setChecking,
  payload: checking,
});

export const startGettingUsers = () => {
  return async (dispatch) => {
    try {
      const resp = await fetchToken("user");
      const body = await resp.json();

      if (!resp.ok) {
        dispatch(setSnackbar("error", body.error, true));
      } else dispatch(successGetUsers(body));
    } catch (error) {
      dispatch(setSnackbar("error", error.message, false));
      console.log("error", error);
    }
  };
};

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
        if (body.role_id === adminData.ROLE_ID) body.isAdmin = true;
        else body.isAdmin = false;

        delete body.token;
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

const successAddUser = (user) => ({
  type: types.successAddUser,
  payload: user,
});

export const startAddingUser = (userData) => {
  return async (dispatch) => {
    try {
      const resp = await fetchToken("user/new", userData, "POST");
      const body = await resp.json();

      if (!resp.ok) {
        dispatch(setSnackbar("error", body.error, true));
      } else {
        dispatch(successAddUser({ ...userData, id: body.userId }));
        dispatch(setSnackbar("success", body.result, true)); //close snanckbar if open
      }
    } catch (error) {
      dispatch(setSnackbar("error", error.message, false));
      console.log("error", error);
    }
  };
};

export const startRegister = (userData) => {
  return async (dispatch) => {
    try {
      const resp = await fetchNoToken("user/register", userData, "POST");
      const body = await resp.json();

      if (!resp.ok) {
        dispatch(setSnackbar("error", body.error, true));
      } else {
        localStorage.setItem("token", body.token);
        body.isAdmin = false;

        delete body.token;
        dispatch(successLogin(body));
        dispatch(setSnackbar("error", "", false)); //close snanckbar if open
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
    try {
      const resp = await fetchToken("user/renew");
      const body = await resp.json();

      if (resp.ok) {
        localStorage.setItem("token", body.token);

        if (body.role_id === adminData.ROLE_ID) body.isAdmin = true;
        else body.isAdmin = false;

        body.id = body.uid;
        delete body.uid;
        delete body.token;
        dispatch(successLogin(body));
      } else dispatch(finishRenewToken());
    } catch (error) {
      //Internal server error
      console.log(error);
      dispatch(
        setSnackbar("error", "It was no possible to retrieve the data", true)
      );
    }
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
