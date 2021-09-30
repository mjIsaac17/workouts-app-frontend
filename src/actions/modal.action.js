import { types } from "../types/types";

export const setModal = (
  isOpen = false,
  header = "Modal title",
  componentName
) => ({
  type: types.setModal,
  payload: {
    isOpen,
    header,
    componentName,
  },
});
