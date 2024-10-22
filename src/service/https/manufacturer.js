import useSWR from "swr";
import { api } from "../api";

export const useGetManufacturer = () => {
  const url = "v1/manufacturer";
  const fetcher = async (url, arg) => {
    const response = await api.get(url, arg);
    console.log("response", response);
    return response?.data?.manufacturers;
  };

  return useSWR(url, fetcher);
};
