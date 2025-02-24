import useSWRMutation from "swr/mutation";
import { api } from "../api";
import { sleep } from "./../../utils/sleep";

export const useAddComment = (config) => {
  let url = "v1/comment";
  const fetcher = async (url, { arg }) => {
    await sleep(5000);
    return api.post(url, arg);
  };

  return useSWRMutation(url, fetcher, { shouldShowLoading: true, ...config });
};
