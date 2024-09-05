import React, { forwardRef, useId, useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import useResponsiveStyle from "../../hooks/useResponsiveStyle";

const TextField = forwardRef(
  (
    {
      value = "",
      placeholder = "",
      type = "text",
      onChange = () => {},
      error = "",
      label = "",
      className = "",
      width = "100%",
      height = "50px",
      labelWidth = "70px",
      allow,
      inputProps,
      inputClass = "",
      labelClass = "",
      errorClass = "",
      disabled = false,
      rightIcon = null,
      rightIconClass = "",
      onFocus = () => {},
      onBlur = () => {},
      orientation = "vertical", // or "horizontal"
    },
    inputRef
  ) => {
    const id = useId();
    const [isFocused, setIsFocused] = useState(false);

    const widthStyle = useResponsiveStyle(width, "w");
    const heightStyle = useResponsiveStyle(height, "h");

    const inputContainerRef = useRef();
    const labelRef = useRef();

    const [inputWidth, setInputWidth] = useState();
    const [labelWidthValue, setLabelWidthValue] = useState();
    const labelWidthStyle = useResponsiveStyle(labelWidth, "w");

    useEffect(() => {
      if (orientation === "horizontal") {
        setInputWidth(inputContainerRef?.current?.offsetWidth);
        setLabelWidthValue(labelRef?.current?.offsetWidth);
      }
    }, [width, height, labelWidth, orientation]);

    const handleChange = (e) => {
      let newValue = e.target.value;
      if (allow instanceof RegExp) {
        newValue = newValue.replace(allow, "");
      }
      onChange(newValue);
    };

    const handleFocus = () => {
      onFocus();
      setIsFocused(true);
    };

    const handleBlur = () => {
      onBlur();
      setIsFocused(false);
    };

    const verticalInput = (
      <>
        <div
          className={clsx(className, "relative text-lg")}
          style={{ ...widthStyle }}
        >
          <label
            htmlFor={id}
            className={clsx(
              "absolute left-2 transition-all duration-300 ease-in-out z-[100]",
              labelClass,
              {
                "text-gray-500": !isFocused && !value,
                "text-dark top-0 -translate-y-full": isFocused || value,
                "top-1/2 -translate-y-1/2": !isFocused && !value,
              }
            )}
          >
            {label}
          </label>

          <div className={clsx("relative overflow-hidden", inputClass)}>
            <input
              id={id}
              ref={inputRef}
              type={type}
              value={value}
              placeholder={placeholder}
              onChange={handleChange}
              onFocus={handleFocus}
              onBlur={handleBlur}
              disabled={disabled}
              className={clsx(
                "w-full border-b-2 bg-transparent outline-none p-2",
                {
                  "cursor-not-allowed bg-gray-200 text-gray-500": disabled,
                  "border-red-500": error,
                  "border-gray-300": !error,
                }
              )}
              style={{ ...heightStyle }}
              {...inputProps}
            />
            {rightIcon && (
              <div
                className={clsx(
                  "absolute right-0 p-2 inset-y-0 flex items-center",
                  rightIconClass
                )}
              >
                {rightIcon}
              </div>
            )}

            {/* underline */}
            <div
              className={clsx(
                "w-full absolute bottom-0 left-0 h-[2px] bg-emerald transition-transform duration-300 ease-in-out",
                {
                  "scale-x-0": !isFocused && !value,
                  "scale-x-100": isFocused || value,
                }
              )}
            />
          </div>
        </div>

        {error && (
          <div className={clsx("text-red-500 text-sm mt-1", errorClass)}>
            {error}
          </div>
        )}
      </>
    );

    const horizontalInput = (
      <div
        className={clsx(className, "relative flex items-center")}
        style={{ ...widthStyle }}
      >
        <label
          htmlFor={id}
          ref={labelRef}
          style={{ ...labelWidthStyle }}
          className={clsx(
            "absolute left-0 top-1/2 transform -translate-y-1/2 transition-all duration-300 ease-in-out",
            labelClass,
            {
              "text-gray-500": !isFocused && !value,
              "text-purple-500 top-[-20px] text-sm": isFocused || value,
              "top-1/2": !isFocused && !value,
            }
          )}
        >
          {label}
        </label>
        <div
          ref={inputContainerRef}
          className={clsx("flex-grow relative", {
            "ml-[70px]": isFocused || value,
          })}
        >
          <input
            id={id}
            ref={inputRef}
            type={type}
            value={value}
            placeholder={placeholder}
            onChange={handleChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
            disabled={disabled}
            className={clsx(
              "w-full border-none border-b-2 bg-transparent outline-none",
              {
                "cursor-not-allowed bg-gray-200 text-gray-500": disabled,
                "focus:border-b-2 focus:border-purple-500": !disabled && !error,
                "border-red-500": error,
                "border-gray-300": !error,
              },
              inputClass
            )}
            style={{ padding: "5px 0", ...heightStyle }}
            {...inputProps}
          />
          <div
            className={clsx(
              "absolute bottom-0 left-0 h-[2px] bg-purple-500 transition-transform duration-300 ease-in-out",
              {
                "scale-x-0": !isFocused && !value,
                "scale-x-100": isFocused || value,
              }
            )}
            style={{ width: "100%" }}
          />
          {rightIcon && (
            <div
              className={clsx(
                "absolute right-0 inset-y-0 flex items-center",
                rightIconClass
              )}
            >
              {rightIcon}
            </div>
          )}
        </div>
        {error && (
          <div className={clsx("text-red-500 text-sm mt-1", errorClass)}>
            {error}
          </div>
        )}
      </div>
    );

    return orientation === "vertical" ? verticalInput : horizontalInput;
  }
);

TextField.propTypes = {
  value: PropTypes.string,
  placeholder: PropTypes.string,
  type: PropTypes.string,
  onChange: PropTypes.func,
  error: PropTypes.string,
  label: PropTypes.string,
  className: PropTypes.string,
  width: PropTypes.string,
  height: PropTypes.string,
  labelWidth: PropTypes.string,
  allow: PropTypes.instanceOf(RegExp),
  inputProps: PropTypes.object,
  inputClass: PropTypes.string,
  labelClass: PropTypes.string,
  errorClass: PropTypes.string,
  disabled: PropTypes.bool,
  rightIcon: PropTypes.node,
  rightIconClass: PropTypes.string,
  onFocus: PropTypes.func,
  onBlur: PropTypes.func,
  orientation: PropTypes.oneOf(["vertical", "horizontal"]),
};

export default TextField;
