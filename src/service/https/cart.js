import useSWRMutation from "swr/mutation";
import { api } from "../api";
import useSWR from "swr";
import { sleep } from "../../utils";

export const useAddProductToCart = (config) => {
  const url = "v1/cart";
  const fetcher = async (url, { arg }) => {
    await sleep(5000);
    return api.post(url, arg);
  };

  return useSWRMutation(url, fetcher, { shouldShowLoading: true, ...config });
};

export const useDeleteCartDetail = (config) => {
  let url = "v1/cart/me";
  const fetcher = (url, { arg }) => {
    url += `/${arg?.cartDetailId}`;

    return api.delete(url, { cartId: arg?.cartId });
  };

  return useSWRMutation(url, fetcher, { shouldShowLoading: true, ...config });
};

export const useUpdateCartDetail = (config) => {
  let url = "v1/cart/me";
  const fetcher = (url, { arg }) => {
    url += `/${arg?.cartDetailId}`;
    return api.put(url, { cartId: arg?.cartId, quantity: arg?.quantity });
  };

  return useSWRMutation(url, fetcher, { shouldShowLoading: true, ...config });
};

export const useGetMyCart = (isLoggedIn, config) => {
  const url = "v1/cart/me";
  const fetcher = async (url) => {
    const response = await api.get(url);
    await sleep(3000);
    return response.data;
  };

  const { data, isLoading, isValidating, mutate } = useSWR(
    isLoggedIn ? url : null,
    fetcher,
    { shouldShowLoading: false, ...config }
  );

  return {
    data,
    isLoading,
    isValidating,
    mutate,
  };
};
