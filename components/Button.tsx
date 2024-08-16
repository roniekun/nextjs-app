import React from "react";

type ButtonProps = {
  name?: string;
  handleClick?: () => void;
  color?: string;
  background?: string;
  borderColor?: string;
};

const Button = (props: ButtonProps) => {
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
