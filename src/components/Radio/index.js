import React from "react";
import PropTypes from "prop-types";

const Radio = ({
  name,
  value = "",
  checked = false,
  label = "",
  orientation = "vertical",
  onChange = () => {},
  error = "",
  className = "",
  width = "100%",
  ...props
}) => {
  return (
    <div className={`${className}`} style={{ width }}>
      <div
        className={`flex w-full justify-center ${
          orientation === "horizontal" ? "items-center" : ""
        }`}
      >
        <input
          type="radio"
          name={name}
          value={value}
          checked={checked}
          onChange={() => onChange(value)}
          className="form-radio h-4 w-4 text-blue-600"
          {...props}
        />
        {label && (
          <label
            className={`text-sm ${
              orientation === "horizontal" ? "ml-2" : "block mt-2"
            }`}
          >
            {label}
          </label>
        )}
      </div>
      {error && (
        <div className="text-red-500 text-sm mt-1 text-left">{error}</div>
      )}
    </div>
  );
};

Radio.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.string,
  checked: PropTypes.bool,
  label: PropTypes.string,
  orientation: PropTypes.oneOf(["vertical", "horizontal"]),
  onChange: PropTypes.func,
  error: PropTypes.string,
  className: PropTypes.string,
};

export default Radio;
