import { types } from "../types/types";

export const setSnackbar = (type = "error", message = "", open = false) => ({
  type: types.setSnackbar,
  payload: {
    type,
    message,
    open,
  },
});
