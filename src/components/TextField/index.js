import React, { forwardRef, useId } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";

const TextField = forwardRef((
  {
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
    inputClass = "",
    labelClass = "",
    errorClass = "",
    disabled = false,
  },
  inputRef
) => {
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
      className={clsx(className, {
        "flex items-center": orientation === "horizontal",
      })}
      style={{ width }}
    >
      {label && (
        <label
          htmlFor={id}
          className={clsx(
            "text-sm select-none",
            {
              "mr-2": orientation === "horizontal",
              "mb-1 block text-left": orientation !== "horizontal",
            },
            labelClass
          )}
        >
          {label}
        </label>
      )}
      <div className="flex-grow">
        <input
          id={id}
          ref={inputRef}
          type={type}
          value={value}
          placeholder={placeholder}
          onChange={handleChange}
          disabled={disabled}
          className={clsx(
            "w-full border-b p-2 bg-gray-50 rounded outline-none",
            {
              "bg-gray-200 text-gray-500 cursor-not-allowed": disabled,
              "hover:bg-gray-200 focus:bg-gray-200 focus:border-b-2 focus:border-gray-500":
                !disabled,
              "border-red-500 border-b-2": !!error,
              "border-gray-400": !error,
            },
            inputClass
          )}
          style={{ height }}
          {...inputProps}
        />
        {error && (
          <div
            className={clsx("text-red-500 text-sm mt-1 text-left", errorClass)}
          >
            {error}
          </div>
        )}
      </div>
    </div>
  );
});

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
  inputClass: PropTypes.string,
  labelClass: PropTypes.string,
  errorClass: PropTypes.string,
  disabled: PropTypes.bool,
};

export default TextField;
