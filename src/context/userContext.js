import React, { createContext, useState, useContext, useEffect } from "react";

// Hàm lưu thông tin vào localStorage
const saveToLocalStorage = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
};

// Hàm lấy thông tin từ localStorage
const getFromLocalStorage = (key) => {
  const storedValue = localStorage.getItem(key);
  return storedValue ? JSON.parse(storedValue) : null;
};

// Tạo UserContext
const UserContext = createContext();

// Tạo Provider cho UserContext
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    isLoggedIn: false,
  });

  // Hàm để cập nhật thông tin khi đăng nhập
  const login = (userData) => {
    setUser({
      ...userData,
      isLoggedIn: true,
    });
    // Lưu thông tin vào localStorage
    saveToLocalStorage("user", userData);
  };

  // Hàm để cập nhật khi đăng xuất
  const logout = () => {
    setUser({
      name: "",
      email: "",
      isLoggedIn: false,
    });
    localStorage.removeItem("user");
  };

  // Kiểm tra khi tải trang
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

// Hook để sử dụng UserContext
export const useUser = () => useContext(UserContext);
