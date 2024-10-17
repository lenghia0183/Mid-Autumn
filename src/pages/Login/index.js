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
import { useLogin, useSocialLogin } from "../../service/https";
import { useUser } from "../../context/userContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Backdrop from "../../components/BackDrop";

function Login() {
  const { t } = useTranslation();
  const { login } = useUser();
  const navigate = useNavigate();

  const { trigger: handleLogin, isMutating: isLoginLoading } = useLogin();
  const { trigger: handleSocialLogin, isMutating: isSocialLoginLoading } =
    useSocialLogin();

  const initialValues = {
    userName: "",
    password: "",
  };

  const handleSubmit = async (values) => {
    const convertValue = {
      email: values.userName,
      password: values.password,
    };

    handleLogin(convertValue, {
      onSuccess: (response) => {
        if (response?.code === 200) {
          toast.success("Đăng nhập thành công");
          navigate(PATH.HOME);
          login(response?.data?.user);
        } else {
          toast.error(response?.message);
        }
      },
      onError: (error) => {
        toast.error("Đăng nhập thất bại vui lòng thử lại");
      },
    });
  };

  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();

    try {
      const result = await signInWithPopup(auth, provider);
      const idToken = await result.user.getIdToken();

      handleSocialLogin(idToken, {
        onSuccess: (response) => {
          if (response?.code === 200) {
            toast.success("Đăng nhập thành công");
            navigate(PATH.HOME);
            login(response?.data?.user);
          } else {
            toast.error(response?.message);
          }
        },
        onError: (error) => {
          console.log("error", error);
          toast.error("Đăng nhập thất bại vui lòng thử lại");
        },
      });
    } catch (error) {
      toast.error("Có lỗi xảy ra vui lòng thử lại");
      console.log("error", error);
    }
  };

  const handleFacebookLogin = async () => {
    const provider = new FacebookAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const idToken = await result.user.getIdToken();
      handleSocialLogin(idToken, {
        onSuccess: (response) => {
          console.log("Login successful!", response);
          if (response?.code === 200) {
            toast.success("Đăng nhập thành công");
            navigate(PATH.HOME);
            login(response?.data?.user);
          } else {
            toast.error(response?.message);
          }
        },
        onError: (error) => {
          console.log("error", error);
          toast.error("Đăng nhập thất bại vui lòng thử lại");
        },
      });
    } catch (error) {
      toast.error("Có lỗi xảy ra vui lòng thử lại");
      console.log("error", error);
    }
  };

  return (
    <>
      <Backdrop open={isLoginLoading || isSocialLoginLoading} />
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
