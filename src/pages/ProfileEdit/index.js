import { Form, Formik } from "formik";
import FormikTextField from "./../../components/Formik/FormikTextField";
import * as Yup from "yup";
import Button from "../../components/Button";
import useBreakpoint from "../../hooks/useBreakpoint";
import validationSchema from "./schema";
import { useTranslation } from "react-i18next";

function ProfileEdit() {
  const isLargerThanSm = useBreakpoint("sm");
  const { t } = useTranslation();

  // Initial values with fake data
  const initialValues = {
    name: "Nguyễn Văn A",
    email: "nguyenvana@example.com",
    phone: "0123456789",
    address: "123 Đường ABC, Quận 1, TP.HCM",
  };

  const handleSubmit = (values) => {
    // Handle form submission
    console.log("Form values:", values);
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-semibold text-dark shadow-md p-4">
        Thông tin tài khoản
      </h2>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema(t)}
        onSubmit={handleSubmit}
      >
        {({ resetForm }) => (
          <Form>
            <div className="flex flex-col gap-6 sm:gap-y-6 gap-y-14 sm:mt-7 mt-14">
              <FormikTextField
                name="name"
                label="Họ Và Tên:"
                orientation={isLargerThanSm ? "horizontal" : "vertical"}
                labelClassName="font-medium"
                required
                disabled
              />

              <FormikTextField
                name="email"
                label="Email:"
                orientation={isLargerThanSm ? "horizontal" : "vertical"}
                labelClassName="font-medium"
                required
                disabled
              />

              <FormikTextField
                name="phone"
                label="Điện Thoại:"
                orientation={isLargerThanSm ? "horizontal" : "vertical"}
                labelClassName="font-medium"
                required
              />

              <FormikTextField
                name="address"
                label="Địa chỉ:"
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
