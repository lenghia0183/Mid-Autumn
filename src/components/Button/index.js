import React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import Loading from "../Loading";

const Button = ({
  children,
  onClick,
  disabled = false,
  loading = false,
  size = "medium",
  variant = "contained",
  textColor = "",
  bgColor = "",
  startIcon,
  endIcon,
  className,
  ...props
}) => {
  const baseClasses =
    "rounded focus:outline-none transition duration-200 flex items-center justify-center";
  const sizeClasses = {
    small: "px-2 py-1 text-sm",
    medium: "px-4 py-2 text-base",
    large: "px-6 py-3 text-lg",
    fullWidth: "w-full py-2",
  };

  const variantClasses = {
    contained: "text-white",
    outlined: `border-2 ${textColor} bg-transparent`,
    text: "bg-transparent hover:underline",
  };

  const textClasses =
    textColor || (variant === "contained" ? "text-white" : "text-gray-800");
  const bgClasses =
    bgColor || (variant === "contained" ? "bg-blue-500 hover:bg-blue-600" : "");

  const classes = clsx(
    baseClasses,
    sizeClasses[size],
    variantClasses[variant],
    textClasses,
    bgClasses,
    {
      "opacity-50 cursor-not-allowed": disabled || loading,
    }
  );

  return (
    <button
      className={clsx(classes, className, {})}
      onClick={disabled || loading ? undefined : onClick}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? (
        <>
          <Loading color={textColor || "white"} size="1em" />
          <span className="ml-2">Đang tải...</span>
        </>
      ) : (
        <>
          {startIcon && (
            <span className="mr-2 flex items-center">{startIcon}</span>
          )}
          <span className="flex-1 text-center">{children}</span>
          {endIcon && <span className="ml-2 flex items-center">{endIcon}</span>}
        </>
      )}
    </button>
  );
};

Button.propTypes = {
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
  loading: PropTypes.bool,
  size: PropTypes.oneOf(["small", "medium", "large", "fullWidth"]),
  variant: PropTypes.oneOf(["contained", "outlined", "text"]),
  textColor: PropTypes.string,
  bgColor: PropTypes.string,
  startIcon: PropTypes.node,
  endIcon: PropTypes.node,
  className: PropTypes.string,
};

export default Button;
