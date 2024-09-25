import * as Yup from "yup";

const validationSchema = (t) => {
  return Yup.object().shape({
    userName: Yup.string()
      .required("Tên đăng nhập là bắt buộc")
      .min(4, "Tên đăng nhập phải có ít nhất 4 ký tự"),
    phoneNumber: Yup.string()
      .matches(/^[0-9]{10,15}$/, "Số điện thoại không hợp lệ")
      .required("Số điện thoại là bắt buộc"),
    address: Yup.string().required("Địa chỉ là bắt buộc"),
    email: Yup.string()
      .email("Email không hợp lệ")
      .required("Email là bắt buộc"),
    password: Yup.string()
      .required("Mật khẩu là bắt buộc")
      .min(6, "Mật khẩu phải có ít nhất 6 ký tự"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Mật khẩu xác nhận không khớp")
      .required("Xác nhận mật khẩu là bắt buộc"),
  });
};

export default validationSchema;
