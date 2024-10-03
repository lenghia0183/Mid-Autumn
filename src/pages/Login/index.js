import React from "react";
import { Formik, Form } from "formik";
import FormikTextField from "../../components/Formik/FormikTextField";
import { PATH } from "./../../constants/path";
import Button from "../../components/Button";
import Icon from "../../components/Icon";
import validationSchema from "./schema";
import { useTranslation } from "react-i18next";
import { TEXTFIELD_ALLOW } from "../../constants/common";
import { auth } from "../../firebaseConfig";
import {
  GoogleAuthProvider,
  signInWithPopup,
  FacebookAuthProvider,
} from "firebase/auth";

function Login() {
  const { t } = useTranslation();

  const initialValues = {
    userName: "",
    password: "",
  };

  const handleSubmit = (values) => {
    console.log("Submitted values:", values);
    // Xử lý gửi form ở đây
  };

  const handleGoogleLogin = async () => {
    console.log("handleGoogleLogin");
    const provider = new GoogleAuthProvider();

    try {
      const result = await signInWithPopup(auth, provider);
      const idToken = await result.user.getIdToken();
      // console.log("itdToken", idToken);

      // Xử lý logic lưu thông tin người dùng vào cơ sở dữ liệu của bạn tại đây (nếu cần)
    } catch (error) {}
  };

  const handleFacebookLogin = async () => {
    const provider = new FacebookAuthProvider();
    console.log("handleGoogleLogin");
    try {
      const result = await signInWithPopup(auth, provider);
      const idToken = await result.user.getIdToken();
      // console.log("itdToken", idToken);

      // Xử lý logic lưu thông tin người dùng vào cơ sở dữ liệu của bạn tại đây (nếu cần)
    } catch (error) {}
  };

  return (
    <>
      <h2 className="text-[40px] text-dark font-medium">ĐĂNG NHẬP</h2>

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema(t)}
        onSubmit={handleSubmit}
      >
        <Form>
          <FormikTextField
            name="userName"
            label="Tên đăng nhập"
            className="mt-10"
            allow={TEXTFIELD_ALLOW.ALPHANUMERIC_SPECIAL}
          />
          <FormikTextField
            name="password"
            label="Mật khẩu"
            type="password"
            className="mt-10"
            allow={TEXTFIELD_ALLOW.ALPHANUMERIC_SPECIAL}
            rightIconClassName="!text-gray-500"
          />

          <Button type="submit" className="mt-10 px-8 py-3 !text-xl">
            ĐĂNG NHẬP
          </Button>

          <Button
            to={PATH.FORGOT_PASSWORD}
            size="zeroPadding"
            className="text-lg font-semibold text-emerald hover:text-yellow mt-4"
          >
            - Bạn quên mật khẩu
          </Button>

          <div className="flex items-center text-lg mt-2">
            <p className="text-gray-500 mr-2">- Bạn chưa có tài khoản?</p>
            <Button
              to={PATH.SIGN_UP}
              size="zeroPadding"
              className="text-lg font-semibold text-emerald hover:text-yellow"
            >
              Đăng ký ngay
            </Button>
          </div>
        </Form>
      </Formik>

      <div className="flex w-full gap-2 mt-4">
        <Button
          type="button"
          className="flex-1 text-lg w-full"
          bgColor="facebook"
          startIcon={<Icon name="facebook" size={1} />}
          onClick={handleFacebookLogin}
        >
          Facebook
        </Button>

        <Button
          type="button"
          className="flex-1 text-lg w-full"
          bgColor="google"
          startIcon={<Icon name="google" size={1} />}
          onClick={handleGoogleLogin}
        >
          Google
        </Button>
      </div>
    </>
  );
}

export default Login;
