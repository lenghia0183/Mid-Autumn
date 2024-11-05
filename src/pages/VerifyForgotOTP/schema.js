import * as Yup from "yup";

const validationSchema = (t) => {
  return Yup.object().shape({
    otp: Yup.string()
      .required("Mã OTP là bắt buộc")
      .length(6, "Mã OTP phải có đúng 6 ký tự"),
  });
};

export default validationSchema;
