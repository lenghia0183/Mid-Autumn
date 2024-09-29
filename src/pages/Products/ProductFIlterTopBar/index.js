import React from "react";
import { Formik, Form } from "formik";
import Button from "../../../components/Button";
import FormikAutocomplete from "./../../../components/Formik/FormikAutoComplete";
import clsx from "clsx";

const ProductFilterTopBar = ({ setFieldValue, values }) => {
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

  const displayOptions = [
    {
      label: "Mới nhất",
      value: "newest",
    },
    {
      label: "Bán chạy nhất",
      value: "bestSeller",
    },
    {
      label: "Dánh gía cao nhất",
      value: "lowestPrice",
    },
  ];

  return (
    <div className="flex gap-x-4 mb-4 bg-white shadow-md xl:h-[120px] h-fit px-3 xl:py-0 py-5">
      <div className="flex items-center gap-4 flex-wrap">
        <div className="text-lg font-medium hidden sm:block">Hiển thị theo</div>
        <Button
          type="button"
          height="50px"
          className={clsx("text-lg hover:text-dark hidden sm:block", {
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
          className={clsx("text-lg hover:text-dark  hidden sm:block", {
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
          className={clsx("text-lg hover:text-dark  hidden sm:block", {
            "bg-yellow text-dark hover:text-white":
              values.displayOption === "highestRating",
          })}
          onClick={() => setFieldValue("displayOption", "highestRating")}
        >
          Đánh giá cao nhất
        </Button>

        <div className="flex-2 sm:w-[300px] w-full xl:mt-0 mt-7 sm:hidden block">
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
          />
        </div>
      </div>
    </div>
  );
};

export default ProductFilterTopBar;
