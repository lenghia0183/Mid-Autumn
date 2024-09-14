import { Form, Formik } from "formik";
import FormikTextField from "./../../components/Formik/FormikTextField";
import * as Yup from "yup";
import Button from "../../components/Button";

function ChangePassword() {
  const validationSchema = Yup.object({
    currentPassword: Yup.string().required("Mật khẩu hiện tại là bắt buộc"),
    newPassword: Yup.string()
      .min(6, "Mật khẩu mới phải có ít nhất 6 ký tự")
      .required("Mật khẩu mới là bắt buộc"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("newPassword"), null], "Mật khẩu xác nhận không khớp")
      .required("Xác nhận mật khẩu là bắt buộc"),
  });

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
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ resetForm }) => (
          <Form>
            <div className="flex flex-col gap-6 mt-7">
              <FormikTextField
                name="currentPassword"
                label="Mật khẩu hiện tại:"
                type="password"
                orientation="horizontal"
                labelWidth="200px"
                labelClassName="font-medium"
                rightIconClassName="text-gray-500"
                required
              />

              <FormikTextField
                name="newPassword"
                label="Mật khẩu mới:"
                type="password"
                orientation="horizontal"
                labelWidth="200px"
                labelClassName="font-medium"
                rightIconClassName="text-gray-500"
                required
              />

              <FormikTextField
                name="confirmPassword"
                label="Xác nhận mật khẩu mới:"
                type="password"
                orientation="horizontal"
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
