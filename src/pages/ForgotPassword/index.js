import React from "react";
import { Formik, Form } from "formik";
import FormikTextField from "../../components/Formik/FormikTextField";
import { PATH } from "./../../constants/path";
import Button from "../../components/Button";

import validationSchema from "./schema";
import { useTranslation } from "react-i18next";
import { TEXTFIELD_ALLOW } from "../../constants/common";

import { useForgotPassword } from "../../service/https";

import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Backdrop from "../../components/BackDrop";
import { setLocalStorageItem } from "../../utils";

function ForgotPassword() {
  const { t } = useTranslation();

  const navigate = useNavigate();

  const { trigger: handleForgotPassword, isMutating: isForgotPasswordLoading } =
    useForgotPassword();

  const initialValues = {
    email: "",
    password: "",
  };

  const handleSubmit = async (values) => {
    const convertValue = {
      email: values.email,
    };

    handleForgotPassword(convertValue, {
      onSuccess: (response) => {
        if (response?.code === 200) {
          toast.success(
            "Chúng tôi đã gửi mã OTP đến email của bạn vui lòng kiểm tra"
          );
          setLocalStorageItem("tokenForgot", response?.data?.tokenForgot);
          // navigate(PATH.HOME);
        } else {
          toast.error(response?.message);
        }
      },
      onError: () => {
        toast.error("Đăng nhập thất bại vui lòng thử lại");
      },
    });
  };

  return (
    <>
      <Backdrop open={isForgotPasswordLoading} />
      <h2 className="text-[40px] text-dark font-medium">QUÊN MẬT KHẨU</h2>

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema(t)}
        onSubmit={handleSubmit}
      >
        <Form>
          <FormikTextField
            name="email"
            label="Email"
            className="mt-10"
            allow={TEXTFIELD_ALLOW.ALPHANUMERIC_SPECIAL}
          />

          <p className="text-gray-500 mr-2 mt-6 w-[80%]">
            * Chúng tôi sẽ gửi mã xác thực (OTP) đến địa chỉ email mà bạn đã
            cung cấp. Vui lòng kiểm tra hộp thư để tiếp tục quá trình đặt lại
            mật khẩu.
          </p>

          <Button type="submit" className="mt-5 px-8 py-3 !text-xl">
            QUÊN MẬT KHẨU
          </Button>

          <Button
            to={PATH.LOGIN}
            size="zeroPadding"
            className="text-lg font-semibold text-emerald hover:text-yellow mt-4"
          >
            - Đăng nhập ngay
          </Button>

          <div className="flex items-center text-lg mt-4">
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
    </>
  );
}

export default ForgotPassword;
