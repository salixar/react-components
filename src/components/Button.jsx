import React from "react";

export default function Button(props) {
  return (
    <button
      className={`tk-button__container${
        props.className ? ` ${props.className}` : ""
      }`}
      onClick={props.onClick}
    >
      {props.children}
    </button>
  );
}
