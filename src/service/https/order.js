import useSWR from "swr";
import { api } from "../api";
import useSWRMutation from "swr/mutation";
import { sleep } from "../../utils";

export const useGetOrder = (filters, config) => {
  const url = "v1/order/me";
  const fetcher = async (url) => {
    await sleep(30000);
    return api.get(url, filters);
  };

  return useSWR(url, fetcher, { shouldShowLoading: false, ...config });
};

export const useUpdateOrderStatus = (config) => {
  let url = "v1/order/change-status";
  const fetcher = (url, { arg }) => {
    url += `/${arg?.orderId}`;
    return api.put(url, { status: arg.status });
  };

  return useSWRMutation(url, fetcher, { shouldShowLoading: true, ...config });
};
