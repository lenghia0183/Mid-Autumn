import React from "react";
import { Field } from "formik";

const FieldWrapper = (Component) => (props) => {
  return (
    <Field
      component={Component}
      {...props}
      {...(props?.name && !props?.id
        ? { id: props?.name }
        : { id: Date.now() })}
    />
  );
};

export default FieldWrapper;
