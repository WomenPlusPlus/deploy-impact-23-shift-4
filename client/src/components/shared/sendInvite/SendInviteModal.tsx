import React, { useEffect, useState } from "react";
import {
  Divider,
  Input,
  Modal,
  Radio,
  Upload,
  UploadProps,
  message,
} from "antd";
import { IconInbox } from "@tabler/icons-react";
import Dragger from "antd/es/upload/Dragger";
import TextArea from "antd/es/input/TextArea";

import styling from "./SendInviteModal.module.css";
import { SendInviteModalProps } from "../../../types/types";

const SendInviteModal: React.FC<SendInviteModalProps> = ({
  isOpen,
  defaultOption,
  handleSend,
  onClose,
}) => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [checked, setChecked] = useState<string | null>(defaultOption);
  const [content, setContent] = useState("");

  const handleEmailChange = (e: any) => {
    setEmail(e.target.value);
  };

  const handleNameChange = (e: any) => {
    setName(e.target.value);
  };

  const onChange = (e: any) => {
    setChecked(e.target.value);
  };

  const createPayload = () => {
    const payload = {
      user_type: checked?.toLowerCase()!,
      recipient_email: email,
      association_name: "",
      name: name,
    };
    return payload;
  };

  useEffect(() => {
    setChecked(defaultOption);
  }, [defaultOption]);

  const options = [
    { label: "Company", value: "Company" },
    { label: "Candidate", value: "Candidate" },
    { label: "Association", value: "Association" },
  ];

  const props: UploadProps = {
    beforeUpload: (file) => {
      const isCSV = file.type === "csv";
      if (!isCSV) {
        message.error(`${file.name} is not a csv file`);
      }
      return isCSV || Upload.LIST_IGNORE;
    },
    onChange: (info) => {
      console.log(info.fileList);
    },
  };

  const defaultEmailContent = `Dear ${defaultOption},
We are excited to invite you to join Bridge Software, a comprehensive system designed to empower underrepresented groups in Switzerland by providing them with the tools, resources, and support they need to find entry-level jobs in the tech industry.
This system embodies the spirit of inclusion, diversity, and innovation, fostering a brighter future for refugees and the Swiss tech industry alike.

We look forward to having you as a valuable member of our community.
Sincerely,
The BRIDGE Team`;

  return (
    <>
      <Modal
        className={styling.modal}
        title="Send invite"
        open={isOpen}
        onCancel={onClose}
        onOk={(e: React.MouseEvent<HTMLButtonElement>) => {
          const payload = createPayload();
          handleSend(payload);
        }}
        okText="Send"
      >
        <Radio.Group onChange={onChange} value={checked}>
          {options.map((option) => (
            <Radio key={option.value} value={option.value}>
              {option.label}
            </Radio>
          ))}
        </Radio.Group>

        <p>Email content:</p>
        <TextArea
          className={styling.description}
          placeholder="Email content"
          value={defaultEmailContent}
          onChange={(e) => setContent(e.target.value)}
        />
        <Divider> Send individual invitation</Divider>

        <p>Name:</p>
        <Input
          placeholder="Enter name"
          value={name}
          onChange={handleNameChange}
        />
        <p>Email:</p>
        <Input
          placeholder="Enter email"
          value={email}
          onChange={handleEmailChange}
        />
        <Divider> Or send in bulk</Divider>
        <Dragger {...props}>
          <p className="ant-upload-drag-icon">
            <IconInbox />
          </p>
          <p className="ant-upload-text">Click or drag a CSV file to upload</p>
          <p className="ant-upload-hint">
            Support for a single upload. Strictly prohibited from uploading
            company data or other banned files.
          </p>
        </Dragger>
      </Modal>
    </>
  );
};

export default SendInviteModal;
