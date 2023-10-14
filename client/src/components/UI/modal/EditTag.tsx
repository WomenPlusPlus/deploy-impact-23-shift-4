import React, { useState } from "react";
import { Button, Modal, Input } from "antd";
import { IconEdit } from "@tabler/icons-react";
import { Labels } from "../labels/Label";
import styling from "./EditTag.module.css";

interface EditTagProps {
  labelsList: string[];
  setLabelsList: (arg: string[]) => void;
  icon: React.ReactNode;
  titleName: string;
  allLabelsList?: string[];
}

const EditTag: React.FC<EditTagProps> = ({
  labelsList,
  icon,
  titleName,
  setLabelsList,
  allLabelsList,
}) => {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [searchText, setSearchText] = useState("");

  const [labelsToDeleteState, setLabelsToDeleteState] =
    useState<string[]>(labelsList);
  const [allLabelsListState, setAllLabelsListState] = useState<string[]>(
    allLabelsList || []
  );

  // Filter the labels based on the search text
  const filteredLabels = allLabelsListState.filter((label) =>
    label.toLowerCase().includes(searchText.toLowerCase())
  );

  const handleCloseLabel = (labelToRemove: string) => {
    const updatedLabels = labelsToDeleteState.filter(
      (label) => label !== labelToRemove
    );
    setLabelsToDeleteState(updatedLabels);
  };

  const addLabelToDeleteState = (labelToAdd: string) => {
    // Add the label to the labelsToDelete state
    const updatedLabels = [...labelsToDeleteState, labelToAdd];
    setLabelsToDeleteState(updatedLabels);
    // Remove the label from the allLabelsListState state
    const updatedAllLabels = allLabelsListState.filter(
      (label) => label !== labelToAdd
    );
    if (allLabelsListState) {
      setAllLabelsListState(updatedAllLabels);
    }
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
      // Reset the search text
      setSearchText("");
    }, 300);
  };

  const handleCancel = () => {
    setOpen(false);
    // Match the labelsToDelete state with the labelsList state
    setLabelsToDeleteState(labelsList);
    // Reset the search text
    setSearchText("");
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
        title={titleName}
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
        {/* Candidate chosen labels */}
        <div className={styling.elementInOneRow}>
          {labelsToDeleteState.map((label, index) => (
            <Labels
              key={index}
              icon={icon}
              labelName={label}
              onCloseIcon={() => handleCloseLabel(label)}
              disableCloseIcon={false}
              customClass={styling.labelClassSelected}
            />
          ))}
        </div>
        {/* <hr /> */}
        <Input
          className={styling.searchInput}
          placeholder="Search Labels" // Add a search input
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
        {/* All the rest of labels and Search Results */}
        <div className={styling.elementInOneRow}>
          {filteredLabels.map((label, index) => (
            <Labels
              key={index}
              icon={icon}
              labelName={label}
              disableCloseIcon={true}
              customClass={styling.labelClass}
              onClickHandle={() => addLabelToDeleteState(label)}
            />
          ))}
        </div>
      </Modal>
    </>
  );
};

export { EditTag };
