import useSWR from "swr";
import { api } from "../api";

export const useGetMyChat = (filters, config) => {
  const url = `v1/chat/me`;
  const fetcher = async (url) => {
    const response = await api.get(url, filters);
    return response;
  };

  return useSWR(url, fetcher, { shouldShowLoading: false, ...config });
};
