import useSWRMutation from "swr/mutation";
import { api } from "../api";

export const useAddProductToFavoriteList = (productId) => {
  const url = `v1/favorite/${productId}/toggle`;
  const fetcher = (url, { arg }) => {
    return api.put(url, arg);
  };

  return useSWRMutation(url, fetcher);
};
