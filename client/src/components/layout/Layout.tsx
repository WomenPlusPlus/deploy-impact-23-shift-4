import React, { useState, useEffect } from "react";
import { Layout as AntLayout, Space } from "antd";
import Navbar from "../UI/navbar/Navbar";
import Sidebar from "../UI/sidebar/Sidebar";
import { DashboardCandidate } from "../pages/dashboardCandidate/DashboardCandidate";
import { Companies } from "../pages/Companies";
import Candidates from "../pages/candidates/Candidates";
import { Jobs } from "../pages/Jobs";
import { Saved } from "../pages/Saved";

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

  return (
    <Space direction="vertical" style={{ width: "100%" }} size={[0, 48]}>
      <AntLayout>
        <Navbar />
        <AntLayout hasSider>
          <Sider width={256} style={siderStyle}>
            <Sidebar
              selectedKey={selectedComponent}
              setSelectedKey={setSelectedComponent}
            />
          </Sider>
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
