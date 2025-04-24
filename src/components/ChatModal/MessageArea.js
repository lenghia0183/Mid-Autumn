import React from "react";
import { useTranslation } from "react-i18next";
import clsx from "clsx";
import Icon from "../Icon";
import Image from "../Image";
import images from "../../asset/images";

const MessageArea = ({ messages, isTyping, user, messageAreaRef, messagesEndRef }) => {
  const { t } = useTranslation();

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
            {t("chat.startConversation") ||
              "Start a conversation with admin"}
          </div>
        </div>
      ) : (
        <>
          {messages.map((message) => (
            <div
              key={message.id}
              className={clsx(
                "mb-4 flex",
                message.sender === "user"
                  ? "justify-end items-start"
                  : "justify-start items-start"
              )}
            >
              {message.sender !== "user" && (
                <div className="w-10 h-10 rounded-full bg-emerald flex items-center justify-center mr-2 flex-shrink-0 shadow-md border-2 border-white mt-1">
                  <Icon name="user" color="white" size="1.2" />
                </div>
              )}
              <div className="flex flex-col max-w-[75%]">
                <div
                  className={clsx(
                    "p-3 shadow-md transition-all relative",
                    message.sender === "user"
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
                      message.sender === "user"
                        ? "bg-emerald -right-1.5 top-[12px]"
                        : "bg-white -left-1.5 top-[12px] border-b border-r border-gray-100"
                    )}
                  ></div>
                </div>
                <div
                  className={clsx(
                    "text-xs mt-1",
                    message.sender === "user"
                      ? "text-gray-500 text-right mr-2"
                      : "text-gray-500 ml-2"
                  )}
                >
                  {new Date(message.timestamp).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </div>
              </div>
              {message.sender === "user" && (
                <div className="w-10 h-10 rounded-full overflow-hidden ml-2 flex-shrink-0 shadow-md border-2 border-white mt-1">
                  <Image
                    src={user?.user?.avatar || images.fallBack}
                    width="w-full"
                    height="h-full"
                    className="object-cover"
                  />
                </div>
              )}
            </div>
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
