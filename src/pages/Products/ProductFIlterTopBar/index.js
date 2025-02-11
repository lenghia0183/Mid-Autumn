import React from "react";
import { Formik, Form } from "formik";
import Button from "../../../components/Button";
import FormikAutocomplete from "./../../../components/Formik/FormikAutoComplete";
import clsx from "clsx";

const ProductFilterTopBar = ({ setFieldValue, values }) => {
  const priceOptions = [
    {
      label: "Giá: Tăng dần",
      value: "price:desc",
    },
    {
      label: "Giá: Giảm dần",
      value: "price:asc",
    },
  ];

  const displayOptions = [
    {
      label: "Mới nhất",
      value: "createdAt:desc",
    },
    {
      label: "Bán chạy nhất",
      value: "bestSeller",
    },
    {
      label: "Dánh gía cao nhất",
      value: "ratings:desc",
    },
  ];

  return (
    <div className="flex gap-x-4 mb-4 bg-white shadow-md xl:h-[120px] h-fit px-3 xl:py-0 py-5">
      <div className="flex items-center gap-4 flex-wrap">
        <div className="text-lg font-medium hidden sm:block">Hiển thị theo</div>
        <Button
          // type="button"
          height="50px"
          className={clsx("text-lg hover:text-dark hidden sm:block", {
            "bg-yellow text-dark hover:text-white":
              values.displayOption === "createdAt:desc",
          })}
          onClick={() => setFieldValue("displayOption", "createdAt:desc")}
        >
          Mới nhất
        </Button>

        <Button
          // type="button"
          height="50px"
          className={clsx("text-lg hover:text-dark  hidden sm:block", {
            "bg-yellow text-dark hover:text-white":
              values.displayOption === "ratings:desc",
          })}
          onClick={() => setFieldValue("displayOption", "ratings:desc")}
        >
          Đánh giá cao nhất
        </Button>

        <Button
          // type="button"
          height="50px"
          className={clsx("text-lg hover:text-dark  hidden sm:block", {
            "bg-yellow text-dark hover:text-white":
              values.displayOption === "price:asc",
          })}
          onClick={() => setFieldValue("displayOption", "price:asc")}
        >
          Giá tăng dần
        </Button>

        <Button
          // type="button"
          height="50px"
          className={clsx("text-lg hover:text-dark  hidden sm:block", {
            "bg-yellow text-dark hover:text-white":
              values.displayOption === "price:desc",
          })}
          onClick={() => setFieldValue("displayOption", "price:desc")}
        >
          Giá giảm dần
        </Button>

        {/* <div className="flex-2 sm:w-[300px] w-full xl:mt-0 mt-7 sm:hidden block">
          <FormikAutocomplete
            name="displayOptions"
            options={displayOptions}
            label="Hiển thị theo"
            getOptionLabel={(opt) => {
              return opt.label;
            }}
            isEqualValue={(opt, val) => {
              return val.value === opt.value;
            }}
          />
        </div>

        <div className="flex-2 sm:w-[300px] w-full xl:mt-0 mt-7">
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
            getOp
          />
        </div> */}
      </div>
    </div>
  );
};

export default ProductFilterTopBar;
