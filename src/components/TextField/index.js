import React, { useId } from "react";
import PropTypes from "prop-types";

const TextField = ({
  value = "",
  placeholder = "",
  type = "text",
  onChange = () => {},
  error = "",
  label = "",
  orientation = "vertical",
  className = "",
  width = "100%",
  height = "30px",
  allow,
  inputProps,
  disabled = false,
}) => {
  const id = useId();

  const handleChange = (e) => {
    let newValue = e.target.value;

    if (allow instanceof RegExp) {
      newValue = newValue.replace(allow, "");
    }

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
          htmlFor={id}
          className={`text-sm select-none ${
            orientation === "horizontal" ? "mr-2" : "mb-1 block text-left"
          }`}
        >
          {label}
        </label>
      )}
      <div className="flex-grow">
        <input
          id={id}
          type={type}
          value={value}
          placeholder={placeholder}
          onChange={handleChange}
          disabled={disabled}
          className={`w-full border-b p-2 bg-gray-50 ${
            disabled
              ? "bg-gray-200 text-gray-500 cursor-not-allowed"
              : "hover:bg-gray-200 focus:bg-gray-200 focus:border-b-2 focus:border-gray-500"
          } ${
            error ? "border-red-500 border-b-2" : "border-gray-400"
          } rounded outline-none`}
          style={{ height: height }}
          {...inputProps}
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
  allow: PropTypes.instanceOf(RegExp),
  inputProps: PropTypes.object,
  disabled: PropTypes.bool,
};

export default TextField;
