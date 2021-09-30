import { types } from "../types/types";

export const setModal = (isOpen = false, header = "Modal title") => ({
  type: types.setModal,
  payload: {
    isOpen,
    header,
  },
});
