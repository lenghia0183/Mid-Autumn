import React from "react";
import { useField } from "formik";
import Radio from "../Radio";
import FieldWrapper from "./FieldWrapper";

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

export default FieldWrapper(FormikRadio);
