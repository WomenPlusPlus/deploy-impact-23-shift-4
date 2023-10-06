import React, { useState, useEffect } from "react";
import { Layout, Space } from "antd";
import Navbar from "../UI/navbar/Navbar";
import Sidebar from "../UI/sidebar/Sidebar";
import { DashboardCandidate } from "./DashboardCandidate";
import { Companies } from "./Companies";
import { Jobs } from "./Jobs";
import { Saved } from "./Saved";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const { Header, Footer, Sider, Content } = Layout;

const headerStyle: React.CSSProperties = {
  textAlign: "center",
};

const contentStyle: React.CSSProperties = {
  minHeight: 120,
  color: "#fff",
  backgroundColor: "#fff",
};

const siderStyle: React.CSSProperties = {
  textAlign: "center",
  lineHeight: "120px",
  color: "#fff",
  backgroundColor: "#fff",
};

const footerStyle: React.CSSProperties = {
  textAlign: "center",
  color: "#fff",
  backgroundColor: "#7dbcea",
};

const LayoutC = () => {
  const [selectedComponent, setSelectedComponent] = useState("dashboard");
  const navigate = useNavigate();

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

  const handleLogout = async () => {
    try {
      // Send logout request to the backend (you'll need to replace the URL and method)
      await axios.get("/api/logout", { withCredentials: true });
      console.log("Logout Successful");
      navigate("/login");
    } catch (error) {
      console.error("Logout Error:", error);
      logoutError();
      // Handle logout error here
    }
  };

  // Use a switch statement or if/else statements to determine which component to render
  let componentToRender;

  switch (selectedComponent) {
    case "dashboard":
      componentToRender = <DashboardCandidate />;
      break;
    case "jobs":
      componentToRender = <Jobs />;
      break;
    case "companies":
      componentToRender = <Companies />;
      break;
    case "saved":
      componentToRender = <Saved />;
      break;
    default:
      componentToRender = (
        <div>
          <DashboardCandidate />
        </div>
      );
  }

  return (
    <Space direction="vertical" style={{ width: "100%" }} size={[0, 48]}>
      <Layout>
        <Navbar />
        <Layout hasSider>
          <Sider width={256} style={siderStyle}>
            <Sidebar
              selectedKey={selectedComponent}
              setSelectedKey={setSelectedComponent}
              // Add an onClick handler for the "logout" menu item
              onLogoutClick={() => {
                setSelectedComponent("logout");
                handleLogout();
              }}
            />
          </Sider>
          <ToastContainer theme="light" />
          <Content style={contentStyle}>{componentToRender}</Content>
        </Layout>
        <Footer style={footerStyle}>Footer</Footer>
      </Layout>
    </Space>
  );
};

export default LayoutC;
