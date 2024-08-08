import React from "react";
import { Formik, Form } from "formik";
import Field from "../../components/Formik";
import Button from "../../components/Button";
import * as Yup from "yup";

const Test = () => {
  const initialValues = { gender: "" };

  const validationSchema = Yup.object({
    gender: Yup.string().required("Bạn phải chọn một tùy chọn."),
  });

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={(values) => {
        console.log("Submitted values:", values);
      }}
    >
      {() => (
        <Form>
          <>
            <Field.RadioGroup name="gender" orientation="vertical">
              <Field.Radio label="nam" value="male" />
              <Field.Radio label="nu" value="female" />
            </Field.RadioGroup>
            <Button>Gui</Button>
          </>
        </Form>
      )}
    </Formik>
  );
};

export default Test;
