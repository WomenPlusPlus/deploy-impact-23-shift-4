import { useState } from "react";
import { Modal, Input, Select } from "antd";
import { Button } from "../button/Button";
import { IconEdit } from "@tabler/icons-react";
const { Option } = Select;

enum LanguageLevelText {
  Look = "Looking for a job",
  NotLook = "Not looking for a job",
}

interface EditInputProps<T> {
  visible: boolean;
  setVisible: (arg: boolean) => void;
  // Accept generic object
  valuesToEdit: T;
  setValuesToEdit: (arg: T) => void;
  fieldsToDisplay: string[];
  onClick: () => void;
}

/**
 * Modal to edits inputs
 * @param visible status of the modal visibility
 * @param setVisible to set the visibility of the modal
 * @param valuesToEdit the values to edit
 * @param setValuesToEdit the function to set the values to edit
 * @param fieldsToDisplay the fields to display
 * @param onClick the function to call when the edit icon is clicked
 * @returns Modal to edit inputs
 */
const EditInput = <T extends Record<string, string>>({
  visible,
  setVisible,
  valuesToEdit,
  setValuesToEdit,
  fieldsToDisplay,
  onClick,
}: EditInputProps<T>) => {
  const [values, setValues] = useState(valuesToEdit);

  const handleSave = () => {
    setValuesToEdit(values);
    setVisible(false);
  };

  const onCancel = () => {
    setVisible(false);
  };

  return (
    <>
      <IconEdit color="black" style={{ cursor: "pointer" }} onClick={onClick} />
      <Modal
        open={visible}
        title="Contact Info"
        onCancel={onCancel}
        footer={[
          <Button key="save" onClick={onCancel}>
            Cancel
          </Button>,
          <Button key="save" onClick={handleSave}>
            Save
          </Button>,
        ]}
      >
        {Object.entries(values).map(([field, value], index) => (
          <div key={field}>
            <p>{fieldsToDisplay[index]}:</p>
            {field === "job_status" ? (
              <Select
                style={{ width: "100%" }}
                value={value}
                onChange={(value) =>
                  setValues((prevValues) => ({
                    ...prevValues,
                    [field]: value,
                  }))
                }
              >
                {Object.keys(LanguageLevelText).map((level) => (
                  <Option key={level} value={level}>
                    {level}
                  </Option>
                ))}
              </Select>
            ) : (
              <Input
                value={value}
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
