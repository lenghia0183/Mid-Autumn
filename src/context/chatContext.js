import React, { createContext, useContext, useState, useEffect } from "react";
import { useSocket } from "../hooks/useSocket";
import { useUser } from "./userContext";
import { getLocalStorageItem } from "../utils";
import { useGetMyChat } from "../service/https/chat";

const ChatContext = createContext();

export const ChatProvider = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [isAdminTyping, setIsAdminTyping] = useState(false);
  const [token, setToken] = useState(getLocalStorageItem("token"));
  const { socket, emit, on, off } = useSocket(token);
  const { user } = useUser();

  const { data, mutate: refreshChat } = useGetMyChat();

  // Cập nhật token khi user đăng nhập/đăng xuất
  useEffect(() => {
    const currentToken = getLocalStorageItem("token");
    if (currentToken !== token) {
      setToken(currentToken);
      // Refresh chat data khi token thay đổi
      if (currentToken) {
        refreshChat();
      } else {
        // Clear messages khi logout
        setMessages([]);
      }
    }
  }, [user.isLoggedIn, token, refreshChat]);

  useEffect(() => {
    if (data) {
      setMessages(data?.data?.messages || []);
    }
  }, [data]);

  const openChat = () => setIsOpen(true);
  const closeChat = () => setIsOpen(false);

  const sendMessage = (content) => {
    if (!content.trim()) return;

    emit("message:send", {
      content: content,
      userId: user?.user?._id,
    });
  };

  const sendUserTyping = () => {
    emit("user:typing", {
      userId: user?.user?._id,
    });
  };

  const sendUserStopTyping = () => {
    emit("user:stop-typing", {
      userId: user?.user?._id,
    });
  };

  useEffect(() => {
    if (!socket) return;

    const handleAdminMessage = (data) => {
      const messageData = data.message || data;

      const adminMessage = {
        _id: messageData._id || Date.now().toString(),
        content: messageData.content,
        sender: messageData?.sender,
        status: messageData.status || "sent",
        createdAt: messageData.createdAt || new Date().toISOString(),
        updatedAt: messageData.updatedAt || new Date().toISOString(),
      };

      setMessages((prev) => [...prev, adminMessage]);
    };

    const handleAdminTyping = () => {
      setIsAdminTyping(true);
    };

    const handleAdminStopTyping = () => {
      setIsAdminTyping(false);
    };

    on("message:new", handleAdminMessage);
    on("user:typing", handleAdminTyping);
    on("user:stop-typing", handleAdminStopTyping);

    return () => {
      off("message:new", handleAdminMessage);
      off("user:typing", handleAdminTyping);
      off("user:stop-typing", handleAdminStopTyping);
    };
  }, [socket, on, off]);

  return (
    <ChatContext.Provider
      value={{
        isOpen,
        messages,
        openChat,
        closeChat,
        sendMessage,
        sendUserTyping,
        sendUserStopTyping,
        isAdminTyping,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export const useChat = () => {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error("useChat must be used within a ChatProvider");
  }
  return context;
};
