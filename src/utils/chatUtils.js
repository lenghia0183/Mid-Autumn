/**
 * Utility functions for chat functionality
 */

/**
 * Get the role of a message sender
 * @param {Object|string} sender - The sender object or string
 * @returns {string} - The role of the sender
 */
export const getSenderRole = (sender) =>
  typeof sender === "object" ? sender.role : sender;

/**
 * Get the formatted time from a timestamp
 * @param {string} timestamp - ISO timestamp
 * @returns {string} - Formatted time (HH:MM)
 */
export const getMessageTime = (timestamp) => {
  const date = new Date(timestamp);
  return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
};

/**
 * Get the formatted date from a timestamp
 * @param {string} timestamp - ISO timestamp
 * @returns {string} - Formatted date (Today, Yesterday, or DD/MM/YYYY)
 */
export const getMessageDate = (timestamp) => {
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

/**
 * Determine if a date separator should be shown between messages
 * @param {string} curr - Current message timestamp
 * @param {string} prev - Previous message timestamp
 * @returns {boolean} - Whether to show a date separator
 */
export const shouldShowDate = (curr, prev) => {
  if (!prev) return true;
  const currentDate = new Date(curr);
  const previousDate = new Date(prev);
  return currentDate.toDateString() !== previousDate.toDateString();
};

/**
 * Get the avatar for a message sender
 * @param {Object} message - The message object
 * @param {Object} user - The current user
 * @param {Object} images - The images object with fallback and admin avatar
 * @returns {string} - URL of the avatar image
 */
export const getAvatar = (message, user, images) => {
  if (message?.sender?.avatar) return message.sender.avatar;
  if (getSenderRole(message.sender) === "user") {
    return user?.user?.avatar || images.fallBack;
  }
  return images.adminAvatar || images.fallBack;
};
