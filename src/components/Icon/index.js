import PropTypes from "prop-types";
import { ReactComponent as ArrowDown } from "../../asset/icons/ArrowDown.svg";
import { ReactComponent as CloseCircle } from "../../asset/icons/CloseCircle.svg";
import useParseDimension from "../../hooks/useParseDimension";

export const icons = {
  arrowDown: ArrowDown,
  closeCircle: CloseCircle,
};

const Icon = ({
  name = "",
  fill,
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

  const style = {
    ...sizeStyle,
  };

  return (
    <span
      className={`x-icon inline-flex items-center justify-center ${className} ${color}`}
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

Icon.propTypes = {
  name: PropTypes.string,
  fill: PropTypes.string,
  size: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  className: PropTypes.string,
  color: PropTypes.string,
};

export default Icon;
