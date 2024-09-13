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

function Cart() {
  const [openDialog, setOpenDialog] = useState(false);
  const [itemToDeleteIndex, setItemToDeleteIndex] = useState(null); // Thêm state để lưu chỉ số sản phẩm cần xóa

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
    setItemToDeleteIndex(null); // Đặt lại chỉ số sản phẩm cần xóa khi đóng dialog
  };

  const handleConfirmDelete = (arrayHelpers) => {
    if (itemToDeleteIndex !== null) {
      arrayHelpers.remove(itemToDeleteIndex); // Xóa sản phẩm khỏi giỏ hàng
    }
    setOpenDialog(false);
    setItemToDeleteIndex(null); // Đặt lại chỉ số sản phẩm cần xóa
  };

  return (
    <>
      <Breadcrumb items={breadcrumbCart} />
      <div className="bg-white py-14">
        <div className="container bg-white-100 p-4 rounded-md shadow-md">
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
                                <div className="col-span-5 flex gap-2">
                                  <Image src={item?.image} width="130px" />
                                  <h2 className="text-lg text-dark font-medium truncate">
                                    {item?.name.toUpperCase()}
                                  </h2>
                                </div>

                                <div className="col-span-5 flex h-full flex-col justify-between">
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

                                <div className="col-span-2 flex items-center justify-center">
                                  <IconButton
                                    iconName="bin"
                                    textColor="dark-500"
                                    onClick={() => handleOpenDialog(index)} // Gọi hàm mở dialog và truyền index sản phẩm
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

                        <div className="flex justify-between items-center mt-4">
                          <div className="ml-auto">
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
                                size="large"
                                to={PATH.PRODUCTS}
                              >
                                XEM THÊM SẢN PHẨM
                              </Button>
                              <Button size="large">THANH TOÁN</Button>
                            </div>
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
