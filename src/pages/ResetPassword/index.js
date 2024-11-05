import React from "react";
import { Formik, Form } from "formik";
import FormikTextField from "../../components/Formik/FormikTextField";
import { PATH } from "../../constants/path";
import Button from "../../components/Button";

import validationSchema from "./schema";
import { useTranslation } from "react-i18next";
import { TEXTFIELD_ALLOW } from "../../constants/common";

import { useResetPassword } from "../../service/https";

import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Backdrop from "../../components/BackDrop";
import { getLocalStorageItem } from "../../utils";

function ResetPassword() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const { trigger: handleResetPassword, isMutating: isResetPasswordLoading } =
    useResetPassword();

  const initialValues = {
    newPassword: "",
    confirmPassword: "",
  };

  const handleSubmit = async (values) => {
    const convertValue = {
      newPassword: values.newPassword,
      tokenVerifyOtp: getLocalStorageItem("tokenVerifyOtp"),
    };

    handleResetPassword(convertValue, {
      onSuccess: (response) => {
        if (response?.code === 200) {
          toast.success("Mật khẩu của bạn đã được đặt lại thành công");
          navigate(PATH.LOGIN, { replace: true });
        } else {
          toast.error(response?.message);
        }
      },
      onError: () => {
        toast.error("Đặt lại mật khẩu thất bại, vui lòng thử lại");
      },
    });
  };

  return (
    <>
      <Backdrop open={isResetPasswordLoading} />
      <h2 className="text-[40px] text-dark font-medium">Đặt lại mật khẩu</h2>

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema(t)}
        onSubmit={handleSubmit}
      >
        <Form>
          <FormikTextField
            name="newPassword"
            label="Mật khẩu mới"
            type="password"
            className="mt-10"
            allow={TEXTFIELD_ALLOW.ALPHANUMERIC_SPECIAL}
            inputProps={{ minLength: 6 }}
          />

          <FormikTextField
            name="confirmPassword"
            label="Xác nhận mật khẩu mới"
            type="password"
            className="mt-6"
            allow={TEXTFIELD_ALLOW.ALPHANUMERIC_SPECIAL}
            inputProps={{ minLength: 6 }}
          />

          <p className="text-gray-500 mr-2 mt-6 w-[80%]">
            * Hãy nhập mật khẩu mới và xác nhận lại để hoàn tất quá trình đặt
            lại mật khẩu của bạn.
          </p>

          <Button type="submit" className="mt-5 px-8 py-3 !text-xl">
            Đặt lại mật khẩu
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

export default ResetPassword;
