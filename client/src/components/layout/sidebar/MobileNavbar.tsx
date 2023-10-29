import React, { useState } from "react";
import { Link,NavLink } from "react-router-dom";
import "./MobileNavbar.css";
import {
  IconDashboard,
  IconDeviceLaptop,
  IconBuildingSkyscraper,
  IconBookmarks,
  IconStar,
  IconSettings,
  IconUsers,
  IconInfoCircle,
  IconLogout2,
} from "@tabler/icons-react";

interface MenuItem {
  label: string;
  key: string;
  icon: React.ReactNode;
}

const menuItems: MenuItem[] = [
  { label: "Dashboard", key: "dashboard", icon: <NavLink to="/"><IconDashboard /></NavLink> },
  { label: "Jobs", key: "jobs", icon: <IconDeviceLaptop /> },
  { label: "Companies", key: "companies", icon: <IconBuildingSkyscraper /> },
  { label: "Talent", key: "candidates", icon: <IconStar /> },
  { label: "Associations", key: "associations", icon: <IconUsers /> },
  { label: "Short List", key: "saved", icon: <IconBookmarks /> },
  { label: "FAQ", key: "faq", icon: <IconInfoCircle /> },
  { label: "Settings", key: "settings", icon: <IconSettings /> },
  { label: "Logout", key: "logout", icon: <NavLink to="/login"><IconLogout2 /> </NavLink> },
];

const MobileNavbar: React.FC<{ handleMenuClick: (button: string) => void }> = ({ handleMenuClick: handleMenuClickProp }) => {
    const [collapsed, setCollapsed] = useState(true);
  const [selectedKey, setSelectedKey] = useState("");

  const handleMenuClick = (key: string) => {
    setSelectedKey(key);
    setCollapsed(true);
    console.log("menu clicked",key)
  };

  return (
    <div className={`mobile-navbar ${collapsed ? "collapsed" : ""}`}>
    <div className="menu-items">
    {menuItems.map((item) => (
  <div
    key={item.key}
    className={`menu-item ${selectedKey === item.key ? "active" : ""}`}
  >
    <NavLink to={item.key === "dashboard" ? "/" : `/${item.key}`} onClick={() => handleMenuClick(item.key)}>
      {item.key === "dashboard" ? (
        <>{item.icon}</>
      ) : (
        <>
          {item.icon}
          {collapsed ? null : <span>{item.label}</span>}
        </>
      )}
    </NavLink>
  </div>
))}

    </div>
    
  </div>
);
};

export default MobileNavbar;
