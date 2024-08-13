import React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import useColorClasses from "../../hooks/useColorClasses";
import Loading from "../Loading";

const IconButton = ({
  icon,
  onClick,
  disabled = false,
  loading = false,
  size = "medium",
  variant = "contained",
  textColor = "",
  bgColor = "",
  bgHoverColor = "",
  borderColor,
  className,
  rounded = true,
  ...props
}) => {
  const baseClasses =
    "rounded-full focus:outline-none transition duration-200 flex items-center justify-center";

  const sizeClasses = {
    small: "p-2",
    medium: "p-3",
    large: "p-4",
  };

  const defaultTextContainedColor = "text-white";
  const defaultBgHoverContainedColor = "hover:bg-blue-300";
  const defaultBgContainedColor = "bg-blue-500";

  const defaultTextColor = "text-blue-500";
  const defaultBorderColor = "border-blue-500";
  const defaultBgHoverColor = "hover:bg-blue-200";

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
      {...props}
    >
      {loading ? <Loading color={textColor || "white"} size="1em" /> : icon}
    </button>
  );
};

IconButton.propTypes = {
  icon: PropTypes.node.isRequired,
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
  loading: PropTypes.bool,
  size: PropTypes.oneOf(["small", "medium", "large"]),
  variant: PropTypes.oneOf(["contained", "outlined", "text"]),
  textColor: PropTypes.string,
  bgColor: PropTypes.string,
  bgHoverColor: PropTypes.string,
  borderColor: PropTypes.string,
  className: PropTypes.string,
  rounded: PropTypes.bool,
};

IconButton.defaultProps = {
  onClick: () => {},
  disabled: false,
  loading: false,
  size: "medium",
  variant: "contained",
  textColor: "",
  bgColor: "",
  bgHoverColor: "",
  borderColor: "",
  className: "",
  rounded: true,
};

export default IconButton;
