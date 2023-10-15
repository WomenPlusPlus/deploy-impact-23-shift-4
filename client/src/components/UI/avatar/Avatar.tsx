import React from "react";
import { Avatar as AntAvatar } from "antd";

interface AvatarProps {
  firstName?: string;
  lastName?: string;
  size?: "large" | "small" | "default" | number;
  handleProfileClick?: () => void;
}

const Avatar: React.FC<AvatarProps> = ({
  firstName = "",
  lastName = "",
  size,
  handleProfileClick,
}) => {
  const initials = `${firstName?.charAt(0)}${lastName?.charAt(0)}`;

  return (
    <>
      <AntAvatar
        onClick={handleProfileClick}
        style={{
          backgroundColor: `var(--background-avatar)`,
          verticalAlign: "middle",
          cursor: "pointer",
        }}
        size={size}
      >
        {initials}
      </AntAvatar>
    </>
  );
};

export default Avatar;
