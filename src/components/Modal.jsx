import React, { useState, useEffect, useRef } from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";
import Button from "./Button";
import useOutsideClick from "../utils/useClickOutside";

function Modal(props) {
  const { open, onClose, className, width, children, bindTo } = props;
  const [isRendered, setRender] = useState(open);
  const modal = useRef();

  useEffect(() => {
    if (open) setRender(true);
  }, [open]);

  const setInvisible = () => {
    if (!open) setRender(false);
  };
  useOutsideClick(modal, () => onClose());

  if (isRendered) {
    return ReactDOM.createPortal(
      <div
        className={`tk-modal${className ? ` ${className}` : ""}`}
        style={{
          animation: `${open ? "fadeIn" : "fadeOut"} 0.35s`,
        }}
        onAnimationEnd={setInvisible}
      >
        <div className="tk-modal__overlay" />
        <div
          className="tk-modal__container"
          style={{
            maxWidth: `${width}`,
            animation: `${open ? "scaleUp" : "scaleDown"} 0.35s`,
          }}
          ref={modal}
        >
          <div className="tk_modal__container--header">
            <Button className="transparent" onClick={onClose}>
              Close
            </Button>
          </div>
          <div className="tk-modal__body">{children}</div>
        </div>
      </div>,
      document.getElementById(bindTo)
    );
  } else {
    return null;
  }
}

Modal.defaultProps = {
  open: false,
  onClose: () => {},
  width: "540px",
  className: "",
  bindTo: "root",
};

Modal.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func,
  width: PropTypes.string,
  className: PropTypes.string,
  bindTo: PropTypes.string,
};

export default Modal;
