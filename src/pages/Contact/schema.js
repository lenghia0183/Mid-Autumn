import * as Yup from "yup";

const schema = (t) => {
  return Yup.object({
    fullname: Yup.string().required(t("validation.required")),
    email: Yup.string()
      .email(t("validation.invalidEmail"))
      .required("Email là bắt buộc"),
    phone: Yup.string()
      .matches(/^[0-9]+$/, t("validation.invalidPhoneNumber"))
      .required("Số điện thoại là bắt buộc"),
    content: Yup.string().required(t("validation.required")),
  });
};

export default schema;
