import React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import Loading from "../Loading"; // Nhập component loading của bạn

const Button = ({
  children,
  onClick,
  disabled = false,
  loading = false,
  size = "medium",
  variant = "contained",
  color = "primary",
  startIcon,
  endIcon,
  className,
  ...props
}) => {
  const baseClasses =
    "rounded focus:outline-none transition duration-200 flex items-center justify-center"; // Thêm flex và căn giữa
  const sizeClasses = {
    small: "px-2 py-1 text-sm",
    medium: "px-4 py-2 text-base",
    large: "px-6 py-3 text-lg",
    fullWidth: "w-full py-2",
  };
  const variantClasses = {
    contained:
      color === "primary"
        ? "bg-blue-600 text-white hover:bg-blue-700"
        : "bg-gray-200 text-gray-800 hover:bg-gray-300",
    outlined:
      color === "primary"
        ? "border border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white"
        : "border border-gray-300 text-gray-800 hover:bg-gray-100",
    text:
      color === "primary"
        ? "text-blue-600 hover:bg-blue-100"
        : "text-gray-800 hover:bg-gray-100",
  };

  const classes = clsx(
    baseClasses,
    sizeClasses[size],
    variantClasses[variant],
    {
      "opacity-50 cursor-not-allowed": disabled || loading,
    }
  );

  return (
    <button
      className={clsx(classes, className, {
        [sizeClasses.fullWidth]: size === "fullWidth",
      })}
      onClick={disabled || loading ? undefined : onClick}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? (
        <>
          <Loading color={color} size="1em" />
          <span className="ml-2">Đang tải...</span>{" "}
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
  color: PropTypes.oneOf(["primary", "secondary"]),
  startIcon: PropTypes.node,
  endIcon: PropTypes.node,
  className: PropTypes.string,
};

export default Button;
