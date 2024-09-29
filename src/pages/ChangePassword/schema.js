import * as Yup from "yup";

const validationSchema = (t) => {
  return Yup.object({
    currentPassword: Yup.string().required("Mật khẩu hiện tại là bắt buộc"),
    newPassword: Yup.string()
      .min(6, "Mật khẩu mới phải có ít nhất 6 ký tự")
      .required("Mật khẩu mới là bắt buộc"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("newPassword"), null], "Mật khẩu xác nhận không khớp")
      .required("Xác nhận mật khẩu là bắt buộc"),
  });
};

export default validationSchema;
