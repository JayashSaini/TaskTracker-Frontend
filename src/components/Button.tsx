import React from "react";

const Button: React.FC<
  React.ButtonHTMLAttributes<HTMLButtonElement> & {
    fullWidth?: boolean;
    severity?: "primary" | "secondary" | "danger";
    size?: "base" | "small";
  }
> = ({ fullWidth, severity = "primary", size = "base", ...props }) => {
  return (
    <>
      <button
        {...props}
        className={`rounded-xl inline-flex flex-shrink-0 justify-center items-center text-center text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white shadow-sm p-3 
          ${fullWidth ? " w-full " : " "}
          ${
            severity === "primary"
              ? " bg-[#c24d2c] "
              : severity === "secondary"
              ? " bg-[#353831] "
              : severity === "danger"
          }
            ${size === "small" ? "text-sm" : "text-base"}
        `}
      >
        {props.children}
      </button>
    </>
  );
};

export default Button;
