import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Layout, Input } from "antd";
import Overlay from "../overlay/Overlay";
import Avatar from "../avatar/Avatar";
import {
  IconBookmark,
  IconUser,
  IconLogout,
  IconMenu2,
} from "@tabler/icons-react";

import logo from "../../../media/shift-logo-morado.png";

import "./Navbar.css";

const Navbar = () => {
  const navigate = useNavigate();

  const { Search } = Input;

  const logout = () => {
    // Send logout request to the backend
    axios
      .get("/api/logout", { withCredentials: true })
      .then((response) => {
        // Handle the backend response here
        console.log("Backend Response:", response.data);
        console.log("Response", response.status);
        navigate("/login");
      })
      .catch((error) => {
        // Handle any errors here
        if (error.response) {
          console.error("HTTP Status Code:", error.response.status);
          console.error("Response Data:", error.response.data);
        } else {
          console.error("Network Error:", error.message);
        }
      });
  };

  const profileOverlay = (
    <>
      <div className="options">
        <IconUser color="var(--color-1)" /> Profile
      </div>
      <div className="options" onClick={logout}>
        <IconLogout color="var(--color-1)" /> Logout
      </div>
    </>
  );

  const mobileProfileOverlay = (
    <>
      <div className="options">
        <IconUser color="var(--color-1)" /> Profile
      </div>
      <div className="options">
        <IconBookmark color="var(--color-1)" /> Short List
      </div>
      <div className="options" onClick={logout}>
        <IconLogout color="var(--color-1)" /> Logout
      </div>
    </>
  );

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
              <IconBookmark color="var(--color-1)" />
              <Overlay
                icon={
                  //TODO: update names with login profile
                  <Avatar firstName="Laura" lastName="Purcaro" size="large" />
                }
                content={profileOverlay}
              />
            </div>
          </div>

          <div className="mobileMenu">
            <Overlay
              icon={<IconMenu2 color="var(--color-1)" />}
              content={mobileProfileOverlay}
            />
          </div>
        </Layout.Header>
      </Layout>
    </nav>
  );
};

export default Navbar;
