import * as Yup from "yup";

const validationSchema = (t) => {
  return Yup.object({
    name: Yup.string().required("Họ Tên là bắt buộc"),
    email: Yup.string()
      .email("Email không hợp lệ")
      .required("Email là bắt buộc"),
    phone: Yup.string().required("Điện Thoại là bắt buộc"),
    // address: Yup.string().required("Địa chỉ là bắt buộc"),
  });
};

export default validationSchema;
