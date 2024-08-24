import React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import useColorClasses from "../../hooks/useColorClasses";
import Loading from "../Loading";
import Icon from "../Icon";

const IconButton = ({
  iconName,
  onClick,
  disabled = false,
  loading = false,
  size = "zeroPadding",
  variant = "text",
  iconSize, // Thêm prop iconSize
  iconWidth,
  iconHeight,
  iconClass,
  textColor = "",
  bgColor = "",
  bgHoverColor = "",
  borderColor,
  className,
  rounded = true,
  width,
  height,
  ...props
}) => {
  const baseClasses =
    "rounded-full focus:outline-none transition duration-200 flex items-center justify-center";

  const sizeClasses = {
    small: "px-2 py-2",
    medium: "px-3 py-3",
    large: "px-4 py-4",
    zeroPadding: "p-0",
  };

  const defaultTextContainedColor = "text-white";
  const defaultBgHoverContainedColor = "hover:bg-blue-300";
  const defaultBgContainedColor = "bg-blue-500";

  const defaultIconColor = "text-blue-500";
  const defaultBorderColor = "border-blue-500";
  const defaultBgHoverColor = "hover:bg-blue-200";

  const { textColor: newIconColor } = useColorClasses({ textColor });
  const { bgHoverColor: newBgHoverColor } = useColorClasses({ bgHoverColor });
  const { bgColor: newBgColor } = useColorClasses({ bgColor });
  const { borderColor: newBorderColor } = useColorClasses({ borderColor });

  const variantClasses = {
    contained: clsx(
      newIconColor || defaultTextContainedColor,
      newBgColor || defaultBgContainedColor,
      newBgHoverColor || defaultBgHoverContainedColor
    ),

    outlined: clsx(
      "border",
      newIconColor || defaultIconColor,
      newBorderColor || defaultBorderColor,
      newBgHoverColor || defaultBgHoverColor
    ),

    text: clsx(newIconColor || defaultIconColor, newBgHoverColor || ""),
  };

  const classes = clsx(
    baseClasses,
    sizeClasses[size],
    variantClasses[variant],
    {
      "opacity-50 cursor-not-allowed": disabled || loading,
      "rounded-full": rounded,
    },
    className
  );

  return (
    <button
      className={classes}
      onClick={disabled || loading ? undefined : onClick}
      disabled={disabled || loading}
      style={{ width, height }}
      {...props}
    >
      {loading ? (
        <Loading color={textColor || "white"} size="1em" />
      ) : (
        <Icon
          className={iconClass}
          name={iconName}
          size={iconSize}
          width={iconWidth}
          height={iconHeight}
          color={textColor}
        />
      )}
    </button>
  );
};

IconButton.propTypes = {
  iconName: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
  loading: PropTypes.bool,
  size: PropTypes.oneOf(["small", "medium", "large", "zeroPadding"]),
  variant: PropTypes.oneOf(["contained", "outlined", "text"]),
  iconSize: PropTypes.string,
  iconWidth: PropTypes.string,
  iconHeight: PropTypes.string,
  textColor: PropTypes.string,
  bgColor: PropTypes.string,
  bgHoverColor: PropTypes.string,
  borderColor: PropTypes.string,
  className: PropTypes.string,
  rounded: PropTypes.bool,
  width: PropTypes.string,
  height: PropTypes.string,
};

export default IconButton;
