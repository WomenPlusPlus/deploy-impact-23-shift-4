import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
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
  IconMenu2,
} from "@tabler/icons-react";

interface MenuItem {
  label: string;
  key: string;
  icon: React.ReactNode;
}

const menuItems: MenuItem[] = [
  {
    label: "Dashboard",
    key: "dashboard",
    icon: (
      <NavLink to="/">
        <IconDashboard />
      </NavLink>
    ),
  },
  { label: "Jobs", key: "jobs", icon: <IconDeviceLaptop /> },
  { label: "Companies", key: "companies", icon: <IconBuildingSkyscraper /> },
  { label: "Talent", key: "candidates", icon: <IconStar /> },
  { label: "Associations", key: "associations", icon: <IconUsers /> },
  { label: "Short List", key: "saved", icon: <IconBookmarks /> },
  { label: "FAQ", key: "faq", icon: <IconInfoCircle /> },
  { label: "Settings", key: "settings", icon: <IconSettings /> },
  {
    label: "Logout",
    key: "logout",
    icon: (
      <NavLink to="/login">
        <IconLogout2 />
      </NavLink>
    ),
  },
];

const MobileNavbar: React.FC<{ handleMenuClick: (button: string) => void }> = ({
  handleMenuClick: handleMenuClickProp,
}) => {
  const [collapsed, setCollapsed] = useState(true);
  const [selectedKey, setSelectedKey] = useState("");
  const [showSubMenu, setShowSubMenu] = useState(false);
  const [menuItemsToShow, setMenuItemsToShow] = useState(menuItems.slice(0, 5));

  const handleMenuClick = (key: string, label: string) => {
    if (key === "menu") {
      setShowSubMenu(!showSubMenu);
      setMenuItemsToShow(
        showSubMenu ? menuItems.slice(0, 5) : menuItems.slice(5, 9)
      );
    } else {
      setSelectedKey(key);
      setCollapsed(true);
      console.log("Menü tıklandı", key, label);
    }
  };

  useEffect(() => {
    setMenuItemsToShow(menuItems.slice(0, 5));
  }, []);

  return (
    <div className={`mobile-navbar ${collapsed ? "collapsed" : ""}`}>
      <div className="menu-items">
        {menuItemsToShow.map((item, index) => (
          <div
            key={item.key}
            className={`menu-item ${selectedKey === item.key ? "active" : ""}`}
            style={{ zIndex: index }}
          >
            <NavLink
              to={item.key === "dashboard" ? "/" : `/${item.key}`}
              onClick={() => handleMenuClick(item.key, item.label)}
            >
              <>
                {item.icon}
                {collapsed ? null : <span>{item.label}</span>}
              </>
            </NavLink>
          </div>
        ))}
        <div className="menu-item">
          <div
            onClick={() => handleMenuClick("menu", "Menu")}
            style={{
              cursor: "pointer",
            }}
          >
            <IconMenu2 />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileNavbar;
