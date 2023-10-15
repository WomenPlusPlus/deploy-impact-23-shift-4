import React, { useState } from "react";
import { LockOutlined, MailOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Checkbox, Form, Input } from "antd";
import styling from "./RegisterCandidate.module.css"; // You can create a separate CSS file for styling
import axios from "axios"; // Import Axios for making HTTP requests
import { useNavigate } from "react-router-dom";
import { GoogleButton } from "../../UI/oauth/GoogleButton";
import TermsAndConditions from "./TermsAndConditions";

interface RegisterCandidateProps {
  token: string;
  expires: string;
  user_type: string;
  signature: string;
  associations: string[];
}

const RegisterCandidate: React.FC<RegisterCandidateProps> = ({
  token,
  expires,
  user_type,
  signature,
  associations,
}) => {
  console.log(
    "Token:",
    token,
    "Expires:",
    expires,
    "User type:",
    user_type,
    "Signature:",
    signature
  );
  // state
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    password: "",
    email: "",
    user_type: user_type,
    associations: associations,
  });

  const [agree, setAgree] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
      .post("/api/register", formData, { withCredentials: true }) // Replace with your registration endpoint
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
    <div className={styling.registerContainer}>
      <div className={styling.registerBox}>
        <h1>Candidate registration for Shift4</h1>
        <Form
          name="register_form"
          className={styling.registerForm}
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
              className={styling.antInput}
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
              className={styling.antInput}
              type="text"
              name="last_name"
              value={formData.last_name}
              placeholder="Last Name"
              onChange={handleInputChange}
            />
          </Form.Item>

          <Form.Item
            name="email"
            rules={[{ required: true, message: "Please input your Email!" }]}
          >
            <Input
              prefix={<MailOutlined className="site-form-item-icon" />}
              className={styling.antInput}
              type="email"
              name="email"
              value={formData.email}
              placeholder="Email"
              onChange={handleInputChange}
            />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[{ required: true, message: "Please input your Password!" }]}
          >
            <Input
              prefix={<LockOutlined className="site-form-item-icon" />}
              className={styling.antInput}
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
          </Form.Item>

          <Form.Item>
            <TermsAndConditions onAgreeChange={(value) => setAgree(value)} />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className={styling.registerFormButton}
              disabled={!agree}
            >
              Register
            </Button>
          </Form.Item>

          {/* OAuth */}
          <div className={styling.oauth}>
            <hr className={styling.horizontalLine} />
            <p>or register with</p>
            <GoogleButton />
          </div>
        </Form>
      </div>
    </div>
  );
};

export default RegisterCandidate;
