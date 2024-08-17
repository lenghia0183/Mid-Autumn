import React, { forwardRef, useEffect, useId, useRef, useState } from "react";
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
      orientation = "vertical",
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
      onFocus = () => {},
      onBlur = () => {},
    },
    inputRef
  ) => {
    const id = useId();
    const [isFocused, setIsFocused] = useState(false);

    const inputContainerRef = useRef();
    const labelRef = useRef();

    const [inputWidth, setInputWidth] = useState();
    const [labelWidthValue, setLabelWidthValue] = useState();
    const widthStyle = useResponsiveStyle(width, "w");
    const heightStyle = useResponsiveStyle(height, "h");
    const labelWidthStyle = useResponsiveStyle(labelWidth, "w");

    useEffect(() => {
      setInputWidth(inputContainerRef?.current?.offsetWidth);
      setLabelWidthValue(labelRef?.current?.offsetWidth);
    }, [width, height, labelWidth]);

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

    const renderLabel = () => {
      if (!label) return null;

      const baseLabelClass = clsx(
        `text-sm select-none absolute transition-all duration-300 ease-in-out`,
        labelClass
      );

      if (orientation === "vertical") {
        return (
          <label
            htmlFor={id}
            ref={labelRef}
            className={clsx(`z-30 left-2 `, baseLabelClass, {
              "top-1/2 -translate-y-1/2 pointer-events-none":
                !isFocused && !value,
              "-top-1 -translate-y-full": isFocused || value,
            })}
          >
            {label}
          </label>
        );
      }

      return (
        <label
          htmlFor={id}
          ref={labelRef}
          style={{ ...labelWidthStyle }}
          className={clsx(
            baseLabelClass,
            "left-0 top-1/2 -translate-y-1/2 z-30 pointer-events-none",
            {
              "left-2": !isFocused && !value,
            }
          )}
        >
          {label}
        </label>
      );
    };

    const renderInput = () => (
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
          "w-full h-full border-b-2 p-2 bg-purple-100 outline-none",
          {
            "bg-gray-200 text-gray-500 cursor-not-allowed": disabled,
            "hover:bg-purple-200 focus:bg-purple-200": !disabled,
            "focus:border-b-2 focus:border-purple-500": !disabled && !error,
            "border-red-500 border-b-2": error,
            "border-purple-400": !error,
          },
          inputClass
        )}
        {...inputProps}
      />
    );

    const renderRightIcon = () =>
      rightIcon && (
        <div className="absolute right-0 pr-2 inset-y-0 flex items-center justify-center">
          {rightIcon}
        </div>
      );

    const renderError = () =>
      error && (
        <div
          style={{
            paddingLeft:
              (isFocused || value) && orientation === "horizontal"
                ? `${labelWidthValue}px`
                : 0,
          }}
          className={clsx(
            "text-red-500 text-sm transition-all duration-500",
            {
              "mt-1": orientation === "vertical",
            },
            errorClass
          )}
        >
          {error}
        </div>
      );

    return (
      <div
        className={clsx(className)}
        style={{
          ...widthStyle,
          ...heightStyle,
        }}
      >
        <div
          className={clsx("relative h-full", {
            "flex items-center justify-end": orientation === "horizontal",
          })}
        >
          {renderLabel()}
          <div
            className="right-0 transition-all duration-500 ease-in-out h-full"
            ref={inputContainerRef}
            style={{
              width:
                (isFocused || value) && orientation === "horizontal"
                  ? `${inputWidth - labelWidthValue}px`
                  : "100%",
            }}
          >
            <div className="relative h-full">
              {renderInput()}
              {renderRightIcon()}
            </div>
          </div>
        </div>
        {renderError()}
      </div>
    );
  }
);

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
  rightIcon: PropTypes.node,
  labelWidth: PropTypes.string,
};

export default TextField;
