import React, { createContext, useState, useContext, useEffect } from "react";
import {
  getLocalStorageItem,
  setLocalStorageItem,
} from "../utils/localStorage";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    isLoggedIn: false,
  });

  const login = (data) => {
    setUser({
      user: data?.user,
      isLoggedIn: true,
    });

    setLocalStorageItem("user", data?.user);
    setLocalStorageItem("token", data?.accessToken);
    setLocalStorageItem("refreshToken", data?.refreshToken);
  };

  const logout = () => {
    setUser({
      name: "",
      email: "",
      isLoggedIn: false,
    });
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    localStorage.removeItem("refreshToken");
  };

  useEffect(() => {
    const userFromLocalStorage = getLocalStorageItem("user");
    if (userFromLocalStorage) {
      setUser({
        ...userFromLocalStorage,
        isLoggedIn: true,
      });
    }
  }, []);

  return (
    <UserContext.Provider value={{ user, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
