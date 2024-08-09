import React, { useId } from "react";
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
  disabled = false, // Add the disabled prop with a default value of false
  ...props
}) => {
  const id = useId();

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
          onChange={() => !disabled && onChange(value)}
          className={clsx("form-radio h-4 w-4 text-blue-600", {
            "cursor-not-allowed": disabled,
            "cursor-pointer": !disabled,
          })}
          id={id}
          disabled={disabled}
          {...props}
        />
        {label && (
          <label
            htmlFor={id}
            className={clsx("text-sm  select-none", {
              "ml-2": orientation === "horizontal",
              "block mt-2": orientation === "vertical",
              "text-gray-500 cursor-not-allowed": disabled,
              "cursor-pointer": !disabled,
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
  checked: PropTypes.bool,
  label: PropTypes.string,
  orientation: PropTypes.oneOf(["vertical", "horizontal"]),
  onChange: PropTypes.func,
  className: PropTypes.string,
  width: PropTypes.string,
  disabled: PropTypes.bool,
};

export default Radio;
