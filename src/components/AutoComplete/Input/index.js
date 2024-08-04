import React, { forwardRef } from "react";
import PropTypes from "prop-types";
import Icon from "../../Icon";
import Loading from "../../Loading";

const Input = forwardRef(
  (
    {
      inputValue,
      handleInputChange,
      clearInput,
      loading,
      showOptions,
      inputHeight,
      onFocus,
    },
    inputRef
  ) => {
    return (
      <div className="input-container flex items-center gap-4">
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          onFocus={onFocus}
          ref={inputRef}
          className="border-0 outline-none w-full bg-transparent box-border p-3"
          placeholder="Tìm kiếm..."
          style={{ height: inputHeight }}
        />
        <div className="flex items-center gap-x-2 mr-2">
          {loading && <Loading size="25px" color="text-gray-500" />}
          {inputValue && (
            <button
              type="button"
              onClick={clearInput}
              className="text-gray-500 hover:text-gray-700 focus:outline-none p-0 m-0 flex item-center"
            >
              <Icon name="closeCircle" size={1.8} color="text-gray-500" />
            </button>
          )}
          <Icon
            name="arrowDown"
            size={1.5}
            color="text-gray-500"
            className={`transform transition-transform duration-300 ${
              showOptions ? "rotate-180" : ""
            }`}
          />
        </div>
      </div>
    );
  }
);

Input.propTypes = {
  inputValue: PropTypes.string.isRequired,
  handleInputChange: PropTypes.func.isRequired,
  clearInput: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  showOptions: PropTypes.bool.isRequired,
  inputHeight: PropTypes.string.isRequired,
  onFocus: PropTypes.func.isRequired,
};

export default Input;
