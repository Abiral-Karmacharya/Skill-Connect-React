import React from "react";
import "../../styles/components.css";
export const Servicebox = ({ style, label }) => {
  return (
    <div className="service" style={style} label={label}>
      <img src="../../../../public/vite.svg" alt="image here" />
      <h2> {label}</h2>
    </div>
  );
};
