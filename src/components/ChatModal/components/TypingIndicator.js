import React, { memo } from "react";

/**
 * Typing indicator component
 * @param {Object} props - Component props
 * @param {JSX.Element} props.avatar - Avatar component
 * @param {string} props.time - Formatted time string
 * @returns {JSX.Element} - Rendered component
 */
const TypingIndicator = ({ avatar, time }) => (
  <div className="flex items-start mb-4">
    <div className="mt-1">{avatar}</div>
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
        <div className="absolute w-4 h-4 rotate-45 bg-white -left-1.5 top-3 border-b border-l border-gray-100"></div>
      </div>
      <div className="text-xs mt-1 text-gray-500 ml-2">{time}</div>
    </div>
  </div>
);

export default memo(TypingIndicator);
