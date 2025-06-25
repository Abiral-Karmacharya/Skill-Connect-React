import React from "react";
import "../../styles/components.css";
export const Span = ({ label, style }) => {
  return (
    <span id="span" style={style}>
      {label}
    </span>
  );
};
