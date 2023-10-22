import React, { useState, useEffect } from "react";
import { Layout as AntLayout, Space } from "antd";
import { ToastContainer } from "react-toastify";
import Navbar from "../navbar/Navbar";
import Sidebar from "../sidebar/Sidebar";
import "react-toastify/dist/ReactToastify.css";

const { Content } = AntLayout;

const Authenticated = ({ content }: { content: JSX.Element }) => {
  const [selectedComponent, setSelectedComponent] = useState(() => {
    const storedComponent = window.sessionStorage.getItem("selectedComponent");
    return storedComponent || "dashboard";
  });

  const [collapsed, setCollapsed] = useState(true);

  useEffect(() => {
    // Save the selected component in sessionStorage
    window.sessionStorage.setItem("selectedComponent", selectedComponent);
  }, [selectedComponent]);

  const contentStyle: React.CSSProperties = {
    minHeight: 120,
    color: "black",
    backgroundColor: "var(--background-color)",
    marginLeft: collapsed ? 80 : 200,
    paddingTop: 64,
    paddingRight: 40,
    paddingLeft: 40,
    overflow: "initial",
    transition: "margin-left 0.3s",
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
