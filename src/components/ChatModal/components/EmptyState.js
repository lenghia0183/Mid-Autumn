import React, { memo } from "react";
import Icon from "../../Icon";

/**
 * Empty state component when no messages are present
 * @param {Object} props - Component props
 * @param {string} props.message - Message to display
 * @returns {JSX.Element} - Rendered component
 */
const EmptyState = ({ message }) => (
  <div className="flex flex-col items-center justify-center h-full text-gray-500">
    <div className="w-20 h-20 rounded-full bg-emerald/20 flex items-center justify-center mb-4 shadow-lg p-5 animate-pulse">
      <Icon name="send" color="emerald" size="2.5" />
    </div>
    <div className="text-center">{message}</div>
  </div>
);

export default memo(EmptyState);
