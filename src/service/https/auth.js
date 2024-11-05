import { api } from "../api";
import useSWRMutation from "swr/mutation";

export const useLogin = () => {
  const url = "v1/auth/login";
  const fetcher = (url, { arg }) => {
    return api.post(url, arg);
  };

  return useSWRMutation(url, fetcher);
};

export const useRegister = () => {
  const url = "v1/auth/register";
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

export const useForgotPassword = () => {
  const url = "v1/auth/forgot-password";
  const fetcher = (url, { arg }) => {
    return api.post(url, arg);
  };

  return useSWRMutation(url, fetcher);
};

export const useVerifyForgotOTP = () => {
  const url = "v1/auth/verify-forgot-password-otp";
  const fetcher = (url, { arg }) => {
    return api.post(url, arg);
  };
  return useSWRMutation(url, fetcher);
};

export const useResetPassword = () => {
  const url = "v1/auth/reset-password";
  const fetcher = (url, { arg }) => {
    return api.post(url, arg);
  };
  return useSWRMutation(url, fetcher);
};
