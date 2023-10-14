// Register.tsx
import React, { useState } from "react";
import { LockOutlined, MailOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Form, Input } from "antd";
import "./Register.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import TermsAndConditions from "./TermsAndConditions";

interface FormData {
  first_name: string;
  last_name: string;
  username: string;
  password: string;
  email: string;
  user_type: string;
}

const Register: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    first_name: "",
    last_name: "",
    username: "",
    password: "",
    email: "",
    user_type: "candidate",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const navigate = useNavigate();

  const onFinish = (values: any) => {
    axios
      .post("/api/register", formData)
      .then((response) => {
        console.log("Registration Successful!");
        console.log(`${response.data}`);
        navigate("/login");
      })
      .catch((error) => {
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
          {/* Diğer form alanları burada... */}
          <Form.Item>
            <TermsAndConditions />
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
