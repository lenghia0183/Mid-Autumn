import useSWRMutation from "swr/mutation";
import { api } from "../api";
import useSWR from "swr";

export const useAddProductToCart = () => {
  const url = "v1/cart";
  const fetcher = (url, { arg }) => {
    return api.post(url, arg);
  };

  return useSWRMutation(url, fetcher);
};

export const useDeleteCartDetail = () => {
  let url = "v1/cart/me";
  const fetcher = (url, { arg }) => {
    url += `/${arg?.cartDetailId}`;
    return api.delete(url, { cartId: arg?.cartId });
  };

  return useSWRMutation(url, fetcher);
};

export const useUpdateCartDetail = () => {
  let url = "v1/cart/me";
  const fetcher = (url, { arg }) => {
    url += `/${arg?.cartDetailId}`;
    return api.put(url, { cartId: arg?.cartId, quantity: arg?.quantity });
  };

  return useSWRMutation(url, fetcher);
};

export const useGetMyCart = (isLoggedIn) => {
  const url = "v1/cart/me";
  const fetcher = async (url) => {
    const response = await api.get(url);
    return response.data;
  };

  const { data, isLoading, isValidating, mutate } = useSWR(
    isLoggedIn ? url : null,
    fetcher
  );

  return {
    data,
    isLoading,
    isValidating,
    mutate,
  };
};
