import React, { useState, useRef, useEffect } from "react";
import PropTypes from "prop-types";
import useClickOutside from "../utils/useClickOutside";

export default function Dropdown(props) {
  const [open, setOpen] = useState(false);
  const [isRendered, setRender] = useState(open);
  const className = `tk-dropdown${open ? " open" : ""}`;
  const classNameProp = `${props.className ? " " + props.className : ""}`;
  const dropdown = useRef();

  useEffect(() => {
    if (open) setRender(true);
  }, [open]);

  const setInvisible = () => {
    if (!open) setRender(false);
  };

  // close the dropdown on click outside
  useClickOutside(dropdown, () => setOpen(false));

  return (
    <div className={className + classNameProp} ref={dropdown}>
      <div className="tk-dropdown-wrapper">
        <button onClick={() => setOpen(!open)} className="tk-dropdown-title">
          {props.value ? (
            props.value
          ) : (
            <span className="tk-dropdown-placeholder">{props.placeholder}</span>
          )}
        </button>
        <div className="tk-dropdown-chevron">
          <div className="tk-dropdown-chevron--line"/>
          <div className="tk-dropdown-chevron--line"/>
        </div>
        {isRendered && (
          <div
            className="tk-dropdown-list"
            style={{
              animation: `${open ? "popUp" : "popOut"} 0.15s`,
            }}
            onAnimationEnd={setInvisible}
          >
            <section
              name="dropdown list"
              role="listbox"
              aria-expanded={open}
              aria-hidden={!open}
              aria-label="dropdown list"
            >
              {props.options &&
                props.options.map((value, index) => (
                  <option
                    onClick={(e) => {
                      props.onClick(e.target.value);
                      setOpen(false);
                    }}
                    onKeyPress={(e) =>
                      (e.key === "Enter" || e.key === " ") &&
                      (props.onClick(e.target.value), setOpen(false))
                    }
                    value={value}
                    tabIndex={open ? "0" : "-1"}
                    aria-selected={value === props.value}
                    aria-checked={value === props.value}
                    key={index}
                  >
                    {value}
                  </option>
                ))}
            </section>
          </div>
        )}
      </div>
    </div>
  );
}

Dropdown.defaultProps = {
  placeholder: "Select",
};

Dropdown.propTypes = {
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  placeholder: PropTypes.string,
};
