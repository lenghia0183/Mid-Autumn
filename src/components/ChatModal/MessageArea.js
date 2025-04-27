import React, { useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import clsx from "clsx";
import Icon from "../Icon";
import Image from "../Image";
import images from "../../asset/images";
import { useChat, useUser } from "../../context";

const MessageArea = () => {
  const { t } = useTranslation();
  const messagesEndRef = useRef(null);
  const messageAreaRef = useRef(null);

  const { user } = useUser();
  const { messages, isAdminTyping: isTyping } = useChat();

  const getSenderRole = (sender) =>
    typeof sender === "object" ? sender.role : sender;

  const getAvatar = (message) => {
    if (message?.sender?.avatar) return message.sender.avatar;
    if (getSenderRole(message.sender) === "user") {
      return user?.user?.avatar || images.fallBack;
    }
    return images.adminAvatar || images.fallBack;
  };

  const getMessageTime = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  const getMessageDate = (timestamp) => {
    const date = new Date(timestamp);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(today.getDate() - 1);

    if (date.toDateString() === today.toDateString()) return "Hôm nay";
    if (date.toDateString() === yesterday.toDateString()) return "Hôm qua";
    return date.toLocaleDateString("vi-VN", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  const shouldShowDate = (curr, prev) => {
    if (!prev) return true;
    const currentDate = new Date(curr);
    const previousDate = new Date(prev);
    return currentDate.toDateString() !== previousDate.toDateString();
  };

  const MessageBubble = ({ message, isUser }) => (
    <div
      className={clsx(
        "mb-4 flex items-start",
        isUser ? "justify-end" : "justify-start"
      )}
    >
      {!isUser && <Avatar image={getAvatar(message)} />}
      <div className="flex flex-col max-w-[75%]">
        <div
          className={clsx(
            "p-3 rounded-lg shadow-md relative border border-gray-100",
            isUser
              ? "bg-emerald text-white rounded-bl-lg"
              : "bg-white text-dark rounded-br-lg"
          )}
        >
          <div className="text-sm whitespace-pre-wrap break-words">
            {message.content}
          </div>
          <div
            className={clsx(
              "absolute w-3 h-3 rotate-45",
              isUser
                ? "bg-emerald -right-1.5 top-[12px]"
                : "bg-white -left-1.5 top-[12px] border-b border-r border-gray-100"
            )}
          />
        </div>
        <div
          className={clsx(
            "text-xs mt-1 text-gray-500",
            isUser ? "text-right mr-2" : "ml-2"
          )}
        >
          {getMessageTime(message.createdAt || message.timestamp)}
        </div>
      </div>
      {isUser && <Avatar image={getAvatar(message)} />}
    </div>
  );

  const Avatar = ({ image }) => (
    <div className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0 shadow-md border-2 border-white mt-1 mx-2">
      {image ? (
        <Image
          src={image}
          width="w-full"
          height="h-full"
          className="object-cover"
        />
      ) : (
        <div className="bg-emerald flex items-center justify-center w-full h-full">
          <Icon name="user" color="white" size="1.2" />
        </div>
      )}
    </div>
  );

  const TypingIndicator = () => (
    <div className="flex items-start mb-4">
      <Avatar image={images.adminAvatar || images.fallBack} />
      <div className="flex flex-col max-w-[75%]">
        <div className="bg-white p-3 rounded-lg shadow-md relative rounded-br-lg border border-gray-100">
          <div className="flex space-x-2">
            {[0, 300, 600].map((delay) => (
              <div
                key={delay}
                className="w-2.5 h-2.5 bg-emerald rounded-full animate-pulse"
                style={{
                  animationDelay: `${delay}ms`,
                  animationDuration: "1s",
                }}
              />
            ))}
          </div>
          <div className="absolute w-3 h-3 rotate-45 bg-white -left-1.5 top-[12px] border-b border-r border-gray-100"></div>
        </div>
        <div className="text-xs mt-1 text-gray-500 ml-2">
          {new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </div>
      </div>
    </div>
  );

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  return (
    <div
      ref={messageAreaRef}
      className="flex-1 overflow-y-auto p-4 bg-gray-50"
      style={{
        backgroundImage: `url(${images.commentBg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundBlendMode: "overlay",
        backgroundColor: "rgba(255, 255, 255, 0.92)",
        boxShadow: "inset 0 0 20px rgba(0, 0, 0, 0.05)",
      }}
    >
      {messages.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-full text-gray-500">
          <div className="w-20 h-20 rounded-full bg-emerald/20 flex items-center justify-center mb-4 shadow-lg p-5 animate-pulse">
            <Icon name="send" color="emerald" size="2.5" />
          </div>
          <div className="text-center">
            {t("chat.startConversation") || "Start a conversation with admin"}
          </div>
        </div>
      ) : (
        <>
          {messages.map((message, index) => (
            <React.Fragment key={message._id || message.id}>
              {shouldShowDate(
                message.createdAt || message.timestamp,
                messages[index - 1]?.createdAt || messages[index - 1]?.timestamp
              ) && (
                <div className="flex justify-center my-4">
                  <div className="bg-gray-200 text-gray-600 text-xs px-3 py-1 rounded-full shadow-sm">
                    {getMessageDate(message.createdAt || message.timestamp)}
                  </div>
                </div>
              )}
              <MessageBubble
                message={message}
                isUser={getSenderRole(message.sender) === "user"}
              />
            </React.Fragment>
          ))}
          {isTyping && <TypingIndicator />}
        </>
      )}
      <div ref={messagesEndRef} />
    </div>
  );
};

export default React.memo(MessageArea);
