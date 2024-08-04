import React from "react";
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
    <>
      <CheckBox
        {...props}
        label={label}
        onChange={handleChange}
        checked={field.value}
        error={meta.touched && meta.error ? meta.error : ""}
      />
    </>
  );
};

export default FieldWrapper(FormikCheckBox);
