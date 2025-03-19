// src/ui/input.js

import React from "react";

const Input = ({ value, onChange, className, type = "text" }) => {
  return (
    <input
      type={type}
      value={value}
      onChange={onChange}
      className={`border-2 border-gray-300 rounded p-2 w-full ${className}`}
    />
  );
};

export { Input };