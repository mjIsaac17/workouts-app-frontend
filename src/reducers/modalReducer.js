import { types } from "../types/types";

const initialState = {
  isOpen: false,
  header: "Modal title",
  componentName: null,
};

export const modalReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.setModal:
      const { isOpen, header, componentName } = action.payload;
      return {
        ...state,
        isOpen,
        header,
        componentName,
      };

    default:
      return state;
  }
};
