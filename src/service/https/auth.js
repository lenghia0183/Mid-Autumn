import { api } from "../api";
import useSWRMutation from "swr/mutation";

export const useLogin = () => {
  const url = "v1/auth/login";
  const fetcher = (url, { arg }) => {
    return api.post(url, arg);
  };

  return useSWRMutation(url, fetcher);
};

export const useSocialLogin = () => {
  const url = "v1/auth/social-login";
  const fetcher = (url, { arg }) => {
    return api.post(url, { idToken: arg });
  };

  return useSWRMutation(url, fetcher);
};

export const useChangePassword = () => {
  const url = "v1/auth/change-password";
  const fetcher = (url, { arg }) => {
    return api.put(url, arg);
  };

  return useSWRMutation(url, fetcher);
};
