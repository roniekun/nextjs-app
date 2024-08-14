import React from "react";

const Button = (props) => {
  const { name, handleClick, color, background, borderColor } = props;

  return (
    <button
      type="button"
      className="py-1 px-2 border rounded-full w-fit m-1"
      style={{ color: color, background: background, borderColor: borderColor }}
      onClick={handleClick}
    >
      {name}
    </button>
  );
};

export default Button;
