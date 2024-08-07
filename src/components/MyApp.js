import React, { useState } from "react";
import * as Yup from "yup";

import Field from "../components/Formik";
import Button from "./Button";
import Dialog from "./Diaglog";
import Icon from "./Icon";

const MyForm = () => {
  const [isDialogOpen, setDialogOpen] = useState(false);

  const handleOpenDialog = () => {
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
  };

  const validationSchema = Yup.object({
    name: Yup.string().required("Gender is required"),
  });

  const asyncRequest = async () => {
    try {
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/posts`
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching data:", error);
      return [];
    }
  };

  return (
    <>
      <Button
        onClick={handleOpenDialog}
        variant="contained"
        size="medium"
        // loading={true}
        startIcon={
          <Icon name="closeCircle" size="1em" color="text-green-500" />
        }
        className="text-3xl"
      >
        Le cong Nghia
      </Button>

      <Dialog
        title="My Form"
        open={isDialogOpen}
        onCancel={handleCloseDialog}
        cancelLabel="Cancel"
        submitLabel="Confirm"
        formikProps={{
          initialValues: {
            auto: [{ label: 1, id: 1 }],
            name: "nghia",
          },
          validationSchema,
          onSubmit: (values) => {
            console.log("tesst");
            console.log("Form submitted with values:", values);
          },
        }}
      >
        <>
          <Field.Autocomplete
            name="auto"
            asyncRequest={asyncRequest}
            getOptionsLabel={(option) => option?.label}
            isEqualValue={(val, opt) => val.id === opt.id}
            asyncRequestHelper={(res) =>
              res.map((i) => ({
                id: i?.id,
                label: i?.title,
                subLabel: i?.body,
              }))
            }
            multiple={true}
            autoFetch={false}
            inputHeight="40px"
            className="m-auto"
            row={5}
          />
          <Field.TextField
            name="name"
            height="40px"
            className="m-auto mt-2"
            placeholder="Tên"
            label={"Họ Tên"}
            orientation="vertical"
          />
        </>
      </Dialog>
    </>
  );
};

export default MyForm;
