import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Checkbox, Form, Input } from "antd";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { ToastContainer, toast } from "react-toastify";
// import axios from "axios"; // Import Axios for making HTTP requests
import { useAuth } from "../../../context/auth";
import BridgeLogo from "../../../media/bridge-logo.png";

import "./Login.css";

import configureAxios from "./../../../config";
import { IconEye, IconEyeOff } from "@tabler/icons-react";

const axios = configureAxios();

const Login = () => {
  // state
  const { auth, setAuth } = useAuth();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const navigate = useNavigate();

  const onFinish = (values: any) => {
    // Send login data to the backend (you'll need to replace the URL and method)
    axios
      .post(`/api/login`, formData, {
        withCredentials: true,
      })
      .then((response) => {
        // Handle the backend response here
        const { user } = response.data;
        console.log("Response", response.status);
        if (response.status === 200) {
          toast.success("Login Success");
        }
        // Set auth, user_type in local storage
        localStorage.setItem("user_type", user.user_type);
        localStorage.setItem("auth", JSON.stringify({ user: user }));
        setAuth({ user: user });
        // Navigate to the dashboard
        navigate("/");
      })
      .catch((error) => {
        // Handle any errors here
        if (error.response) {
          const { response } = error;
          if (response.status === 401) {
            toast.error("Invalid email or password");
          } else if (response.status === 403) {
            toast.error("User is not registered");
          } else if (response.status === 417) {
            toast.error("Login unsuccessful");
          } else {
            toast.error("Internal Server Error");
            console.error("HTTP Status Code:", error.response.status);
            console.error("Response Data:", error.response.data);
          }
        }
      });
  };

  return (
    <div className="login-container">
      <ToastContainer theme="light" />
      {/* <img
        className="backgroud-image"
        alt="background"
        // style={{ width: 160 }}
        src={String(backgroundLogin)}
      /> */}
      <div className="login-box">
        <img src={BridgeLogo} alt="Bridge Logo" className="logo" />
        <h1>Login</h1>
        <Form
          name="normal_login"
          className="login-form"
          initialValues={{ remember: true }}
          onFinish={onFinish}
        >
          <Form.Item
            name="email"
            rules={[{ required: true, message: "Please input your email!" }]}
          >
            <Input
              prefix={<UserOutlined className="site-form-item-icon" />}
              type="text"
              name="email"
              value={formData.email}
              placeholder="email"
              onChange={handleInputChange}
            />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: "Please input your Password!" }]}
          >
            <Input.Password
              prefix={<LockOutlined className="site-form-item-icon" />}
              name="password"
              value={formData.password}
              placeholder="Password"
              iconRender={(visible) =>
                visible ? <IconEyeOff size={20} /> : <IconEye size={20} />
              }
              onChange={handleInputChange}
            />
          </Form.Item>
          <Form.Item>
            <Form.Item name="remember" valuePropName="checked" noStyle>
              <Checkbox>Remember me</Checkbox>
            </Form.Item>
            {/* add backend route */}
            <a className="login-form-forgot" href="">
              Forgot password
            </a>
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
            >
              Log in
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default Login;
