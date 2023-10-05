import React from "react";
import { Avatar as AntAvatar } from "antd";

interface AvatarProps {
  firstName: string;
  lastName: string;
  size: "large" | "small" | "default" | number;
  url?: string;
}

const Avatar: React.FC<AvatarProps> = ({ firstName, lastName, size, url }) => {
  const initials = `${firstName.charAt(0)}${lastName.charAt(0)}`;

  const backgroundColor = `rgb(96, 90, 140)`;

  return (
    <>
      <AntAvatar
        style={{ backgroundColor: backgroundColor, verticalAlign: "middle" }}
        size={size}
      >
        {initials}
      </AntAvatar>
    </>
  );
};

export default Avatar;
