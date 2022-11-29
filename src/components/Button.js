/* eslint-disable indent */
/* eslint-disable react/button-has-type */
/* eslint-disable arrow-body-style */
/* eslint-disable quotes */
import React from "react";
import { useStateContext } from "../contexts/ContextProvider";

const Button = ({ children, alt, onClick, type, disabled }) => {
  const { currentColor } = useStateContext();
  return (
    <button
      className={`${alt
          ? "border border-red-500 text-red-500 hover:text-white hover:bg-red-500"
          : `text-white  ${disabled
            ? `opacity-60`
            : ` active:scale-100  hover:scale-110
                    hover:drop-shadow-xl hover:shadow-lg hover:shadow-zinc-400 active:drop-shadow-md active:shadow-md active:shadow-zinc-300`
          } `
        } transition-all duration-200 py-[.5em] px-[1.5em] rounded-md`}
      style={{ backgroundColor: currentColor, width: "100%" }}
      disabled={disabled}
      onClick={onClick}
      type={type}
    >
      {children}
    </button>
  );
};

export default Button;
