import { useMemo } from "react";
import clsx from "clsx";

const prefix = ["text-", "border-", "bg-"];

const getColorAndShade = (colorClass) => {
  const parts = colorClass.split("-");
  if (parts.length === 2) {
    if (prefix.includes(parts[0]))
      return { prefix: parts[0], color: parts[1], shade: null };
    return { prefix: null, color: parts[0], shade: parts[1] };
  }
  if (parts.length === 3) {
    return { prefix: parts[0], color: parts[1], shade: parts[2] };
  }
  return { prefix: "", color: parts[0], shade: null };
};

const useColorClasses = ({ textColor, bgColor, borderColor, bgHoverColor }) => {
  const classes = useMemo(() => {
    const isSingleColorProvided =
      (textColor && !bgColor && !borderColor && !bgHoverColor) ||
      (!textColor && bgColor && !borderColor && !bgHoverColor) ||
      (!textColor && !bgColor && borderColor && !bgHoverColor) ||
      (!textColor && !bgColor && !borderColor && bgHoverColor);

    if (isSingleColorProvided) {
      const baseColor = textColor || bgColor || borderColor || bgHoverColor;
      const { color, shade } = getColorAndShade(baseColor);

      return {
        textColor: shade ? `text-${color}-${shade}` : `text-${color}`,
        bgColor: shade ? `bg-${color}-${shade}` : `bg-${color}`,
        borderColor: shade ? `border-${color}-${shade}` : `border-${color}`,
        bgHoverColor: shade
          ? `hover:bg-${color}-${shade}`
          : `hover:bg-${color}`,
      };
    }

    return clsx(
      textColor && textColor.startsWith("text-")
        ? textColor
        : `text-${textColor}`,
      bgColor && bgColor.startsWith("bg-") ? bgColor : `bg-${bgColor}`,
      borderColor && borderColor.startsWith("border-")
        ? borderColor
        : `border-${borderColor}`
    );
  }, [textColor, bgColor, borderColor]);

  return classes;
};

export default useColorClasses;