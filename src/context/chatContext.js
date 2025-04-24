import React, { createContext, useContext, useState, useEffect } from "react";
import { useSocket } from "../hooks/useSocket";
import { useUser } from "./userContext";
import { getLocalStorageItem } from "../utils";
import { useGetMyChat } from "../service/https/chat";

const ChatContext = createContext();

export const ChatProvider = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const { socket, emit, on, off } = useSocket(getLocalStorageItem("token"));

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

    const newMessage = {
      id: Date.now(),
      content,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, newMessage]);

    emit("message:send", {
      content: content,
      chatId: data?.data?._id,
    });
  };

  useEffect(() => {
    if (!socket) return;

    const handleAdminMessage = (data) => {
      const adminMessage = {
        id: Date.now(),
        content: data.content,
        sender: "admin",
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, adminMessage]);
    };

    on("admin_message", handleAdminMessage);

    return () => {
      off("admin_message", handleAdminMessage);
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
