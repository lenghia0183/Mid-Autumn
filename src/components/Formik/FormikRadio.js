import React from "react";
import { useField } from "formik";
import Radio from "../Radio";
import FieldWrapper from "./FieldWrapper";
import PropTypes from "prop-types";

const FormikRadio = ({ id, onChange: externalOnChange, ...props }) => {
  const [field, meta, helpers] = useField(id);
  const { setValue } = helpers;

  const handleChange = (value) => {
    setValue(value);
    if (externalOnChange) {
      externalOnChange(value);
    }
  };

  return (
    <Radio
      {...props}
      name={field.name}
      checked={field.value === props.value}
      onChange={handleChange}
      error={meta.error ? meta.error : ""}
    />
  );
};

FormikRadio.propTypes = {
  id: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  label: PropTypes.string,
  onChange: PropTypes.func,
};

export default FieldWrapper(FormikRadio);
