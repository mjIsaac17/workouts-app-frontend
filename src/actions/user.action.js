import { fetchToken } from "../helpers/fetch";
import { types } from "../types/types";
import { setSnackbar } from "./snackbar.action";

export const userSetCurrent = (user) => ({
  type: types.userSetCurrent,
  payload: user,
});

const successGetUsers = (users) => ({
  type: types.successGetUsers,
  payload: users,
});

const successGetRoles = (roles) => ({
  type: types.userSuccessGetRoles,
  payload: roles,
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

export const userStartGettingRoles = () => {
  return async (dispatch) => {
    try {
      const resp = await fetchToken("user/roles");
      const body = await resp.json();

      if (!resp.ok) dispatch(setSnackbar("error", body.error, true));
      else dispatch(successGetRoles(body));
    } catch (error) {
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
        dispatch(setSnackbar("success", "User added", true)); //close snanckbar if open
      }
    } catch (error) {
      dispatch(setSnackbar("error", error.message, false));
      console.log("error", error);
    }
  };
};

const successUpdateUser = (user) => ({
  type: types.userSuccessUpdate,
  payload: user,
});

export const startUpdatingUser = (userData) => {
  return async (dispatch) => {
    try {
      const resp = await fetchToken(`user/${userData.id}`, userData, "PUT");
      const body = await resp.json();

      if (!resp.ok) {
        dispatch(setSnackbar("error", body.error, true));
      } else {
        dispatch(successUpdateUser(userData));
        dispatch(setSnackbar("success", "User updated", true));
      }
    } catch (error) {
      dispatch(setSnackbar("error", error.message, false));
      console.log("error", error);
    }
  };
};

const successDeleteUser = (userId) => ({
  type: types.userSuccessDelete,
  payload: userId,
});

export const userStartDeleting = (userId) => {
  return async (dispatch) => {
    try {
      const resp = await fetchToken(`user/${userId}`, {}, "DELETE");
      const body = await resp.json();

      if (!resp.ok) {
        dispatch(setSnackbar("error", body.error, true));
      } else {
        dispatch(successDeleteUser(userId));
        dispatch(setSnackbar("success", "User deleted", true));
      }
    } catch (error) {
      dispatch(setSnackbar("error", error.message, false));
      console.log("error", error);
    }
  };
};
