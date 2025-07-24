import React from "react";
import "../../styles/components.css";
export const Servicebox = ({ style, label, img, skill, onclick }) => {
  if (img == null) {
    img = "src/assets/pages/images/expert.png";
  }
  return (
    <div className="service" style={style} label={label} onClick={onclick}>
      <img src={img} alt="image here" id="service-img" />
      <h2 id="service-heading"> {label}</h2>
      <p id="service-par">
        Description: <br /> {skill}
      </p>
    </div>
  );
};

export const Logbox = ({ style, title, name, status }) => {
  return (
    <div className="logs" style={style}>
      <h1 id="logs-heading">{title}</h1>
      <p id="logs-expert">Expert: {name}</p>
      <p id="logs-status">status: {status}</p>
    </div>
  );
};
