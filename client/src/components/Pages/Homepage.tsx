import React, { useState } from "react";
import { Layout, Space } from "antd";
import Navbar from "../UI/navbar/Navbar";
import Sidebar from "../UI/sidebar/Sidebar";
import { DashboardCandidate } from "./DashboardCandidate";
import { Companies } from "./Companies";
import { Jobs } from "./Jobs";
import { Saved } from "./Saved";

const { Header, Footer, Sider, Content } = Layout;

const headerStyle: React.CSSProperties = {
  textAlign: "center",
  //   color: '#fff',
  //   height: 64,
  //   paddingInline: 50,
  //   lineHeight: '64px',
  //   backgroundColor: '#7dbcea',
};

const contentStyle: React.CSSProperties = {
  textAlign: "center",
  minHeight: 120,
  lineHeight: "100vh",
  color: "#fff",
  backgroundColor: "#108ee9",
};

const siderStyle: React.CSSProperties = {
  textAlign: "center",
  lineHeight: "120px",
  color: "#fff",
  backgroundColor: "#fff", //"#3ba0e9"
};

const footerStyle: React.CSSProperties = {
  textAlign: "center",
  color: "#fff",
  backgroundColor: "#7dbcea",
};

const LayoutC = () => {
  const [selectedComponent, setSelectedComponent] = useState("dashboard");

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
            <Sidebar selectedKey={selectedComponent} setSelectedKey={setSelectedComponent}/>
          </Sider>
          <Content style={contentStyle}>{componentToRender}</Content>
        </Layout>
        <Footer style={footerStyle}>Footer</Footer>
      </Layout>
    </Space>
  );
};

export default LayoutC;
