import React from "react";
import { Formik, Form } from "formik";
import FormikTextField from "../../../components/Formik/FormikTextField";
import Icon from "../../../components/Icon";
import images from "./../../../asset/images/index";
import Image from "../../../components/Image";
import Divider from "../../../components/Devider";
import FormikCheckBox from "./../../../components/Formik/FormikCheckBox";
import Button from "../../../components/Button";
import validationSchema from "./schema";

const ProductFilterSideBar = ({ onFilter }) => {
  const ratings = [1, 2, 3, 4, 5];

  const handleSubmit = (values) => {
    onFilter(values);
  };

  const categoryList = [
    { label: "Bánh trăng vàng cao cấp", image: images.popularDish2 },
    { label: "Bánh nướng 2 trứng đb", image: images.popularDish1 },
    { label: "Bánh xanh", image: images.popularDish3 },
    { label: "Bánh trung thu OREO", image: images.childrenBanner1 },
    { label: "Bánh nướng 1 trứng", image: images.home1 },
    { label: "Bánh dẻo", image: images.home2 },
    { label: "Bánh Lava trứng chảy", image: images.popularDish4 },
    { label: "Hộp thu Young", image: images.popularDish3 },
  ];

  const brandList = [
    { name: "Kinh Đô", code: "kinh_do" },
    { name: "Bibica", code: "bibica" },
    { name: "Như Lan", code: "nhu_lan" },
    { name: "Hữu Nghị", code: "huu_nghi" },
    { name: "Đồng Khánh", code: "dong_khanh" },
    { name: "Brodard", code: "brodard" },
    { name: "Givral", code: "givral" },
    { name: "Maison", code: "maison" },
  ];

  return (
    <Formik
      initialValues={{
        search: "",
        minPrice: "",
        maxPrice: "",
        brand: "",
        rating: 5,
      }}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ setFieldValue, values }) => (
        <Form className="space-y-4">
          {/* Tìm kiếm */}
          <div className="h-[110px] flex items-center">
            <FormikTextField
              name="search"
              rightIcon={<Icon name="search" color="white" />}
              rightIconClass="bg-emerald"
              label="Tìm kiếm"
              inputClass="rounded"
            />
          </div>

          {/* Danh mục sản phẩm */}
          <div className="p-4 border rounded-md shadow-md bg-white py-6">
            <div className="flex items-center gap-2">
              <Icon name="category" size={1.5} />
              <h3 className="text-2xl font-medium text-dark">
                Danh mục sản phẩm
              </h3>
            </div>

            <Divider color="dark-300" marginTop="10px" />

            <div>
              {categoryList.map(({ label, image }) => (
                <React.Fragment key={label}>
                  <div className="flex items-center gap-3 p-2">
                    <div className="w-[30px] h-[30px]">
                      <Image src={image} alt={label} />
                    </div>
                    <p className="text-lg font-normal">{label}</p>
                  </div>
                  <Divider color="white-100" />
                </React.Fragment>
              ))}
            </div>
          </div>

          {/* Giá sản phẩm */}
          <div className="p-4 border rounded-md  shadow-md bg-white py-6">
            <div className="flex items-center gap-2">
              <Icon name="coin" size={1.5} color="dark" />
              <h3 className="text-2xl font-medium text-dark">Giá sản phẩm</h3>
            </div>

            <Divider color="dark-300" marginTop="10px" />

            <div className="flex items-center mt-6">
              <div className="flex-1">
                <FormikTextField
                  name="minPrice"
                  rightIconClass="bg-emerald"
                  label="Giá tối thiểu"
                  inputClass="rounded text-base"
                  labelClass="text-base rounded"
                />
              </div>

              <div
                className="mx-4 text-xl font-semibold text-gray-600 p-2 rounded-full"
                style={{ minWidth: "2rem" }}
              >
                -
              </div>

              <div className="flex-1">
                <FormikTextField
                  name="maxPrice"
                  rightIconClass="bg-emerald"
                  label="Giá tối đa"
                  inputClass="text-base"
                  labelClass="text-base"
                />
              </div>
            </div>

            <Button
              bgColor="emerald"
              bgHoverColor="yellow"
              full
              className="mt-5 hover:text-dark"
            >
              Áp dụng
            </Button>
          </div>

          {/* Thương hiệu */}
          <div className="p-4 border rounded-md  shadow-md bg-white py-6">
            <div className="flex items-center gap-2">
              <Icon name="vendor" size={1.5} />
              <h3 className="text-2xl font-medium text-dark">Thương hiệu</h3>
            </div>

            <Divider color="dark-300" marginTop="10px" />

            <div className="mt-3 ml-2">
              {brandList.map(({ name, code }) => (
                <FormikCheckBox key={code} label={name} name={code} />
              ))}
            </div>
          </div>

          {/* Đánh giá */}
          <div className="p-4 border rounded-md  shadow-md bg-white py-6">
            <div className="flex items-center gap-2">
              <Icon name="rating" size={1.5} color="dark" />
              <h3 className="text-2xl font-medium text-dark">Đánh giá</h3>
            </div>

            <Divider color="dark-300" marginTop="10px" />

            <div className="flex flex-col gap-2 mt-3">
              {ratings
                .slice()
                .reverse()
                .map((rating) => (
                  <label
                    key={rating}
                    className="flex items-center cursor-pointer"
                  >
                    <input
                      type="radio"
                      name="rating"
                      value={rating}
                      checked={values.rating === rating}
                      onChange={() => setFieldValue("rating", rating)}
                      className="sr-only"
                      aria-label={`Rating ${rating} stars`}
                    />
                    <div className="flex items-center gap-1">
                      {[...Array(rating)].map((_, i) => (
                        <Icon
                          key={i}
                          name="starContained"
                          size={1.5}
                          color={
                            values.rating === rating ? "yellow" : "emerald"
                          }
                        />
                      ))}
                      {[...Array(5 - rating)].map((_, i) => (
                        <Icon
                          key={i}
                          name="starEmpty"
                          size={1.5}
                          color={
                            values.rating === rating ? "yellow" : "emerald"
                          }
                        />
                      ))}
                    </div>
                    <span className="text-lg text-dark font-medium ml-2">
                      {rating === 5 ? "" : "Trở lên"}
                    </span>
                  </label>
                ))}
            </div>

            <Divider color="dark-300" marginTop="20px" marginBottom="20px" />

            <Button
              bgColor="emerald"
              bgHoverColor="yellow"
              full
              className="hover:text-dark"
            >
              Tìm kiếm
            </Button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default ProductFilterSideBar;
