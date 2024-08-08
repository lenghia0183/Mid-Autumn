import React from "react";
import PropTypes from "prop-types";
import { useField } from "formik";
import RadioGroup from "../RadioGroup";
import FieldWrapper from "./FieldWrapper";

const FormikRadioGroup = ({ id, name, onChange, children, ...props }) => {
  const [field, meta, helpers] = useField(name || id);

  const handleChange = (value) => {
    helpers.setValue(value);
    if (onChange) {
      onChange(value);
    }
  };

  return (
    <RadioGroup
      {...field}
      selectedValue={field.value}
      onChange={handleChange}
      error={meta.touched && meta.error ? meta.error : ""}
      {...props}
    >
      {children}
    </RadioGroup>
  );
};

FormikRadioGroup.propTypes = {
  id: PropTypes.string,
  name: PropTypes.string,
  onChange: PropTypes.func,
  children: PropTypes.node,
};

export default FieldWrapper(FormikRadioGroup);
