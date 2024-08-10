import { useMemo } from "react";
import clsx from "clsx";

const useColorClasses = ({
  textColor,
  bgColor = "bg-gray-500",
  borderColor,
}) => {
  const classes = useMemo(() => {
    return clsx(
      textColor && textColor.startsWith("text-")
        ? textColor
        : textColor
        ? `text-${textColor}`
        : "",
      bgColor && bgColor.startsWith("bg-") ? bgColor : `bg-${bgColor}`,
      borderColor && borderColor.startsWith("border-")
        ? borderColor
        : `border-${borderColor}`
    );
  }, [textColor, bgColor, borderColor]);

  return classes;
};

export default useColorClasses;
