import React, { createContext, useState, useContext, useEffect } from "react";

const saveToLocalStorage = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
};

const getFromLocalStorage = (key) => {
  const storedValue = localStorage.getItem(key);
  return storedValue ? JSON.parse(storedValue) : null;
};

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    isLoggedIn: false,
  });

  const login = (userData) => {
    setUser({
      ...userData,
      isLoggedIn: true,
    });

    saveToLocalStorage("user", userData);
  };

  const logout = () => {
    setUser({
      name: "",
      email: "",
      isLoggedIn: false,
    });
    localStorage.removeItem("user");
  };

  useEffect(() => {
    const userFromLocalStorage = getFromLocalStorage("user");
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
