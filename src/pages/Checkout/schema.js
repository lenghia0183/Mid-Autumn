import { isEmpty, isObject } from "lodash";
import * as Yup from "yup";

const validationSchema = (t) =>
  Yup.object().shape({
    buyerName: Yup.string().required("Họ và tên là bắt buộc"),

    buyerEmail: Yup.string()
      .email("Email không hợp lệ")
      .required("Email là bắt buộc"),

    buyerPhone: Yup.string()
      .matches(/^[0-9]{10,15}$/, "Số điện thoại không hợp lệ")
      .required("Điện thoại là bắt buộc"),

    recipientName: Yup.string().required("Họ và tên người nhận là bắt buộc"),

    recipientPhone: Yup.string()
      .matches(/^[0-9]{10,15}$/, "Số điện thoại người nhận không hợp lệ")
      .required("Điện thoại người nhận là bắt buộc"),

    province: Yup.object()
      .nullable()
      .required("Tỉnh/Thành phố là bắt buộc")
      .test("provinceRequired", "Tỉnh/Thành phố là bắt buộc", (value) => {
        return isObject(value) && !isEmpty(value);
      }),

    district: Yup.object()
      .nullable()
      .required("Quận/Huyện là bắt buộc")
      .test("districtRequired", "Quận/Huyện là bắt buộc", (value) => {
        return isObject(value) && !isEmpty(value);
      }),

    ward: Yup.object()
      .nullable()
      .required("Phường/Xã là bắt buộc")
      .test("wardRequired", "Phường/Xã là bắt buộc", (value) => {
        return isObject(value) && !isEmpty(value);
      }),

    street: Yup.string().required("Địa chỉ là bắt buộc"),

    method: Yup.string()
      .oneOf(["ghtk", "ghn"], "Phương thức giao hàng không hợp lệ")
      .required("Phương thức giao hàng là bắt buộc"),

    note: Yup.string(),
  });

export default validationSchema;
