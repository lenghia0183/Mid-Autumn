import useSWR from "swr";
import { api } from "../api";
import useSWRMutation from "swr/mutation";

export const useGetOrder = (filters) => {
  const url = "v1/order/me";
  const fetcher = (url) => {
    return api.get(url, filters);
  };

  return useSWR(url, fetcher);
};

export const useUpdateOrderStatus = () => {
  let url = "v1/order/change-status";
  const fetcher = (url, { arg }) => {
    url += `/${arg?.orderId}`;
    return api.put(url, { status: arg.status });
  };

  return useSWRMutation(url, fetcher);
};
