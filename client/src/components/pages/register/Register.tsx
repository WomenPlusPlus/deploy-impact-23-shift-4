import React, { useState } from "react";
import { LockOutlined, MailOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Checkbox, Form, Input } from "antd";
import "./Register.css"; // You can create a separate CSS file for styling
import axios from "axios"; // Import Axios for making HTTP requests
import { useNavigate } from "react-router-dom";

const Register: React.FC = () => {
  // state
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    username: "",
    password: "",
    email: "",
    user_type: "candidate",
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
    // Send registration data to the backend (you'll need to replace the URL and method)
    axios
      .post("/api/register", formData) // Replace with your registration endpoint
      .then((response) => {
        // Handle the backend response here (e.g., show a success message)
        console.log("Registration Successful!");
        console.log(`${response.data}`);
        navigate("/login"); // Redirect to the login page after successful registration
      })
      .catch((error) => {
        // Handle any errors here (e.g., display error messages)
        if (error.response) {
          console.error("HTTP Status Code:", error.response.status);
          console.error("Response Data:", error.response.data);
        } else {
          console.error("Network Error:", error.message);
        }
      });
  };

  return (
    <div className="register-container">
      <div className="register-box">
        <h1>Register for Shift4</h1>
        <Form
          name="register_form"
          className="register-form"
          initialValues={{ remember: true }}
          onFinish={onFinish}
        >
          <Form.Item
            name="first_name"
            rules={[
              { required: true, message: "Please input your First Name!" },
            ]}
          >
            <Input
              prefix={<UserOutlined className="site-form-item-icon" />}
              type="text"
              name="first_name"
              value={formData.first_name}
              placeholder="First Name"
              onChange={handleInputChange}
            />
          </Form.Item>
          <Form.Item
            name="last_name"
            rules={[
              { required: true, message: "Please input your Last Name!" },
            ]}
          >
            <Input
              prefix={<UserOutlined className="site-form-item-icon" />}
              type="text"
              name="last_name"
              value={formData.last_name}
              placeholder="Last Name"
              onChange={handleInputChange}
            />
          </Form.Item>
          <Form.Item
            name="username"
            rules={[{ required: true, message: "Please input your Username!" }]}
          >
            <Input
              prefix={<UserOutlined className="site-form-item-icon" />}
              type="text"
              name="username"
              value={formData.username}
              placeholder="Username"
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
          <Form.Item
            name="email"
            rules={[{ required: true, message: "Please input your Email!" }]}
          >
            <Input
              prefix={<MailOutlined className="site-form-item-icon" />}
              type="email"
              name="email"
              value={formData.email}
              placeholder="Email"
              onChange={handleInputChange}
            />
          </Form.Item>
          <Form.Item>
            <Form.Item name="remember" valuePropName="checked" noStyle>
              <Checkbox>Remember me</Checkbox>
            </Form.Item>
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="register-form-button"
            >
              Register
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default Register;
