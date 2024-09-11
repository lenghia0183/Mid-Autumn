import React from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import FormikTextField from "../../components/Formik/FormikTextField";
import { PATH } from "../../constants/path";
import Button from "../../components/Button";
import Icon from "../../components/Icon";

const validationSchema = Yup.object().shape({
  userName: Yup.string()
    .required("Tên đăng nhập là bắt buộc")
    .min(4, "Tên đăng nhập phải có ít nhất 4 ký tự"),
  password: Yup.string()
    .required("Mật khẩu là bắt buộc")
    .min(6, "Mật khẩu phải có ít nhất 6 ký tự"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Mật khẩu xác nhận không khớp")
    .required("Xác nhận mật khẩu là bắt buộc"),
});

const initialValues = {
  userName: "",
  phoneNumber: "",
  address: "",
  email: "",
  password: "",
  confirmPassword: "",
};

function SignUp() {
  const handleSubmit = (values) => {
    console.log("Submitted values:", values);
    // Xử lý gửi form ở đây
  };

  return (
    <>
      <h2 className="text-[40px] text-dark font-medium">ĐĂNG KÝ</h2>

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ resetForm }) => (
          <Form>
            <FormikTextField
              name="userName"
              label="Họ và tên"
              className="mt-10"
            />

            <FormikTextField
              name="phoneNumber"
              label="Điện thoại"
              className="mt-10"
            />

            <FormikTextField name="address" label="Địa chỉ" className="mt-10" />

            <FormikTextField name="email" label="Email" className="mt-10" />

            <FormikTextField
              name="password"
              label="Mật khẩu"
              type="password"
              className="mt-10"
              rightIconClassName="text-gray-500"
            />

            <FormikTextField
              name="confirmPassword"
              label="Xác nhận mật khẩu"
              type="password"
              className="mt-10"
              rightIconClassName="text-gray-500"
            />

            <div className="flex items-center text-lg mt-5">
              <p className="text-gray-500 mr-2">- Bạn đã có tài khoản?</p>
              <Button
                to={PATH.LOGIN}
                size="zeroPadding"
                className="text-lg font-semibold text-emerald hover:text-yellow"
              >
                Đăng nhập
              </Button>
            </div>

            <div className="flex gap-3">
              <Button type="submit" className="mt-4 px-8 py-3 !text-xl">
                ĐĂNG KÝ
              </Button>

              <Button
                type="button"
                onClick={() => resetForm()}
                className="mt-4 px-8 py-3 !text-xl"
              >
                LÀM LẠI
              </Button>
            </div>

            <div className="flex w-full gap-2 mt-4">
              <Button
                className="flex-1 text-lg w-full"
                bgColor="facebook"
                startIcon={<Icon name="facebook" size={1} />}
              >
                Facebook
              </Button>

              <Button
                className="flex-1 text-lg w-full"
                bgColor="google"
                startIcon={<Icon name="google" size={1} />}
              >
                Google
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </>
  );
}

export default SignUp;
