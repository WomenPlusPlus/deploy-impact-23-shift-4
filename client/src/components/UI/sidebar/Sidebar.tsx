import React, { useState } from "react";
import {
  AppstoreOutlined,
  MailOutlined,
  SettingOutlined,
  HeartOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Menu } from "antd";
import { useNavigate } from "react-router-dom";
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
  getItem("Dashboard", "dashboard", <MailOutlined />),
  getItem("Jobs", "jobs", <AppstoreOutlined />),
  getItem("Companies", "companies", <SettingOutlined />),
  getItem("Saved", "saved", <HeartOutlined />),
];

interface SidebarProps {
  selectedKey: string;
  setSelectedKey: (key: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ selectedKey, setSelectedKey }) => {
  // state
  const navigate = useNavigate();

  return (
    // <div className="sidebar">
    <Menu
      className="custom-menu"
      mode="inline"
      items={items}
      onSelect={(item) => {
        console.log(item.key);
        setSelectedKey(item.key);
        return item.key;
      }}
    />
    // </div>
  );
};

export default Sidebar;
