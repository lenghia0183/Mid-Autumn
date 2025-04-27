import React, { memo } from "react";

/**
 * Date separator component for messages
 * @param {Object} props - Component props
 * @param {string} props.date - Formatted date string
 * @returns {JSX.Element} - Rendered component
 */
const DateSeparator = ({ date }) => (
  <div className="flex justify-center my-4">
    <div className="bg-gray-200 text-gray-600 text-xs px-3 py-1 rounded-full shadow-sm">
      {date}
    </div>
  </div>
);

export default memo(DateSeparator);
