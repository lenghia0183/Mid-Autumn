import useSWRMutation from "swr/mutation";
import { api } from "../api";
import useSWR from "swr";

export const useAddProductToFavoriteList = (productId) => {
  const url = `v1/favorite/${productId}/toggle`;
  const fetcher = (url, { arg }) => {
    return api.put(url, arg);
  };

  return useSWRMutation(url, fetcher);
};

export const useGetMyFavorite = (filters) => {
  const url = `v1/favorite/me`;
  const fetcher = async (url) => {
    const response = await api.get(url, filters);
    return response;
  };

  return useSWR(url, fetcher);
};
