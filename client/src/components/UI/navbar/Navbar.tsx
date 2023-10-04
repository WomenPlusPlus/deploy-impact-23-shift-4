import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Layout, Drawer, Menu, Input, Button } from "antd";
import {
  IconBookmark,
  IconBell,
  IconUser,
  IconLogout,
  IconMenu2,
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
                <Menu.Item key="notifications">
                  <IconBell color="#696969" />
                </Menu.Item>
                <Menu.Item key="save">
                  <IconBookmark color="#696969" />
                </Menu.Item>
                <Menu.SubMenu key="profile" title={<IconUser color="#696969" />}>
                  <Menu.Item key="about-us">
                    <IconUser /> Profile
                  </Menu.Item>
                  <Menu.Item key="log-out">
                    <IconLogout /> Logout
                  </Menu.Item>
                </Menu.SubMenu>
              </Menu>
            </div>

            <Button className="menuButton" onClick={showDrawer}>
              <IconMenu2 color="#696969" />
            </Button>

            <Drawer
              title={"Brand Here"}
              placement="right"
              closable={true}
              onClose={showDrawer}
              open={visible}
              style={{ zIndex: 99999 }}
            >
              <Menu mode={"inline"}>
                <Menu.Item key="about-us">
                  <IconUser color="#696969" /> Profile
                </Menu.Item>
                <Menu.Item>
                  <IconBookmark color="#696969" /> Saved
                </Menu.Item>
                <Menu.Item>
                  <IconBell color="#696969" /> Notifications
                </Menu.Item>
                <Menu.Item key="log-out">
                  <IconLogout color="#696969" /> Logout
                </Menu.Item>
              </Menu>
            </Drawer>
          </div>
        </Layout.Header>
      </Layout>
    </nav>
  );
};

export default Navbar;
