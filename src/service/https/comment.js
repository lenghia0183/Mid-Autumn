import useSWRMutation from "swr/mutation";
import { api } from "../api";
import { sleep } from "./../../utils/sleep";
import useSWR from "swr";

export const useAddComment = (config) => {
  let url = "v1/comment";
  const fetcher = async (url, { arg }) => {
    await sleep(5000);
    return api.post(url, arg);
  };

  return useSWRMutation(url, fetcher, { shouldShowLoading: true, ...config });
};

export const useGetCommentByProductId = (productId, config) => {
  const url = `v1/comment/${productId}`;
  const fetcher = async (url) => {
    const response = await api.get(url);
    // await sleep(30000);
    return response.data;
  };

  return useSWR(url, fetcher, { shouldShowLoading: false, ...config });
};
