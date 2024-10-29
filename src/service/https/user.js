import useSWRMutation from "swr/mutation";
import { api } from "../api";
import useSWR from "swr";

export const useUpdateMe = () => {
  const url = `v1/auth/me`;
  const fetcher = (url, { arg }) => {
    return api.put(url, arg);
  };

  return useSWRMutation(url, fetcher);
};

export const useGetMe = () => {
  const url = `v1/auth/me`;
  const fetcher = async (url) => {
    const response = await api.get(url);
    return response.data;
  };

  return useSWR(url, fetcher);
};
