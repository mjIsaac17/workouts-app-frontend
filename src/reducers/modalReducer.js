import { types } from "../types/types";

const initialState = {
  isOpen: false,
  header: "Modal title",
};

export const modalReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.setModal:
      const { isOpen, header } = action.payload;
      return {
        ...state,
        isOpen,
        header,
      };

    default:
      return state;
  }
};
