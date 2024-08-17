import React from "react";
import { useField } from "formik";
import TextField from "../TextField";
import FieldWrapper from "./FieldWrapper";

const FormikTextField = ({ id, name, ...props }) => {
  const [field, meta, helpers] = useField(id || name);
  const { setValue } = helpers;

  return (
    <>
      <TextField
        {...props}
        onChange={(val) => setValue(val)}
        value={field.value}
        error={meta.error}
      />
    </>
  );
};

export default FormikTextField;
