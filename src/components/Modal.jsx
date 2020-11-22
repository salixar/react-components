import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

function Modal(props) {
  const { open, onClose, className, width, children, bindTo } = props;

  if (!open) return null;

  return ReactDOM.createPortal(
    <div className="tk-modal">
      <div className="tk-modal__overlay" onClick={onClose}/>
      <div className={className ? `tk-modal__container ${className}` : "tk-modal__container"} style={{ maxWidth: `${width}px` }}>
        <div className="tk_modal__container--header">
          <button type="button" className="tk-button__container" onClick={onClose}>X</button>
        </div>
        <div className="tk-modal__body">
          {children}
        </div>
      </div>
    </div>,
    document.getElementById(bindTo),
  );
}

Modal.defaultProps = {
  open: false,
  onClose: () => {},
  width: 540,
  className: '',
  bindTo: 'root',
};

Modal.PropTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func,
  width: PropTypes.number,
  className: PropTypes.string,
  bindTo: PropTypes.string,
}


export default Modal
