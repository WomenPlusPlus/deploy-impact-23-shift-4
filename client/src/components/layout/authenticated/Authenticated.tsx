import React, { useState, useEffect } from "react";
import { Layout as AntLayout, Space } from "antd";
import { ToastContainer } from "react-toastify";
import Navbar from "../navbar/Navbar";
import Sidebar from "../sidebar/Sidebar";
import "react-toastify/dist/ReactToastify.css";

const { Footer, Content } = AntLayout;

const contentStyle: React.CSSProperties = {
  minHeight: 120,
  color: "#fff",
  backgroundColor: "#fff",
};

const footerStyle: React.CSSProperties = {
  textAlign: "center",
  color: "#fff",
  backgroundColor: "#7dbcea",
};

const Authenticated = ({ content }: { content: JSX.Element }) => {
  const [selectedComponent, setSelectedComponent] = useState(() => {
    const storedComponent = window.sessionStorage.getItem("selectedComponent");
    return storedComponent || "dashboard";
  });

  useEffect(() => {
    // Save the selected component in sessionStorage
    window.sessionStorage.setItem("selectedComponent", selectedComponent);
  }, [selectedComponent]);

  return (
    <Space direction="vertical" style={{ width: "100%" }} size={[0, 48]}>
      <AntLayout>
        <Navbar />
        <AntLayout hasSider>
          <Sidebar
            selectedKey={selectedComponent}
            setSelectedKey={setSelectedComponent}
          />
          <ToastContainer theme="light" />
          <Content style={contentStyle}>{content}</Content>
        </AntLayout>
        <Footer style={footerStyle}>Footer</Footer>
      </AntLayout>
    </Space>
  );
};

export default Authenticated;
