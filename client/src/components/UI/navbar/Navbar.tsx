import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Layout, Drawer, Menu, Input } from "antd";
import {
  IconBookmark,
  IconBell,
  IconUser,
  IconLogout,
} from "@tabler/icons-react";

import "./Navbar.css";
import logo from "../../../media/shift-logo-morado.png";

const Navbar = () => {
  const { Search } = Input;

  const [visible, setVisible] = useState(false);
  const showDrawer = () => {
    setVisible(!visible);
  };

  // If you do not want to auto-close the mobile drawer when a path i∏s selected
  // Delete or comment out the code block below
  // From here
  let { pathname: location } = useLocation();
  useEffect(() => {
    setVisible(false);
  }, [location]);
  // Upto here

  return (
    <nav className="navbar">
      <Layout>
        <Layout.Header className="nav-header">
          <img
            className="logo"
            alt="logo"
            style={{ width: 160 }}
            src={String(logo)}
          />

          <div className="navbar-menu">
            <div className="leftMenu">
              <Search
                placeholder="Enter a job title, name o keyword"
                style={{ position: "relative", width: 300 }}
              />
            </div>

            <div className="rightMenu">
              <Menu mode={"horizontal"}>
                <Menu.Item>
                  <IconBell color="#696969" />
                </Menu.Item>
                <Menu.Item>
                  <IconBookmark color="#696969" />
                </Menu.Item>
                <Menu.SubMenu title={<IconUser color="#696969" />}>
                  <Menu.Item key="about-us">
                    <IconUser /> Profile
                  </Menu.Item>
                  <Menu.Item key="log-out">
                    <IconLogout /> Logout
                  </Menu.Item>
                </Menu.SubMenu>
              </Menu>
            </div>

            <Drawer
              title={"Brand Here"}
              placement="right"
              closable={true}
              onClose={showDrawer}
              visible={visible}
              style={{ zIndex: 99999 }}
            >
              <Menu mode={"inline"}>
                <Menu.Item key="explore">Explore</Menu.Item>
                <Menu.Item key="features">Features</Menu.Item>
                <Menu.Item key="about">About Us</Menu.Item>
                <Menu.Item key="contact">Contact Us</Menu.Item>
              </Menu>

              <Menu mode={"inline"}>
                <Menu.SubMenu title={<IconUser />}>
                  <Menu.Item key="about-us">
                    <IconUser /> Profile
                  </Menu.Item>
                  <Menu.Item key="log-out">
                    <IconLogout /> Logout
                  </Menu.Item>
                </Menu.SubMenu>
              </Menu>
            </Drawer>
          </div>
        </Layout.Header>
      </Layout>
    </nav>
  );
};

export default Navbar;
