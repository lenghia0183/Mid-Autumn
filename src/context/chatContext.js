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
  const { socket, emit, on, off } = useSocket(getLocalStorageItem("token"));
  const { user } = useUser();

  const { data } = useGetMyChat();

  useEffect(() => {
    if (data) {
      setMessages(data?.data?.messages || []);
    }
  }, [data]);

  console.log("data", data);

  const openChat = () => setIsOpen(true);
  const closeChat = () => setIsOpen(false);

  const sendMessage = (content) => {
    if (!content.trim()) return;

    const tempMessage = {
      _id: Date.now().toString(),
      content,
      sender: {
        _id: user?.user?._id || "temp-user-id",
        fullname: user?.user?.fullname || "User",
        email: user?.user?.email || "",
        role: "user",
        avatar: user?.user?.avatar || "",
      },
      status: "sending",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    setMessages((prev) => [...prev, tempMessage]);

    emit("message:send", {
      content: content,
      chatId: data?.data?._id,
    });
  };

  const sendUserTyping = () => {
    emit("user:typing", {
      chatId: data?.data?._id,
    });
  };

  const sendUserStopTyping = () => {
    emit("user:stop-typing", {
      chatId: data?.data?._id,
    });
  };

  useEffect(() => {
    if (!socket) return;

    const handleAdminMessage = (data) => {
      const adminMessage = {
        _id: Date.now().toString(),
        content: data.content,
        sender: {
          _id: "admin-id",
          fullname: "Admin",
          role: "admin",
          avatar: "",
        },
        status: "received",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      setMessages((prev) => [...prev, adminMessage]);
    };

    const handleAdminTyping = () => {
      setIsAdminTyping(true);
    };

    const handleAdminStopTyping = () => {
      setIsAdminTyping(false);
    };

    on("admin_message", handleAdminMessage);
    on("user:typing", handleAdminTyping);
    on("user:stop-typing", handleAdminStopTyping);

    return () => {
      off("admin_message", handleAdminMessage);
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
