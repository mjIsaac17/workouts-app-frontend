import { Close } from "@mui/icons-material";
import React from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { setModal } from "../../actions/modal.action";

export const Modal = ({ children, modalSize = "sm" }) => {
  console.log("render Modal");
  const handleClose = () => {
    dispatch(setModal(false, ""));
  };
  const dispatch = useDispatch();
  const { isOpen, header } = useSelector((state) => state.modal);
  const showHideClassName = isOpen
    ? "modal display-block"
    : "modal display-none";

  return (
    <div className={showHideClassName}>
      <div className={`modal__container modal--${modalSize}`}>
        <div className="modal__header">
          <p>{header}</p>
          <button type="button" className="closeModal" onClick={handleClose}>
            <Close />
          </button>
        </div>
        <div className="modal__body">{children}</div>

        {/* {children} */}
      </div>
    </div>
  );
};
