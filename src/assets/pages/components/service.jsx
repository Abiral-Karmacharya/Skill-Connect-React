import React from "react";
import "../../styles/components.css";
export const Servicebox = ({ style, label, img, skill }) => {
  if (img == null) {
    img = "src/assets/pages/images/expert.png";
  }
  return (
    <div className="service" style={style} label={label}>
      <img src={img} alt="image here" id="service-img" />
      <h2 id="service-heading"> {label}</h2>
      <p id="service-par">
        Description: <br /> {skill}
      </p>
    </div>
  );
};
