import React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import Loading from "../Loading";
import useColorClasses from "../../hooks/useColorClasses";
import { Link } from "react-router-dom";

const Button = ({
  children,
  onClick,
  disabled = false,
  loading = false,
  size = "medium",
  variant = "contained",
  textColor = "",
  bgColor = "",
  bgHoverColor = "",
  startIcon,
  endIcon,
  borderColor,
  className,
  width,
  rounded,
  full,
  height,
  href,
  to,
  ...props
}) => {
  const baseClasses =
    "rounded focus:outline-none transition duration-200 flex items-center justify-center";
  const sizeClasses = {
    small: "px-2 py-1 text-sm",
    medium: "px-5 py-2 text-base",
    large: "px-7 py-3 text-lg",
  };
  const defaultTextContainedColor = "text-white";
  const defaultBgContainedColor = "bg-blue-500";
  const defaultBgHoverContainedColor = "hover:bg-blue-300";

  const defaultTextColor = "text-blue-500";
  const defaultBorderColor = "border-blue-500";
  const defaultBgHoverColor = "hover:bg-blue-200";
  const defaultLinkColor = "text-blue-500 hover:text-blue-500";

  const { textColor: newTextColor } = useColorClasses({ textColor });
  const { bgHoverColor: newBgHoverColor } = useColorClasses({ bgHoverColor });
  const { bgColor: newBgColor } = useColorClasses({ bgColor });
  const { borderColor: newBorderColor } = useColorClasses({ borderColor });

  const variantClasses = {
    contained: clsx(
      newTextColor || defaultTextContainedColor,
      newBgColor || defaultBgContainedColor,
      newBgHoverColor || defaultBgHoverContainedColor
    ),

    outlined: clsx(
      "border",
      newTextColor || defaultTextColor,
      newBorderColor || defaultBorderColor,
      newBgHoverColor || defaultBgHoverColor
    ),

    text: clsx(
      "hover:underline",
      newTextColor || defaultTextColor,
      newBgHoverColor || defaultBgHoverColor
    ),

    link: clsx(
      "hover:underline",
      newTextColor || defaultLinkColor,
      newBgHoverColor || "",
      newBorderColor || ""
    ),

    a: clsx(
      "hover:underline",
      newTextColor || defaultLinkColor,
      newBgHoverColor || "",
      newBorderColor || ""
    ),
  };

  const classes = clsx(baseClasses, sizeClasses[size], {
    [variantClasses[variant]]: !to && !href,
    "px-0 py-0": to || href,
    [variantClasses["link"]]: to,
    [variantClasses["a"]]: href,
    "opacity-50 cursor-not-allowed": disabled || loading,
    "rounded-full": rounded,
    "w-full": full,
  });
  const ButtonComponent = to ? Link : href ? "a" : "button";

  const content = () => (
    <>
      {loading ? (
        <>
          <Loading color={textColor || "white"} size="1em" />
          <span className="ml-2">Đang tải...</span>
        </>
      ) : (
        <>
          {startIcon && (
            <span className="mr-2 flex items-center text-inherit">
              {startIcon}
            </span>
          )}
          <span className="flex-1 text-center text-inherit">{children}</span>
          {endIcon && <span className="ml-2 flex items-center">{endIcon}</span>}
        </>
      )}
    </>
  );

  return (
    <ButtonComponent
      className={clsx(classes, className)}
      onClick={disabled || loading ? undefined : onClick}
      disabled={disabled || loading}
      style={{ width, height }}
      to={to}
      href={href}
      {...props}
    >
      {content()}
    </ButtonComponent>
  );
};

Button.propTypes = {
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
  loading: PropTypes.bool,
  size: PropTypes.oneOf(["small", "medium", "large"]),
  variant: PropTypes.oneOf(["contained", "outlined", "text"]),
  textColor: PropTypes.string,
  bgColor: PropTypes.string,
  startIcon: PropTypes.node,
  endIcon: PropTypes.node,
  className: PropTypes.string,
};

export default Button;
