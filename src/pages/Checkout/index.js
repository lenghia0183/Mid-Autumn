import { Form, Formik } from "formik";
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

function Checkout() {
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
  ];

  return (
    <main className="bg-white">
      <Breadcrumb items={breadcrumbCheckout} />
      <Formik>
        <Form>
          <div className="container my-14 bg-white-100">
            <h2 className="text-dark text-[35px] font-semibold text-center p-5">
              THANH TOÁN
            </h2>
            <Divider marginBottom="20px" color="dark-300" />

            <div className="grid grid-cols-12 gap-1">
              <div className="col-span-7 p-5">
                <p className="flex items-center gap-2 text-xl font-semibold text-dark">
                  <Icon name="location" size="1.3em" color="emerald" />
                  <p>THÔNG TIN KHÁCH HÀNG</p>
                </p>

                <div className="shadow-md p-4">
                  <p className="text-dark text-xl font-medium">
                    NGƯỜI MUA HÀNG
                  </p>
                  <div className="grid grid-cols-12 gap-7 gap-y-11 mt-10 ">
                    <FormikTextField
                      className="col-span-6"
                      name="name"
                      label="Họ Và Tên"
                      required
                    />

                    <FormikTextField
                      className="col-span-6"
                      name="email"
                      label="Email"
                      required
                    />

                    <FormikTextField
                      className="col-span-6"
                      name="phone"
                      label="Điện Thoại"
                      required
                    />
                  </div>

                  <div>
                    <p className="text-dark text-xl font-medium mt-14">
                      NGƯỜI NHẬN HÀNG
                    </p>

                    <div className="grid grid-cols-12 gap-7 gap-y-11 mt-10 ">
                      <FormikTextField
                        className="col-span-6"
                        name="name"
                        label="Họ Và Tên"
                        required
                      />

                      <FormikTextField
                        className="col-span-6"
                        name="phone"
                        label="Điện Thoại"
                        required
                      />
                    </div>

                    <Button
                      variant="text"
                      textColor="dark"
                      textHoverColor="yellow"
                      bgHoverColor="transparent"
                      className="mt-7"
                      size="zeroPadding"
                      startIcon={<Icon name="copy" size="1em" />}
                    >
                      Sử dụng thông tin người mua hàng
                    </Button>
                  </div>

                  <p className="text-dark text-xl font-medium mt-14">
                    ĐỊA CHỈ NHẬN HÀNG
                  </p>

                  <div className="grid grid-cols-12 gap-7 gap-y-11 mt-10 ">
                    <div className="col-span-6 flex flex-col gap-y-12">
                      <FormikAutocomplete
                        className="col-span-6"
                        name="province"
                        label="Tỉnh/Thành phô"
                        required
                      />

                      <FormikAutocomplete
                        className="col-span-6"
                        name="district"
                        label="Quận/Huyện"
                        required
                      />

                      <FormikAutocomplete
                        className="col-span-6"
                        name="ward"
                        label="Phường/Xã"
                        required
                      />

                      <FormikTextArea
                        className="col-span-6"
                        name="street"
                        label="Địa chỉ"
                        required
                      />
                    </div>
                  </div>
                </div>
              </div>
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
                <div className="mt-4">
                  {items?.map((item) => {
                    return (
                      <div>
                        <div className="flex justify-between items-start">
                          <Image src={item?.image} width="70px" height="70px" />
                          <p className="text-dark text-lg font-medium text-left w-1/2">
                            {item?.name}
                          </p>
                          <p className="text-lg text-crimson">
                            {item?.quantity} x
                          </p>
                          <p className="text-lg text-crimson">
                            {formatCurrency(item?.price)}
                          </p>
                        </div>
                        <Divider
                          marginTop="10px"
                          marginBottom="10px"
                          color="dark-200"
                        />
                      </div>
                    );
                  })}
                </div>

                {/* money info */}
                <div>
                  <div>
                    <LabelValue
                      label={"Tổng tiền hàng"}
                      value={formatCurrency(5000000)}
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
                      value={formatCurrency(5000)}
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
                      value={formatCurrency(6500000)}
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
                      value={formatCurrency(6500000)}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Form>
      </Formik>
    </main>
  );
}

export default Checkout;
