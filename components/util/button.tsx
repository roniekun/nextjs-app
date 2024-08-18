"useClient";
import React from "react";
import { twMerge } from "tailwind-merge";

type ButtonProps = {
  name?: string;
  handleClick?: () => void;
  className?: string;
  size?: "sm" | "md" | "lg";
};

const Button = (props: ButtonProps) => {
  const { name, handleClick, className, size = "md" } = props;

  const sizeClasses = {
    sm: "px-2 py-1 text-xs",
    md: "px-3 py-1 text-sm",
    lg: "px-4 py-2 text-base",
  };

  return (
    <button
      type="button"
      className={twMerge(
        "py-1 px-2 border rounded-full w-fit m-1",
        sizeClasses[size],
        className
      )}
      onClick={handleClick}
    >
      {name}
    </button>
  );
};

export default Button;
