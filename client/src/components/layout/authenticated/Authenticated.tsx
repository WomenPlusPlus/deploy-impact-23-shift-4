import React, { useState, useEffect } from "react";
import { Layout as AntLayout, Space } from "antd";
import { ToastContainer } from "react-toastify";
import Navbar from "../navbar/Navbar";
import Sidebar from "../sidebar/Sidebar";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { LoginRedirect } from "./LoginRedirect";

const { Content } = AntLayout;

const Authenticated = ({ content }: { content: JSX.Element }) => {
  const [selectedComponent, setSelectedComponent] = useState(() => {
    const storedComponent = window.sessionStorage.getItem("selectedComponent");
    return storedComponent || "dashboard";
  });
  //  state
  const [isAuth, setIsAuth] = useState(false);

  const [collapsed, setCollapsed] = useState(true);

  const authCheck = async () => {
    //
    const { data } = await axios.get("/api/check_authentication", {
      withCredentials: true,
    });

    console.log("AUTH", data);
    if (data?.authenticated) {
      setIsAuth(true);
    } else {
      setIsAuth(false);
    }
  };

  useEffect(() => {
    authCheck();
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
    <>
      {isAuth ? (
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
      ) : (
        <LoginRedirect />
      )}
    </>
  );
};

export default Authenticated;
