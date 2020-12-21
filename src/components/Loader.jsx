import React from "react";

export default function Loader(props) {
  return (
    <div
      className={`loader-container${
        props.className ? ` ${props.className}` : ""
      }`}
    >
      <div className="loader-circle"></div>
      <div className="loader-circle"></div>
      <div className="loader-circle"></div>
    </div>
  );
}
