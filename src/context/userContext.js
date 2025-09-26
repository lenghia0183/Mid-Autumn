import React, {
  createContext,
  useState,
  useContext,
  useEffect,
  useCallback,
} from "react";
import {
  getLocalStorageItem,
  setLocalStorageItem,
} from "../utils/localStorage";
import { api } from "../service/api";
import { toast } from "react-toastify";
import { eventEmitter } from "../utils";
import { PATH } from "../constants/path";
import { useTranslation } from "react-i18next";
import { EVENT_EMITTER } from "../constants";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const { t } = useTranslation();

  const [user, setUser] = useState({
    user: null,
    isLoggedIn: getLocalStorageItem("token"),
  });

  const updateUser = (updatedData) => {
    setUser((prevUser) => ({
      ...prevUser,
      user: { ...prevUser.user, ...updatedData },
    }));
    setLocalStorageItem("user", { ...user, ...updatedData });
  };

  const login = (data, navigate) => {
    setUser({
      user: data?.user,
      isLoggedIn: true,
    });
    navigate(PATH.HOME);
    toast.success(t("common.loginSuccess"));
    setLocalStorageItem("user", data?.user);
    setLocalStorageItem("token", data?.accessToken);
    setLocalStorageItem("refreshToken", data?.refreshToken);

    eventEmitter.removeAllListeners(EVENT_EMITTER.LOGOUT);
    eventEmitter.once(EVENT_EMITTER.LOGOUT, () => logout());
  };

  const logout = useCallback(
    (navigate) => {
      setUser({
        user: null,
        isLoggedIn: false,
      });

      if (localStorage.getItem("token")) {
        toast.info(t("common.logoutSuccess"));
      }

      localStorage.removeItem("user");
      localStorage.removeItem("token");
      localStorage.removeItem("refreshToken");

      if (navigate) {
        navigate(PATH.LOGIN);
      }
    },
    [t]
  );

  useEffect(() => {
    const fetchUserData = async () => {
      const token = getLocalStorageItem("token");
      if (token) {
        const url = `v1/auth/me`;
        const response = await api.get(url);

        setUser({
          user: response?.data || {},
          isLoggedIn: response?.data ? true : false,
        });
      } else {
        logout();
      }
    };

    fetchUserData();
  }, [logout]);

  return (
    <UserContext.Provider value={{ user, login, logout, updateUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
