import React, { useId } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";

const CheckBox = ({
  checked = false,
  label = "",
  orientation = "vertical",
  onChange = () => {},
  className = "",
  width = "100%",
  inputProps,
  disabled = false,
}) => {
  const handleChange = () => {
    if (!disabled) {
      // Prevent changes if disabled
      const newChecked = !checked;
      onChange(newChecked);
    }
  };

  const id = useId();

  return (
    <div style={{ width }} className={className}>
      <div
        className={clsx("flex w-full justify-center", {
          "items-center": orientation === "horizontal",
          "flex-col items-center": orientation === "vertical",
        })}
      >
        <input
          type="checkbox"
          checked={checked}
          onChange={handleChange}
          className={clsx("form-checkbox h-4 w-4 text-blue-600", {
            "cursor-not-allowed": disabled,
            "cursor-pointer": !disabled,
          })}
          disabled={disabled}
          {...inputProps}
          id={id}
        />
        {label && (
          <label
            htmlFor={id}
            className={clsx("text-sm select-none", {
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

CheckBox.propTypes = {
  checked: PropTypes.bool,
  label: PropTypes.string,
  orientation: PropTypes.oneOf(["vertical", "horizontal"]),
  onChange: PropTypes.func,
  className: PropTypes.string,
  width: PropTypes.string,
  inputProps: PropTypes.object,
  disabled: PropTypes.bool,
};

export default CheckBox;
