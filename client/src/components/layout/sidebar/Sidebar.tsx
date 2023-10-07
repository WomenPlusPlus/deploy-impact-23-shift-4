import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Layout as AntLayout, Menu } from "antd";
import type { MenuProps } from "antd";
import {
  IconLogout2,
  IconDashboard,
  IconDeviceLaptop,
  IconBuildingSkyscraper,
  IconBookmark,
  IconStar,
} from "@tabler/icons-react";

import "./Sidebar.css";

const { Sider } = AntLayout;

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
}

const siderStyle: React.CSSProperties = {
  textAlign: "center",
  lineHeight: "120px",
  color: "#fff",
  backgroundColor: "#fff",
};

const logoutError = () =>
  toast.error("Logout error", {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
  });

const handleButtonClick = async (
  button: string,
  navigate: any
): Promise<void> => {
  try {
    if (button === "logout") {
      try {
        // Send logout request to the backend (you'll need to replace the URL and method)
        await axios.get("/api/logout", { withCredentials: true });
        console.log("Logout Successful");
        navigate("/login");
      } catch (error) {
        logoutError();
      }
    } else {
      navigate(`/${button}`);
    }
  } catch (error) {
    console.error("Button Click Error:", error);
  }
};

const Sidebar: React.FC<SidebarProps> = ({ selectedKey, setSelectedKey }) => {
  // state
  const navigate = useNavigate();

  return (
    <>
      <Sider width={256} style={siderStyle}>
        <Menu
          className="custom-menu"
          mode="inline"
          items={items ?? []}
          onClick={(item) => {
            setSelectedKey(item.key.toString());
            handleButtonClick(item.key.toString(), navigate);
            return item.key.toString();
          }}
          selectedKeys={[selectedKey]}
        />
      </Sider>
    </>
  );
};

export default Sidebar;
