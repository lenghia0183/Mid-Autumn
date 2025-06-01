import * as Yup from "yup";

const validationSchema = (t) => {
  return Yup.object().shape({
    fullName: Yup.string()
      .required(t("validation.fullNameRequired"))
      .min(4, t("validation.fullNameMinLength")),
    email: Yup.string()
      .email(t("validation.invalidEmail"))
      .required(t("validation.emailRequired")),
    password: Yup.string()
      .required(t("validation.passwordRequired"))
      .min(6, t("validation.passwordMinLength")),
    confirmPassword: Yup.string()
      .oneOf(
        [Yup.ref("password"), null],
        t("validation.confirmPasswordNotMatch")
      )
      .required(t("validation.confirmPasswordRequired")),
  });
};

export default validationSchema;
