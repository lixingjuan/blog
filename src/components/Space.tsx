import React from "react";

const Space = ({ children, rowGap = 4, columnGap = 4 }) => {
  return (
    <div
      style={{
        display: "flex",
        rowGap,
        columnGap,
      }}
    >
      {children}
    </div>
  );
};

export default Space;
