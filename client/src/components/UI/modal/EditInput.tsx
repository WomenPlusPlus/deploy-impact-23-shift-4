import React, { useEffect, useState } from "react";
import { Modal, Input, Select } from "antd";
import { Button } from "../button/Button";
import { IconEdit } from "@tabler/icons-react";
import { Candidate, EditInputProps } from "../../pages/types/types";
const { Option } = Select;
enum LanguageLevelText {
  Look = "Looking for a job",
  NotLook = "Not looking for a job",
}

const EditInput: React.FC<EditInputProps<Candidate>> = ({
  onSave,
  onClick,
  setVisible,
  setValuesToEdit,
  visible,
  candidate,
  fieldsToDisplay, // Array of nicely formatted fields to display
  fieldKeysToEdit, // Array of keys of the fields to edit
}) => {
  // State
  const [values, setValues] = useState({} as Candidate);

  /**
   * Save the values to edit
   */
  const handleSave = () => {
    setValuesToEdit(values);
    onSave && onSave(values);
    setVisible(false);
  };

  /**
   * Close the modal
   */
  const onCancel = () => {
    setVisible(false);
  };

  /**
   * Set the values to edit when the modal is opened
   */
  useEffect(() => {
    setValues(candidate);
  }, [candidate]);

  return (
    <>
      <IconEdit color="black" style={{ cursor: "pointer" }} onClick={onClick} />

      <Modal
        open={visible}
        title="Edit Information"
        onCancel={onCancel}
        footer={[
          <Button key="cancel" onClick={onCancel}>
            Cancel
          </Button>,
          <Button key="save" onClick={handleSave}>
            Save
          </Button>,
        ]}
      >
        {fieldKeysToEdit.map((field: string, index) => (
          <div key={index}>
            <p>{fieldsToDisplay[index]}:</p>

            {field === "job_status" ? (
              <Select
                style={{ width: "100%" }}
                value={values[field] || ""}
                onChange={(value) => {
                  setValues((prevValues) => ({
                    ...prevValues,
                    [field]: value,
                  }));
                }}
              >
                {Object.entries(LanguageLevelText).map(([level, text]) => (
                  <Option key={level} value={text}>
                    {text}
                  </Option>
                ))}
              </Select>
            ) : (
              <Input
                value={(values[field as keyof Candidate] as string) || ""}
                onChange={(e) => {
                  setValues((prevValues) => ({
                    ...prevValues,
                    [field]: e.target.value,
                  }));
                }}
              />
            )}
          </div>
        ))}
      </Modal>
    </>
  );
};

export { EditInput };
