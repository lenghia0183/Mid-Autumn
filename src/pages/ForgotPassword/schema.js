import * as Yup from "yup";

const validationSchema = (t) => {
  return Yup.object().shape({
    email: Yup.string()
      .email("Email không hợp lệ")
      .required("Email là bắt buộc"),
  });
};

export default validationSchema;
