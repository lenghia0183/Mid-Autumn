import React from "react";
import { useTranslation } from "react-i18next";
import clsx from "clsx";
import Icon from "../Icon";
import Image from "../Image";
import images from "../../asset/images";

const MessageArea = ({
  messages,
  isTyping,
  user,
  messageAreaRef,
  messagesEndRef,
}) => {
  const { t } = useTranslation();

  const isCurrentUser = (message) => {
    if (typeof message.sender === "object") {
      return message.sender.role === "user";
    }

    return message.sender === "user";
  };

  const getAvatar = (message) => {
    if (message?.sender.avatar) {
      return message.sender.avatar;
    }
    return user?.user?.avatar || images.fallBack;
  };

  const getMessageTime = (message) => {
    const timestamp = message.createdAt || message.timestamp;
    return new Date(timestamp).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getMessageDate = (message) => {
    const timestamp = message.createdAt || message.timestamp;
    const date = new Date(timestamp);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    if (date.toDateString() === today.toDateString()) {
      return "Hôm nay";
    } else if (date.toDateString() === yesterday.toDateString()) {
      return "Hôm qua";
    } else {
      return date.toLocaleDateString("vi-VN", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      });
    }
  };

  const shouldShowDate = (message, index) => {
    if (index === 0) return true;

    const currentDate = new Date(message.createdAt || message.timestamp);
    const prevDate = new Date(
      messages[index - 1].createdAt || messages[index - 1].timestamp
    );

    return currentDate.toDateString() !== prevDate.toDateString();
  };

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
              {/* Hiển thị ngày khi cần thiết */}
              {shouldShowDate(message, index) && (
                <div className="flex justify-center my-4">
                  <div className="bg-gray-200 text-gray-600 text-xs px-3 py-1 rounded-full shadow-sm">
                    {getMessageDate(message)}
                  </div>
                </div>
              )}

              {/* Tin nhắn */}
              <div
                className={clsx(
                  "mb-4 flex",
                  isCurrentUser(message)
                    ? "justify-end items-start"
                    : "justify-start items-start"
                )}
              >
                {!isCurrentUser(message) && (
                  <div className="w-10 h-10 rounded-full bg-emerald flex items-center justify-center mr-2 flex-shrink-0 shadow-md border-2 border-white mt-1">
                    <Icon name="user" color="white" size="1.2" />
                  </div>
                )}
                <div className="flex flex-col max-w-[75%]">
                  <div
                    className={clsx(
                      "p-3 shadow-md transition-all relative",
                      isCurrentUser(message)
                        ? "bg-emerald text-white rounded-tl-lg rounded-tr-lg rounded-bl-lg"
                        : "bg-white text-dark rounded-tr-lg rounded-tl-lg rounded-br-lg border border-gray-100"
                    )}
                  >
                    <div className="text-sm whitespace-pre-wrap break-words">
                      {message.content}
                    </div>

                    {/* Arrow pointer */}
                    <div
                      className={clsx(
                        "absolute w-3 h-3 rotate-45",
                        isCurrentUser(message)
                          ? "bg-emerald -right-1.5 top-[12px]"
                          : "bg-white -left-1.5 top-[12px] border-b border-r border-gray-100"
                      )}
                    ></div>
                  </div>
                  <div
                    className={clsx(
                      "text-xs mt-1",
                      isCurrentUser(message)
                        ? "text-gray-500 text-right mr-2"
                        : "text-gray-500 ml-2"
                    )}
                  >
                    {getMessageTime(message)}
                  </div>
                </div>
                {isCurrentUser(message) && (
                  <div className="w-10 h-10 rounded-full overflow-hidden ml-2 flex-shrink-0 shadow-md border-2 border-white mt-1">
                    <Image
                      src={getAvatar(message)}
                      width="w-full"
                      height="h-full"
                      className="object-cover"
                    />
                  </div>
                )}
              </div>
            </React.Fragment>
          ))}
          {isTyping && (
            <div className="flex items-start mt-2 mb-4">
              <div className="w-10 h-10 rounded-full bg-emerald flex items-center justify-center mr-2 shadow-md border-2 border-white mt-1">
                <Icon name="user" color="white" size="1.2" />
              </div>
              <div className="flex flex-col max-w-[75%]">
                <div className="bg-white p-3 rounded-tr-lg rounded-tl-lg rounded-br-lg shadow-md inline-block relative">
                  <div className="flex space-x-2">
                    <div
                      className="w-2.5 h-2.5 bg-emerald rounded-full animate-pulse"
                      style={{
                        animationDelay: "0ms",
                        animationDuration: "1s",
                      }}
                    ></div>
                    <div
                      className="w-2.5 h-2.5 bg-emerald rounded-full animate-pulse"
                      style={{
                        animationDelay: "300ms",
                        animationDuration: "1s",
                      }}
                    ></div>
                    <div
                      className="w-2.5 h-2.5 bg-emerald rounded-full animate-pulse"
                      style={{
                        animationDelay: "600ms",
                        animationDuration: "1s",
                      }}
                    ></div>
                  </div>

                  {/* Arrow pointer */}
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
          )}
        </>
      )}
      <div ref={messagesEndRef} />
    </div>
  );
};

export default React.memo(MessageArea);
