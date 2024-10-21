import useSWR from "swr";
import { api } from "../api";

export const useGetProduct = () => {
  const url = "v1/product";
  const fetcher = (url, arg) => {
    return api.get(url, arg);
  };

  return useSWR(url, fetcher);
};

export const useGetProductDetail = (productId) => {
  const url = `v1/product/${productId}`;
  const fetcher = async (url) => {
    const response = await api.get(url);
    return response.data;
  };

  return useSWR(url, fetcher);
};
