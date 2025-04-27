import React, { memo } from "react";
import clsx from "clsx";

/**
 * Message bubble component
 * @param {Object} props - Component props
 * @param {Object} props.message - Message object
 * @param {boolean} props.isUser - Whether the message is from the current user
 * @param {JSX.Element} props.avatar - Avatar component
 * @param {string} props.time - Formatted time string
 * @returns {JSX.Element} - Rendered component
 */
const MessageBubble = ({ message, isUser, avatar, time }) => (
  <div
    className={clsx(
      "mb-4 flex items-start",
      isUser ? "justify-end" : "justify-start"
    )}
  >
    {!isUser && <div className="mt-1">{avatar}</div>}
    <div className="flex flex-col max-w-[75%]">
      <div
        className={clsx(
          "p-3 rounded-lg shadow-md relative border",
          isUser
            ? "bg-emerald text-white rounded-bl-lg border-emerald/20"
            : "bg-white text-dark rounded-br-lg border-gray-100"
        )}
      >
        <div className="text-sm whitespace-pre-wrap break-words">
          {message.content}
        </div>
        <div
          className={clsx(
            "absolute w-4 h-4 rotate-45",
            isUser
              ? "bg-emerald -right-1.5 top-3 border-t border-r border-emerald/20"
              : "bg-white -left-1.5 top-3 border-b border-l border-gray-100"
          )}
        />
      </div>
      <div
        className={clsx(
          "text-xs mt-1 text-gray-500",
          isUser ? "text-right mr-2" : "ml-2"
        )}
      >
        {time}
      </div>
    </div>
    {isUser && <div className="mt-1">{avatar}</div>}
  </div>
);

export default memo(MessageBubble);
