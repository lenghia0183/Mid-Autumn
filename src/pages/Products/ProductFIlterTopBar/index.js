import React from "react";
import { Formik, Form } from "formik";
import Button from "../../../components/Button";
import FormikAutocomplete from "./../../../components/Formik/FormikAutoComplete";
import clsx from "clsx";

const ProductFilterTopBar = ({ onFilter }) => {
  const handleSubmit = (values) => {
    onFilter(values);
  };

  const priceOptions = [
    {
      label: "Giá: Tăng dần",
      value: "desc",
    },
    {
      label: "Giá: Giảm dần",
      value: "asc",
    },
  ];

  return (
    <Formik
      initialValues={{
        displayOption: "newest",
        price: "",
      }}
      onSubmit={handleSubmit}
    >
      {({ setFieldValue, values }) => (
        <Form className="flex gap-4 mb-4 bg-white shadow-md h-[120px] px-3">
          <div className="flex items-center gap-4 flex-wrap">
            <div className="text-lg font-medium">Hiển thị theo</div>

            <Button
              type="button"
              height="50px"
              className={clsx("text-lg hover:text-dark", {
                "bg-yellow text-dark hover:text-white":
                  values.displayOption === "newest",
              })}
              onClick={() => setFieldValue("displayOption", "newest")}
            >
              Mới nhất
            </Button>
            <Button
              type="button"
              height="50px"
              className={clsx("text-lg hover:text-dark", {
                "bg-yellow text-dark hover:text-white":
                  values.displayOption === "bestSeller",
              })}
              onClick={() => setFieldValue("displayOption", "bestSeller")}
            >
              Bán chạy nhất
            </Button>
            <Button
              type="button"
              height="50px"
              className={clsx("text-lg hover:text-dark", {
                "bg-yellow text-dark hover:text-white":
                  values.displayOption === "highestRating",
              })}
              onClick={() => setFieldValue("displayOption", "highestRating")}
            >
              Đánh giá cao nhất
            </Button>

            <div className="flex-2 w-[300px]">
              <FormikAutocomplete
                name="price"
                options={priceOptions}
                label="Sắp sếp theo giá"
                getOptionLabel={(opt) => {
                  return opt.label;
                }}
                isEqualValue={(opt, val) => {
                  return val.value === opt.value;
                }}
              />
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default ProductFilterTopBar;
