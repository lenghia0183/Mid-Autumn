import { Form, Formik } from "formik";
import FormikTextField from "./../../components/Formik/FormikTextField";
import * as Yup from "yup";
import Button from "../../components/Button";
import useBreakpoint from "../../hooks/useBreakpoint";
import validationSchema from "./schema";
import { useTranslation } from "react-i18next";

function ChangePassword() {
  const isLargerThanSm = useBreakpoint("sm");
  const { t } = useTranslation();

  // Initial values with empty fields
  const initialValues = {
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  };

  const handleSubmit = (values) => {
    // Handle form submission
    console.log("Form values:", values);
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-semibold text-dark shadow-md p-4">
        Đổi Mật Khẩu
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
                name="currentPassword"
                label="Mật khẩu hiện tại:"
                type="password"
                orientation={isLargerThanSm ? "horizontal" : "vertical"}
                labelWidth="200px"
                labelClassName="font-medium"
                rightIconClassName="text-gray-500"
                required
              />

              <FormikTextField
                name="newPassword"
                label="Mật khẩu mới:"
                type="password"
                orientation={isLargerThanSm ? "horizontal" : "vertical"}
                labelWidth="200px"
                labelClassName="font-medium"
                rightIconClassName="text-gray-500"
                required
              />

              <FormikTextField
                name="confirmPassword"
                label="Xác nhận mật khẩu mới:"
                type="password"
                orientation={isLargerThanSm ? "horizontal" : "vertical"}
                labelWidth="200px"
                labelClassName="font-medium"
                rightIconClassName="text-gray-500"
                required
              />
            </div>
            <div className="flex mt-10">
              <div className="flex gap-4 ml-auto">
                <Button
                  type="button"
                  onClick={() => resetForm()} // Reset form on button click
                >
                  Hủy
                </Button>

                <Button type="submit" className="">
                  Lưu Thay Đổi
                </Button>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default ChangePassword;
