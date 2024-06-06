import React from "react";

const Input: React.FC<React.InputHTMLAttributes<HTMLInputElement>> = (
  props
) => {
  return (
    <input
      {...props}
      className={
        "block w-full rounded-lg outline outline-[1px] outline-zinc-400 border-0 py-3 px-5 bg-[#39465fe1] text-white font-light placeholder:text-white/70"
      }
    />
  );
};

export default Input;
