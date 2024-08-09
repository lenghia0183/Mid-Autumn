import React from "react";
import { useField } from "formik";
import RadioGroup from "../RadioGroup";
import FieldWrapper from "./FieldWrapper";

const FormikRadioGroup = ({ id, onChange, children, ...props }) => {
  const [field, meta, helpers] = useField(id);

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

export default FieldWrapper(FormikRadioGroup);
