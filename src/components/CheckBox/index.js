import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";

const CheckBox = ({
  checked = false,
  label = "",
  orientation = "vertical",
  onChange = () => {},
  error = "",
  className = "",
  width = "100%",
  ...props
}) => {
  const [isChecked, setIsChecked] = useState(checked);

  // Cập nhật isChecked khi checked prop thay đổi
  useEffect(() => {
    setIsChecked(checked);
  }, [checked]);

  const handleChange = () => {
    const newChecked = !isChecked;
    setIsChecked(newChecked);
    onChange(newChecked);
  };

  return (
    <div className={`${className}`} style={{ width }}>
      <div className="flex flex-col">
        <div
          className={`flex w-full justify-center ${
            orientation === "horizontal" ? "items-center" : ""
          }`}
        >
          <input
            type="checkbox"
            checked={isChecked}
            onChange={handleChange}
            className="form-checkbox h-4 w-4 text-blue-600"
            {...props} // Rải các props còn lại vào input
          />
          {label && (
            <label
              className={`text-sm ${
                orientation === "horizontal" ? "ml-2" : "mt-2"
              }`}
            >
              {label}
            </label>
          )}
        </div>
        {error && <div className="text-red-500 text-sm mt-1 ml-6">{error}</div>}
      </div>
    </div>
  );
};

CheckBox.propTypes = {
  checked: PropTypes.bool,
  label: PropTypes.string,
  orientation: PropTypes.oneOf(["vertical", "horizontal"]),
  onChange: PropTypes.func,
  error: PropTypes.string,
  className: PropTypes.string,
  width: PropTypes.string, // Thêm width vào PropTypes
};

export default CheckBox;
