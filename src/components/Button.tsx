import React from "react";

const Button = ({ children, ...rest }) => {
  return (
    <button
      {...rest}
      style={{
        background: "#fff",
        borderWidth: "1px",
        borderRadius: "4px",
        borderColor: "#ccc",
        color: "#333",
        fontSize: "14px",
        padding: "4px 8px",
        cursor: "pointer",
      }}
    >
      {children}
    </button>
  );
};

export default Button;
