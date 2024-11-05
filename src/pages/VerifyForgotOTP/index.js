import React from "react";
import { Formik, Form } from "formik";
import FormikTextField from "../../components/Formik/FormikTextField";
import { PATH } from "../../constants/path";
import Button from "../../components/Button";

import validationSchema from "./schema";
import { useTranslation } from "react-i18next";
import { TEXTFIELD_ALLOW } from "../../constants/common";

import { useVerifyForgotOTP } from "../../service/https";

import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Backdrop from "../../components/BackDrop";
import { getLocalStorageItem, setLocalStorageItem } from "../../utils";

function VerifyForgotOTP() {
  const { t } = useTranslation();

  const navigate = useNavigate();

  const { trigger: handleVerifyForgotOTP, isMutating: isVerifyForgotLoading } =
    useVerifyForgotOTP();

  const initialValues = {
    otp: "",
  };

  const handleSubmit = async (values, { resetForm }) => {
    const convertValue = {
      otp: values.otp,
      tokenForgot: getLocalStorageItem("tokenForgot"),
    };

    handleVerifyForgotOTP(convertValue, {
      onSuccess: (response) => {
        if (response?.code === 200) {
          toast.success(
            "Mã OTP của bạn đã được xác thực thành công, vui lòng tiếp tục đặt lại mật khẩu"
          );
          setLocalStorageItem("tokenVerifyOtp", response?.data?.tokenVerifyOtp);
          navigate(PATH.RESET_PASSWORD, { replace: true });
        } else {
          resetForm();
          toast.error(response?.message);
        }
      },
      onError: () => {
        toast.error("Xác thực OTP thất bại, vui lòng thử lại");
      },
    });
  };

  return (
    <>
      <Backdrop open={isVerifyForgotLoading} />
      <h2 className="text-[40px] text-dark font-medium">Xác thực mã OTP</h2>

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema(t)}
        onSubmit={handleSubmit}
      >
        <Form>
          <FormikTextField
            name="otp"
            label="Nhập mã OTP"
            className="mt-10"
            allow={TEXTFIELD_ALLOW.NUMERIC}
            inputProps={{ maxLength: 6 }}
          />

          <p className="text-gray-500 mr-2 mt-6 w-[80%]">
            * Vui lòng nhập mã OTP gồm 6 chữ số mà chúng tôi đã gửi đến địa chỉ
            email của bạn để hoàn tất quá trình xác thực.
          </p>

          <Button type="submit" className="mt-5 px-8 py-3 !text-xl">
            Xác thực mã OTP
          </Button>

          <Button
            to={PATH.LOGIN}
            size="zeroPadding"
            className="text-lg font-semibold text-emerald hover:text-yellow mt-4"
          >
            - Quay lại trang đăng nhập
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

export default VerifyForgotOTP;
