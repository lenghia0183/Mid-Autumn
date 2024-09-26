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
        {({ resetForm }) => (
          <Form>
            <div className="flex flex-col gap-6 mt-7">
              <FormikTextField
                name="name"
                label="Họ Và Tên:"
                orientation="horizontal"
                labelClassName="font-medium"
                required
                disabled
              />

              <FormikTextField
                name="email"
                label="Email:"
                orientation="horizontal"
                labelClassName="font-medium"
                required
                disabled
              />

              <FormikTextField
                name="phone"
                label="Điện Thoại:"
                orientation="horizontal"
                labelClassName="font-medium"
                required
              />

              <FormikTextField
                name="address"
                label="Địa chỉ:"
                orientation="horizontal"
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
