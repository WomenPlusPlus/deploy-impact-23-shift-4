import React, { useState } from "react";
import { Button, Modal } from "antd";
import { IconEdit } from "@tabler/icons-react";
import { Labels } from "../labels/Label";

interface EditModalProps {
  labelsList: string[];
  setLabelsList: (arg: string[]) => void;
  icon: React.ReactNode;
  titleName: string;
}

const EditModal: React.FC<EditModalProps> = ({
  labelsList,
  icon,
  titleName,
  setLabelsList,
}) => {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const [labelsToDeleteState, setLabelsToDeleteState] =
    useState<string[]>(labelsList);

  const handleCloseLabel = (labelToRemove: string) => {
    const updatedLabels = labelsToDeleteState.filter(
      (label) => label !== labelToRemove
    );
    setLabelsToDeleteState(updatedLabels);
  };

  const showModal = () => {
    setOpen(true);
  };

  const handleOk = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setOpen(false);
      // Update the labelsList state with the remaining labels
      setLabelsList(labelsToDeleteState);
    }, 300);
  };

  const handleCancel = () => {
    setOpen(false);
    // Match the labelsToDelete state with the labelsList state
    setLabelsToDeleteState(labelsList);
  };

  return (
    <>
      <IconEdit
        color="black"
        style={{ cursor: "pointer" }}
        onClick={showModal}
      />
      <Modal
        open={open}
        title={`Edit ${titleName}`}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[
          <Button key="back" onClick={handleCancel}>
            Cancel
          </Button>,
          <Button
            key="submit"
            type="primary"
            loading={loading}
            onClick={handleOk}
          >
            Update
          </Button>,
        ]}
      >
        {labelsToDeleteState.map((label, index) => (
          <Labels
            key={index}
            icon={icon}
            labelName={label}
            onCloseIcon={() => handleCloseLabel(label)}
            disableCloseIcon={false}
            backgroundColor="var(--label-color)"
          />
        ))}
      </Modal>
    </>
  );
};

export { EditModal };
