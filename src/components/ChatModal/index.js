import React, { useRef, useEffect, memo } from "react";
import Dialog from "../Diaglog";
import { useChat } from "../../context/chatContext";
import { useUser } from "../../context";
import Icon from "../Icon";
import { useTranslation } from "react-i18next";
import MessageArea from "./MessageArea";
import ChatInput from "./ChatInput";

const ChatModal = () => {
  const { t } = useTranslation();
  const { isOpen, closeChat } = useChat();

  console.log("rerenfdadffads");

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
      maxWidth="max-w-xl"
      fullWidth={true}
      dialogClassName="h-[500px] flex flex-col rounded-xl overflow-hidden shadow-2xl"
      titleContainerClassName="bg-white border-b border-gray-200 p-4 bg-gradient-to-r from-white to-gray-50"
      contentClassName="flex-1 flex flex-col p-0 overflow-hidden"
    >
      <div className="flex flex-col h-full">
        <MessageArea />
        <ChatInput />
      </div>
    </Dialog>
  );
};

export default memo(ChatModal);
