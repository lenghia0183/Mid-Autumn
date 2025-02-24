import { useEffect } from "react";
import Pagination from "../../components/Pagination";
import Tabs from "../../components/Tabs";
import { useGetOrder } from "../../service/https/order";
import { useQueryState } from "../../hooks/useQueryState";
import Image from "../../components/Image";
import formatCurrency from "../../utils/formatCurrency";
import Divider from "../../components/Devider";
import Accordion from "../../components/Accordion";
import LabelValue from "../../components/LabelValue";
import Button from "../../components/Button";
import { useUpdateOrderStatus } from "../../service/https/order";
import OrderListSkeleton from "../../components/Skeletons/OrderListSkeleton";
import { useTranslation } from "react-i18next";

function Order() {
  const { page } = useQueryState();
  const { tab, setTab } = useQueryState({ tab: "pending" });
  const { data, mutate, isLoading, isValidating } = useGetOrder({
    status: tab,
  });
  const { trigger: updateOrderStatus } = useUpdateOrderStatus();

  const { t } = useTranslation();
  const isFetching = isLoading || isValidating;

  const tabList = [
    { label: t("order.status.pending"), value: "pending" },
    { label: t("order.status.confirmed"), value: "confirmed" },
    { label: t("order.status.reject"), value: "reject" },
    { label: t("order.status.shipping"), value: "shipping" },
    { label: t("order.status.success"), value: "success" },
    { label: t("order.status.canceled"), value: "canceled" },
  ];

  useEffect(() => {
    mutate();
  }, [tab, mutate, page]);

  const renderPaymentStatus = (paymentMethod, isPaid) => {
    return paymentMethod === "bank" && isPaid
      ? t("order.paymentStatus.paid")
      : t("order.paymentStatus.unpaid");
  };

  const renderOrderDetails = (item) => (
    <>
      <LabelValue label={t("order.buyerName")} value={item?.buyerName} />
      <LabelValue
        label={t("order.recipientName")}
        value={item?.recipientName}
      />
      <LabelValue
        label={t("order.address")}
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
        label={t("order.productTotal")}
        value={formatCurrency(totalAmount - shippingFee)}
        labelWidth="200px"
        labelClassName="text-lg !font-normal text-gray-500"
        valueClassName="text-xl !font-normal text-crimson"
      />
      <LabelValue
        label={t("order.shippingFee")}
        value={formatCurrency(shippingFee)}
        labelWidth="200px"
        labelClassName="text-lg !font-normal text-gray-500"
        valueClassName="text-xl !font-normal text-crimson"
      />
      <LabelValue
        label={t("order.totalAmount")}
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

  const renderOrderActions = (item) => (
    <div className="mt-7 ml-auto flex">
      <div className="flex gap-3 ml-auto">
        {item.status === "pending" && (
          <Button
            bgColor="crimson"
            bgHoverColor="crimson-300"
            onClick={() => handleUpdateOrderStatus(item._id, "canceled")}
          >
            {t("order.cancel")}
          </Button>
        )}
        {item?.paymentMethod === "Bank" &&
          !item?.isPaid &&
          item?.status === "pending" && (
            <Button
              variant="contained"
              onClick={() => handleUpdateOrderStatus(item._id, "confirmed")}
              href={item.payUrl}
              bgColor="emerald"
              textColor="white"
              bgHoverColor="yellow"
              textHoverColor="dark"
            >
              {t("order.proceedPayment")}
            </Button>
          )}
      </div>
    </div>
  );

  return (
    <div className="xl:p-4">
      <h2 className="text-2xl font-semibold text-dark shadow-md p-4">
        {t("order.listTitle")}
      </h2>
      <div className="sm:mt-5 mt-3 w-full">
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
              {data?.data?.orders?.map((item) => (
                <div className="p-5 shadow-md bg-gray-100" key={item._id}>
                  <div className="flex justify-between">
                    <LabelValue
                      label={t("order.paymentMethod")}
                      value={
                        item?.paymentMethod
                          ? t("order.onlinePayment")
                          : t("order.cashOnDelivery")
                      }
                    />
                    <div>
                      {renderPaymentStatus(item?.paymentMethod, item?.isPaid)}
                    </div>
                  </div>
                  {renderOrderDetails(item)}
                  <h2 className="text-2xl text-center mt-5 text-yellow">
                    {t("order.productList")}
                  </h2>
                  <Accordion key={item._id} maxHeight="600px">
                    {renderCartDetails(item.cartDetails)}
                  </Accordion>
                  {renderPriceDetails(item.totalAmount, item.shippingFee)}
                  {renderOrderActions(item)}
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
