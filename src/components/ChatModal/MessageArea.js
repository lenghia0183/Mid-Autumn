import React, { useEffect, useRef, memo } from "react";
import { useTranslation } from "react-i18next";
import images from "../../asset/images";
import { useChat, useUser } from "../../context";

// Import utility functions
import {
  getSenderRole,
  getMessageTime,
  getMessageDate,
  shouldShowDate,
  getAvatar as getAvatarUtil,
} from "../../utils/chatUtils";

// Import components
import {
  Avatar,
  DateSeparator,
  MessageBubble,
  TypingIndicator,
  EmptyState,
} from "./components";

/**
 * Main message area component
 */
const MessageArea = () => {
  const { t } = useTranslation();
  const messagesEndRef = useRef(null);
  const messageAreaRef = useRef(null);

  const { user } = useUser();
  const { messages, isAdminTyping: isTyping } = useChat();

  // Get avatar for a message using the utility function
  const getAvatar = (message) => getAvatarUtil(message, user, images);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isTyping]);

  return (
    <div
      ref={messageAreaRef}
      className="flex-1 overflow-y-auto p-4 bg-gray-50"
      style={{
        backgroundImage: `url(${images.commentBg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundBlendMode: "overlay",
        backgroundColor: "rgba(255, 255, 255, 0.95)",
        boxShadow: "inset 0 0 20px rgba(0, 0, 0, 0.05)",
      }}
    >
      {messages.length === 0 ? (
        <EmptyState
          message={
            t("chat.startConversation") || "Start a conversation with admin"
          }
        />
      ) : (
        <>
          {messages.map((message, index) => {
            const isUser = getSenderRole(message.sender) === "user";
            const timestamp = message.createdAt || message.timestamp;
            const prevTimestamp =
              messages[index - 1]?.createdAt || messages[index - 1]?.timestamp;
            const showDate = shouldShowDate(timestamp, prevTimestamp);

            return (
              <React.Fragment key={message._id || message.id || index}>
                {showDate && <DateSeparator date={getMessageDate(timestamp)} />}
                <MessageBubble
                  message={message}
                  isUser={isUser}
                  avatar={<Avatar image={getAvatar(message)} />}
                  time={getMessageTime(timestamp)}
                />
              </React.Fragment>
            );
          })}

          {isTyping && (
            <TypingIndicator
              avatar={<Avatar image={images.adminAvatar || images.fallBack} />}
              time={getMessageTime(new Date())}
            />
          )}
        </>
      )}
      <div ref={messagesEndRef} />
    </div>
  );
};

export default memo(MessageArea);
