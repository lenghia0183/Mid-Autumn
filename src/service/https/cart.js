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

export const useGetMyCart = () => {
  const url = "v1/cart/me";
  const fetcher = async (url, arg) => {
    const response = await api.get(url, arg);

    return response.data;
  };

  return useSWR(url, fetcher);
};
