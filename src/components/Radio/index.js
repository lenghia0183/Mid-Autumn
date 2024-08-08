import React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";

const Radio = ({
  name,
  value = "",
  checked = false,
  label = "",
  orientation = "horizontal",
  onChange = () => {},
  className = "",
  width = "100%",
  ...props
}) => {
  return (
    <div className={`${className}`} style={{ width }}>
      <div
        className={clsx("flex w-full justify-center", {
          "items-center": orientation === "horizontal",
          "flex-col items-center": orientation === "vertical",
        })}
      >
        <input
          type="radio"
          name={name}
          value={value}
          checked={checked}
          onChange={() => onChange(value)}
          className="form-radio h-4 w-4 text-blue-600 cursor-pointer"
          id={`${name}-${value}`}
          {...props}
        />
        {label && (
          <label
            htmlFor={`${name}-${value}`}
            className={clsx("text-sm cursor-pointer", {
              "ml-2": orientation === "horizontal",
              "block mt-2": orientation === "vertical",
            })}
          >
            {label}
          </label>
        )}
      </div>
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
  className: PropTypes.string,
  width: PropTypes.string,
};

export default Radio;
