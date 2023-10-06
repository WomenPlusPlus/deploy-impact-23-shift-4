import React, { useState, useEffect } from "react";
import { Layout as AntLayout, Space } from "antd";
import Navbar from "../UI/navbar/Navbar";
import Sidebar from "../UI/sidebar/Sidebar";
import { DashboardCandidate } from "../pages/dashboardCandidate/DashboardCandidate";
import { Companies } from "../pages/Companies";
import Candidates from "../pages/candidates/Candidates";
import { Jobs } from "../pages/Jobs";
import { Saved } from "../pages/Saved";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const { Footer, Sider, Content } = AntLayout;

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

const Layout = () => {
  const [selectedComponent, setSelectedComponent] = useState(() => {
    const storedComponent = window.sessionStorage.getItem("selectedComponent");
    return storedComponent || "dashboard";
  });
  const navigate = useNavigate();

  useEffect(() => {
    // Save the selected component in sessionStorage
    window.sessionStorage.setItem("selectedComponent", selectedComponent);
  }, [selectedComponent]);

  const components: {
    [key: string]: JSX.Element;
  } = {
    dashboard: <DashboardCandidate />,
    jobs: <Jobs />,
    companies: <Companies />,
    saved: <Saved />,
    candidates: <Candidates />,
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

  return (
    <Space direction="vertical" style={{ width: "100%" }} size={[0, 48]}>
      <AntLayout>
        <Navbar />
        <AntLayout hasSider>
          <Sider width={256} style={siderStyle}>
            <Sidebar
              selectedKey={selectedComponent}
              setSelectedKey={setSelectedComponent}
              onLogoutClick={() => {
                setSelectedComponent("logout");
                handleLogout();
              }}
            />
          </Sider>
          <ToastContainer theme="light" />
          <Content style={contentStyle}>
            {components[selectedComponent]}
          </Content>
        </AntLayout>
        <Footer style={footerStyle}>Footer</Footer>
      </AntLayout>
    </Space>
  );
};

export default Layout;
