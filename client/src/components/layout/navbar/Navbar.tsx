import { Layout, Input } from "antd";
import { IconBookmark } from "@tabler/icons-react";

import Avatar from "../../UI/avatar/Avatar";

import logo from "../../../media/shift-logo.jpg";

import "./Navbar.css";

const Navbar = () => {
  const { Search } = Input;

  return (
    <nav className="navbar">
      <Layout>
        <Layout.Header className="nav-header">
          <div className="navbar-menu">
            <img
              className="logo"
              alt="logo"
              style={{ width: 120, height: 35 }}
              src={String(logo)}
            />
            <div className="leftMenu">
              <Search
                placeholder="Enter a job title, name o keyword"
                style={{ position: "relative", width: 300 }}
              />
            </div>

            <div className="rightMenu">
              <IconBookmark color="var(--gray-medium)" />
              {/* TODO: update names with login profile */}
              <Avatar firstName="Laura" lastName="Purcaro" size="large" />
            </div>
          </div>
        </Layout.Header>
      </Layout>
    </nav>
  );
};

export default Navbar;
