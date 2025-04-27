import React, { memo } from "react";
import Image from "../../Image";
import Icon from "../../Icon";

/**
 * Avatar component for chat messages
 * @param {Object} props - Component props
 * @param {string} props.image - URL of the avatar image
 * @returns {JSX.Element} - Rendered component
 */
const Avatar = ({ image }) => (
  <div className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0 shadow-md border-2 border-white mx-2">
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

export default memo(Avatar);
