import * as Yup from "yup";

const validationSchema = (t) => {
  return Yup.object().shape({
    newPassword: Yup.string()
      .required("Mật khẩu là bắt buộc")
      .min(6, "Mật khẩu phải có ít nhất 6 ký tự"),

    confirmPassword: Yup.string()
      .oneOf([Yup.ref("newPassword"), null], "Mật khẩu xác nhận không khớp")
      .required("Xác nhận mật khẩu là bắt buộc"),
  });
};

export default validationSchema;
