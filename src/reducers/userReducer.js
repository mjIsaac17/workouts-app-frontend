import { types } from "../types/types";

const initialState = {
  isLogged: false,
  user: {},
  checking: true,
  // error: null,
};

export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.successLogin:
      return {
        ...state,
        isLogged: true,
        user: action.payload,
        checking: false,
      };

    // case types.failureLogin:
    //   return {
    //     ...state,
    //     isLogged: false,
    //     user: {},
    //     error: action.payload,
    //   };
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
