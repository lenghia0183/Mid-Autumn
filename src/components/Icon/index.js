import React from "react"; 
import { ReactComponent as ArrowDown } from "../../asset/icons/ArrowDown.svg";
import { ReactComponent as Close } from "../../asset/icons/Close.svg";
import useParseDimension from "../../hooks/useParseDimension";
import useColorClasses from "../../hooks/useColorClasses";
import clsx from "clsx"; 

export const icons = {
  arrowDown: ArrowDown,
  close: Close,
};

const Icon = ({
  name = "",
  size = 2,
  className = "",
  color = "gray",
  strokeWidth,
  ...props
}) => {
  const IconComponent = icons[name];
  const { value, unit } = useParseDimension(`${size}`);
  const sizeStyle = {
    width: `${value}${unit}`,
    height: `${value}${unit}`,
  };

  const { textColor: newColor } = useColorClasses({ textColor: color });
  const style = {
    ...sizeStyle,
  };

  return (
    <span
      className={clsx(
        "x-icon inline-flex items-center justify-center",
        className,
        newColor
      )}
      style={style}
      {...props}
    >
      {IconComponent && (
        <IconComponent
          className="w-full h-full"
          stroke="currentColor"
          strokeWidth={strokeWidth}
        />
      )}
    </span>
  );
};

export default Icon;
