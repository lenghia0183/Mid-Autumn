import { api } from "../api";
import useSWRMutation from "swr/mutation";

export const useSendContact = (config) => {
  const url = "v1/contact";

  const fetcher = async (url, { arg }) => {
    return api.post(url, arg);
  };

  return useSWRMutation(url, fetcher, { shouldShowLoading: true, ...config });
};
