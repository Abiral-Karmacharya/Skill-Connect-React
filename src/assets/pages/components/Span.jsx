import React from "react";
import "../../styles/components.css";
export const Span = ({ label, style }) => {
  return (
    <span id="span" style={style}>
      {label}
    </span>
  );
};

export const PricingSpan = ({ heading, content }) => {
  return (
    <span id="pricing_span">
      <h2>{heading}</h2>
      {content.map((data, index) => (
        <li key={index} style={{ "list-style-type": "none" }}>
          {data}
        </li>
      ))}
    </span>
  );
};
