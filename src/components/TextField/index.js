import React, { useState } from "react";
import PropTypes from "prop-types";

const TextField = ({
  value = "",
  placeholder = "",
  type = "text",
  onChange = () => {},
  error = "",
  label = "",
  orientation = "vertical", // "vertical" hoặc "horizontal"
  className = "",
  width = "100%",
  height = "30px",
}) => {
  const [inputValue, setInputValue] = useState(value);

  const handleChange = (e) => {
    const newValue = e.target.value;
    setInputValue(newValue);
    onChange(newValue);
  };

  return (
    <div
      className={`${className} ${
        orientation === "horizontal" ? "flex items-center" : ""
      }`}
      style={{ width }}
    >
      {label && (
        <label
          className={`text-sm w-1/6 ${
            orientation === "horizontal" ? "mr-2" : "mb-1 block text-left"
          }`}
        >
          {label}
        </label>
      )}
      <div className="flex-grow">
        <input
          type={type}
          value={inputValue}
          placeholder={placeholder}
          onChange={handleChange}
          className={`w-full border-b p-2 bg-gray-50 hover:bg-gray-200 focus:bg-gray-200 focus:border-b-2 focus:border-gray-500 ${
            error ? "border-red-500 border-b-2" : "border-gray-400"
          } rounded outline-none `}
          style={{ height: height }}
        />
        {error && (
          <div className="text-red-500 text-sm mt-1 text-left">{error}</div>
        )}
      </div>
    </div>
  );
};

TextField.propTypes = {
  value: PropTypes.string,
  placeholder: PropTypes.string,
  type: PropTypes.string,
  onChange: PropTypes.func,
  error: PropTypes.string,
  label: PropTypes.string,
  orientation: PropTypes.oneOf(["vertical", "horizontal"]),
  className: PropTypes.string,
  width: PropTypes.string,
  height: PropTypes.string,
};

export default TextField;
