import React from "react";
import { Formik, Form } from "formik";
import FormikTextField from "../../components/Formik/FormikTextField";
import { PATH } from "../../constants/path";
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

function Login() {
  const { t } = useTranslation();
  const { login } = useUser();
  const navigate = useNavigate();

  const { trigger: handleLogin, isMutating: isLoginLoading } = useLogin();
  const { trigger: handleSocialLogin, isMutating: isSocialLoginLoading } =
    useSocialLogin();

  const initialValues = {
    email: "",
    password: "",
  };

  const handleSubmit = async (values) => {
    const convertValue = {
      email: values.email,
      password: values.password,
    };

    handleLogin(convertValue, {
      onSuccess: (response) => {
        if (response?.code === 200) {
          login(response?.data, navigate);
        } else {
          toast.error(response?.message);
        }
      },
      onError: () => {
        toast.error(t("login.failed"));
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
            login(response?.data, navigate);
          } else {
            toast.error(response?.message);
          }
        },
        onError: (err) => {
          console.error(err);
          toast.error(t("login.toast.failed"));
        },
      });
    } catch (error) {
      console.error(error);
      toast.error(t("login.toast.error"));
    }
  };

  const handleFacebookLogin = async () => {
    const provider = new FacebookAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const idToken = await result.user.getIdToken();
      handleSocialLogin(idToken, {
        onSuccess: (response) => {
          if (response?.code === 200) {
            login(response?.data, navigate);
          } else {
            toast.error(response?.message);
          }
        },
        onError: (err) => {
          console.error(err);
          toast.error(t("login.toast.failed"));
        },
      });
    } catch (error) {
      toast.error(t("login.toast.error"));
    }
  };

  return (
    <>
      <h2 className="text-[40px] text-dark font-medium">{t("login.title")}</h2>

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema(t)}
        onSubmit={handleSubmit}
      >
        <Form>
          <FormikTextField
            name="email"
            label={t("login.email")}
            className="mt-10"
            allow={TEXTFIELD_ALLOW.ALPHANUMERIC_SPECIAL}
          />
          <FormikTextField
            name="password"
            label={t("login.password")}
            type="password"
            className="mt-10"
            allow={TEXTFIELD_ALLOW.ALPHANUMERIC_SPECIAL}
            rightIconClassName="!text-gray-500"
          />

          <Button type="submit" className="mt-10 px-8 py-3 !text-xl">
            {t("login.title")}
          </Button>

          <Button
            to={PATH.FORGOT_PASSWORD}
            size="zeroPadding"
            className="text-lg font-semibold text-emerald hover:text-yellow mt-4"
          >
            - {t("login.forgotPassword")}
          </Button>

          <div className="flex items-center text-lg mt-2">
            <p className="text-gray-500 mr-2">- {t("login.noAccount")}</p>
            <Button
              to={PATH.SIGN_UP}
              size="zeroPadding"
              className="text-lg font-semibold text-emerald hover:text-yellow"
            >
              {t("login.register")}
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
