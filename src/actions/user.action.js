import { fetchToken } from "../helpers/fetch";
import { types } from "../types/types";
import { setSnackbar } from "./snackbar.action";

const successGetUsers = (users) => ({
  type: types.successGetUsers,
  payload: users,
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
