import * as Yup from "yup";

const validationSchema = Yup.object({
  minPrice: Yup.number().positive("Giá tối thiểu phải là số dương").nullable(),
  maxPrice: Yup.number()
    .positive("Giá tối đa phải là số dương")
    .nullable()
    .test(
      "max-greater-than-min",
      "Giá tối đa phải lớn hơn giá tối thiểu",
      function (maxPrice) {
        const { minPrice } = this.parent;
        if (minPrice == null || maxPrice == null) return true;
        return maxPrice > minPrice;
      }
    ),
});

export default validationSchema;
