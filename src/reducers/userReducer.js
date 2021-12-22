import { types } from "../types/types";

const initialState = {
  users: null,
  currentUser: null,
  roles: null,
};

export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.userSetCurrent:
      return {
        ...state,
        currentUser: action.payload,
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

    case types.userSuccessGetRoles:
      return {
        ...state,
        roles: action.payload,
      };

    default:
      return state;
  }
};
