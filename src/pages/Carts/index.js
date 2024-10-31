import React, { useState } from "react";

import Breadcrumb from "../../components/Breadcrumb";
import Divider from "../../components/Devider";
import { PAGE_TITLE, PATH } from "../../constants/path";

import IconButton from "../../components/IconButton";
import Image from "../../components/Image";
import LabelValue from "../../components/LabelValue";
import formatCurrency from "./../../utils/formatCurrency";
import Button from "./../../components/Button/index";
import Dialog from "../../components/Diaglog";
import useBreakpoint from "./../../hooks/useBreakpoint";
import { toast } from "react-toastify";
import { validateStatus } from "../../utils/api";
import Backdrop from "../../components/BackDrop";
import QuantityInput from "../../components/QuantityInput";
import { useCart } from "../../context";

function Cart() {
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedCartDetail, setSelectedCartDetail] = useState(null);
  const isLargerThanSm = useBreakpoint("sm");

  const {
    cartData,
    isLoading,
    updateCartDetail,
    deleteCartDetail,
    refreshCart,
  } = useCart();

  const myCart = cartData || [];

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

  const handleOpenDialog = (cartDetail) => {
    setSelectedCartDetail(cartDetail);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedCartDetail(null);
  };

  const handleConfirmDelete = () => {
    deleteCartDetail(
      { cartDetailId: selectedCartDetail?._id, cartId: myCart.id },
      {
        onSuccess: (response) => {
          if (validateStatus(response?.code)) {
            toast.success(response?.message);
            handleCloseDialog();
            refreshCart();
          } else {
            toast.error(response?.message);
          }
        },
        onError: () => {
          toast.error("Xóa sản phẩm khỏi giỏ hàng thất bại vui lòng thử lại");
        },
      }
    );
  };

  const handleUpdateQuantity = (quantity, item) => {
    updateCartDetail(
      {
        cartDetailId: item?._id,
        cartId: myCart.id,
        quantity: quantity,
      },
      {
        onSuccess: (response) => {
          console.log("response: ", response);
          if (validateStatus(response?.code)) {
            toast.success(response?.message);
            // refreshCart();
          } else {
            toast.error(response?.message);
          }
        },
        onError: () => {
          toast.error(
            "Cập nhật sản phẩm khỏi giỏ hàng thất bại vui lòng thử lại"
          );
        },
      }
    );
  };

  return (
    <div>
      <Backdrop open={isLoading} />
      <Breadcrumb items={breadcrumbCart} />
      <div className="bg-white py-14">
        <div className="container bg-white-100 py-4 rounded-md shadow-md">
          <h3 className="text-emerald text-[28px] font-semibold">GIỎ HÀNG</h3>
          <Divider marginTop="10px" color="dark" />

          <div>
            {myCart?.cartDetails && myCart?.cartDetails.length > 0 ? (
              myCart?.cartDetails.map((item, index) => (
                <div key={index} className="mt-4 flex flex-col">
                  <div className="grid grid-cols-12 gap-4 mb-4">
                    {/* Responsive phần hình ảnh và tên sản phẩm */}
                    <div className="col-span-12 md:col-span-5 flex gap-2">
                      <Image src={item?.productId?.images[0]} width="100px" />
                      <h2 className="text-lg text-dark font-medium truncate">
                        {item?.productId?.name?.toUpperCase()}
                      </h2>
                    </div>

                    {/* Responsive phần đơn giá, số lượng, thành tiền */}
                    <div className="col-span-12 md:col-span-5 flex flex-col justify-between gap-y-2 md:gap-y-0 mt-4 md:mt-0">
                      <LabelValue
                        labelWidth="100px"
                        label="Đơn giá"
                        value={formatCurrency(item?.productId?.price)}
                      />
                      <LabelValue
                        labelWidth="100px"
                        label="Số lượng"
                        value={
                          <QuantityInput
                            width="200px"
                            value={item?.quantity}
                            onChange={(quantity) => {
                              handleUpdateQuantity(quantity, item);
                            }}
                            max={20}
                          />
                        }
                      />
                      <LabelValue
                        labelWidth="100px"
                        label="Thành tiền"
                        valueClassName="text-emerald text-xl font-medium"
                        value={formatCurrency(item?.totalMoney)}
                      />
                    </div>

                    {/* Responsive phần nút xóa */}
                    <div className="col-span-12 md:col-span-2 flex items-center justify-center">
                      <IconButton
                        iconName="bin"
                        textColor="dark-500"
                        onClick={() => handleOpenDialog(item)}
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
                value={formatCurrency(myCart?.cartTotalMoney)}
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
                  bgColor="emerald"
                  textColor="white"
                  bgHoverColor="yellow"
                  textHoverColor="dark"
                  to={PATH.CHECKOUT}
                >
                  THANH TOÁN
                </Button>
              </div>
            </div>
            <Dialog
              open={openDialog}
              onCancel={handleCloseDialog}
              onSubmit={() => handleConfirmDelete()}
              submitLabel="Xác nhận"
              cancelLabel="Hủy bỏ"
              title="Xác nhận xóa"
              titleProps="text-lg font-semibold"
            >
              <p>Bạn có chắc chắn muốn xóa sản phẩm này khỏi giỏ hàng?</p>
            </Dialog>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cart;
