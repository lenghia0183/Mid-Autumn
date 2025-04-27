import React, { useState, useEffect } from "react";
import Icon from "../Icon";
import { useChat } from "../../context/chatContext";
import clsx from "clsx";

const ChatButton = () => {
  const { openChat, messages } = useChat();
  const [hasNewMessages, setHasNewMessages] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (
      messages.length > 0 &&
      messages[messages.length - 1].sender === "admin"
    ) {
      setHasNewMessages(true);
      setIsAnimating(true);

      const timer = setTimeout(() => {
        setIsAnimating(false);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [messages]);

  const handleOpenChat = () => {
    setHasNewMessages(false);
    openChat();
  };

  return (
    <div
      onClick={handleOpenChat}
      className={clsx(
        "fixed bottom-20 right-5 z-50 cursor-pointer flex items-center justify-center transition-all duration-300 hover:scale-110",
        isAnimating && "animate-bounce"
      )}
    >
      <div className="relative flex items-center justify-center w-[50px] h-[50px] rounded-full bg-emerald shadow-xl">
        <div className="absolute inset-0 rounded-full bg-emerald"></div>
        {hasNewMessages && (
          <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center text-white text-xs font-bold animate-pulse">
            !
          </span>
        )}
        <div className="absolute inset-[2px] bg-emerald rounded-full flex items-center justify-center text-white text-lg shadow-inner">
          <Icon name="send" size="1.8" className="transform -rotate-45" />
        </div>
      </div>

      {/* Tooltip */}
      <div className="absolute -top-10 right-0 bg-white px-3 py-1.5 rounded-lg shadow-lg text-sm font-medium text-emerald opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
        Chat with us
      </div>
    </div>
  );
};

export default ChatButton;
