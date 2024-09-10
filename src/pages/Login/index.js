import React from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import images from "../../asset/images";
import Breadcrumb from "../../components/Breadcrumb";
import FormikTextField from "../../components/Formik/FormikTextField";
import { PATH } from "./../../constants/path";
import Button from "../../components/Button";
import Icon from "../../components/Icon";
import Comment from "../Home/Comment";
import Email from "../Home/Email";
import styles from "./Login.module.scss";
import clsx from "clsx";

const validationSchema = Yup.object().shape({
  userName: Yup.string()
    .required("Tên đăng nhập là bắt buộc")
    .min(4, "Tên đăng nhập phải có ít nhất 4 ký tự"),
  password: Yup.string()
    .required("Mật khẩu là bắt buộc")
    .min(6, "Mật khẩu phải có ít nhất 6 ký tự"),
});

const initialValues = {
  userName: "",
  password: "",
};

function Login() {
  const breadcrumbLogin = [
    { label: "Trang chủ", href: PATH.HOME },
    { label: "Đăng nhập", href: PATH.Login },
  ];

  const handleSubmit = (values) => {
    console.log("Submitted values:", values);
    // Xử lý gửi form ở đây
  };

  return (
    <>
      <Breadcrumb items={breadcrumbLogin} />

      <div className="container flex items-center mt-14 space-x-7">
        <div
          className={clsx("flex-1 aspect-[5/4]", styles["flip-box-container"])}
        >
          <div className={styles["flip-box-inner"]}>
            <div
              className={clsx("relative", styles["flip-box-front"])}
              style={{
                backgroundImage: `url(${images.homeReason})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            ></div>
            <div
              className={styles["flip-box-back"]}
              style={{
                backgroundImage: `url(${images.home1})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            ></div>
          </div>
        </div>

        <div className="flex-1">
          <h2 className="text-[40px] text-dark font-medium">ĐĂNG NHẬP</h2>

          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            <Form>
              <FormikTextField
                name="userName"
                label="Tên đăng nhập"
                className="mt-10"
              />
              <FormikTextField
                name="password"
                label="Mật khẩu"
                type="password"
                className="mt-10"
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
          </Formik>
        </div>
      </div>

      {/* <Email /> */}
      <Comment />
    </>
  );
}

export default Login;
