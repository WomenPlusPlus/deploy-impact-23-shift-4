import React, { useState } from "react";
import { Modal, Input } from "antd";

interface EditInputProps<T> {
  visible: boolean;
  setVisible: (arg: boolean) => void;
  // Accept generic object
  valuesToEdit: T;
  setValuesToEdit: (arg: T) => void;
}

const EditInput = <T extends Record<string, string>>({
  visible,
  setVisible,
  valuesToEdit,
  setValuesToEdit,
}: EditInputProps<T>) => {
  const [editing, setEditing] = useState(false);
  const [values, setValues] = useState(valuesToEdit);

  const handleEdit = () => {
    setEditing(true);
  };

  const handleSave = () => {
    setEditing(false);
    setValuesToEdit(values);
    setVisible(false);
  };

  const onCancel = () => {
    setVisible(false);
  };

  return (
    <Modal
      open={visible}
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

export { EditInput };
