import { types } from "../types/types";

const initialState = {
  isLogged: false,
  user: {},
  checking: true,
};

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.successLogin:
      return {
        ...state,
        isLogged: true,
        user: action.payload,
        checking: false,
      };

    case types.finishRenewToken:
      return {
        ...state,
        checking: false,
      };

    case types.clearUser:
      return { ...initialState, checking: false };

    default:
      return state;
  }
};
