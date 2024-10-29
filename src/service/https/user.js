import useSWRMutation from "swr/mutation";
import { api } from "../api";
import useSWR from "swr";

export const useUpdateUserProfile = (userId) => {
  const url = `v1/users/${userId}`;
  const fetcher = (url, { arg }) => {
    return api.put(url, arg);
  };

  return useSWRMutation(url, fetcher);
};

export const useGetUser = (userId) => {
  const url = `v1/users/${userId}`;
  const fetcher = async (url) => {
    const response = await api.get(url);
    return response.data;
  };

  return useSWR(url, fetcher);
};
