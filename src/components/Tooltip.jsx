import React, { useState, useRef } from "react";
import PropTypes from "prop-types";

export default function Tooltip(props) {
  const [position, setPosition] = useState({ x: null, y: null });
  const tooltip = useRef();
  const container = useRef();
  const trackPosition = (e) => {
    setPosition({
      x:
        Math.ceil(e.pageX - container.current.offsetParent.offsetLeft) -
        tooltip.current.clientWidth / 2,
      y:
        Math.ceil(e.pageY - container.current.offsetParent.offsetTop) -
        tooltip.current.clientHeight -
        props.messageMargin,
    });
  };

  const fixPosition = () => {
    setPosition({
      x:
        Math.ceil(container.current.clientWidth / 2) -
        tooltip.current.clientWidth / 2,
      y: Math.ceil(
        -container.current.firstChild.clientHeight +
          container.current.firstChild.offsetTop -
          props.messageMargin
      ),
    });
  };

  const translate = {
    transform: `translate3d(${position.x}px, ${position.y}px, 0)`,
  };

  return (
    <div className="tk-tooltip">
      <p className="tk-tooltip-message" ref={tooltip} style={translate}>
        {props.message}
      </p>
      <div
        className="tk-tooltip-children"
        ref={container}
        onMouseMove={props.floating ? trackPosition : fixPosition}
        onClick={(e) => console.log(e.currentTarget)}
      >
        {props.children}
      </div>
    </div>
  );
}

Tooltip.defaultProps = {
  messageMargin: 15,
  floating: false,
};

Tooltip.propTypes = {
  messageMargin: PropTypes.number,
  floating: PropTypes.bool,
};
