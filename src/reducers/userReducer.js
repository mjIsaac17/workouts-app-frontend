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

    case types.userSuccessUpdate:
      const updatedUser = action.payload;
      return {
        ...state,
        users: state.users.map((user) =>
          user.id !== updatedUser.id ? user : updatedUser
        ),
      };

    case types.userSuccessDelete:
      const deletedId = action.payload;
      return {
        ...state,
        users: state.users.filter((user) => user.id !== deletedId),
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
