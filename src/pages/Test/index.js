import React from "react";
import { Formik, Form } from "formik";
import Field from "../../components/Formik";
import Button from "../../components/Button";
import * as Yup from "yup";
import {
  TEXTFIELD_ALLOW,
  TEXTFIELD_REQUIRED_LENGTH,
} from "../../constants/common";

const Test = () => {
  const initialValues = { gender: "", number: "100", haha: "female" };

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
            <Field.RadioGroup name="gender" orientation="horizontal">
              <Field.Radio label="nam" value="male" />
            </Field.RadioGroup>

            <Field.Radio
              label="nu"
              name="haha"
              value="female"
              orientation="vertical"
              disabled={true}
            />

            <Field.TextField
              name="number"
              label="Chữ và số"
              width="20%"
              className="m-auto"
              orientation="horizontal"
              // disabled={true}
              allow={TEXTFIELD_ALLOW.POSITIVE_DECIMAL}
              inputProps={{
                maxLength: TEXTFIELD_REQUIRED_LENGTH.MAX_10,
              }}
            />

            <Field.CheckBox
              name="hello"
              label="Xin chào"
              orientation="horizontal"
              className="m-auto"
              disabled={true}
            />

            <Button>Gui</Button>
          </>
        </Form>
      )}
    </Formik>
  );
};

export default Test;
