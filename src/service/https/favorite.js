import useSWRMutation from "swr/mutation";
import { api } from "../api";
import useSWR from "swr";
import { sleep } from "../../utils";

export const useAddProductToFavoriteList = (productId, config) => {
  const url = `v1/favorite/${productId}/toggle`;
  const fetcher = async (url, { arg }) => {
    // await sleep(5000);
    return api.put(url, arg);
  };

  return useSWRMutation(url, fetcher, { shouldShowLoading: true, ...config });
};

export const useGetMyFavorite = (filters, config) => {
  const url = `v1/favorite/me`;
  const fetcher = async (url) => {
    const response = await api.get(url, filters);
    return response;
  };

  return useSWR(url, fetcher, { shouldShowLoading: false, ...config });
};
