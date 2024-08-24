import React from "react";
import { ReactComponent as ArrowDown } from "../../asset/icons/ArrowDown.svg";
import { ReactComponent as ArrowRight } from "../../asset/icons/ArrowRight.svg";
import { ReactComponent as Close } from "../../asset/icons/Close.svg";
import { ReactComponent as Phone } from "../../asset/icons/Phone.svg";
import { ReactComponent as VietnamFlag } from "../../asset/icons/VietnamFlag.svg";
import { ReactComponent as ChinaFlag } from "../../asset/icons/ChinaFlag.svg";
import { ReactComponent as JapanFlag } from "../../asset/icons/JapanFlag.svg";
import { ReactComponent as EnglandFlag } from "../../asset/icons/EnglandFlag.svg";
import { ReactComponent as Search } from "../../asset/icons/Search.svg";
import { ReactComponent as User } from "../../asset/icons/User.svg";
import { ReactComponent as Bag } from "../../asset/icons/Bag.svg";
import { ReactComponent as Location } from "../../asset/icons/Location.svg";
import { ReactComponent as Email } from "../../asset/icons/Email.svg";
import useParseDimension from "../../hooks/useParseDimension";
import useColorClasses from "../../hooks/useColorClasses";
import clsx from "clsx";
import useResponsiveStyle from "../../hooks/useResponsiveStyle";

export const icons = {
  arrowDown: ArrowDown,
  arrowRight: ArrowRight,
  close: Close,
  phone: Phone,
  vietnamFlag: VietnamFlag,
  chinaFlag: ChinaFlag,
  japanFlag: JapanFlag,
  englandFlag: EnglandFlag,
  search: Search,
  user: User,
  bag: Bag,
  location: Location,
  email: Email,
  // Add more icon components here...
};

const Icon = ({
  name = "",
  size = 2,
  width,
  height,
  className = "",
  color = "gray",
  strokeWidth,
  ...props
}) => {
  const IconComponent = icons[name];
  const { value, unit } = useParseDimension(`${size}`);
  const widthStyle = useResponsiveStyle(width, "w");
  const heightStyle = useResponsiveStyle(height, "h");

  const sizeStyle = {
    width: widthStyle?.width || `${value}${unit}`,
    height: heightStyle?.height || `${value}${unit}`,
  };

  const { textColor: newColor } = useColorClasses({ textColor: color });
  const style = {
    ...sizeStyle,
    color: newColor,
  };

  return (
    <span
      className={clsx(
        "x-icon inline-flex items-center justify-center ",
        { "text-inherit": !newColor },
        newColor,
        className
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
