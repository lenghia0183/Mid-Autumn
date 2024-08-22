import React from "react";
import { useField } from "formik";
import Autocomplete from "../AutoComplete";
import FieldWrapper from "./FieldWrapper";

const FormikAutocomplete = ({ name, id, ...props }) => {
  const [field, meta, helpers] = useField(name);
  const { setValue } = helpers;

  return (
    <>
      <Autocomplete
        {...props}
        onChange={(val) => setValue(val)}
        selectedValues={field.value}
        error={meta.touched && meta.error ? meta.error : ""}
      />
    </>
  );
};

export default FormikAutocomplete;
