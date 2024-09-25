import { Form, Formik } from "formik";
import * as Yup from "yup";
import Breadcrumb from "../../components/Breadcrumb";
import Divider from "../../components/Devider";
import Icon from "../../components/Icon";
import { PAGE_TITLE, PATH } from "../../constants/path";
import FormikTextField from "./../../components/Formik/FormikTextField";
import FormikAutocomplete from "./../../components/Formik/FormikAutoComplete";
import FormikTextArea from "./../../components/Formik/FormikTextArea";
import Button from "./../../components/Button/index";
import IconButton from "./../../components/IconButton/index";
import Image from "../../components/Image";
import images from "../../asset/images";
import formatCurrency from "./../../utils/formatCurrency";
import LabelValue from "./../../components/LabelValue/index";
import FormikRadio from "./../../components/Formik/FormikRadio";
import FormikRadioGroup from "../../components/Formik/FormikRadioGroup";
import {
  getDistrictData,
  getDistrictDataTest,
  getProvinceData,
  getProvinceDataTest,
  getShipPrice,
  getShipPriceTest,
  getWardData,
  getWardDataTest,
} from "../../service/GHNApi";
import { useEffect, useRef, useState } from "react";

function Checkout() {
  const formRef = useRef();
  const [values, setValues] = useState({});

  const breadcrumbCheckout = [
    {
      to: PATH.HOME,
      label: PAGE_TITLE.HOME,
    },
    {
      to: PATH.CHECKOUT,
      label: PAGE_TITLE.CHECKOUT,
    },
  ];

  const items = [
    {
      image: images.popularDish1,
      name: "Bánh trung thu trang vàng hoàng kim",
      quantity: 1,
      price: 4800000,
    },
    {
      image: images.popularDish2,
      name: "Bánh trung thu 2 trứng đặc biệt",
      quantity: 2,
      price: 1650000,
    },
    {
      image: images.popularDish3,
      name: "Bánh trung thu đặc biệt",
      quantity: 2,
      price: 1650000,
    },
    {
      image: images.popularDish4,
      name: "Bánh trung thu siêu ngon",
      quantity: 2,
      price: 1650000,
    },
    {
      image: images.popularDish1,
      name: "Bánh trung thu trang vàng hoàng kim",
      quantity: 1,
      price: 4800000,
    },
    {
      image: images.popularDish2,
      name: "Bánh trung thu 2 trứng đặc biệt",
      quantity: 2,
      price: 1650000,
    },
    {
      image: images.popularDish3,
      name: "Bánh trung thu đặc biệt",
      quantity: 2,
      price: 1650000,
    },
    {
      image: images.popularDish4,
      name: "Bánh trung thu siêu ngon",
      quantity: 2,
      price: 1650000,
    },
  ];

  const initialValues = {
    buyerName: "",
    buyerEmail: "",
    buyerPhone: "",
    recipientName: "",
    recipientPhone: "",
    province: null,
    district: null,
    ward: null,
    street: "",
    shipPrice: null,
    itemTotalPrice: items.reduce((accumulator, item) => {
      return accumulator + item.quantity * item.price;
    }, 0),
    total: 0,
    method: "ghtk",
    note: "",
  };

  const validationSchema = Yup.object({
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
    province: Yup.string().required("Tỉnh/Thành phố là bắt buộc"),
    district: Yup.string().required("Quận/Huyện là bắt buộc"),
    ward: Yup.string().required("Phường/Xã là bắt buộc"),
    street: Yup.string().required("Địa chỉ là bắt buộc"),
    method: Yup.string()
      .oneOf(["ghtk", "ghn"], "Phương thức giao hàng không hợp lệ")
      .required("Phương thức giao hàng là bắt buộc"),
    note: Yup.string(),
  });

  useEffect(() => {
    const {
      province = "",
      district = "",
      ward = "",
    } = formRef?.current?.values;

    const { setFieldValue } = formRef?.current;

    if (province && district && ward) {
      const fetchServicePrice = async () => {
        try {
          const servicePrice = await getShipPriceTest({
            service_type_id: 2,
            to_district_id: district?.DistrictID,
            to_ward_code: ward?.WardCode,
            insurance_value: items?.reduce((total, item) => {
              return total + item.quantity * item.price;
            }, 0),
            weight: items?.reduce((total, item) => {
              return total + item.quantity * 700;
            }, 0),
            items: items?.map((i) => {
              return {
                name: i?.name,
                quantity: i?.quantity,
                height: 30,
                weight: 700,
                width: 30,
                length: 30,
              };
            }),
          });

          if (servicePrice && servicePrice.data) {
            setFieldValue("shipPrice", servicePrice.data.total);
          }
        } catch (error) {}
      };

      fetchServicePrice();
    }
  }, [formRef?.current?.values]);

  return (
    <main className="bg-white">
      <Breadcrumb items={breadcrumbCheckout} />
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        innerRef={(f) => {
          formRef.current = f;
          return setValues(f?.values);
        }}
        onSubmit={(values) => {
          // Handle form submission
          console.log("Submitted values", values);
        }}
      >
        {({ resetForm, values, setFieldValue }) => (
          <Form>
            <div className="container my-14 bg-white-100">
              <h2 className="text-dark text-[35px] font-semibold text-center p-5">
                THANH TOÁN
              </h2>
              <Divider marginBottom="20px" color="dark-300" />

              <div className="grid grid-cols-12 gap-1">
                {/* left column */}
                <div className="col-span-7 p-5">
                  <p className="flex items-center gap-2 text-xl font-semibold text-dark">
                    <Icon name="locationEmpty" size="1.3em" color="dark" />
                    <p>THÔNG TIN KHÁCH HÀNG</p>
                  </p>

                  <div className="shadow-lg p-4">
                    <p className=" text-xl font-medium text-dark">
                      NGƯỜI MUA HÀNG
                    </p>

                    {/* Thông tin người mua hàng */}
                    <div className="grid grid-cols-12 gap-7 gap-y-11 mt-10 ">
                      <FormikTextField
                        className="col-span-6"
                        name="buyerName"
                        label="Họ Và Tên"
                        required
                      />

                      <FormikTextField
                        className="col-span-6"
                        name="buyerEmail"
                        label="Email"
                        required
                      />

                      <FormikTextField
                        className="col-span-6"
                        name="buyerPhone"
                        label="Điện Thoại"
                        required
                      />
                    </div>

                    <div>
                      <p className="text-dark text-xl font-medium mt-14">
                        NGƯỜI NHẬN HÀNG
                      </p>
                      {/* Thông tin người nhận hàng */}
                      <div className="grid grid-cols-12 gap-7 gap-y-11 mt-10 ">
                        <FormikTextField
                          className="col-span-6"
                          name="recipientName"
                          label="Họ Và Tên"
                          required
                        />

                        <FormikTextField
                          className="col-span-6"
                          name="recipientPhone"
                          label="Điện Thoại"
                          required
                        />

                        <Button
                          type="button"
                          variant="text"
                          textColor="dark"
                          textHoverColor="yellow"
                          bgHoverColor="transparent"
                          className="-mt-4 col-span-12"
                          size="zeroPadding"
                          startIcon={<Icon name="copy" size="1em" />}
                        >
                          Sử dụng thông tin người mua hàng
                        </Button>
                      </div>
                    </div>

                    {/* Địa chỉ và phương thức giao hàng*/}
                    <div className="grid grid-cols-12 gap-7 gap-y-11 mt-2">
                      {/* Địa chi  */}
                      <div className="col-span-6 flex flex-col gap-y-12">
                        <p className="text-dark text-xl font-medium mt-14">
                          ĐỊA CHỈ NHẬN HÀNG
                        </p>
                        <FormikAutocomplete
                          name="province"
                          label="Tỉnh/Thành phô"
                          asyncRequest={getProvinceDataTest}
                          asyncRequestHelper={(res) => {
                            return res?.data;
                          }}
                          getOptionsLabel={(opt) => opt?.ProvinceName}
                          isEqualValue={(opt, val) =>
                            opt?.ProvinceID === val?.ProvinceID
                          }
                          onChange={() => {
                            setFieldValue("district", null);
                            setFieldValue("ward", null);
                            setFieldValue("shipPrice", null);
                          }}
                          autoFetch={false}
                          required
                        />

                        <FormikAutocomplete
                          name="district"
                          label="Quận/Huyện"
                          asyncRequest={() => {
                            return getDistrictDataTest(
                              values?.province?.ProvinceID
                            );
                          }}
                          asyncRequestHelper={(res) => {
                            return res?.data;
                          }}
                          getOptionsLabel={(opt) => {
                            return opt?.DistrictName;
                          }}
                          isEqualValue={(opt, val) =>
                            opt?.DistrictID === val?.DistrictID
                          }
                          onChange={() => {
                            setFieldValue("ward", null);
                            setFieldValue("shipPrice", null);
                          }}
                          disabled={!values?.province}
                          autoFetch={false}
                          required
                        />

                        <FormikAutocomplete
                          name="ward"
                          label="Phường/Xã"
                          asyncRequest={() => {
                            return getWardDataTest(
                              values?.district?.DistrictID
                            );
                          }}
                          asyncRequestHelper={(res) => {
                            return res?.data;
                          }}
                          getOptionsLabel={(opt) => {
                            return opt?.WardName;
                          }}
                          isEqualValue={(opt, val) =>
                            opt?.WardCode === val?.WardCode
                          }
                          onChange={() => {
                            setFieldValue("shipPrice", null);
                          }}
                          autoFetch={false}
                          disabled={!values?.district}
                          required
                        />
                      </div>

                      {/* Đơn vị giao hàng */}
                      <div className="col-span-6 flex flex-col gap-y-12">
                        <p className="text-dark text-xl font-medium mt-14">
                          HÌNH THỨC GIAO HÀNG
                        </p>

                        <FormikRadioGroup
                          name="method"
                          className="flex flex-col"
                        >
                          <FormikRadio
                            value="ghtk"
                            hideInput={true}
                            label={
                              <div className="flex items-center border border-gray-400 border-dashed p-4 text-base">
                                <div>
                                  <Image
                                    src={images.logoGHTK}
                                    height="40px"
                                    width="fit-content"
                                    objectFit="contain"
                                  />
                                  <p>
                                    Giao hàng tận nơi có phí -{" "}
                                    <span className="font-semibold">
                                      {formatCurrency(35000)}
                                    </span>
                                  </p>
                                  <p className="text-crimson font-medium">
                                    Miễn phí vận chuyển cho đơn từ 500.000đ
                                  </p>
                                </div>
                                <FormikRadio
                                  checked={values.method === "ghtk"}
                                  width="fit-content"
                                />
                              </div>
                            }
                          />

                          <FormikRadio
                            value="ghn"
                            hideInput={true}
                            label={
                              <div className="flex items-center border border-gray-400 border-dashed p-4 text-base mt-4">
                                <div>
                                  <Image
                                    src={images.logoGHN}
                                    height="40px"
                                    width="fit-content"
                                    objectFit="contain"
                                  />
                                  <p>
                                    Giao hàng tận nơi có phí -{" "}
                                    <span className="font-semibold">
                                      {formatCurrency(values?.shipPrice)}
                                    </span>
                                  </p>
                                  <p className="text-crimson font-medium">
                                    Miễn phí vận chuyển cho đơn từ 500.000đ
                                  </p>
                                </div>
                                <FormikRadio
                                  checked={values?.method === "ghn"}
                                  width="fit-content"
                                />
                              </div>
                            }
                          />
                        </FormikRadioGroup>
                      </div>

                      <FormikTextArea
                        className="col-span-12"
                        name="street"
                        label="Địa chỉ"
                        required
                      />
                    </div>
                  </div>

                  <p className="flex items-center gap-2 text-xl font-semibold text-dark mt-10">
                    <Icon name="paymentMethod" size="1.5em" color="dark" />
                    <p>HÌNH THỨC THANH TOÁN</p>
                  </p>

                  <div className="grid grid-cols-12 gap-5 items-start mt-6 shadow-lg px-4 pb-10 rounded-sm">
                    <FormikRadio
                      className="col-span-6"
                      value="cod"
                      name="paymentMethod"
                      labelClassName="w-full"
                      label={
                        <div className="w-full flex items-center gap-2 bg-emerald-500 pr-3 text-lg font-semibold text-white rounded-sm ">
                          <Image src={images.codMethod} width="60px" />
                          <p>Thanh toán khi nhận hàng</p>
                        </div>
                      }
                    />

                    <div className="col-span-6">
                      <div className="w-full flex items-center gap-2 bg-blue-400 pr-3 text-lg font-semibold text-white  rounded-sm ">
                        <Image src={images.bankingMethod} width="60px" />
                        <p>Thanh toán trực tuyến</p>
                      </div>

                      <div className="flex flex-col bg-gray-100 px-4 mt-5">
                        <FormikRadio
                          name="paymentMethod"
                          value="momo"
                          labelClassName="w-full"
                          label={
                            <div>
                              <div className="flex items-center justify-between py-4 text-base text-dark ">
                                <Image
                                  src={images.logoMomo}
                                  width="auto"
                                  height="30px"
                                />
                                <p className="">Thanh toán qua ví MoMo</p>
                              </div>
                              <Divider />
                            </div>
                          }
                        />

                        <FormikRadio
                          name="paymentMethod"
                          value="logoVnpay"
                          labelClassName="w-full"
                          label={
                            <div>
                              <div className="flex items-center justify-between py-4 text-base text-dark ">
                                <Image
                                  src={images.logoVnpay}
                                  width="auto"
                                  height="30px"
                                />

                                <p className="">Thanh toán qua VNPAY</p>
                              </div>
                              <Divider />
                            </div>
                          }
                        />

                        <FormikRadio
                          name="paymentMethod"
                          value="logoZaloPay"
                          labelClassName="w-full"
                          label={
                            <div className="flex items-center justify-between py-4 text-base text-dark ">
                              <Image
                                src={images.logoZaloPay}
                                width="auto"
                                height="30px"
                              />
                              <p className="">Thanh toán qua ZaloPay</p>
                            </div>
                          }
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* right column */}
                <div className="col-span-5 shadow-md p-5 h-fit">
                  {/* title */}
                  <div className="flex justify-between">
                    <p className="flex items-center gap-2 text-xl font-semibold text-dark">
                      <Icon name="cart" size="1.3em" color="dark" />
                      <p>THÔNG TIN KHÁCH HÀNG</p>
                    </p>

                    <IconButton
                      iconName="edit"
                      textColor="dark"
                      textHoverColor="yellow"
                      to={PATH.CART}
                    />
                  </div>

                  {/* items */}
                  <div className="mt-4 max-h-[500px] overflow-auto p-2 border border-gray-300 rounded-sm">
                    {items?.map((item) => {
                      return (
                        <div>
                          <div className="flex justify-between items-start py-3">
                            <Image
                              src={item?.image}
                              width="70px"
                              height="70px"
                            />
                            <p className="w-1/2 text-lg font-medium text-left text-dark">
                              {item?.name}
                            </p>
                            <p className="text-lg text-crimson">
                              {item?.quantity} x
                            </p>
                            <p className="text-lg text-crimson">
                              {formatCurrency(item?.price)}
                            </p>
                          </div>
                          <Divider color="dark-200" borderStyle="dashed" />
                        </div>
                      );
                    })}
                  </div>

                  {/* money info */}
                  <div className="bg-gray-100 px-4 py-6 mt-10">
                    <div>
                      <LabelValue
                        label={"Tổng tiền hàng"}
                        value={formatCurrency(values?.itemTotalPrice)}
                        className="justify-between"
                        labelClassName="text-xl !font-normal text-gray-500"
                        valueClassName="text-2xl !font-normal text-crimson"
                      />
                      <Divider
                        marginTop="10px"
                        marginBottom="10px"
                        color="dark-200"
                      />
                    </div>

                    <div>
                      <LabelValue
                        label={"Phí vận chuyển"}
                        value={formatCurrency(values?.shipPrice)}
                        className="justify-between"
                        labelClassName="text-xl !font-normal text-gray-500"
                        valueClassName="text-2xl !font-normal text-crimson"
                      />
                      <Divider
                        marginTop="10px"
                        marginBottom="10px"
                        color="dark-200"
                      />
                    </div>

                    <div>
                      <LabelValue
                        label={"Tạm Tính"}
                        value={formatCurrency(
                          values?.shipPrice + values?.itemTotalPrice
                        )}
                        className="justify-between"
                        labelClassName="text-xl !font-normal text-gray-500"
                        valueClassName="text-2xl !font-normal text-crimson"
                      />
                      <Divider
                        marginTop="10px"
                        marginBottom="10px"
                        color="dark-200"
                      />
                    </div>

                    <div>
                      <LabelValue
                        label={"Thành tiền"}
                        value={formatCurrency(
                          values?.shipPrice + values?.itemTotalPrice
                        )}
                        className="justify-between"
                        labelClassName="text-xl"
                        valueClassName="text-2xl !font-semibold text-crimson"
                      />
                    </div>
                  </div>

                  <FormikTextArea
                    name="note"
                    label="Ghi chú"
                    className="mt-10"
                  />

                  <Button
                    type="submit"
                    full
                    size="large"
                    className="text-xl mt-5 "
                  >
                    Thanh Toán
                  </Button>

                  <Button
                    type="button"
                    full
                    size="large"
                    className="text-xl mt-3"
                    bgColor="gray-400"
                    onClick={() => {
                      resetForm();
                    }}
                  >
                    Làm Mới
                  </Button>
                </div>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </main>
  );
}

export default Checkout;
