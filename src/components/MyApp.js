import React from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";

import Field from "../components/Field";

const MyForm = () => {
  const validationSchema = Yup.object({
    gender: Yup.string().required(),
  });

  const asyncRequest = async () => {
    try {
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/posts`
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      // await sleep(5000);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching data:", error);
      return [];
    }
  };

  return (
    <Formik
      initialValues={{
        auto: [],
        name: "nghia",
        AcceptTerms: true,
        gender: "female",
      }}
      validationSchema={validationSchema}
      onSubmit={(values) => {
        console.log("submit", values);
      }}
    >
      {() => (
        <Form>
          <Field.Autocomplete
            name="auto"
            asyncRequest={asyncRequest}
            getOptionsLabel={(option) => option?.label}
            isEqualValue={(val, opt) => val.id === opt.id}
            asyncRequestHelper={(res) =>
              res.map((i) => {
                return {
                  id: i?.id,
                  label: i?.title,
                  subLabel: i?.body,
                };
              })
            }
            multiple={true}
            autoFetch={false}
            inputHeight="40px"
            width="20%"
            className="m-auto"
            row={5}
          />

          <Field.TextField
            name="name"
            width="20%"
            height="40px"
            className="m-auto mt-2"
            placeholder="Tên"
            label={"Họ Tên"}
            orientation="vertical"
          />

          <Field.CheckBox
            label="Accept Terms"
            name="AcceptTerms"
            className="m-auto"
            width={"20%"}
            orientation="horizontal"
            checked={true}
          />

          <Field.Radio
            name="gender"
            label="Name"
            value="male"
            orientation="horizontal"
            className="m-auto"
            width={"20%"}
          />

          <Field.Radio
            name="gender"
            label="nu"
            value="female"
            orientation="horizontal"
            className="m-auto"
            width={"20%"}
          />

          <button type="submit" className="mt-4 p-2 bg-blue-500 text-white">
            Gửi
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default MyForm;
