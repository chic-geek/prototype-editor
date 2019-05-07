import React from "react";

const Button = ({ classes, action, label, disabled, value }) => (
  <button className={`btn ${classes}`} onClick={action} disabled={disabled} value={value}>
    {label}
  </button>
);

export default Button;
