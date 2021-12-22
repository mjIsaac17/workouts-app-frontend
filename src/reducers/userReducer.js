import { types } from "../types/types";

const initialState = {
  users: null,
};

export const userReducer = (state = initialState, action) => {
  switch (action.type) {
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

    default:
      return state;
  }
};
