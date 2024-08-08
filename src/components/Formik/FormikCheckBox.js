import React from "react";
import PropTypes from "prop-types"; // Import PropTypes
import { useField } from "formik";
import CheckBox from "../CheckBox";
import FieldWrapper from "./FieldWrapper";

const FormikCheckBox = ({
  id = "",
  label,
  onChange: externalOnChange,
  ...props
}) => {
  const [field, meta, helpers] = useField(id);
  const { setValue } = helpers;

  const handleChange = (value) => {
    setValue(value);
    if (externalOnChange) {
      externalOnChange(value);
    }
  };

  return (
    <CheckBox
      {...props}
      label={label}
      onChange={handleChange}
      checked={field.value}
      error={meta.touched && meta.error ? meta.error : ""}
    />
  );
};

FormikCheckBox.propTypes = {
  id: PropTypes.string,
  label: PropTypes.string,
  onChange: PropTypes.func,
};

export default FieldWrapper(FormikCheckBox);
