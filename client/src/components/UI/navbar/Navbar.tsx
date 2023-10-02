import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Layout, Input } from "antd";
import { DropdownComponent } from "../dropdown/Dropdown";
import {
  IconBookmark,
  IconBell,
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
              <IconBell color="#696969" />
              <IconBookmark color="#696969" />
              <DropdownComponent
                icon={<IconUser color="#696969" />}
                items={[
                  {
                    key: "1",
                    label: (
                      <>
                        <IconUser color="#696969" /> Profile
                      </>
                    ),
                  },
                  {
                    key: "2",
                    label: (
                      <>
                        <IconLogout color="#696969" /> Logout
                      </>
                    ),
                    onClick: logout,
                  },
                ]}
                placement="bottom"
              />
            </div>
          </div>

          <div className="mobileMenu">
            <DropdownComponent
              icon={<IconMenu2 color="#696969" />}
              items={[
                {
                  key: "1",
                  label: (
                    <>
                      <IconUser color="#696969" /> Profile
                    </>
                  ),
                },
                {
                  key: "2",
                  label: (
                    <>
                      <IconBookmark color="#696969" /> Saved
                    </>
                  ),
                },
                {
                  key: "3",
                  label: (
                    <>
                      <IconBell color="#696969" /> Notifications
                    </>
                  ),
                },
                {
                  key: "4",
                  label: (
                    <>
                      <IconLogout color="#696969" /> Logout
                    </>
                  ),
                  onClick: logout,
                },
              ]}
              placement="bottom"
            />
          </div>
        </Layout.Header>
      </Layout>
    </nav>
  );
};

export default Navbar;
