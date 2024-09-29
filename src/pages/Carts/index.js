import React, { useState } from "react";
import { Formik, FieldArray, Form } from "formik";
import Breadcrumb from "../../components/Breadcrumb";
import Divider from "../../components/Devider";
import { PAGE_TITLE, PATH } from "../../constants/path";
import FormikQuantityInput from "../../components/Formik/FormikQuantityInput";
import IconButton from "../../components/IconButton";
import images from "../../asset/images";
import Image from "../../components/Image";
import LabelValue from "../../components/LabelValue";
import formatCurrency from "./../../utils/formatCurrency";
import Button from "./../../components/Button/index";
import Dialog from "../../components/Diaglog";
import useBreakpoint from "./../../hooks/useBreakpoint";

function Cart() {
  const [openDialog, setOpenDialog] = useState(false);
  const [itemToDeleteIndex, setItemToDeleteIndex] = useState(null);
  const isLargerThanSm = useBreakpoint("sm");

  const breadcrumbCart = [
    {
      label: PAGE_TITLE.HOME,
      to: PATH.HOME,
    },
    {
      label: PAGE_TITLE.CART,
      to: PATH.CART,
    },
  ];

  const initialValues = {
    cartItems: [
      {
        image: images.popularDish1,
        name: "Bánh trung thu trang vàng hoàng kim, Bánh trung thu trang vàng hoàng kim, Bánh trung thu trang vàng hoàng kim, Bánh trung thu trang vàng hoàng kim",
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
    ],
  };

  const handleOpenDialog = (index) => {
    setItemToDeleteIndex(index);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setItemToDeleteIndex(null);
  };

  const handleConfirmDelete = (arrayHelpers) => {
    if (itemToDeleteIndex !== null) {
      arrayHelpers.remove(itemToDeleteIndex);
    }
    setOpenDialog(false);
    setItemToDeleteIndex(null);
  };

  return (
    <>
      <Breadcrumb items={breadcrumbCart} />
      <div className="bg-white py-14">
        <div className="container bg-white-100 py-4 rounded-md shadow-md">
          <h3 className="text-emerald text-[28px] font-semibold">GIỎ HÀNG</h3>
          <Divider marginTop="10px" color="dark" />

          <Formik
            initialValues={initialValues}
            onSubmit={(values) => {
              console.log("Cart Submitted:", values);
            }}
          >
            {({ values, setFieldValue }) => {
              const totalAmount = values.cartItems.reduce(
                (total, item) => total + item.price * item.quantity,
                0
              );

              return (
                <Form>
                  <FieldArray
                    name="cartItems"
                    render={(arrayHelpers) => (
                      <div>
                        {values.cartItems && values.cartItems.length > 0 ? (
                          values.cartItems.map((item, index) => (
                            <div key={index} className="mt-4 flex flex-col">
                              <div className="grid grid-cols-12 gap-4 mb-4">
                                {/* Responsive phần hình ảnh và tên sản phẩm */}
                                <div className="col-span-12 md:col-span-5 flex gap-2">
                                  <Image src={item?.image} width="100px" />
                                  <h2 className="text-lg text-dark font-medium truncate">
                                    {item?.name.toUpperCase()}
                                  </h2>
                                </div>

                                {/* Responsive phần đơn giá, số lượng, thành tiền */}
                                <div className="col-span-12 md:col-span-5 flex flex-col justify-between gap-y-2 md:gap-y-0 mt-4 md:mt-0">
                                  <LabelValue
                                    labelWidth="100px"
                                    label="Đơn giá"
                                    value={formatCurrency(item?.price)}
                                  />
                                  <LabelValue
                                    labelWidth="100px"
                                    label="Số lượng"
                                    value={
                                      <FormikQuantityInput
                                        width="200px"
                                        name={`cartItems.${index}.quantity`}
                                        max={10}
                                      />
                                    }
                                  />
                                  <LabelValue
                                    labelWidth="100px"
                                    label="Thành tiền"
                                    valueClassName="text-emerald text-xl font-medium"
                                    value={formatCurrency(
                                      item?.price * item?.quantity
                                    )}
                                  />
                                </div>

                                {/* Responsive phần nút xóa */}
                                <div className="col-span-12 md:col-span-2 flex items-center justify-center">
                                  <IconButton
                                    iconName="bin"
                                    textColor="dark-500"
                                    onClick={() => handleOpenDialog(index)}
                                  >
                                    Xóa
                                  </IconButton>
                                </div>
                              </div>
                              <Divider marginBottom="20px" />
                            </div>
                          ))
                        ) : (
                          <p>Giỏ hàng trống</p>
                        )}

                        <div className="flex flex-col items-end mt-4">
                          <LabelValue
                            label="Tổng tiền"
                            labelWidth="150px"
                            value={formatCurrency(totalAmount)}
                            className="!text-2xl font-semibold "
                            valueClassName="text-emerald"
                          />

                          <div className="flex gap-4 mt-5">
                            <Button
                              bgColor="yellow"
                              bgHoverColor="emerald"
                              textHoverColor="white"
                              textColor="dark"
                              size={isLargerThanSm ? "large" : "medium"}
                              className="sm:text-xl"
                              to={PATH.PRODUCTS}
                            >
                              XEM THÊM SẢN PHẨM
                            </Button>
                            <Button
                              size={isLargerThanSm ? "large" : "medium"}
                              className="sm:text-xl"
                            >
                              THANH TOÁN
                            </Button>
                          </div>
                        </div>
                        <Dialog
                          open={openDialog}
                          onCancel={handleCloseDialog}
                          onSubmit={() => handleConfirmDelete(arrayHelpers)}
                          submitLabel="Xác nhận"
                          cancelLabel="Hủy bỏ"
                          title="Xác nhận xóa"
                          titleProps="text-lg font-semibold"
                        >
                          <p>
                            Bạn có chắc chắn muốn xóa sản phẩm này khỏi giỏ
                            hàng?
                          </p>
                        </Dialog>
                      </div>
                    )}
                  />
                </Form>
              );
            }}
          </Formik>
        </div>
      </div>
    </>
  );
}

export default Cart;
