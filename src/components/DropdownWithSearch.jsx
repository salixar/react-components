import React, { useState, useRef, useEffect } from "react";
import PropTypes from "prop-types";
import useClickOutside from "../utils/useClickOutside";

export default function DropdownWithSearch(props) {
  const [open, setOpen] = useState(false);
  const [searched, setSearched] = useState("");
  const [isRendered, setRender] = useState(open);
  const className = `tk-dropdown${open ? " open" : ""}`;
  const classNameProp = `${props.className ? " " + props.className : ""}`;

  const handleDropdown = () => {
    setOpen(true);
    setSearched("");
  };

  const id = `f${(~~(Math.random() * 1e8)).toString(16)}`;
  const dropdown = useRef();

  const results = !searched
    ? props.options
    : props.options.filter((option) =>
        option.toLowerCase().includes(searched.toLowerCase())
      );

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearched(value);
  };
  // close the dropdown on click outside
  useClickOutside(dropdown, () => {
    setOpen(false);
  });

  useEffect(() => {
    if (open) setRender(true);
  }, [open]);

  const setInvisible = () => {
    if (!open) setRender(false);
  };

  const SearchIcon = () => {
    return (
      <svg
        version="1.1"
        x="0px"
        y="0px"
        width="14"
        height="14"
        viewBox="0 0 635 635"
        className="tk-dropdown-search-icon"
      >
        <g>
          <path
            d="M255.108,0C119.863,0,10.204,109.66,10.204,244.904c0,135.245,109.659,244.905,244.904,244.905
            c52.006,0,100.238-16.223,139.883-43.854l185.205,185.176c1.671,1.672,4.379,1.672,5.964,0.115l34.892-34.891
            c1.613-1.613,1.47-4.379-0.115-5.965L438.151,407.605c38.493-43.246,61.86-100.237,61.86-162.702
            C500.012,109.66,390.353,0,255.108,0z M255.108,460.996c-119.34,0-216.092-96.752-216.092-216.092
            c0-119.34,96.751-216.091,216.092-216.091s216.091,96.751,216.091,216.091C471.199,364.244,374.448,460.996,255.108,460.996z"
            fill="#adaeaf"
          />
        </g>
      </svg>
    );
  };
  return (
    <div className={className + classNameProp} ref={dropdown}>
      <div className="tk-dropdown-wrapper">
        {!props.value && (
          <span className="tk-dropdown-placeholder">{props.placeholder}</span>
        )}
        <button onClick={handleDropdown} className="tk-dropdown-title">
          {props.value}
        </button>
        <div className="tk-dropdown-chevron">
          <div className="tk-dropdown-chevron--line"></div>
          <div className="tk-dropdown-chevron--line"></div>
        </div>
        {isRendered && (
          <div
            className="tk-dropdown-list"
            style={{
              animation: `${open ? "popUp" : "popOut"} 0.15s`,
            }}
            onAnimationEnd={setInvisible}
          >
            <div className="tk-dropdown-search-container">
              <label htmlFor={id}>
                <input
                  className="tk-dropdown-search-input"
                  type="text"
                  value={searched}
                  onChange={handleSearch}
                  placeholder={props.searchPlaceholder}
                  id={id}
                />
              </label>
              <SearchIcon />
            </div>
            {results.length !== 0 && (
              <section
                role="listbox"
                aria-expanded={open}
                aria-hidden={!open}
                aria-label="dropdown list"
              >
                {results.map((value, index) => (
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
            )}
          </div>
        )}
      </div>
    </div>
  );
}

DropdownWithSearch.defaultProps = {
  placeholder: "Select",
  searchPlaceholder: "Search",
};

DropdownWithSearch.propTypes = {
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  placeholder: PropTypes.string,
  searchPlaceholder: PropTypes.string,
};
