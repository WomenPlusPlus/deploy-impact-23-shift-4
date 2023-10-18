import React, { useState, useEffect } from "react";
import { Layout as AntLayout, Space } from "antd";
import { ToastContainer } from "react-toastify";
import Navbar from "../navbar/Navbar";
import Sidebar from "../sidebar/Sidebar";
import "react-toastify/dist/ReactToastify.css";
import { Header } from "antd/es/layout/layout";

const { Footer, Content } = AntLayout;

const footerStyle: React.CSSProperties = {
  textAlign: "center",
  color: "#fff",
  backgroundColor: "#7dbcea",
  bottom: 0,
};

const Authenticated = ({ content }: { content: JSX.Element }) => {
  const [selectedComponent, setSelectedComponent] = useState(() => {
    const storedComponent = window.sessionStorage.getItem("selectedComponent");
    return storedComponent || "dashboard";
  });

  const [collapsed, setCollapsed] = useState(false);

  useEffect(() => {
    // Save the selected component in sessionStorage
    window.sessionStorage.setItem("selectedComponent", selectedComponent);
  }, [selectedComponent]);

  const contentStyle: React.CSSProperties = {
    minHeight: 120,
    color: "black",
    backgroundColor: "var(--background-color)",
    marginLeft: collapsed ? 100 : 240,
    paddingTop: 64,
    overflow: "initial",
    transition: "margin-left 0.3s", // Add a smooth transition
  };

  return (
    <Space direction="vertical" style={{ width: "100%" }} size={[0, 48]}>
      <AntLayout>
        <Navbar />
        <AntLayout hasSider>
          <Sidebar
            selectedKey={selectedComponent}
            setSelectedKey={setSelectedComponent}
            collapsed={collapsed}
            setCollapsed={setCollapsed}
          />
          <ToastContainer theme="light" />
          <Content style={contentStyle}>{content}</Content>
        </AntLayout>
        {/* <Footer style={footerStyle}>Footer</Footer> */}
      </AntLayout>
    </Space>
  );
};

export default Authenticated;
