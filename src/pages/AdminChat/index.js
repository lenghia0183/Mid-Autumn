import React, { useState, useEffect, useMemo } from "react";
import { useTranslation } from "react-i18next";
import AdminChatList from "../../components/AdminChat/AdminChatList";
import AdminChatArea from "../../components/AdminChat/AdminChatArea";
import { useSocket } from "../../hooks/useSocket";
import { getLocalStorageItem } from "../../utils";
import { useUser } from "../../context";
import { toast } from "react-toastify";
import { useGetAdminChat, useSendMessage } from "../../service/https/chat";

const AdminChat = () => {
  const { t } = useTranslation();
  const { user } = useUser();
  const [activeChat, setActiveChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [chats, setChats] = useState([]);
  const [token, setToken] = useState(getLocalStorageItem("token"));
  const { socket, emit, on, off } = useSocket(token);
  const { data, mutate: refreshChats } = useGetAdminChat();
  const { sendMessage: apiSendMessage } = useSendMessage();

  // Cập nhật token khi user đăng nhập/đăng xuất
  useEffect(() => {
    const currentToken = getLocalStorageItem("token");
    if (currentToken !== token) {
      setToken(currentToken);
      if (currentToken) {
        refreshChats();
      } else {
        // Clear data khi logout
        setChats([]);
        setMessages([]);
        setActiveChat(null);
      }
    }
  }, [user.isLoggedIn, token, refreshChats]);

  // Format chats for display
  const formattedChats = useMemo(() => {
    if (!data || !data.data) return [];

    return data.data.map((chat) => {
      // Get the last message
      const lastMsg =
        chat.messages && chat.messages.length > 0
          ? chat.messages[chat.messages.length - 1]
          : null;

      // Count unread messages (messages from user that are not read)
      const unreadCount = chat.messages
        ? chat.messages.filter(
            (msg) => msg.sender !== user.user?._id && msg.status !== "read"
          ).length
        : 0;

      return {
        _id: chat._id,
        user: {
          _id: chat.userId._id,
          fullname: chat.userId.fullname,
          email: chat.userId.email,
          avatar: chat.userId.avatar,
          isOnline: true, // We would need a separate API to track online status
        },
        lastMessage: lastMsg ? lastMsg.content : "",
        lastMessageTime: chat.lastMessage || (lastMsg ? lastMsg.createdAt : ""),
        unreadCount: unreadCount,
        messages: chat.messages || [],
      };
    });
  }, [data, user?.user?._id]);

  // Update chats when data changes
  useEffect(() => {
    if (formattedChats.length > 0) {
      setChats(formattedChats);
    }
  }, [formattedChats, setChats]);

  // Handle chat selection
  const handleSelectChat = async (chat) => {
    setActiveChat(chat);

    try {
      // Set messages from the selected chat
      setMessages(chat.messages || []);

      // Join the chat room
      emit("chat:join", chat._id);

      // Mark unread messages as read
      if (chat.unreadCount > 0) {
        // Mark messages as read via API (this would be implemented in a real app)
        // For now, we'll just update the UI
        refreshChats();
      }
    } catch (error) {
      console.error("Error handling chat selection:", error);
      toast.error(
        t("adminChat.errorFetchingMessages") || "Error fetching messages"
      );
    }
  };

  // Handle sending a message
  const handleSendMessage = async (chatId, content) => {
    if (!content.trim()) return;

    try {
      // Create a temporary message to display immediately
      const tempMessage = {
        _id: `temp-${Date.now()}`,
        content,
        sender: {
          _id: user.user?._id,
          fullname: user.user?.fullname || "Admin",
          role: "admin",
        },
        status: "sending",
        createdAt: new Date().toISOString(),
      };

      // Add the message to the UI
      setMessages((prev) => [...prev, tempMessage]);

      // Send the message via API
      await apiSendMessage(chatId, content);

      // Send the message via socket for real-time updates
      emit("message:send", {
        chatId,
        content,
      });

      // Refresh the chat list to show the updated last message
      refreshChats();
    } catch (error) {
      console.error("Error sending message:", error);
      toast.error(t("adminChat.messageSendError") || "Failed to send message");
    }
  };

  // Listen for new messages
  useEffect(() => {
    if (!socket) return;

    const handleNewMessage = (data) => {
      const { chatId, message } = data;

      // If this message is for the active chat, add it to the messages
      if (activeChat && activeChat._id === chatId) {
        setMessages((prev) => [...prev, message]);

        // Mark the message as delivered
        emit("message:mark-delivered", {
          chatId,
          messageId: message._id,
        });
      }

      // Update the chat in the list with the new last message
      setChats((prevChats) =>
        prevChats.map((chat) =>
          chat._id === chatId
            ? {
                ...chat,
                lastMessage: message.content,
                lastMessageTime: message.createdAt,
                unreadCount:
                  activeChat && activeChat._id === chatId
                    ? 0
                    : chat.unreadCount + 1,
              }
            : chat
        )
      );
    };

    const handleUserTyping = (data) => {
      const { chatId, userId } = data;

      // If this typing notification is for the active chat, show typing indicator
      if (activeChat && activeChat._id === chatId) {
        // Here you would set a state to show typing indicator
        // For now, we'll just log it
        console.log(`User ${userId} is typing...`);
      }
    };

    const handleUserStopTyping = (data) => {
      const { chatId, userId } = data;

      // If this stop typing notification is for the active chat, hide typing indicator
      if (activeChat && activeChat._id === chatId) {
        // Here you would set a state to hide typing indicator
        // For now, we'll just log it
        console.log(`User ${userId} stopped typing`);
      }
    };

    // Register event listeners
    on("message:new", handleNewMessage);
    on("user:typing", handleUserTyping);
    on("user:stop-typing", handleUserStopTyping);

    return () => {
      // Clean up event listeners
      off("message:new", handleNewMessage);
      off("user:typing", handleUserTyping);
      off("user:stop-typing", handleUserStopTyping);

      // Leave the chat room if there's an active chat
      if (activeChat) {
        emit("chat:leave", activeChat._id);
      }
    };
  }, [socket, activeChat, on, off, emit, setChats, setMessages, t]);

  return (
    <div className="container mx-auto py-6">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">
        {t("adminChat.title") || "Admin Chat"}
      </h1>

      <div className="grid grid-cols-12 gap-6 h-[calc(100vh-200px)]">
        {/* Chat list sidebar */}
        <div className="col-span-12 md:col-span-4 lg:col-span-3 h-full">
          <AdminChatList
            chats={chats}
            activeChat={activeChat}
            onSelectChat={handleSelectChat}
          />
        </div>

        {/* Chat area */}
        <div className="col-span-12 md:col-span-8 lg:col-span-9 h-full">
          <AdminChatArea
            chat={activeChat}
            messages={messages}
            onSendMessage={(content) =>
              activeChat && handleSendMessage(activeChat._id, content)
            }
          />
        </div>
      </div>
    </div>
  );
};

export default AdminChat;
