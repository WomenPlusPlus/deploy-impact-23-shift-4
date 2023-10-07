import React from "react";
import {
  IconLogout2,
  IconDashboard,
  IconDeviceLaptop,
  IconBuildingSkyscraper,
  IconBookmark,
  IconStar,
} from "@tabler/icons-react";
import type { MenuProps } from "antd";
import { Menu } from "antd";
import "./Sidebar.css";

type MenuItem = Required<MenuProps>["items"][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  items?: MenuItem[],
  type?: "group"
): MenuItem {
  return {
    key,
    icon,
    items,
    label,
    type,
  } as MenuItem;
}

const items: MenuItem[] = [
  getItem("Dashboard", "dashboard", <IconDashboard />),
  getItem("Jobs", "jobs", <IconDeviceLaptop />),
  getItem("Companies", "companies", <IconBuildingSkyscraper />),
  getItem("Talent", "candidates", <IconStar />),
  getItem("Saved", "saved", <IconBookmark />),
  getItem("Logout", "logout", <IconLogout2 />),
];

interface SidebarProps {
  selectedKey: string;
  setSelectedKey: (key: string) => void;
  onLogoutClick?: () => void; // Add onLogoutClick prop
}

const Sidebar: React.FC<SidebarProps> = ({
  selectedKey,
  setSelectedKey,
  onLogoutClick,
}) => {
  return (
    <>
      <Menu
        className="custom-menu"
        mode="inline"
        items={items}
        onSelect={(item) => {
          console.log(item.key);
          setSelectedKey(item.key);
          return item.key;
        }}
        onClick={(item) => {
          if (item.key === "logout" && onLogoutClick) {
            onLogoutClick();
          }
        }}
        selectedKeys={[selectedKey]}
      />
    </>
  );
};

export default Sidebar;
