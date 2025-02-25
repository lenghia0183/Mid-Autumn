import useSWRMutation from "swr/mutation";
import { api } from "../api";

import useSWR from "swr";

export const useAddComment = (config) => {
  let url = "v1/comment";
  const fetcher = async (url, { arg }) => {
    return api.post(url, arg);
  };

  return useSWRMutation(url, fetcher, { shouldShowLoading: true, ...config });
};

export const useGetCommentByProductId = (productId, config) => {
  const url = `v1/comment/${productId}`;
  const fetcher = async (url) => {
    const response = await api.get(url);

    return response.data;
  };

  return useSWR(url, fetcher, { shouldShowLoading: false, ...config });
};
