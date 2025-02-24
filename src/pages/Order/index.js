import { useEffect, useState } from "react";
import Pagination from "../../components/Pagination";
import Tabs from "../../components/Tabs";
import { useGetOrder } from "../../service/https/order";
import { useQueryState } from "../../hooks/useQueryState";
import Image from "../../components/Image";
import formatCurrency from "../../utils/formatCurrency";
import Divider from "../../components/Devider";
import Accordion from "../../components/Accordion/index";
import LabelValue from "../../components/LabelValue";
import Button from "../../components/Button";
import { useUpdateOrderStatus } from "../../service/https/order"; // Import hook
import OrderListSkeleton from "../../components/Skeletons/OrderListSkeleton";

function Order() {
  const { tab, setTab } = useQueryState({ tab: "pending" });
  const { data, mutate, isLoading, isValidating } = useGetOrder({
    status: tab,
  });
  const { trigger: updateOrderStatus } = useUpdateOrderStatus(); // Hook to update status

  const isFetching = isLoading || isValidating;

  const tabList = [
    { label: "Chờ xác nhận", value: "pending" },
    { label: "Đã xác nhận", value: "confirmed" },
    { label: "Từ chối", value: "reject" },
    { label: "Đang giao", value: "shipping" },
    { label: "Thành công", value: "success" },
    { label: "Bị hủy", value: "canceled" },
  ];

  useEffect(() => {
    mutate();
  }, [tab, mutate]);

  const renderPaymentStatus = (paymentMethod, isPaid) => {
    return paymentMethod === "bank" && isPaid
      ? "Đã thanh toán"
      : "Chưa thanh toán";
  };

  const renderOrderDetails = (item) => (
    <>
      <LabelValue label="Tên người mua" value={item?.buyerName} />
      <LabelValue label="Tên người nhận" value={item?.recipientName} />
      <LabelValue
        label="Địa chỉ"
        value={`${item.address.street}, ${item.address.ward.wardName}, ${item.address.district.districtName}, ${item.address.province.provinceName}`}
      />
    </>
  );

  const renderCartDetails = (cartDetails) => {
    return cartDetails.map((cartItem) => (
      <div key={cartItem._id}>
        <div className="flex justify-between items-start py-3">
          <Image
            src={cartItem?.productId?.images[0]}
            width="70px"
            height="70px"
          />
          <p className="w-1/2 text-lg font-medium text-left text-dark">
            {cartItem?.productId?.name}
          </p>
          <p className="text-lg text-crimson">{cartItem?.quantity} x</p>
          <p className="text-lg text-crimson">
            {formatCurrency(cartItem?.productId?.price)}
          </p>
        </div>
        <Divider color="dark-200" borderStyle="dashed" />
      </div>
    ));
  };

  const renderPriceDetails = (totalAmount, shippingFee) => (
    <div className="mt-5">
      <LabelValue
        label="Tổng tiền sản phẩm"
        value={formatCurrency(totalAmount - shippingFee)}
        labelWidth="200px"
        labelClassName="text-lg !font-normal text-gray-500"
        valueClassName="text-xl !font-normal text-crimson"
      />
      <LabelValue
        label="Phí ship"
        value={formatCurrency(shippingFee)}
        labelWidth="200px"
        labelClassName="text-lg !font-normal text-gray-500"
        valueClassName="text-xl !font-normal text-crimson"
      />
      <LabelValue
        label="Tổng tiền đơn hàng"
        value={formatCurrency(totalAmount)}
        labelWidth="200px"
        labelClassName="text-lg !font-normal text-gray-500"
        valueClassName="text-xl !font-normal text-crimson"
      />
    </div>
  );

  const handleUpdateOrderStatus = (orderId, status) => {
    updateOrderStatus({ orderId, status }).then(() => {
      mutate();
    });
  };

  return (
    <div className="xl:p-4">
      <h2 className="text-2xl font-semibold text-dark shadow-md p-4">
        Danh sách đơn hàng của bạn
      </h2>

      <div className="sm:mt-5 mt-3 w-full">
        {/* Tabs */}
        <Tabs
          className="w-full"
          list={tabList}
          divider={true}
          value={tab}
          onChange={(value) => setTab(value)}
        >
          {isFetching ? (
            <OrderListSkeleton />
          ) : (
            <div className="text-dark-400 text-lg flex flex-col gap-3">
              {/* Display orders */}
              {data?.data?.orders?.map((item) => (
                <div className="p-5 shadow-md bg-gray-100" key={item._id}>
                  <div className="flex justify-between">
                    <LabelValue
                      label="Phương thức thanh thanh toán"
                      value={
                        item?.paymentMethod
                          ? "Thanh toán trực tuyến"
                          : "Thanh toán khi nhận hàng"
                      }
                    />
                    <div>
                      {renderPaymentStatus(item?.paymentMethod, item?.isPaid)}
                    </div>
                  </div>

                  {renderOrderDetails(item)}

                  <h2 className="text-2xl text-center mt-5 text-yellow">
                    Danh sách sản phẩm
                  </h2>
                  <Accordion key={item._id} maxHeight="600px">
                    {renderCartDetails(item.cartDetails)}
                  </Accordion>

                  {renderPriceDetails(item.totalAmount, item.shippingFee)}

                  <div className="mt-7 ml-auto flex">
                    <div className="flex gap-3 ml-auto">
                      {item.status === "pending" && (
                        <Button
                          bgColor="crimson"
                          bgHoverColor="crimson-300"
                          onClick={() =>
                            handleUpdateOrderStatus(item._id, "canceled")
                          }
                        >
                          Hủy
                        </Button>
                      )}

                      {item?.paymentMethod === "Bank" &&
                      !item?.isPaid &&
                      item?.status == "pending" ? (
                        <Button
                          variant="contained"
                          onClick={() =>
                            handleUpdateOrderStatus(item._id, "confirmed")
                          }
                          href={item.payUrl}
                          bgColor="emerald"
                          textColor="white"
                          bgHoverColor="yellow"
                          textHoverColor="dark"
                        >
                          Tiến hành thanh toán
                        </Button>
                      ) : (
                        <></>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </Tabs>
      </div>

      <Pagination pageCount={data?.data?.totalPage} className="ml-auto mt-10" />
    </div>
  );
}

export default Order;
