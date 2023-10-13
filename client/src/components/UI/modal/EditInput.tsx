import React, { useState } from "react";
import { Modal, Input } from "antd";

interface EditInputProps {
  visible: boolean;
  setVisible: (arg: boolean) => void;
  contactInfo: {
    phoneNumber: string;
    email: string;
    address: string;
  };
  setContactInfo: (arg: {
    phoneNumber: string;
    email: string;
    address: string;
  }) => void;
}

const EditInput: React.FC<EditInputProps> = ({
  visible,
  setVisible,
  contactInfo,
  setContactInfo,
}) => {
  const [editing, setEditing] = useState(false);
  const [values, setValues] = useState(contactInfo);

  const handleEdit = () => {
    setEditing(true);
  };

  const handleSave = () => {
    setEditing(false);
    setContactInfo(values);
    setVisible(false);
  };

  const onCancel = () => {
    setVisible(false);
  };

  return (
    <Modal
      visible={visible}
      title="Contact Info"
      onCancel={onCancel}
      footer={[
        !editing ? (
          <button key="edit" onClick={handleEdit}>
            Edit
          </button>
        ) : (
          <button key="save" onClick={handleSave}>
            Save
          </button>
        ),
      ]}
    >
      {Object.entries(values).map(([field, value]) => (
        <div key={field}>
          <p>{field}:</p>
          {editing ? (
            <Input
              value={value}
              onChange={(e) => {
                setValues((prevValues) => ({
                  ...prevValues,
                  [field]: e.target.value,
                }));
              }}
            />
          ) : (
            <span>{value}</span>
          )}
        </div>
      ))}
    </Modal>
  );
};

export default EditInput;
