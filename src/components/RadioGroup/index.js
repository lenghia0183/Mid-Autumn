import React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";

const RadioGroup = ({
  name,
  selectedValue,
  onChange,
  children,
  error,
  orientation = "horizontal",
}) => {
  const handleChange = (value) => {
    onChange(value);
  };

  return (
    <>
      <div
        className={clsx(
          "flex ",
          orientation === "vertical" ? "flex-col" : "flex-row"
        )}
      >
        {React.Children.map(children, (child) => {
          return React.cloneElement(child, {
            name,
            checked: child.props.value === selectedValue,
            onChange: handleChange,
          });
        })}
      </div>
      {error && (
        <div className="text-red-500 text-sm mt-1 text-center">{error}</div>
      )}
    </>
  );
};

RadioGroup.propTypes = {
  name: PropTypes.string,
  selectedValue: PropTypes.string,
  onChange: PropTypes.func,
  children: PropTypes.node,
  error: PropTypes.string,
  orientation: PropTypes.oneOf(["vertical", "horizontal"]),
};

export default RadioGroup;