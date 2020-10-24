import React, { useState, useRef } from "react";
import PropTypes from "prop-types";
import useClickOutside from "../utils/useClickOutside";

export default function Dropdown(props) {
  const [open, setOpen] = useState(false);

  const dropdown = useRef();
  const ref = useRef();

  // close the dropdown on click outside
  useClickOutside(ref, () => setOpen(false));

  return (
    <div className="tk-dropdown" ref={ref}>
      <button onClick={() => setOpen(true)} className="tk-dropdown-title">
        {props.value}
        {!props.value && (
          <div className="tk-dropdown-placeholder">{props.placeholder}</div>
        )}
      </button>
      <div
        ref={dropdown}
        className="tk-dropdown-list"
        style={{
          maxHeight: open ? `${dropdown.current.scrollHeight}px` : "0px",
        }}
      >
        <section role="listbox" aria-expanded={open}>
          {props.options &&
            props.options.map((value, index) => (
              <option
                onClick={(e) => {
                  props.onClick(e.target.value);
                  setOpen(false);
                }}
                onKeyPress={(e) =>
                  e.key === "Enter" &&
                  (props.onClick(e.target.value), setOpen(false))
                }
                value={value}
                tabIndex="0"
                aria-selected={value === props.value}
                aria-checked={value === props.value}
                key={index}
              >
                {value}
              </option>
            ))}
        </section>
      </div>
      {props.required && props.value === "" && (
        <div className="tk-dropdown-error">{props.error}</div>
      )}
    </div>
  );
}

Dropdown.defaultProps = {
  placeholder: "Select",
  required: false,
};

Dropdown.propTypes = {
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  placeholder: PropTypes.string,
  error: PropTypes.string,
  required: PropTypes.bool,
};
