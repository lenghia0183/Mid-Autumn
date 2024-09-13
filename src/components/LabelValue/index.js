import React from "react";
import clsx from "clsx";

const LabelValue = ({
  label,
  value,
  labelWidth = "auto",
  labelClassName = "",
  valueClassName = "",
  className = "",
}) => {
  return (
    <div className={clsx("flex items-center text-lg text-dark", className)}>
      <div
        className={clsx("font-semibold", labelClassName)}
        style={{ width: labelWidth }}
      >
        {label}:
      </div>
      <div className={clsx("ml-2 flex-1", valueClassName)}>{value}</div>
    </div>
  );
};

export default LabelValue;
