import useSWR from "swr";
import { api } from "../api";
import { sleep } from "../../utils";

export const useGetCategory = (config) => {
  const url = "v1/category";
  const fetcher = async (url, arg) => {
    const response = await api.get(url, arg);
    await sleep(30000);
    return response?.data?.categories;
  };

  return useSWR(url, fetcher, { shouldShowLoading: false, ...config });
};
