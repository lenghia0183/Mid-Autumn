import { useEffect } from "react";
import Pagination from "../../components/Pagination";
import Tabs from "../../components/Tabs";
import { useGetOrder, useUpdateOrderStatus } from "../../service/https/order";
import { useQueryState } from "../../hooks/useQueryState";
import Image from "../../components/Image";
import formatCurrency from "../../utils/formatCurrency";
import Divider from "../../components/Devider";
import Accordion from "../../components/Accordion/index";
import LabelValue from "../../components/LabelValue";
import Button from "../../components/Button";

function SkeletonOrder() {
  return (
    <div className="p-5 shadow-md bg-gray-100 animate-pulse">
      <div className="h-5 bg-gray-300 rounded w-3/4 mb-3"></div>
      <div className="h-5 bg-gray-300 rounded w-1/2 mb-3"></div>
      <div className="h-5 bg-gray-300 rounded w-1/3 mb-3"></div>
      <div className="mt-5 space-y-2">
        <div className="h-20 bg-gray-300 rounded w-full"></div>
        <div className="h-20 bg-gray-300 rounded w-full"></div>
      </div>
    </div>
  );
}

function Order() {
  const { page } = useQueryState();
  const { tab, setTab } = useQueryState({ tab: "pending" });
  const { data, mutate, isLoading, isValidating } = useGetOrder({
    status: tab,
    page,
  });
  const { trigger: updateOrderStatus } = useUpdateOrderStatus();

  useEffect(() => {
    mutate();
  }, [tab, mutate, page]);

  const handleUpdateOrderStatus = (orderId, status) => {
    updateOrderStatus({ orderId, status }).then(() => mutate());
  };

  const isFetching = isLoading || isValidating;

  return (
    <div className="xl:p-4">
      <h2 className="text-2xl font-semibold text-dark shadow-md p-4">
        Danh sách đơn hàng của bạn
      </h2>

      <div className="sm:mt-5 mt-3 w-full">
        <Tabs
          className="w-full"
          list={[
            { label: "Chờ xác nhận", value: "pending" },
            { label: "Đã xác nhận", value: "confirmed" },
            { label: "Từ chối", value: "reject" },
            { label: "Đang giao", value: "shipping" },
            { label: "Thành công", value: "success" },
            { label: "Bị hủy", value: "canceled" },
          ]}
          divider
          value={tab}
          onChange={setTab}
        >
          <div className="text-dark-400 text-lg flex flex-col gap-3">
            {isFetching
              ? Array.from({ length: 3 }).map((_, index) => (
                  <SkeletonOrder key={index} />
                ))
              : data?.data?.orders?.map((item) => (
                  <div className="p-5 shadow-md bg-gray-100" key={item._id}>
                    <LabelValue
                      label="Phương thức thanh toán"
                      value={
                        item?.paymentMethod
                          ? "Thanh toán trực tuyến"
                          : "Thanh toán khi nhận hàng"
                      }
                    />
                    <h2 className="text-2xl text-center mt-5 text-yellow">
                      Danh sách sản phẩm
                    </h2>
                    <Accordion key={item._id} maxHeight="600px">
                      {item.cartDetails.map((cartItem) => (
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
                            <p className="text-lg text-crimson">
                              {cartItem?.quantity} x
                            </p>
                            <p className="text-lg text-crimson">
                              {formatCurrency(cartItem?.productId?.price)}
                            </p>
                          </div>
                          <Divider color="dark-200" borderStyle="dashed" />
                        </div>
                      ))}
                    </Accordion>
                    <div className="mt-7 ml-auto flex gap-3">
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
                    </div>
                  </div>
                ))}
          </div>
        </Tabs>
      </div>

      {!isFetching && (
        <Pagination
          pageCount={data?.data?.totalPage}
          className="ml-auto mt-10"
        />
      )}
    </div>
  );
}

export default Order;
