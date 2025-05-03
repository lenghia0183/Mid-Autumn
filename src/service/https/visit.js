import useSWRMutation from "swr/mutation";
import { api } from "../api";

export const useRecordVisit = (config) => {
  const url = "v1/visit";
  const fetcher = (url, { arg }) => {
    return api.post(url);
  };

  return useSWRMutation(url, fetcher, { shouldShowLoading: true, ...config });
};
