import React, { useEffect, useState } from "react";
import { Modal, Input, Select } from "antd";
import { Candidate } from "../../pages/types/types";
import { ContentBlock } from "../../UI/container/SectionContainer";
import { IconEdit } from "@tabler/icons-react";
import { Button } from "../button/Button";

const { Option } = Select; // Import Option from Select

interface ContentBlockModalProps {
  visible: boolean;
  setVisible: (arg: boolean) => void;
  candidate: Candidate;
  showModal: () => void;
  onSave?: (arg: Candidate) => void;
  allFields?: string[];
}

const VisibleSection: React.FC<ContentBlockModalProps> = ({
  visible,
  setVisible,
  candidate,
  showModal,
  allFields,
  onSave
}) => {
  const [selectedField, setSelectedField] = useState("");
  const [editedSections, setEditedSections] = useState<string[]>([]);

  useEffect(() => {
    if (candidate?.visible_information) {
      setEditedSections(candidate?.visible_information as string[]);
    }
  }, [candidate]);

  const handleAddField = () => {
    if (selectedField) {
      setEditedSections([...editedSections, selectedField]);
      setSelectedField("");
    }
  };

  const handleSave = () => {
    if (onSave) {
      onSave({
        ...candidate,
        visible_information: editedSections,
      });
    }
    onCancel();
  };

  const onCancel = () => {
    setVisible(false);
  };

  return (
    <>
      <IconEdit color="black" style={{ cursor: "pointer" }} onClick={showModal} />
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
        <Select
          value={selectedField}
          onChange={(value) => setSelectedField(value)}
          style={{ width: "100%" }}
        >
          {/* {allFields &&
            allFields?.map((field) => (
              <Option key={field} value={field}>
                {field}
              </Option>
            ))} */}
        </Select>
        <Button onClick={handleAddField}>Add Field</Button>
      </Modal>
    </>
  );
};

export { VisibleSection };
