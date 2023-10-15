import React, { useState } from "react";
import { Input, Modal } from "antd";

interface SendInviteModalProps {
  isOpen: boolean;
  handleSend: (email: string) => void;
  onClose: () => void;
}

const SendInviteModal: React.FC<SendInviteModalProps> = ({
  isOpen,
  handleSend,
  onClose,
}) => {
  const [email, setEmail] = useState("");

  const handleEmailChange = (e: any) => {
    setEmail(e.target.value);
  };

  return (
    <>
      <Modal
        title="Send invite"
        open={isOpen}
        onCancel={onClose}
        onOk={(e: React.MouseEvent<HTMLButtonElement>) => handleSend(email)}
      >
        <Input
          placeholder="Enter email"
          value={email}
          onChange={handleEmailChange}
        />
      </Modal>
    </>
  );
};

export default SendInviteModal;
