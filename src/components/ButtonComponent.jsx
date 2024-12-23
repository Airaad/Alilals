import React from "react";

export function ButtonComponent({ text, onClick, disabled }) {
  return (
    <button
      className="relative px-8 py-3 text-white bg-black rounded-full overflow-hidden shadow-lg"
      disabled={disabled}
      onClick={onClick}
    >
      <span className="relative z-10">{text}</span>
      <span className="absolute inset-0 border-2 border-green-400 rounded-full animate-spin-border"></span>
    </button>
  );
}
