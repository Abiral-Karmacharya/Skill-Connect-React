import React from "react";

export const RegisterLogin = ({
  type,
  placeholder,
  input_style,
  label_style,
  label,
  onchange,
  value,
}) => {
  return (
    <div>
      <label htmlFor="input1" style={label_style} id="label">
        {label}
      </label>
      <input
        type={type}
        placeholder={placeholder}
        id="input1"
        style={input_style}
        onChange={onchange}
        value={value}
      />
    </div>
  );
};
