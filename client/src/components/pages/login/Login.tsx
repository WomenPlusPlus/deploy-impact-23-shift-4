import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Checkbox, Form, Input } from "antd";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import backgroundLogin from "../../../media/login-background.jpg";
import axios from "axios"; // Import Axios for making HTTP requests

import "./Login.css";

interface ILoginProps {
  setUser: (userType: string) => void;
}

const Login: React.FC<ILoginProps> = ({ setUser }) => {
  // state
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
      .post("/api/login", formData, { withCredentials: true })
      .then((response) => {
        // Handle the backend response here
        const { user } = response.data;
        console.log("Response", response.status);
        // Set user_type in local storage
        setUser(user.user_type);
        // Navigate to the dashboard
        navigate("/");
      })
      .catch((error) => {
        // Handle any errors here
        if (error.response) {
          console.error("HTTP Status Code:", error.response.status);
          console.error("Response Data:", error.response.data);
        } else {
          console.error("Network Error:", error.message);
        }
      });
  };

  return (
    <div className="login-container">
      <img
        className="backgroud-image"
        alt="background"
        // style={{ width: 160 }}
        src={String(backgroundLogin)}
      />
      <div className="login-box">
        <h1>Welcome to Shift4</h1>
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
            <Input
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              name="password"
              value={formData.password}
              placeholder="Password"
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
