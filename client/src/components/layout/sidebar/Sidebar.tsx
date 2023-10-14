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
  getItem("Dashboard", "", <IconDashboard />),
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
        // Remove user_type, auth from local storage
        localStorage.removeItem("user_type");
        localStorage.removeItem("auth");
        // Navigate to the login page
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
      <Sider
        style={{
          height: "100vh",
          position: "fixed",
          paddingTop: 64,
          left: 0,
          top: 0,
          bottom: 0,
          backgroundColor: "#fff",
        }}
        width={240}
      >
        <Menu
          className="custom-menu"
          mode="inline"
          items={items ?? []}
          onClick={(item) => {
            setSelectedKey(item.key.toString());
            handleButtonClick(item.key.toString(), navigate);
            console.log("Item: ", item.key.toString());
            return item.key.toString();
          }}
          selectedKeys={[selectedKey]}
        />
      </Sider>
    </>
  );
};

export default Sidebar;
