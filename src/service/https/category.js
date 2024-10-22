import useSWR from "swr";
import { api } from "../api";

export const useGetCategory = () => {
  const url = "v1/category";
  const fetcher = async (url, arg) => {
    const response = await api.get(url, arg);
    console.log("response", response);
    return response?.data?.categories;
  };

  return useSWR(url, fetcher);
};
