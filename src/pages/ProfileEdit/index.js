import { Form, Formik } from "formik";
import FormikTextField from "./../../components/Formik/FormikTextField";
import * as Yup from "yup";
import Button from "../../components/Button";

function ProfileEdit() {
  const validationSchema = Yup.object({
    name: Yup.string().required("Họ Tên là bắt buộc"),
    email: Yup.string()
      .email("Email không hợp lệ")
      .required("Email là bắt buộc"),
    phone: Yup.string().required("Điện Thoại là bắt buộc"),
    address: Yup.string().required("Địa chỉ là bắt buộc"),
  });

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
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {() => (
          <Form>
            <div className="flex flex-col gap-5 mt-7">
              <FormikTextField
                name="name"
                label="Họ Và Tên:"
                orientation="horizontal"
                labelClassName="font-medium"
                disabled
              />

              <FormikTextField
                name="email"
                label="Email:"
                orientation="horizontal"
                labelClassName="font-medium"
                disabled
              />

              <FormikTextField
                name="phone"
                label="Điện Thoại:"
                orientation="horizontal"
                labelClassName="font-medium"
              />

              <FormikTextField
                name="address"
                label="Địa chỉ:"
                orientation="horizontal"
                labelClassName="font-medium"
              />
            </div>
            <div className="flex">
              <Button type="submit" className="ml-auto mt-10">
                Lưu Thông Tin
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default ProfileEdit;
