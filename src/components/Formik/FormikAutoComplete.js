import React from "react";
import { useField } from "formik";
import Autocomplete from "../AutoComplete";

const FormikAutocomplete = ({
  name,
  id,
  onChange: externalOnchange,
  ...props
}) => {
  const [field, meta, helpers] = useField(name);
  const { setValue } = helpers;

  return (
    <>
      <Autocomplete
        {...props}
        onChange={(val) => {
          if (externalOnchange) {
            externalOnchange(val);
          }
          setValue(val);
        }}
        value={field.value}
        error={meta.touched && meta.error ? meta.error : ""}
      />
    </>
  );
};

export default FormikAutocomplete;
