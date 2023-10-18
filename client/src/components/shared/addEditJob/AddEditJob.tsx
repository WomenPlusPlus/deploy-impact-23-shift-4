import React from "react";
import { Modal as AntdModal } from "antd";

interface ModalProps {
  title: string;
  content: string;
  open: boolean;
  onOk: () => void;
  onCancel: () => void;
  confirmLoading: boolean;
}

const CustomModal: React.FC<ModalProps> = ({
  title,
  content,
  open,
  onOk,
  onCancel,
  confirmLoading,
}) => {
  return (
    <AntdModal
      title={title}
      open={open}
      onOk={onOk}
      onCancel={onCancel}
      confirmLoading={confirmLoading}
    >
      <p>{content}</p>
    </AntdModal>
  );
};

export default CustomModal;
