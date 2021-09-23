import { types } from "../types/types";

const initialState = {
  type: "error",
  message: "",
  open: false,
};

export const snackbarReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.setSnackbar:
      const { type, message, open } = action.payload;
      return {
        ...state,
        type,
        message,
        open,
      };
    default:
      return state;
  }
};
