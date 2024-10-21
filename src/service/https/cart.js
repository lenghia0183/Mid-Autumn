import useSWRMutation from "swr/mutation";
import { api } from "../api";

export const useAddProductToCart = () => {
  const url = "v1/cart";
  const fetcher = (url, { arg }) => {
    return api.post(url, arg);
  };

  return useSWRMutation(url, fetcher);
};
