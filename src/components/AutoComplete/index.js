import React, { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import useDebounce from "../../hooks/useDebouce";
import Input from "./Input";
import OptionsList from "./OptionsList";
import SelectedTags from "./SelectedTags";

const Autocomplete = ({
  options = [],
  asyncRequest = null,
  getOptionsLabel = (option) => option.label,
  getOptionSubLabel = () => null,
  isEqualValue = (val, opt) => val?.id === opt.id,
  isCloseAfterSelect = true,
  asyncRequestHelper = (res) => res,
  multiple = false,
  width = "100%",
  heightPerOption = "40px",
  row = 5,
  className = "",
  autoFetch = true,
  inputHeight = "30px",
  onChange = () => {},
  error = "",
}) => {
  const [optionsState, setOptions] = useState(options);
  const [inputValue, setInputValue] = useState("");
  const debouncedInputValue = useDebounce(inputValue, 500);
  // eslint-disable-next-line no-unused-vars
  const [filteredOptions, setFilteredOptions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedValues, setSelectedValues] = useState(multiple ? [] : null);
  const [showOptions, setShowOptions] = useState(false);
  const [isUserInput, setIsUserInput] = useState(false);
  const inputContainerRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    if (options?.length > 0) {
      setOptions(options);
    }
  }, [options]);

  const fetchData = async () => {
    if (!asyncRequest) return;

    setLoading(true);
    const result = await asyncRequest(inputValue);
    const transformedData = asyncRequestHelper(result);
    setOptions(transformedData);
    setLoading(false);
  };

  useEffect(() => {
    if (autoFetch && optionsState.length === 0) {
      fetchData();
    }

    if (debouncedInputValue.trim() && isUserInput) {
      fetchData();
    }
  }, [autoFetch, debouncedInputValue, asyncRequest]);

  useEffect(() => {
    const filterOptions = () => {
      if (inputValue && (!asyncRequest || optionsState.length > 0)) {
        setFilteredOptions(
          optionsState.filter((option) =>
            getOptionsLabel(option)
              ?.toLowerCase()
              ?.includes(inputValue.toLowerCase())
          )
        );
      } else {
        setFilteredOptions(optionsState);
      }
    };

    filterOptions();
  }, [inputValue, optionsState, getOptionsLabel]);

  const handleInputChange = (e) => {
    const newValue = e.target.value;
    setInputValue(newValue);
    setShowOptions(true);
    setIsUserInput(true);
  };

  const handleOptionSelect = (option) => {
    let newSelectedValues;

    if (multiple) {
      if (selectedValues.some((selected) => isEqualValue(selected, option))) {
        newSelectedValues = selectedValues.filter(
          (item) => !isEqualValue(item, option)
        );
      } else {
        newSelectedValues = [...selectedValues, option];
        setShowOptions(true);
      }
    } else {
      newSelectedValues = option;
      setInputValue(getOptionsLabel(option));
      setShowOptions(!isCloseAfterSelect);
      setIsUserInput(false);
    }

    setSelectedValues(newSelectedValues);
    onChange(newSelectedValues);
  };

  const handleClickOutside = (event) => {
    if (
      inputContainerRef.current &&
      !inputContainerRef.current.contains(event.target)
    ) {
      setShowOptions(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const clearInput = () => {
    setInputValue("");
    setIsUserInput(true);
  };

  const clearAllSelected = () => {
    setSelectedValues([]);
    setInputValue("");
    onChange([]);
  };

  const handleFocus = () => {
    setShowOptions(true);
    if (!autoFetch && !showOptions && !isUserInput) {
      fetchData();
    }
  };

  const removeSelectedOption = (option) => {
    const newSelectedValues = multiple
      ? selectedValues.filter((selected) => !isEqualValue(selected, option))
      : null;
    setSelectedValues(newSelectedValues);
    setInputValue("");
    onChange(multiple ? newSelectedValues : null);
    setIsUserInput(true);
  };

  const isSelected = (option) => {
    return multiple
      ? selectedValues.some((selected) => isEqualValue(selected, option))
      : selectedValues && isEqualValue(selectedValues, option);
  };

  // Tính toán số lượng tag đang hiển thị và bị ẩn
  const visibleTags = multiple ? selectedValues?.slice(0, 2) : [];
  const hiddenTagCount =
    selectedValues?.length > 2 ? selectedValues.length - 2 : 0;

  return (
    <div
      className={`relative ${className}`}
      ref={inputContainerRef}
      style={{ width }}
      onClick={() => {
        inputRef.current.focus();
      }}
    >
      <div
        className={`flex flex-col bg-gray-50 hover:bg-gray-100 ${
          showOptions
            ? "border-b-2 border-b-gray-500 bg-gray-100"
            : "border-b border-b-gray-400"
        }`}
      >
        {multiple && (
          <SelectedTags
            visibleTags={visibleTags}
            getOptionsLabel={getOptionsLabel}
            hiddenTagCount={hiddenTagCount}
            clearAllSelected={clearAllSelected}
            selectedValues={selectedValues}
            removeSelectedOption={removeSelectedOption}
          />
        )}

        <Input
          inputValue={inputValue}
          handleInputChange={handleInputChange}
          clearInput={clearInput}
          loading={loading}
          showOptions={showOptions}
          inputHeight={inputHeight}
          onFocus={handleFocus}
          ref={inputRef}
        />
      </div>

      <OptionsList
        isSelected={isSelected}
        heightPerOption={heightPerOption}
        loading={loading}
        showOptions={showOptions}
        optionsState={optionsState}
        row={row}
        handleOptionSelect={handleOptionSelect}
        getOptionSubLabel={getOptionSubLabel}
        getOptionsLabel={getOptionsLabel}
        removeSelectedOption={removeSelectedOption}
      />

      {/* Hiển thị thông báo lỗi nếu có */}
      {error && (
        <div className="text-red-500 text-sm mt-1 text-left">{error}</div>
      )}
    </div>
  );
};

Autocomplete.propTypes = {
  options: PropTypes.array,
  asyncRequest: PropTypes.func,
  getOptionsLabel: PropTypes.func,
  getOptionSubLabel: PropTypes.func,
  isEqualValue: PropTypes.func,
  isCloseAfterSelect: PropTypes.bool,
  asyncRequestHelper: PropTypes.func,
  multiple: PropTypes.bool,
  width: PropTypes.string,
  heightPerOption: PropTypes.string,
  row: PropTypes.number,
  className: PropTypes.string,
  autoFetch: PropTypes.bool,
  inputHeight: PropTypes.string,
  onChange: PropTypes.func,
  error: PropTypes.string,
};

export default Autocomplete;
