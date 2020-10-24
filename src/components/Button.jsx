import React from "react";

export default function Button(props) {
  return (
    <button className="tk-button-container" onClick={props.onClick}>
      {props.children}
    </button>
  );
}
