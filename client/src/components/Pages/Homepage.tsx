import React, { useState } from "react";
import { Layout, Space } from "antd";
import Navbar from "../UI/navbar/Navbar";
import Sidebar from "../UI/sidebar/Sidebar";
import { DashboardCandidate } from "./DashboardCandidate";
import { Companies } from "./Companies";
import { Jobs } from "./Jobs";
import { Saved } from "./Saved";
import axios from "axios";
import { useNavigate } from "react-router-dom";

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
  // textAlign: "center",
  minHeight: 120,
  // lineHeight: "100vh",
  color: "#fff",
  backgroundColor: "#fff",
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

// Define a type for the result object
interface LogoutResult {
  success: boolean;
  data: any | null;
  error: {
    status: number;
    data: any;
  } | {
    message: string;
  } | null;
}

const logout = (): LogoutResult => {
  // Create an object to store the result
  let result: LogoutResult = {
    success: false,
    data: null,
    error: null,
  };

  // Send logout request to the backend (you'll need to replace the URL and method)
  axios
    .post("/api/logout", { withCredentials: true })
    .then((response) => {
      // Handle the backend response here
      console.log("Backend Response:", response.data);
      console.log("Response", response.status);

      // Update the result object with the response data
      result.success = true;
      result.data = response.data;
    })
    .catch((error) => {
      // Handle any errors here
      if (error.response) {
        console.error("HTTP Status Code:", error.response.status);
        console.error("Response Data:", error.response.data);

        // Update the result object with the error information
        result.error = {
          status: error.response.status,
          data: error.response.data,
        };
      } else {
        console.error("Network Error:", error.message);

        // Update the result object with the network error
        result.error = {
          message: error.message,
        };
      }
    });

  // Return the result object
  return result;
};


const LayoutC = () => {
  const [selectedComponent, setSelectedComponent] = useState("dashboard");
  const navigate = useNavigate();

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
    case "logout":
      logout();
      navigate("/login");
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
            />
          </Sider>
          <Content style={contentStyle}>{componentToRender}</Content>
        </Layout>
        <Footer style={footerStyle}>Footer</Footer>
      </Layout>
    </Space>
  );
};

export default LayoutC;
