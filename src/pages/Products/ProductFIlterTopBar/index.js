import React from "react";
import { Formik, Form } from "formik";
import Button from "../../../components/Button";
import FormikAutocomplete from "./../../../components/Formik/FormikAutoComplete";

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
        <Form className="flex gap-4 mb-4 bg-white shadow-md h-[110px] px-3">
          <div className="flex items-center gap-4 flex-wrap">
            <div className="text-lg font-medium">Hiển thị theo</div>

            <Button
              type="button"
              bgColor={"emerald"}
              height="50px"
              bgHoverColor="yellow"
              className="hover:text-dark text-lg"
              onClick={() => setFieldValue("displayOption", "newest")}
            >
              Mới nhất
            </Button>
            <Button
              type="button"
              height="50px"
              bgColor={"emerald"}
              bgHoverColor="yellow"
              className="hover:text-dark text-lg"
              onClick={() => setFieldValue("displayOption", "bestSeller")}
            >
              Bán chạy nhất
            </Button>
            <Button
              type="button"
              bgColor={"emerald"}
              height="50px"
              bgHoverColor="yellow"
              className="hover:text-dark text-lg"
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
