import { Form, Formik } from "formik";
import FormikTextField from "./../../components/Formik/FormikTextField";
import * as Yup from "yup";
import Button from "../../components/Button";
import useBreakpoint from "../../hooks/useBreakpoint";
import validationSchema from "./schema";
import { useTranslation } from "react-i18next";
import FormikAutoComplete from "../../components/Formik/FormikAutoComplete";
import {
  getDistrictDataTest,
  getProvinceDataTest,
  getWardDataTest,
} from "../../service/GHNApi";

function ProfileEdit() {
  const isLargerThanSm = useBreakpoint("sm");
  const { t } = useTranslation();

  // Initial values with fake data
  const initialValues = {
    name: "Nguyễn Văn A",
    email: "nguyenvana@example.com",
    phone: "0123456789",
    address: "123 Đường ABC, Quận 1, TP.HCM",
    province: {
      ProvinceID: 201,
      ProvinceName: "Hà Nội",
    },
    district: {
      DistrictID: 3303,
      DistrictName: "Huyện Thường Tín",
    },
    ward: {
      WardCode: "1B2711",
      WardName: "Xã Liên Phương",
    },
    street: "Ngõ đá, Xóm 2",
  };

  const handleSubmit = (values) => {
    // Handle form submission
    console.log("Form values:", values);
  };

  return (
    <div className="xl:p-4">
      <h2 className="text-2xl font-semibold text-dark shadow-md p-4">
        Thông tin tài khoản
      </h2>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema(t)}
        onSubmit={handleSubmit}
      >
        {({ resetForm, setFieldValue, values }) => (
          <Form>
            <div className="flex flex-col gap-6 sm:gap-y-6 gap-y-14 sm:mt-7 mt-14">
              <FormikTextField
                name="name"
                labelWidth={"150px"}
                label="Họ Và Tên:"
                orientation={isLargerThanSm ? "horizontal" : "vertical"}
                labelClassName="font-medium"
                required
                disabled
              />

              <FormikTextField
                name="email"
                labelWidth={"150px"}
                label="Email:"
                orientation={isLargerThanSm ? "horizontal" : "vertical"}
                labelClassName="font-medium"
                disabled
                required
              />

              <FormikTextField
                name="phone"
                labelWidth={"150px"}
                label="Điện Thoại:"
                orientation={isLargerThanSm ? "horizontal" : "vertical"}
                labelClassName="font-medium"
                required
              />

              <FormikAutoComplete
                name="province"
                label="Tỉnh/Thành phô"
                orientation={isLargerThanSm ? "horizontal" : "vertical"}
                labelWidth={"150px"}
                asyncRequest={getProvinceDataTest}
                asyncRequestHelper={(res) => {
                  return res?.data;
                }}
                getOptionsLabel={(opt) => opt?.ProvinceName}
                isEqualValue={(opt, val) => opt?.ProvinceID === val?.ProvinceID}
                onChange={() => {
                  setFieldValue("district", null);
                  setFieldValue("ward", null);
                }}
                autoFetch={false}
                filterActive={true}
                required
              />

              <FormikAutoComplete
                labelWidth={"150px"}
                name="district"
                label="Quận/Huyện:"
                orientation={isLargerThanSm ? "horizontal" : "vertical"}
                asyncRequest={() => {
                  return getDistrictDataTest(values?.province?.ProvinceID);
                }}
                asyncRequestHelper={(res) => {
                  return res?.data;
                }}
                getOptionsLabel={(opt) => {
                  return opt?.DistrictName;
                }}
                isEqualValue={(opt, val) => opt?.DistrictID === val?.DistrictID}
                onChange={() => {
                  setFieldValue("ward", null);
                }}
                disabled={!values?.province}
                autoFetch={false}
                filterActive={true}
                required
              />

              <FormikAutoComplete
                labelWidth={"150px"}
                name="ward"
                label="Phường/Xã"
                orientation={isLargerThanSm ? "horizontal" : "vertical"}
                asyncRequest={() => {
                  return getWardDataTest(values?.district?.DistrictID);
                }}
                asyncRequestHelper={(res) => {
                  return res?.data;
                }}
                getOptionsLabel={(opt) => {
                  return opt?.WardName;
                }}
                isEqualValue={(opt, val) => opt?.WardCode === val?.WardCode}
                onChange={() => {
                  setFieldValue("shipPrice", null);
                }}
                autoFetch={false}
                disabled={!values?.district}
                asyncRequestDeps="district"
                filterActive={true}
                required
              />

              <FormikTextField
                name="street"
                labelWidth={"150px"}
                label="Tên đường:"
                orientation={isLargerThanSm ? "horizontal" : "vertical"}
                labelClassName="font-medium"
                required
              />
            </div>
            <div className="flex mt-10">
              <div className="flex gap-4 ml-auto">
                <Button type="button" onClick={() => resetForm()}>
                  Hủy
                </Button>

                <Button type="submit" className="">
                  Lưu Thông Tin
                </Button>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default ProfileEdit;
