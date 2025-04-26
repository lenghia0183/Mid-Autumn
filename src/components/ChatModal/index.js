import React, { useRef, useEffect } from "react";
import Dialog from "../Diaglog";
import { useChat } from "../../context/chatContext";
import { useUser } from "../../context";
import Icon from "../Icon";
import { useTranslation } from "react-i18next";
import MessageArea from "./MessageArea";
import ChatInput from "./ChatInput";

const ChatModal = () => {
  const { t } = useTranslation();
  const { isOpen, closeChat, messages, sendMessage, isAdminTyping } = useChat();
  const { user } = useUser();
  const messagesEndRef = useRef(null);
  const messageAreaRef = useRef(null);

  const handleSendMessage = (message) => {
    if (message.trim()) {
      sendMessage(message);
    }
  };

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <Dialog
      open={isOpen}
      onCancel={closeChat}
      title={
        <div className="flex items-center">
          <div className="w-12 h-12 rounded-full bg-emerald flex items-center justify-center mr-3 shadow-md">
            <Icon name="user" color="white" size="1.5" />
          </div>
          <div>
            <div className="font-semibold text-lg text-emerald">
              {t("chat.title") || "Chat with Admin"}
            </div>
            <div className="text-xs text-gray-500 flex items-center">
              <span className="inline-block w-2 h-2 rounded-full bg-green-500 mr-2 animate-pulse"></span>
              {t("chat.supportAvailable") || "Support available 24/7"}
            </div>
          </div>
        </div>
      }
      maxWidth="max-w-md"
      fullWidth={true}
      dialogClassName="h-[500px] flex flex-col rounded-xl overflow-hidden shadow-2xl"
      titleContainerClassName="bg-white border-b border-gray-200 p-4 bg-gradient-to-r from-white to-gray-50"
      contentClassName="flex-1 flex flex-col p-0 overflow-hidden"
    >
      <div className="flex flex-col h-full">
        <MessageArea
          messages={messages}
          isTyping={isAdminTyping}
          user={user}
          messageAreaRef={messageAreaRef}
          messagesEndRef={messagesEndRef}
        />
        <ChatInput onSendMessage={handleSendMessage} />
      </div>
    </Dialog>
  );
};

export default ChatModal;
