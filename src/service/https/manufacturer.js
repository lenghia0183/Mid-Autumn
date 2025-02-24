import useSWR from "swr";
import { api } from "../api";
import { sleep } from "../../utils";

export const useGetManufacturer = (config) => {
  const url = "v1/manufacturer";
  const fetcher = async (url, arg) => {
    const response = await api.get(url, arg);
    await sleep(30000);
    return response?.data?.manufacturers;
  };

  return useSWR(url, fetcher, { shouldShowLoading: false, ...config });
};
