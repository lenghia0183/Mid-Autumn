import * as Yup from "yup";

const validationSchema = (t) => {
  return Yup.object().shape({
    userName: Yup.string()
      .required("Tên đăng nhập là bắt buộc")
      .min(4, "Tên đăng nhập phải có ít nhất 4 ký tự"),
    password: Yup.string()
      .required("Mật khẩu là bắt buộc")
      .min(6, "Mật khẩu phải có ít nhất 6 ký tự"),
  });
};

export default validationSchema;
