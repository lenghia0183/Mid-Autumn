import React from "react";
import PropTypes from "prop-types";
import useColorClasses from "../../hooks/useColorClasses";
import useResponsiveStyle from "../../hooks/useResponsiveStyle";
import clsx from "clsx";

const Divider = ({
  orientation = "horizontal",
  color = "dark-200",
  width = "100%",
  height = "1px",
  marginTop = "0",
  marginBottom = "0",
  className,
  ...props
}) => {
  const { bgColor: newBgColor } = useColorClasses({ bgColor: color });

  const widthStyle = useResponsiveStyle(width, "w");
  const heightStyle = useResponsiveStyle(height, "h");

  const style = {
    ...widthStyle,
    ...heightStyle,
    marginTop,
    marginBottom,
  };

  return (
    <div className={clsx(newBgColor, className)} style={style} {...props} />
  );
};

Divider.propTypes = {
  orientation: PropTypes.oneOf(["horizontal", "vertical"]),
  color: PropTypes.string,
  width: PropTypes.string,
  height: PropTypes.string,
  marginTop: PropTypes.string,
  marginBottom: PropTypes.string,
  className: PropTypes.string,
};

export default Divider;
