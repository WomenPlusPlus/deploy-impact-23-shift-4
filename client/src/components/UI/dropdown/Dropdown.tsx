import React from "react";
import { ConfigProvider, Dropdown } from "antd";
import "./Dropdown.css";

interface DropdownProps {
  icon: React.ReactNode;
  items: ItemType[];
  placement:
    | "topLeft"
    | "topCenter"
    | "topRight"
    | "bottomLeft"
    | "bottomCenter"
    | "bottomRight"
    | "top"
    | "bottom";
}

interface ItemType {
  key: string;
  label: React.ReactNode;
  onClick?: () => void;
}

const DropdownComponent: React.FC<DropdownProps> = ({
  icon,
  items,
  placement,
}) => (
  <ConfigProvider
    theme={{
      components: {
        Dropdown: {
          zIndexPopup: 1000,
        },
      },
    }}
  >
    <Dropdown
      menu={{ items }}
      placement={placement}
      overlayStyle={{ width: "15rem" }}
    >
      {icon}
    </Dropdown>
  </ConfigProvider>
);

export { DropdownComponent };
