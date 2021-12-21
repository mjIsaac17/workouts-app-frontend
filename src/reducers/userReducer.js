import { types } from "../types/types";

const initialState = {
  isLogged: false,
  user: {},
  checking: true,
  users: null,
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

    case types.successGetUsers:
      return {
        ...state,
        users: action.payload,
      };

    case types.successAddUser:
      return {
        ...state,
        users: [...state.users, action.payload],
      };

    case types.setChecking:
      return {
        ...state,
        checking: action.payload,
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
