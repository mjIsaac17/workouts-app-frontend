import { Close } from "@material-ui/icons";
import React from "react";

export const Modal = ({
  handleClose,
  show,
  children,
  header = "Modal Title",
}) => {
  const showHideClassName = show ? "modal display-block" : "modal display-none";

  return (
    <div className={showHideClassName}>
      <section className="modal-main">
        <div style={{ marginBottom: "1rem" }} className="modal-header">
          <p>{header}</p>
          <button type="button" className="closeModal" onClick={handleClose}>
            <Close />
          </button>
        </div>
        {children}
      </section>
    </div>
  );
};
