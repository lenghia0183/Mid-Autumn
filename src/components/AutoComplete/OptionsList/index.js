// OptionsList.js
import React from "react";
import PropTypes from "prop-types";
import { parseDimension } from "../../../utils";
import useParseDimension from "../../../hooks/useParseDimension";

const OptionsList = ({
  isSelected,
  heightPerOption,
  loading,
  showOptions,
  optionsState,
  row,
  handleOptionSelect,
  getOptionSubLabel,
  getOptionsLabel,
  removeSelectedOption,
}) => {
  const height = useParseDimension(heightPerOption);
  return (
    <>
      {loading && showOptions ? (
        <div className="absolute z-10 mt-1 bg-white border border-gray-300 rounded-md shadow-lg w-full p-2 text-center">
          Đang tải...
        </div>
      ) : (
        <ul
          className={`absolute z-10 mt-1 bg-white border border-gray-300 rounded-sm shadow-lg transition-all duration-300 ease-in-out w-full p-y2`}
          style={{
            height: showOptions
              ? `${Math.min(optionsState.length, row) * height.value}${
                  height.unit
                }`
              : "0px",
            overflow: showOptions ? "auto" : "hidden",
            opacity: showOptions ? "1" : "0",
          }}
        >
          {optionsState.length > 0 ? (
            optionsState.map((option, index) => (
              <li
                key={index}
                onClick={() => handleOptionSelect(option)}
                style={{ height: heightPerOption }}
                className={`cursor-pointer p-2 hover:bg-gray-100 flex items-center ${
                  isSelected(option) ? "bg-blue-100" : ""
                }`}
              >
                <span
                  className={`flex-1 overflow-hidden whitespace-nowrap text-ellipsis`}
                >
                  {getOptionsLabel(option)}
                </span>
                {getOptionSubLabel(option) && (
                  <span className="option-subLabel text-gray-500 text-sm">
                    {" - "} {getOptionSubLabel(option)}
                  </span>
                )}
                {isSelected(option) && (
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      removeSelectedOption(option);
                    }}
                    className="ml-2 text-gray-500 hover:text-gray-700"
                  >
                    &times;
                  </button>
                )}
              </li>
            ))
          ) : (
            <li className="p-2 text-center">Không có kết quả phù hợp</li>
          )}
        </ul>
      )}
    </>
  );
};

OptionsList.propTypes = {
  optionsState: PropTypes.array.isRequired,
  isSelected: PropTypes.func.isRequired,
  heightPerOption: PropTypes.string.isRequired,
  loading: PropTypes.bool.isRequired,
  showOptions: PropTypes.bool.isRequired,
  row: PropTypes.number.isRequired,
  handleOptionSelect: PropTypes.func.isRequired,
  getOptionSubLabel: PropTypes.func.isRequired,
  getOptionsLabel: PropTypes.func.isRequired,
  removeSelectedOption: PropTypes.func.isRequired,
};

export default OptionsList;
